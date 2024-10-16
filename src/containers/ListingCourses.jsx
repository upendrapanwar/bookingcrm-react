import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';

const CourseListing = () => {

    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
        console.log('test');
    }, []);
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle to get courses
     * 
     */
    const getCourses = () => {
        axios
            .get("admin/get_course")
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    console.log('Courses-----',response)
                    setCourses(response.data.data);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 3000 });
                }
            })
            .finally(() => {
                setTimeout(() => {
                    // setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            <Header />
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                <div className="container mx-auto mt-8">
                                {courses.length > 0 ? (
                                    courses.map((course) => (
                                        <div className="product_list_rows flex flex-col md:flex-row items-start md:items-center justify-between border p-4 rounded-lg shadow-lg mb-4">
                                        <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
                                            <img
                                                width="300"
                                                height="300"
                                                src="https://fullstacksmsts.co.uk/wp-content/uploads/2024/06/citb-HSA-construction-logo-300x300.png"
                                                alt="HSA Course"
                                                className="w-full h-auto"
                                                decoding="async"
                                                fetchpriority="high"
                                            />
                                        </div>
                            
                                        {/* Product Information */}
                                        <div className="pr_col product-info md:w-7/12 space-y-2 flex-shrink-0">
                                            <h2 className="text-xl font-semibold">{course.course_title} 
                                                {/* | 26-06-2024 */}
                                                | {course.course_format}</h2>
                                            <h3 className="text-lg font-bold">
                                                <span className="woocommerce-Price-amount">
                                                    <bdi>
                                                        <span className="woocommerce-Price-currencySymbol">£</span>{course.regular_price}
                                                    </bdi>
                                                </span>
                                                <small className="text-gray-600"> +{course.vat}% VAT</small>
                                            </h3>
                                            <div className="product-other-detail">
                                                <ul className="list-disc ml-5 space-y-1">
                                                    <li>{course.availability}</li>
                                                    {/* <li>1 Day</li>
                                                    <li>08:30 AM - 5.00 PM</li> */}
                                                    <li>{course.course_format}</li>
                                                </ul>
                                            </div>
                                        </div>
                            
                                        {/* Product Stock Quantity */}
                                        {/* <div className="pr_col product-stock-quantity md:w-1/6 text-center">
                                            <strong className="text-lg font-bold">Places Available</strong><br />
                                            <span>15 Places Available</span> 
                                        </div> */}
                            
                                        {/* Product Buttons */}
                                        <div className="pr_col product-btns md:w-3/12 text-right flex-shrink-0">
                                            <div className="pr-btns space-y-2">
                                                <a
                                                    href="#"
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 block text-center"
                                                >
                                                    Add to cart
                                                </a>
                                                <a
                                                    href="#"
                                                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 block text-center"
                                                >
                                                    More info
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                ) : (
                                    <p className="text-center text-red-600 text-lg font-semibold">
                                        Courses not available at the moment.
                                    </p>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default CourseListing;