import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik } from "formik";
import checkoutValidation from '../../validation-schemas/CheckoutSchema'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import Loader from "../../components/common/Loader";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { toast } from 'react-toastify';

const stripePromise = loadStripe("pk_test_51QKGTWCHTdQvfuyCjb1L0IIPZZrMyeB49Jg7kOdfbYo5C6vcAPM3ZiQNAnViMPpYRhDX0Mr81ThvXty30PXi6bkh00DbyB1Lgr");

const Checkout = () => {

    const cart = useSelector((state) => state.cart.cart || []);
    const totalPrice = cart.reduce((total, item) => total + item.regular_price * item.quantity, 0);
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");


    useEffect(() => {
        handleCheckoutStripe();
    }, []);

    const handleCheckoutStripe = async () => {
        setLoading(true);
        try {
            console.log("use Effect function run");
            const total = (totalPrice * 1.1).toFixed(2);
            let reqBody = {
                'amount': Number(total) * 100,
            };

            console.log("total", total);
            console.log("reqBody", reqBody);

            const response = await axios.post("user/checkoutSession/", reqBody, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            });

            console.log("response", response);
            console.log("url", response.data.data.url);

            if (response.data.status === true) {
                const Data = response.data.data;
                console.log("Data", Data);
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


    const submitOrder = async (values) => {
        try {
            const formData = {
                ...values,
                userId: authInfo.id
            }
            console.log("formData", formData);
            const response = await axios.post(`/placedOrder`, { formData }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${authInfo.token}`
                }
            });
            console.log("response", response);
        } catch (error) {

        } finally {

        }
    };

    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <div className="font-sans bg-white p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
                    </div>

                    <div className="mt-12">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="mt-12">
                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        companyName: '',
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
                                        // Submit the form values here
                                        console.log(values);
                                        await submitOrder(values);
                                        resetForm();
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
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800 mt-1">Billing Details</h3>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                placeholder="First name"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.firstName}
                                                            />
                                                            {errors.firstName && touched.firstName && <small className="text-red-500">{errors.firstName}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                placeholder="Last name"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.lastName}
                                                            />
                                                            {errors.lastName && touched.lastName && <small className="text-red-500">{errors.lastName}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="companyName"
                                                                placeholder="Company name (optional)"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.companyName}
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                placeholder="Country/Region"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.country}
                                                            />
                                                            {errors.country && touched.country && <small className="text-red-500">{errors.country}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="streetAddress"
                                                                placeholder="Street address"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.streetAddress}
                                                            />
                                                            {errors.streetAddress && touched.streetAddress && <small className="text-red-500">{errors.streetAddress}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="flat"
                                                                placeholder="Flat, suite, unit, etc. (optional)"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.flat}
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                placeholder="Town / City"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.city}
                                                            />
                                                            {errors.city && touched.city && <small className="text-red-500">{errors.city}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="county"
                                                                placeholder="County (optional)"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.county}
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="postcode"
                                                                placeholder="Postcode"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.postcode}
                                                            />
                                                            {errors.postcode && touched.postcode && <small className="text-red-500">{errors.postcode}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                placeholder="Email address"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                            />
                                                            {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="number"
                                                                name="phoneNumber"
                                                                placeholder="Phone number"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.phoneNumber}
                                                            />
                                                            {errors.phoneNumber && touched.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
                                                        </div>

                                                        <div className="my-4">
                                                            <label className="flex items-start space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    name="acknowledge"
                                                                    className="form-checkbox mt-1 h-5 w-5 text-blue-600"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    checked={values.acknowledge}
                                                                />
                                                                <span>
                                                                    I acknowledge that by downloading/accessing the [GE700, XA6, GE706, GT700, PRINCE2 MANUAL or any other related resources] within 14 days from the date of the Course Acceptance Confirmation, I lose the right to change my mind under the Consumer Contract Regulations. *
                                                                </span>
                                                            </label>
                                                            {errors.acknowledge && touched.acknowledge && <small className="text-red-500">{errors.acknowledge}</small>}
                                                        </div>

                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-800">Your Order</h3>
                                                            <div class="grid gap-4 sm:grid-cols-2">
                                                                <div class="flex items-center">
                                                                    <div class="grid grid-cols-2 gap-4">
                                                                        <p className="font-semibold text-gray-800">Coures Name</p>
                                                                        {cart.map((item, index) => (
                                                                            <div key={index} className="flex items-center">
                                                                                <div className="grid grid-cols-2 gap-4 w-full">
                                                                                    <div>
                                                                                        <p className="text-gray-700">
                                                                                            {item.course_title} × {item.quantity}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                        <div>
                                                                            <div class="flex justify-between">
                                                                                <span class="font-semibold text-gray-800">Subtotal</span>
                                                                                <span class="text-gray-700"><span>£{totalPrice.toFixed(2)}</span></span>
                                                                            </div>
                                                                            <div class="flex justify-between mt-1">
                                                                                <span class="font-semibold text-gray-800">VAT</span>
                                                                                <span class="text-gray-700">£{(totalPrice * 0.1).toFixed(2)}</span>
                                                                            </div>
                                                                            <div class="flex justify-between mt-1 font-semibold text-gray-800">
                                                                                <span>Total</span>
                                                                                <span>£{(totalPrice * 1.1).toFixed(2)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {clientSecret && (
                                                            <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise} >

                                                                <CheckoutForm
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
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout
