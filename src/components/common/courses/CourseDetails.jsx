import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from "../../../components/common/Loader";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

const CourseDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { course } = location.state || {};
    
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState({ courseInfo: false, additionalInfo: false, reviews: false });


    if (!course) {
        return <p>No course details available!</p>;
    }
    console.log('course in detail page---',course)
 /***********************************************************************/

    /**
     * Handle toggle
     * 
     */
    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
 /***********************************************************************/

    return (
        <>
            {loading && <Loader />}
            <Header />
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                <h1 className="h3 mb-3 font-weight-normal text-center">Course Details</h1>
                    <div className="container mx-auto p-0">
                        {/* Main Content */}
                        <div className="flex flex-col md:flex-row justify-between">
                            {/* Image Section */}
                            <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                                <div
                                    className="relative"
                                    style={{ width: '450px', height: '350px' }}
                                >
                                    <img
                                        src={course.course_image}
                                        alt="Course Logo"
                                        className="w-full h-full object-cover"
                                        decoding="async"
                                        fetchpriority="high"
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="md:w-1/2 ml-4">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.course_title} | {course.course_format}</h1>
                                {/* <p className="text-xl text-purple-600 mb-4">£{course.regular_price}.00 + VAT</p> */}
                                <h3 className="text-lg font-bold">
                                    <span className="woocommerce-Price-amount text-xl text-purple-600 mb-4">
                                        {course.sale_price ? (
                                            <>
                                                <bdi>
                                                    <span className="woocommerce-Price-currencySymbol">£</span>
                                                    {/* <span className="line-through-thick">{course.regular_price}</span> */}
                                                    <span style={{ textDecoration: 'line-through' }}>{course.regular_price}</span>
                                                </bdi>
                                                <bdi className="ml-2">
                                                    <span className="woocommerce-Price-currencySymbol">£</span>
                                                    {course.sale_price}
                                                </bdi>
                                            </>
                                        ) : (
                                            <>
                                                <bdi>
                                                    <span className="woocommerce-Price-currencySymbol">£</span>
                                                    {course.regular_price}
                                                </bdi>
                                            </>
                                        )}
                                    </span>
                                    <small className="text-gray-600"> + {course.vat || 0}% VAT</small>
                                </h3>
                                <p className="text-sm text-red-500 mb-2">Only {course.enrollment_capacity} left in stock</p>

                                {/* Add to Cart Button */}
                                <div className="mb-4">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
                                        Add to Cart
                                    </button>
                                </div>

                                {/* PayPal Button */}
                                <div className="mb-4">
                                    <button className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-md">
                                        PayPal
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Accordion Sections */}
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2">
                                <button
                                    className="accordion-button d-flex justify-content-between items-center cursor-pointer mt-2 border-b bg-primary w-full"
                                    onClick={() => toggleSection('courseInfo')}
                                >
                                    <h1 className="text-xl font-semibold m-1">Course Information</h1>
                                    <div className="accordion-header-icon">▼</div>
                                </button>
                                {isOpen.courseInfo && (
                                    <div className="accordion-content bg-blue-100">
                                        {course.course_information ? course.course_information : "Currently, no course information is available for this course."}
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-1/2 px-2">
                                <button
                                    className="accordion-button flex justify-between items-center cursor-pointer mt-2  border-b bg-primary"
                                    onClick={() => toggleSection('additionalInfo')}
                                >
                                    <h1 className="text-xl font-semibold m-1">Additional Information</h1>
                                    <div className="accordion-header-icon">▼</div>
                                </button>
                                {isOpen.additionalInfo && (
                                    <div className="accordion-content bg-blue-100">
                                        {course.additional_information ? course.additional_information : "Currently, no additional information is available for this course."}
                                    </div>
                                )}
                            </div>

                            {/* <div className="w-full md:w-1/2 px-2">
                        <button
                            className="accordion-button flex justify-between items-center cursor-pointer mt-2  border-b bg-primary"
                            onClick={() => toggleSection('reviews')}
                        >
                            <h1 className="text-xl font-semibold">Reviews ({course.course_reviews}||0)</h1>
                            <div className="accordion-header-icon">▼</div>
                        </button>
                        {isOpen.reviews && (
                            <div className="accordion-content bg-blue-100">{course.course_reviews} || 'No reviews yet.'</div>
                        )}
                    </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CourseDetails;
