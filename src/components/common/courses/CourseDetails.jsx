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
    const today = new Date();

    const { course } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState({ courseInfo: false, additionalInfo: false, Completing_the_course: false, Why_cst_training: false });
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
            Completing_the_course: section === 'Completing_the_course' ? !prevState.Completing_the_course : false,
            Why_cst_training: section === 'Why_cst_training' ? !prevState.Why_cst_training : false,
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // 'en-GB' will give date format as dd/mm/yyyy
    };
    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            {loading && <Loader />}
            <Header />
            <>
                <section className="page_banner_wrapper pb-25">
                    <div className="banner-bg">
                        <img src={bannerBg} alt="" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12  pt-40">
                                <div className="pb-25 ">
                                    {/* <h1 className="pb-15">
                                        {course.course_title}| {course.start_date} | {course.course_format}
                                    </h1> */}
                                    <h1 className="pb-15">
                                        {course.course_title} | {
                                            course.course_schedule_dates
                                                .map(dateString => new Date(dateString))
                                                .find(date => date >= today)
                                                ?.toLocaleDateString('en-GB')
                                                .split('/')
                                                .join('-') || 'No upcoming date available'
                                        } | {course.course_format}
                                    </h1>
                                    <p>
                                        Online Monday to Friday, Day Release &amp; Weekend Courses Are
                                        Available
                                    </p>
                                </div>{" "}

                            </div>
                        </div>
                    </div>
                </section>
                <section className="page_section course_fullInfo_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                {/* <h3 className="pb-30">
                                    {course.course_title} | {course.start_date} | {course.course_format}
                                </h3> */}
                                <h3 className="pb-30">
                                    {course.course_title} | {
                                        course.course_schedule_dates
                                            .map(dateString => new Date(dateString))
                                            .find(date => date >= today)
                                            ?.toLocaleDateString('en-GB')
                                            .split('/')
                                            .join('-') || 'No upcoming date available'
                                    } | {course.course_format}
                                </h3>
                                <div className="row">
                                    <div className="col-lg-12 pb-20">
                                        <div className="class_date_calendar">
                                            <div className="calendar_icon">
                                                <img src={Icons_calendar_outline} alt="" />
                                            </div>
                                            {/* <ul className="class_date">
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
                                            </ul> */}
                                            <ul className="class_date">
                                                {course && course.course_schedule_dates && course.course_schedule_dates.length > 0 ? (
                                                    course.course_schedule_dates.map((date, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <span>Day {index + 1} </span>
                                                                {formatDate(date)}
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <li>Dates for this course are coming soon. Please check back later.</li>
                                                )}
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
                            </div>
                            <div className="col-lg-6 pb-10">
                                <div className="section-thumbnail">
                                    <img src={course.course_image || EmptyImage} alt="" />
                                </div>{" "}

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
                                                        <div dangerouslySetInnerHTML={{ __html: course.course_information }} />
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
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: (course.additional_information || "Currently, no additional information is available for this course.").replace(/\n/g, '<br />')
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link btn-block text-left collapsed"
                                                            onClick={() => toggleSection('Completing_the_course')}
                                                        >
                                                            Completing the course
                                                        </button>
                                                    </h2>
                                                </div>
                                                {isOpen.Completing_the_course && (
                                                    <div className="card-body">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet nulla quis vehicula congue. Etiam non ultrices eros. Pellentesque volutpat enim vitae purus feugiat, at dictum tortor varius. Praesent eleifend arcu vel turpis lobortis iaculis. Phasellus hendrerit vel sem nec varius. Suspendisse sed elementum massa. Suspendisse euismod nisi eu elementum venenatis. Vivamus euismod id dolor sit amet pretium. Mauris maximus bibendum lorem non commodo. Ut sed quam a urna fringilla vulputate. Aliquam non mi finibus, rhoncus sapien non, accumsan enim. Phasellus gravida neque ac neque vestibulum vestibulum non eget libero. Donec urna lorem, tempor non suscipit in, fringilla et ante. Vestibulum iaculis purus et bibendum dictum. Vestibulum gravida sem at tortor aliquet suscipit.</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link btn-block text-left collapsed"
                                                            onClick={() => toggleSection('Why_cst_training')}
                                                        >
                                                            Why use cst Training
                                                        </button>
                                                    </h2>
                                                </div>
                                                {isOpen.Why_cst_training && (
                                                    <div className="card-body">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet nulla quis vehicula congue. Etiam non ultrices eros. Pellentesque volutpat enim vitae purus feugiat, at dictum tortor varius. Praesent eleifend arcu vel turpis lobortis iaculis. Phasellus hendrerit vel sem nec varius. Suspendisse sed elementum massa. Suspendisse euismod nisi eu elementum venenatis. Vivamus euismod id dolor sit amet pretium. Mauris maximus bibendum lorem non commodo. Ut sed quam a urna fringilla vulputate. Aliquam non mi finibus, rhoncus sapien non, accumsan enim. Phasellus gravida neque ac neque vestibulum vestibulum non eget libero. Donec urna lorem, tempor non suscipit in, fringilla et ante. Vestibulum iaculis purus et bibendum dictum. Vestibulum gravida sem at tortor aliquet suscipit.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

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
