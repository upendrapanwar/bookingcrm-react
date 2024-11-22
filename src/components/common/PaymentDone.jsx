import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/reducers/cart-reducer'
import {toast} from "react-toastify";

const PaymentDone = () => {

    const dispatch = useDispatch();
    
    const [message, setMessage] = useState("Verifying payment...");
    const [paymentStatus, setPaymentStatus] = useState(null);


    useEffect(() => {
        // createInvoice();
        // verifyPayment();
        handleClearCart();
    }, [])


    // const createInvoice = async () => {
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const paymentIntentId = queryParams.get("payment_intent");
    //     console.log("paymentIntentId",paymentIntentId)

    //     // if (!paymentIntentId) {
    //     //     setMessage("Invalid payment details.");
    //     //     return;
    //     // }


    //     // try {
    //     //   const response = await axios.post("/create-invoice",{paymentIntentId}, 
    //     //     {
    //     //       headers: {
    //     //         "Content-Type": "application/json",
    //     //       }
    //     //     }
    //     //   );
      
    //     //   // If the request is successful
    //     //   console.log("Invoice created successfully:", response);
    //     // } catch (err) {
    //     //   // Handle error
    //     //   console.error("Error creating invoice:", err);
    //     //   toast.error("Invoice creation failed.");
    //     // }
    //   };


    // /verify-payment
    // const verifyPayment = async () => {
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const paymentIntent = queryParams.get("payment_intent");

    //     if (!paymentIntent) {
    //         setMessage("Invalid payment details.");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post("user/verify-payment", 
    //         {payment_intent: paymentIntent},
    //         {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json;charset=UTF-8",
    //             }
    //         });

    //         if (response.data.success) {
    //             console.log("response", response.data.data);
    //             setMessage("Payment successful!");
    //             setPaymentStatus(response.data.paymentIntent);
    //         } else {
    //             setMessage("Payment verification failed.");
    //         }
    //     } catch (error) {
    //         console.error("Error verifying payment:", error);
    //         setMessage("Error verifying payment.");
    //     }
    // };



    const handleClearCart = () => {
        dispatch(clearCart());
    };


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
                                    <p>#12345</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Order Date:</h6>
                                    <p>November 13, 2024</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Customer Name:</h6>
                                    <p>John Doe</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Email:</h6>
                                    <p>johndoe@example.com</p>
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
                                        <tr>
                                            <td>1</td>
                                            <td>Product A</td>
                                            <td>2</td>
                                            <td>$40</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Product B</td>
                                            <td>1</td>
                                            <td>$20</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                            <td><strong>$60</strong></td>
                                        </tr>
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
