import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik } from "formik";
import checkoutValidation from '../../validation-schemas/CheckoutSchema'
import { useSelector } from 'react-redux';



const Checkout = () => {
    const cart = useSelector((state) => state.cart.cart || []);
    const totalPrice = cart.reduce((total, item) => total + item.regular_price * item.quantity, 0);


    const handleSubmit = async(values) => {
        console.log("values",values);
    }


    return (
        <>
            <Header />
            <div class="font-sans bg-white p-4">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center">
                        <h2 class="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
                    </div>

                    <div class="mt-12">
                        <div class="grid md:grid-cols-3 gap-4">
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
                                        cardNumber: '',
                                        expiryDate: '',
                                        cvv: ''
                                    }}
                                    validationSchema={checkoutValidation}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, { resetForm });
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting
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

                                                        {/* Additional Fields */}
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
                                                        {/* <div>
                                                            <select name="" id="" className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none">

                                                            </select>
                                                        </div> */}

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
                                                                        <p className="font-semibold text-gray-800">Product</p>
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

                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-800">Payment Details</h3>
                                                            <div class="grid gap-4 sm:grid-cols-2">
                                                                <div class="flex items-center">
                                                                    <input type="radio" class="w-5 h-5 cursor-pointer" id="card" checked />
                                                                    <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                                                                        <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                                                                        <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                                                                        <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                                                                    </label>
                                                                </div>

                                                                {/* <div class="flex items-center">
                                                                    <input type="radio" class="w-5 h-5 cursor-pointer" id="paypal" />
                                                                    <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                                                                        <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
                                                                    </label>
                                                                </div> */}
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="cardNumber"
                                                                placeholder="Card number"
                                                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.cardNumber}
                                                            />
                                                            {errors.cardNumber && touched.cardNumber && <small className="text-red-500">{errors.cardNumber}</small>}
                                                        </div>

                                                        <div className="grid sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    name="expiryDate"
                                                                    placeholder="Expiration date (MM/YY)"
                                                                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.expiryDate}
                                                                />
                                                                {errors.expiryDate && touched.expiryDate && <small className="text-red-500">{errors.expiryDate}</small>}
                                                            </div>

                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    name="cvv"
                                                                    placeholder="CVV"
                                                                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.cvv}
                                                                />
                                                                {errors.cvv && touched.cvv && <small className="text-red-500">{errors.cvv}</small>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold text-lg rounded-md disabled:bg-gray-400"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? 'Processing...' : 'Submit'}
                                                    </button>
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