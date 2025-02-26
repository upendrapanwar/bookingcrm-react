import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Loader from "../../../components/common/Loader";
import Sidebar from '../../../components/admin/Sidebar';



const OrderMoreInformation = () => {

    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get('id');
   // const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const [loading, setLoading] = useState([false]);
    const [order, setOrder] = useState('')
   
    console.log('order---', order)
    /***********************************************************************/

    useEffect(() => {
        console.log("TEST");
        getorder();
    }, []);

    /***********************************************************************/
    /***********************************************************************/

    /**
    * Handle image size
    * 
    */
    const getorder = (e) => {
        setLoading(true);
        console.log('getorder-----');
        axios
            .get(`admin/get_order_byId/${orderId}`)
            .then((response) => {
                // toast.dismiss();
                console.log('response of order---', response)
                if (response.data.status) {
                    setOrder(response.data.data);
                    // toast.success(response.data.message, { autoClose: 3000 });


                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 admin-main-container">
                    <main>
                        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-full mb-1">
                                <div className="mb-4">
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Order Details</h1>
                                </div>
                            </div>
                            <div className="sm:flex">
                                <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                                        onClick={() => navigate(-1)}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        Back
                                    </button>

                                </div>
                            </div>
                        </div>
                        <section className="product_wrapper front_product_section columns-1 pb-25 pt-0">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="container mt-5">
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="d-flex justify-content-start align-items-center mb-4">
                                                        <h4 className="text-primary">Order Id :</h4> <h5 className="ps-2"> {order._id || ""}</h5>
                                                    </div>


                                                    <div className="w-full p-6 bg-white rounded-lg shadow-md">
                                                        <div className="row">

                                                            <div className="col-md-12 mb-4">
                                                                <h5 className="text-primary">Payment Data</h5>
                                                                <div className="row border p-3 rounded">

                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Payment Intent ID:</strong> <span>{order.paymentIntentId}</span></p>
                                                                    </div>


                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Payment Status:</strong> <span className={order.paymentStatus === 'succeeded' ? 'text-success' : 'text-danger'}>{order.paymentStatus}</span></p>
                                                                    </div>


                                                                    <div className="col-md-6 mb-3">
                                                                        <p>
                                                                            <strong>Amount: </strong>
                                                                            {order.toPay && order.futurePay
                                                                                ? `${order.amount} (${order.futurePay})`
                                                                                : `${order.amount}`}
                                                                        </p>
                                                                    </div>


                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Order Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Student Data */}
                                                            <div className="col-md-12 mb-4">
                                                                <h5 className="text-primary">Student Data</h5>
                                                                <div className="row border p-3 rounded">

                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Student Name:</strong> {order.studentId ? `${order.studentId.first_name} ${order.studentId.last_name}` : 'N/A'}</p>
                                                                    </div>


                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Email:</strong> {order.studentId ? order.studentId.email : 'N/A'}</p>
                                                                    </div>


                                                                    <div className="col-md-6 mb-3">
                                                                        <p><strong>Phone:</strong> {order.studentId ? order.studentId.phone : 'N/A'}</p>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="col-md-12 mb-4">
                                                                <h5 className="text-primary">Courses</h5>
                                                                <div className="row">
                                                                    {order.courses && order.courses.length > 0 ? (
                                                                        order.courses.map((course, index) => (
                                                                            <div key={index} className="col-md-12 mb-4">
                                                                                <div className="row border p-3 rounded">
                                                                                   
                                                                                    <div className="col-md-3">
                                                                                        <img
                                                                                            src={course.courseId?.course_image}
                                                                                            alt={course.course_title}
                                                                                            className="img-fluid rounded"
                                                                                            style={{ maxHeight: '150px', objectFit: 'cover' }}
                                                                                        />
                                                                                    </div>

                                                                                    
                                                                                    <div className="col-md-6">
                                                                                        <p><strong>Course {index + 1}:</strong> {course.course_title}</p>
                                                                                       
                                                                                        
                                                                                        {course.instructorId ? (
                                                                                            <div>
                                                                                                <p><strong>Instructor:</strong> {course.instructorName}</p>
                                                                                                <p><strong>Instructor Email:</strong> {course.instructoremail}</p>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <p><strong>Instructor:</strong> Not assigned</p>
                                                                                        )}
                                                                                    </div>

                                                                                    
                                                                                    <div className="col-md-3 text-center">
                                                                                        <p><strong>Quantity:</strong> {course.course_quantity}</p>
                                                                                        <p><strong>Price:</strong> ${course.courseId?.regular_price}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="col-md-12 mb-3">
                                                                            <p>No courses associated with this order.</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* <div className="col-md-12 mt-4">
                                                                <div className="d-flex justify-content-end">
                                                                    <button className="btn btn-danger mr-3" onClick={handleDeleteOrder}>Delete Order</button>
                                                                    <button className="btn btn-warning" onClick={handleEditOrder}>Edit Order</button>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderMoreInformation;