import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from "../../../components/common/Loader";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import bannerBg from '../../../assets/images/page-banner-bg.jpg';
import icon_hours from '../../../assets/images/Icons/24-hours.png';
import icon_course from '../../../assets/images/Icons/course.png';
import icons_test_results from '../../../assets/images/Icons/test-results.png';
import image_smsts from '../../../assets/images/SMSTS-1024x594.jpg';
import EmptyImage from "../../../assets/images/EmptyImage.png";
import Icons_calendar_outline from '../../../assets/images/Icons/calendar-outline.png';

const CourseDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { course } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState({ courseInfo: false, additionalInfo: false, reviews: false });
    const [activeIndex, setActiveIndex] = useState(null);


    if (!course) {
        return <p>No course details available!</p>;
    }
    console.log('course in detail page---', course)
    /***********************************************************************/

    /**
     * Handle toggle
     * 
     */
    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
            courseInfo: section === 'courseInfo' ? !prevState.courseInfo : false,
            reviews: section === 'reviews' ? !prevState.reviews : false,
            additionalInfo: section === 'additionalInfo' ? !prevState.additionalInfo : false,
        }));
    };
    /***********************************************************************/

    /**
    * Handle to toggleAccordion
    * 
    */
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    /***********************************************************************/
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
            {/* ****************************************************************************** */}


            <>
                <section className="page_banner_wrapper pb-25">
                    <div className="banner-bg">
                        <img src={bannerBg} alt="" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12  pt-40">
                                <div className="pb-25 ">
                                    <h1 className="pb-15">
                                        {course.course_title}| {course.start_date} | {course.course_format}
                                    </h1>
                                    <p>
                                        Online Monday to Friday, Day Release &amp; Weekend Courses Are
                                        Available
                                    </p>
                                </div>{" "}
                                {/* section-title */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page_section course_fullInfo_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3 className="pb-30">
                                    {course.course_title} | {course.start_date} | {course.course_format}
                                </h3>
                                <div className="row">
                                    <div className="col-lg-12 pb-20">
                                        <div className="class_date_calendar">
                                            <div className="calendar_icon">
                                                <img src={Icons_calendar_outline} alt="" />
                                            </div>
                                            <ul className="class_date">
                                                <li>
                                                    <span>Day 1 </span> 28-10-24
                                                </li>
                                                <li>
                                                    <span>Day 2 </span> 29-10-24
                                                </li>
                                                <li>
                                                    <span>Day 3 </span> 30-10-24
                                                </li>
                                                <li>
                                                    <span>Day 4 </span> 31-10-24
                                                </li>
                                                <li>
                                                    <span>Day 5 </span> 01-11-24
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12  pb-20">
                                        <div className="class_type">
                                            <ul>
                                                <li>
                                                    <span>
                                                        <img src={icon_course} alt="" />
                                                    </span>
                                                    {course.course_format}
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src={icon_hours} alt="" />
                                                    </span>{" "}
                                                    {course.course_time}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12  pb-20">
                                        <div className="class_type result_info">
                                            <ul>
                                                <li>
                                                    <span>
                                                        <img src={icons_test_results} alt="" />
                                                    </span>{" "}
                                                    Free Same Day Resit if Eligible
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <a href="#" className="btn btn-md btn-primary">
                                            Add to Basket
                                        </a>
                                    </div>
                                </div>{" "}
                                {/* section-title */}
                            </div>
                            <div className="col-lg-6 pb-10">
                                <div className="section-thumbnail">
                                    <img src={course.course_image || EmptyImage} alt="" />
                                </div>{" "}
                                {/* section-title */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page_section bg-blue course_detail_accordian">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 pb-10">
                                <div className="section-title text-center pb-40 section-title-white">
                                    <h3>More Information About The Course</h3>
                                </div>
                                <div className="product_accordian_wrap">
                                    <div className="accordion" id="ProductAccordion">




                                    <div>
            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">
                        <button
                            className="btn btn-link btn-block text-left collapsed"
                            onClick={() => toggleSection('courseInfo')}
                        >
                            Course Info
                        </button>
                    </h2>
                </div>
                {isOpen.courseInfo && (
                    <div className="card-body">
                        <p>Course Name – SMSTS-Monday-To-Friday</p>
                        <p>Location – Remote</p>
                        <p>Free same day resit if eligible</p>
                        <p>Start Time – 08:30</p>
                        <p>End Time – 17:00</p>
                        <p>Day 1 – 28/10/2024</p>
                        <p>Day 2 – 29/10/2024</p>
                        <p>Day 3 – 30/10/2024</p>
                        <p>Day 4 – 31/10/2024</p>
                        <p>Day 5 – 01/11/2024</p>
                    </div>
                )}
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">
                        <button
                            className="btn btn-link btn-block text-left collapsed"
                            onClick={() => toggleSection('reviews')}
                        >
                            Reviews
                        </button>
                    </h2>
                </div>
                {isOpen.reviews && (
                    <div className="card-body">
                        <p>Review content goes here.</p>
                    </div>
                )}
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">
                        <button
                            className="btn btn-link btn-block text-left collapsed"
                            onClick={() => toggleSection('additionalInfo')}
                        >
                            Additional Info
                        </button>
                    </h2>
                </div>
                {isOpen.additionalInfo && (
                    <div className="card-body">
                        <p>Additional information goes here.</p>
                    </div>
                )}
            </div>
        </div>




                                        {/* <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h2 className="mb-0">
                                                    <a
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo"
                                                    >
                                                        Additional Information
                                                    </a>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="collapse"
                                                aria-labelledby="headingTwo"
                                                data-parent="#ProductAccordion"
                                            >
                                                <div className="card-body">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Mauris imperdiet nulla quis vehicula congue. Etiam non
                                                        ultrices eros. Pellentesque volutpat enim vitae purus
                                                        feugiat, at dictum tortor varius. Praesent eleifend arcu
                                                        vel turpis lobortis iaculis. Phasellus hendrerit vel sem
                                                        nec varius. Suspendisse sed elementum massa. Suspendisse
                                                        euismod nisi eu elementum venenatis. Vivamus euismod id
                                                        dolor sit amet pretium. Mauris maximus bibendum lorem non
                                                        commodo. Ut sed quam a urna fringilla vulputate. Aliquam
                                                        non mi finibus, rhoncus sapien non, accumsan enim.
                                                        Phasellus gravida neque ac neque vestibulum vestibulum non
                                                        eget libero. Donec urna lorem, tempor non suscipit in,
                                                        fringilla et ante. Vestibulum iaculis purus et bibendum
                                                        dictum. Vestibulum gravida sem at tortor aliquet suscipit.
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}





                                        {/* <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h2 className="mb-0">
                                                    <a
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseThree"
                                                        aria-expanded="false"
                                                        aria-controls="collapseThree"
                                                    >
                                                        Completing The Course
                                                    </a>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                className="collapse"
                                                aria-labelledby="headingThree"
                                                data-parent="#ProductAccordion"
                                            >
                                                <div className="card-body">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Mauris imperdiet nulla quis vehicula congue. Etiam non
                                                        ultrices eros. Pellentesque volutpat enim vitae purus
                                                        feugiat, at dictum tortor varius. Praesent eleifend arcu
                                                        vel turpis lobortis iaculis. Phasellus hendrerit vel sem
                                                        nec varius. Suspendisse sed elementum massa. Suspendisse
                                                        euismod nisi eu elementum venenatis. Vivamus euismod id
                                                        dolor sit amet pretium. Mauris maximus bibendum lorem non
                                                        commodo. Ut sed quam a urna fringilla vulputate. Aliquam
                                                        non mi finibus, rhoncus sapien non, accumsan enim.
                                                        Phasellus gravida neque ac neque vestibulum vestibulum non
                                                        eget libero. Donec urna lorem, tempor non suscipit in,
                                                        fringilla et ante. Vestibulum iaculis purus et bibendum
                                                        dictum. Vestibulum gravida sem at tortor aliquet suscipit.
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}




                                        {/* <div className="card">
                                            <div className="card-header" id="headingforth">
                                                <h2 className="mb-0">
                                                    <a
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseforth"
                                                        aria-expanded="false"
                                                        aria-controls="collapseforth"
                                                    >
                                                        Why Use CST Training
                                                    </a>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseforth"
                                                className="collapse"
                                                aria-labelledby="headingforth"
                                                data-parent="#ProductAccordion"
                                            >
                                                <div className="card-body">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Mauris imperdiet nulla quis vehicula congue. Etiam non
                                                        ultrices eros. Pellentesque volutpat enim vitae purus
                                                        feugiat, at dictum tortor varius. Praesent eleifend arcu
                                                        vel turpis lobortis iaculis. Phasellus hendrerit vel sem
                                                        nec varius. Suspendisse sed elementum massa. Suspendisse
                                                        euismod nisi eu elementum venenatis. Vivamus euismod id
                                                        dolor sit amet pretium. Mauris maximus bibendum lorem non
                                                        commodo. Ut sed quam a urna fringilla vulputate. Aliquam
                                                        non mi finibus, rhoncus sapien non, accumsan enim.
                                                        Phasellus gravida neque ac neque vestibulum vestibulum non
                                                        eget libero. Donec urna lorem, tempor non suscipit in,
                                                        fringilla et ante. Vestibulum iaculis purus et bibendum
                                                        dictum. Vestibulum gravida sem at tortor aliquet suscipit.
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="front_section bg-orange needhelp_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 pb-25">
                                <div className="section-title text-center pb-30">
                                    <h2 className="pb-10">Need help?</h2>
                                    <p className="pb-20">
                                        Call us to discuss, ask questions, or book your course in person.
                                    </p>
                                    <a className="btn btn-md btn-white" href="#">
                                        Get in touch
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>







            <Footer />
        </>
    );
};

export default CourseDetails;
