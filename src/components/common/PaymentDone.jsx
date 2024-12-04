import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/reducers/cart-reducer'
import { toast } from "react-toastify";

const PaymentDone = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;

    const [message, setMessage] = useState("Verifying payment...");
    const [paymentStatus, setPaymentStatus] = useState(null);

    const [orderDetailsData, setOrderDetailsData] = useState({ courses: [] });
    const totalPrice = orderDetailsData.courses.reduce((total, item) => total + item.regular_price * item.quantity, 0);


    useEffect(() => {
        handleClearCart();
        getOrderDetails(orderDetails);
    }, [])


    const handleClearCart = () => {
        dispatch(clearCart());
    };


    const getOrderDetails = (orderDetails) => {
        axios.get(`user/get-order-details?id=${orderDetails.id}`)
            .then(response => {
                toast.dismiss();
                if (response.data) {
                    console.log('orderDetails---response', response)
                    setOrderDetailsData(response.data.data);
                }
            }).catch(error => {
                toast.dismiss();
                if (error.response) {
                    toast.error('Data is not available', { position: "top-center", autoClose: 3000 });
                }
            });
    };

    console.log('orderDetailsData', orderDetailsData)
    return (
        <>
            <Header />
            <div className="bg-gray-100">
                <div className="container py-3">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center mb-4">Payment Done!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.<br />Have a great day!  </p>

                    </div>


                    <div className="card mt-5 sv__tankyou_orderDetails">
                        <div className="card-header text-white">
                            <h5 className="mb-0 text-white">Order Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Order ID:</h6>
                                    <p>{orderDetailsData.id}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Order Date:</h6>
                                    {/* //  <p>{orderDetails.createdAt}</p> */}
                                    <p>{new Date(orderDetailsData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Customer Name:</h6>
                                    <p>{orderDetailsData.firstName}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Email:</h6>
                                    <p>{orderDetailsData.email}</p>
                                </div>
                            </div>
                            <hr />
                            <h6 className="mb-3">Items Ordered:</h6>
                            <div className="table-responsive">
                                <table className="table table-striped border rounded">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orderDetailsData.courses.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.course_title}</td>
                                                <td>{item.quantity}</td>

                                                <td>£{item.regular_price * item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                                            {/* <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span> */}
                                            <td><strong><b>£&nbsp;</b>{totalPrice.toFixed(2)}</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-end"><strong>VAT:</strong></td>
                                            {/* <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span> */}
                                            <td><strong><b>£&nbsp;</b>{(totalPrice * 0.1).toFixed(2)}</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                            {/* <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span> */}
                                            <td><strong><b>£&nbsp;</b>{(totalPrice * 1.1).toFixed(2)}</strong></td>
                                        </tr>

                                        {orderDetailsData.toPay && (
                                            <tr>
                                                <td colSpan="3" className="text-end"><strong className="text-end">You have already paid :</strong></td>
                                                <td>
                                                    <strong>
                                                        <b>£&nbsp;</b>{orderDetailsData.toPay.toFixed(2)}
                                                    </strong>
                                                </td>
                                            </tr>
                                        )}
                                        {orderDetailsData.futurePay && (
                                            <tr>
                                                <td colSpan="3" className="text-end"><strong className="text-end">You need to pay the remaining amount of  :</strong></td>
                                                <td>
                                                    <strong><b>£&nbsp;</b>{orderDetailsData.futurePay.toFixed(2)}</strong>
                                                </td>
                                            </tr>
                                        )}
                                        {orderDetailsData.futurePay && orderDetailsData.toPay && (
                                            <tr>
                                                <td colSpan="4" className="text-danger">
                                                    Term & Condition: The remaining amount of
                                                    &nbsp;<strong>
                                                        <b>£&nbsp;</b>{orderDetailsData.futurePay.toFixed(2)}
                                                    </strong> must be paid at least 24 hours before the course starts. Otherwise, the amount of
                                                    &nbsp;<strong className="text-success">
                                                        <b>£&nbsp;</b>{orderDetailsData.toPay.toFixed(2)}
                                                    </strong> already paid will not be refunded.
                                                </td>
                                            </tr>
                                        )}
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-2 mb-3">
                        <Link to="/" className="bg-blue text-white font-bold py-2 px-4 rounded my-3">
                            GO BACK
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PaymentDone
