import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik, useFormikContext } from "formik";
import checkoutValidation from '../../validation-schemas/CheckoutSchema'
import { useSelector } from 'react-redux';
import Loader from "../../components/common/Loader";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { toast } from 'react-toastify';
import cardsImage from '../../assets/images/cards.png';
import { useHeader } from '../../components/common/HeaderContext';

const stripePromise = loadStripe("pk_test_51QKGTWCHTdQvfuyCjb1L0IIPZZrMyeB49Jg7kOdfbYo5C6vcAPM3ZiQNAnViMPpYRhDX0Mr81ThvXty30PXi6bkh00DbyB1Lgr");

const Checkout = () => {
    const { setHeaderData } = useHeader();
    const cart = useSelector((state) => state.cart.cart || []);
    const totalPrice = cart.reduce((total, item) => total + item.regular_price * item.quantity, 0);


    const [toPayAmount, setToPayAmount] = useState(0);
    const [futurePayAmount, setFuturePayAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const [formvalues, setFormvalues] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBuyNowSelected, setIsBuyNowSelected] = useState(true);

    const toPay = ((totalPrice * 1.1).toFixed(2) * 45) / 100;
    const futurePay = Math.floor((totalPrice * 1.1).toFixed(2)) - toPay;

    useEffect(() => {
        setHeaderData({
            heading: 'Checkout',
            paragraph1: '',
            paragraph2: ''
        })
    }, []);

    useEffect(() => {
        setToPayAmount(toPay);
        setFuturePayAmount(futurePay);
    }, [totalPrice, formvalues]);


    const paydepositeValue = {
        toPayAmount,
        futurePayAmount,
    }

    // //update formvalue and send in the checkoutForm component
    // useEffect(() => {
    // }, [formvalues]);

    // Handle Buy Now button click
    const handleBuyNowClick = () => setIsBuyNowSelected(true); // Show Buy Now form
    // Handle Pay Deposit button click
    const handlePayDepositClick = () => setIsBuyNowSelected(false); // Show Pay Deposit form


    const handleCheckoutStripe = async (firstName, lastName, email, phoneNumber, county) => {
        setLoading(true);
        try {
            const total = isBuyNowSelected
                ? (totalPrice * 1.1).toFixed(2)
                : toPayAmount;

            let reqBody = {
                name: `${firstName} ${lastName}`,
                email: email,
                Phone: phoneNumber,
                Country: county,
                'amount': Number(total) * 100,
                cart: "cart",
            };

            const response = await axios.post("user/checkoutSession/", reqBody);

            if (response.data.status === true) {
                const Data = response.data.data;
                setClientSecret(Data.client_secret);
                setDpmCheckerLink(`https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${Data.id}`);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.status === false) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred during the checkout process');
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
            }, 300);
        }
    };

    const appearance = {
        theme: 'stripe',
    };

    const loader = 'auto';

    const FormObserver = () => {
        const { values } = useFormikContext();
        useEffect(() => {
            setFormvalues(values);
        }, [values]);
        return null;
    }

    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <div className="p-4 sv__checkout_wrapper bgWhite">
                {/* <div className="text-center py-4">
                    <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
                </div> */}
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-8 order-md-2 mb-4">
                            <div className="mt-12">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="mt-12">
                                        {/* Conditionally render the Buy Now form */}
                                        {isBuyNowSelected ? (
                                            <Formik
                                                initialValues={{
                                                    firstName: '',
                                                    lastName: '',
                                                    country: '',
                                                    streetAddress: '',
                                                    flat: '',
                                                    city: '',
                                                    county: '',
                                                    postcode: '',
                                                    email: '',
                                                    phoneNumber: '',
                                                    acknowledge: false,
                                                }}
                                                validationSchema={checkoutValidation}
                                                onSubmit={async (values, { resetForm }) => {
                                                }}
                                            >
                                                {({
                                                    values,
                                                    errors,
                                                    touched,
                                                    handleChange,
                                                    handleBlur,
                                                    handleSubmit,
                                                    isSubmitting,
                                                    validateForm,
                                                    isValid,
                                                    setTouched,
                                                    dirty
                                                }) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <FormObserver />
                                                        <div className="grid md:grid-cols-3 gap-4">
                                                            <div className='form-head'>
                                                                <h4 className="text-xl font-bold text-gray-800 mt-1">Billing Details</h4>
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>First name*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="firstName"
                                                                        placeholder="First name*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.firstName}
                                                                    />
                                                                    {errors.firstName && touched.firstName && <small className="text-red-500">{errors.firstName}</small>}
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Last name*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="lastName"
                                                                        placeholder="Last name*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.lastName}
                                                                    />
                                                                    {errors.lastName && touched.lastName && <small className="text-red-500">{errors.lastName}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Email address*</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email address*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.email}
                                                                    />
                                                                    {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Phone number*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="phoneNumber"
                                                                        placeholder="Phone number*"
                                                                        maxLength={10}
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.phoneNumber}
                                                                    />
                                                                    {errors.phoneNumber && touched.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Flat, suite, unit*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="flat"
                                                                        placeholder="Flat, suite, unit*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.flat}
                                                                    />
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Street address*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="streetAddress"
                                                                        placeholder="Street address*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.streetAddress}
                                                                    />
                                                                    {errors.streetAddress && touched.streetAddress && <small className="text-red-500">{errors.streetAddress}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Town / City*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="city"
                                                                        placeholder="Town / City*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.city}
                                                                    />
                                                                    {errors.city && touched.city && <small className="text-red-500">{errors.city}</small>}
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Postcode*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="postcode"
                                                                        placeholder="Postcode*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.postcode}
                                                                    />
                                                                    {errors.postcode && touched.postcode && <small className="text-red-500">{errors.postcode}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>County*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="county"
                                                                        placeholder="County*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.county}
                                                                    />
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Country/Region*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="country"
                                                                        placeholder="Country/Region*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.country}
                                                                    />
                                                                    {errors.country && touched.country && <small className="text-red-500">{errors.country}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <div className="checkout_paymentMethod">
                                                                        <button className="btn btn-md btn-orange py-2 px-4 rounded m-2" onClick={handleBuyNowClick} >
                                                                            Pay Full Payment
                                                                        </button>

                                                                        <button className="btn btn-md btn-orange py-2 px-4 rounded m-2" onClick={handlePayDepositClick}>
                                                                            Pay 45% Deposite
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <div className="form-check">
                                                                        <label className="flex items-start space-x-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                name="acknowledge"
                                                                                className="form-checkbox mr-3 h-5 w-5 text-blue-600"
                                                                                onChange={(e) => {
                                                                                    handleChange(e);
                                                                                    if (
                                                                                        values.firstName.trim() !== "" &&
                                                                                        values.lastName.trim() !== "" &&
                                                                                        values.email.trim() !== "" &&
                                                                                        String(values.phoneNumber).trim() !== "" &&
                                                                                        values.county.trim() !== "" &&
                                                                                        e.target.checked
                                                                                    ) {
                                                                                        handleCheckoutStripe(values.firstName, values.lastName, values.email, values.phoneNumber, values.county);
                                                                                    }
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                                checked={values.acknowledge}
                                                                            /> I acknowledge that by downloading/accessing the [GE700, XA6, GE706, GT700, PRINCE2 MANUAL or any other related resources] within 14 days from the date of the Course Acceptance Confirmation, I lose the right to change my mind under the Consumer Contract Regulations.


                                                                        </label>
                                                                        {errors.acknowledge && touched.acknowledge && <small className="text-red-500">{errors.acknowledge}</small>}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-md-12 pt-3 mt-3">
                                                                    <label>Payment Method</label>
                                                                    <img src={cardsImage} alt="Accepted Payment Methods" className="checkoutPaymentPic" />
                                                                </div>
                                                            </div>


                                                            {/* Modal Component */}
                                                            {isModalOpen && (
                                                                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="paymentModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                {/* {loading === true ? <Loader /> : ''} */}
                                                                                <h5 className="modal-title" id="paymentModalLabel">Payment Method</h5>
                                                                                <button type="button" className="close" onClick={() => setIsModalOpen(false)} aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                {clientSecret && (
                                                                                    <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                                                                                        <CheckoutForm
                                                                                            cart={cart}
                                                                                            formvalues={formvalues}
                                                                                            dpmCheckerLink={dpmCheckerLink}
                                                                                            isFormValid={isValid}
                                                                                            isDirty={dirty}
                                                                                            triggerValidation={() => validateForm().then((formErrors) => {
                                                                                                setTouched(Object.keys(formErrors).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
                                                                                                return formErrors;
                                                                                            })}
                                                                                        />
                                                                                    </Elements>
                                                                                )}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <button
                                                                className="bg-blue text-white font-bold w-100 py-3 px-4 rounded w-full my-3"
                                                                onClick={() => setIsModalOpen(true)}
                                                                disabled={!values.acknowledge}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>
                                        ) : (
                                            //{/* Conditionally render the Pay Deposite form */}
                                            <Formik
                                                initialValues={{
                                                    firstName: '',
                                                    lastName: '',
                                                    country: '',
                                                    streetAddress: '',
                                                    flat: '',
                                                    city: '',
                                                    county: '',
                                                    postcode: '',
                                                    email: '',
                                                    phoneNumber: '',
                                                    acknowledge: false,
                                                    toPayAmount: toPayAmount,
                                                    futurePayAmount: futurePayAmount,
                                                }}
                                                validationSchema={checkoutValidation}
                                                // onSubmit={async (values, { resetForm }) => {
                                                //     console.log(values);
                                                // }}
                                                onSubmit={(values, { resetForm }) => {
                                                    const checkoutData = {
                                                        ...values,
                                                        toPayAmount: toPayAmount,
                                                        futurePayAmount: futurePayAmount,
                                                    };
                                                    console.log("checkoutData", checkoutData);
                                                    handleCheckoutStripe(
                                                        checkoutData.firstName,
                                                        checkoutData.lastName,
                                                        checkoutData.email,
                                                        checkoutData.phoneNumber,
                                                        checkoutData.county
                                                    );
                                                }}
                                            >
                                                {({
                                                    values,
                                                    errors,
                                                    touched,
                                                    handleChange,
                                                    handleBlur,
                                                    handleSubmit,
                                                    isSubmitting,
                                                    validateForm,
                                                    isValid,
                                                    setTouched,
                                                    dirty,
                                                    setFieldValue
                                                }) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <FormObserver />
                                                        <div className="grid md:grid-cols-3 gap-4">
                                                            <div className='form-head'>
                                                                <h4 className="text-xl font-bold text-gray-800 mt-1">Billing Details</h4>
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>First name*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="firstName"
                                                                        placeholder="First name*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.firstName}
                                                                    />
                                                                    {errors.firstName && touched.firstName && <small className="text-red-500">{errors.firstName}</small>}
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Last name*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="lastName"
                                                                        placeholder="Last name*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.lastName}
                                                                    />
                                                                    {errors.lastName && touched.lastName && <small className="text-red-500">{errors.lastName}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Email address*</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        placeholder="Email address*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.email}
                                                                    />
                                                                    {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Phone number*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="phoneNumber"
                                                                        maxLength={10}
                                                                        placeholder="Phone number*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.phoneNumber}
                                                                    />
                                                                    {errors.phoneNumber && touched.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Flat, suite, unit*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="flat"
                                                                        placeholder="Flat, suite, unit*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.flat}
                                                                    />
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Street address*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="streetAddress"
                                                                        placeholder="Street address*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.streetAddress}
                                                                    />
                                                                    {errors.streetAddress && touched.streetAddress && <small className="text-red-500">{errors.streetAddress}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Town / City*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="city"
                                                                        placeholder="Town / City*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.city}
                                                                    />
                                                                    {errors.city && touched.city && <small className="text-red-500">{errors.city}</small>}
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Postcode*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="postcode"
                                                                        placeholder="Postcode*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.postcode}
                                                                    />
                                                                    {errors.postcode && touched.postcode && <small className="text-red-500">{errors.postcode}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label>County*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="county"
                                                                        placeholder="County*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.county}
                                                                    />
                                                                    {errors.county && touched.county && <small className="text-red-500">{errors.county}</small>}
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Country/Region*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="country"
                                                                        placeholder="Country/Region*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.country}
                                                                    />
                                                                    {errors.country && touched.country && <small className="text-red-500">{errors.country}</small>}
                                                                </div>
                                                            </div>

                                                            <div className="form-row py-3 px-3 payDeposite_mode_field rounded">
                                                                <div className="form-group col-md-6">
                                                                    <label>To Pay*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="toPayAmount"
                                                                        placeholder="To Pay*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onBlur={handleBlur}
                                                                        value={toPayAmount}
                                                                        readOnly
                                                                    />
                                                                    {errors.toPayAmount && touched.toPayAmount && <small className="text-red-500">{errors.toPayAmount}</small>}
                                                                </div>

                                                                <div className="form-group col-md-6">
                                                                    <label>Futuer Pay*</label>
                                                                    <input
                                                                        type="text"
                                                                        name="futurePayAmount"
                                                                        placeholder="Future Pay*"
                                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={futurePayAmount}
                                                                        readOnly
                                                                    />
                                                                    {errors.futurePayAmount && touched.futurePayAmount && <small className="text-red-500">{errors.futurePayAmount}</small>}
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <span><strong>Note:</strong> You can pay 45% of the total amount (<b>£&nbsp;</b>{(totalPrice * 1.1).toFixed(2)}) upfront, with the remaining 55% payable before the course begins.</span>
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <div className="checkout_paymentMethod">
                                                                        <button className="btn btn-md btn-orange py-2 px-4 rounded m-2" onClick={handleBuyNowClick} >
                                                                            Pay Full Payment
                                                                        </button>

                                                                        <button className="btn btn-md btn-orange py-2 px-4 rounded m-2" onClick={handlePayDepositClick}>
                                                                            Pay 45% Deposite
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <div className="form-check">
                                                                        <label className="flex items-start space-x-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                name="acknowledge"
                                                                                className="form-checkbox mr-3 h-5 w-5 text-blue-600"
                                                                                onChange={(e) => {
                                                                                    handleChange(e);
                                                                                    if (
                                                                                        values.firstName.trim() !== "" &&
                                                                                        values.lastName.trim() !== "" &&
                                                                                        values.email.trim() !== "" &&
                                                                                        String(values.phoneNumber).trim() !== "" &&
                                                                                        values.county.trim() !== "" &&
                                                                                        e.target.checked
                                                                                    ) {
                                                                                        handleCheckoutStripe(values.firstName, values.lastName, values.email, values.phoneNumber, values.county);
                                                                                    }
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                                checked={values.acknowledge}
                                                                            /> I acknowledge that by downloading/accessing the [GE700, XA6, GE706, GT700, PRINCE2 MANUAL or any other related resources] within 14 days from the date of the Course Acceptance Confirmation, I lose the right to change my mind under the Consumer Contract Regulations.
                                                                        </label>
                                                                        {errors.acknowledge && touched.acknowledge && <small className="text-red-500">{errors.acknowledge}</small>}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-md-12  pt-3 mt-3">
                                                                    <label>Payment Method</label>
                                                                    <img src={cardsImage} alt="Accepted Payment Methods" className="checkoutPaymentPic" />
                                                                </div>
                                                            </div>


                                                            {/* Modal Component */}
                                                            {isModalOpen && (
                                                                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="paymentModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                {/* {loading === true ? <Loader /> : ''} */}
                                                                                <h5 className="modal-title" id="paymentModalLabel">Payment Method</h5>
                                                                                <button type="button" className="close" onClick={() => setIsModalOpen(false)} aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                {clientSecret && (
                                                                                    <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                                                                                        <CheckoutForm
                                                                                            cart={cart}
                                                                                            formvalues={formvalues}
                                                                                            paydepositeValue={paydepositeValue}
                                                                                            dpmCheckerLink={dpmCheckerLink}
                                                                                            isFormValid={isValid}
                                                                                            isDirty={dirty}
                                                                                            triggerValidation={() => validateForm().then((formErrors) => {
                                                                                                setTouched(Object.keys(formErrors).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
                                                                                                return formErrors;
                                                                                            })}
                                                                                        />
                                                                                    </Elements>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <button
                                                                className="bg-blue text-white font-bold w-100 py-3 px-4 rounded w-full my-3"
                                                                onClick={() => setIsModalOpen(true)}
                                                                disabled={!values.acknowledge}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-4 order-md-2 mb-4">



                            {isBuyNowSelected ? (
                                <div className="bg-white rounded-lg shadow-md p-6 sc__cart_sidebar">
                                    <h2 className="text-md font-semibold mb-4">Your Order</h2>

                                    <div className="row mb-2">
                                        <h6 className="font-semibold text-gray-800 mb-4">Coures Name</h6>
                                        {cart.map((item, index) => (
                                            <div key={index} className="checkout_course_listing flex items-center">
                                                <div className="checkout_course_item">
                                                    <p className="text-gray-700">
                                                        {item.course_title} × {item.quantity}
                                                    </p>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    <hr className="my-3" />
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>VAT</span>
                                        <span><b>£&nbsp;</b>{(totalPrice * 0.1).toFixed(2)}</span>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold"><b>£&nbsp;</b>{(totalPrice * 1.1).toFixed(2)}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-md p-6 sc__cart_sidebar">
                                    <h2 className="text-md font-semibold mb-4">Your Order</h2>

                                    <div className="row mb-2">
                                        <h6 className="font-semibold text-gray-800 mb-4">Coures Name</h6>
                                        {cart.map((item, index) => (
                                            <div key={index} className="checkout_course_listing flex items-center">
                                                <div className="checkout_course_item">
                                                    <p className="text-gray-700">
                                                        {item.course_title} × {item.quantity}
                                                    </p>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    <hr className="my-3" />
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>VAT</span>
                                        <span><b>£&nbsp;</b>{(totalPrice * 0.1).toFixed(2)}</span>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold"><b>£&nbsp;</b>{(totalPrice * 1.1).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">To Pay</span>
                                        <span className="font-semibold"><b>£&nbsp;</b>{toPayAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Future Pay</span>
                                        <span className="font-semibold"><b>£&nbsp;</b>{futurePayAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout
