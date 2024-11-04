import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Loader from "../../../components/common/Loader";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import EmptyImage from "../../../assets/images/EmptyImage.png";
import bannerBg from '../../../assets/images/page-banner-bg.jpg';

const CourseListing = () => {

    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    //console.log('authINFO',authInfo)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    console.log('selectedCourse---',selectedCourse)
    useEffect(() => {
        getCourses();
        console.log('test');
    }, []);
    /***********************************************************************/
    /***********************************************************************/


    /**
     * Handle to get next 3 Months
     * 
     */

    const getNextThreeMonths = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 3; i++) {
            const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            // Get the full month name (e.g., "October")
            months.push({ title: nextMonth.toLocaleString('default', { month: 'long' }) });
        }
        return months;
    };

    const items = getNextThreeMonths();

    /***********************************************************************/
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


    /**
     * Handle to get courses
     * 
     */
    const getCourses = () => {
        setLoading(true);
        axios
            .get("admin/get_course")
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    console.log('Courses-----', response)
                    setCourses(response.data.data);
                    // setLoading(false);
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
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    /** 
     * Handle More info
     * 
     */
    const handleMoreInfoClick = (course) => {
        console.log('-------',course)
        setSelectedCourse(course);
        navigate("/course-listing/course-details", { state: { course } });
    };
    /***********************************************************************/
    /***********************************************************************/
    // console.log('selectedCourse----', selectedCourse)
    return (
        <>
            <Header />
            {loading === true ? <Loader /> : ''}

            <section className="page_banner_wrapper pb-25">
                <div className="banner-bg">
                    <img src={bannerBg} alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 pt-40">
                            <div className="pb-25">
                                <h1 className="pb-15">CITB SMSTS Online Courses</h1>
                                <p>Online Monday to Friday, Day Release &amp; Weekend Courses Are Available</p>
                                <p>Or View Our Classroom Courses Here - Site Management Safety Training Scheme</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="front_section bg-low-light-blue Container_wrapper pr_filter_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="section-title text-center pb-1">
                                <h4>Find your course</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row form_container_row">
                        <div className="col-lg-8 offset-lg-2 pb-25">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Date</label>
                                        <select className="form-control" name="" tabIndex="-1" aria-hidden="true">
                                            <option value="">Select Month</option>
                                            <option value="October 2024">October 2024</option>
                                            <option value="November 2024">November 2024</option>
                                            <option value="December 2024">December 2024</option>
                                            <option value="January 2025">January 2025</option>
                                            <option value="February 2025">February 2025</option>
                                            <option value="March 2025">March 2025</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Type</label>
                                        <select className="form-control" name="" tabIndex="-1" aria-hidden="true">
                                            <option value="">Select Type</option>
                                            <option value="Monday to Friday">Monday to Friday</option>
                                            <option value="Day Release">Day Release</option>
                                            <option value="Weekend">Weekend</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 text-center">
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="product_accordian_wrap">
                                <div className="accordion" id="ProductAccordion">
                                    {items.map((item, index) => (
                                        <div className="card" key={index}>
                                            <div className="card-header">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        onClick={() => toggleAccordion(index)}
                                                        aria-expanded={activeIndex === index}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </h2>
                                            </div>
                                            {activeIndex === index && (
                                                <div className="card-body">
                                                    <div className="products columns-1">
                                                        {(() => {
                                                            const filteredCourses = courses.filter(course => {
                                                                const startDateParts = course.start_date.split('-');
                                                                const courseMonth = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`).toLocaleString('default', { month: 'long' });
                                                                return courseMonth === item.title;
                                                            });

                                                            if (filteredCourses.length === 0) {
                                                                return <p>No courses available for {item.title}.</p>;
                                                            }

                                                            return filteredCourses.map((course, itemIndex) => (
                                                                <div className="product" key={itemIndex}>
                                                                    <div className="product_list_rows">
                                                                        <div className="pr_col product-logo">
                                                                            <div className="relative" style={{ width: '300px', height: '250px' }}>
                                                                                <img
                                                                                    src={course.course_image || EmptyImage}
                                                                                    alt="Course"
                                                                                    className="w-full h-full object-cover"
                                                                                    decoding="async"
                                                                                    fetchpriority="high"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="pr_col product-info">
                                                                            <h2>{course.course_title} | {course.start_date} | {course.course_format}</h2>
                                                                            <h3>
                                                                                {course.sale_price ? (
                                                                                    <>
                                                                                        <bdi>
                                                                                            <span className="woocommerce-Price-currencySymbol">£</span>
                                                                                            <span style={{ textDecoration: 'line-through' }}>{course.regular_price}</span>
                                                                                        </bdi>
                                                                                        <bdi className="ml-2">
                                                                                            <span className="woocommerce-Price-currencySymbol">£</span>
                                                                                            {course.sale_price}
                                                                                        </bdi>
                                                                                    </>
                                                                                ) : (
                                                                                    <bdi>
                                                                                        <span className="woocommerce-Price-currencySymbol">£</span>
                                                                                        {course.regular_price}
                                                                                    </bdi>
                                                                                )}
                                                                                <small className="woocommerce-price-suffix">+ {course.vat || 0}% VAT</small>
                                                                            </h3>
                                                                            <div className="product-other-detail">
                                                                                <ul>
                                                                                    <li>Saturday - Sunday</li>
                                                                                    <li>Weekend</li>
                                                                                    <li>{course.course_time}</li>
                                                                                    {course.course_format === 'Online' && <li>Remote (Zoom)</li>}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="pr_col product-btns">
                                                                            <div className="pr-btns">
                                                                                <a href="#" className="btns add-to-cart">Add to cart</a>
                                                                                {/* <a href="#" className="btns more-info">More info</a> */}
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleMoreInfoClick(course);
                                                                                    }}
                                                                                    className="btns more-info"
                                                                                >
                                                                                    More Info
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ));

                                                        })()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="front_section Container_wrapper pr_video_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 pb-25">
                            <div className="section-title text-center pb-30">
                                <h2 className="pb-10">Save your time and money by choosing our professional team.</h2>
                                <p>
                                    Completing your CITB SMSTS training course validates your knowledge and skills in site
                                    management safety, proving your compliance with UK health and safety legislation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 pb-10">
                            <iframe
                                width="100%"
                                height="340"
                                src="https://www.youtube.com/embed/fJ3sxwGgIw8?modestbranding=1&amp;controls=0&amp;rel=0&amp;showinfo=0"
                                title="CITB SMSTS INTRODUCTION"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="col-lg-6">
                            <div className="pb-30">
                                <h3 className="pb-10">Heading here</h3>
                                <p className="pb-15">
                                    With a success rate of 98%, this course could be your key to unlocking new
                                    opportunities in the construction industry. Enrol today in our CITB SMSTS Online Training
                                    for just £360 plus VAT and start paving your way toward a successful career in site
                                    management.
                                </p>
                                <p className="pb-15">
                                    Our SMSTS Online Course is helping site managers achieve their goals in record time.
                                    Managing responsibilities while staying current with health and safety regulations can be
                                    challenging for aspiring site managers.
                                </p>
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