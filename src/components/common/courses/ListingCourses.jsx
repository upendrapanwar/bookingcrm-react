import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { Formik } from "formik";
import Loader from "../../../components/common/Loader";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import EmptyImage from "../../../assets/images/EmptyImage.png";
import bannerBg from '../../../assets/images/page-banner-bg.jpg';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/reducers/cart-reducer';
import $ from "jquery";

const CourseListing = (passedData) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accordionRefs = useRef([]);
    const heroImageRef = useRef(null);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [searchCourses, setSearchCourses] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchMonth, setSearchMonth] = useState(null);
    const [searchType, setSearchType] = useState(null);
    const today = new Date();
    const [activeTab, setActiveTab] = useState(0);


    /***********************************************************************/
    /***********************************************************************/
    // parallax image display 
    const setTranslate = (xPos, yPos, el) => {
        if (el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    };

    const scrollLoop = () => {
        const yScrollPosition = window.scrollY;
        setTranslate(0, yScrollPosition * -0.3, heroImageRef.current);
        requestAnimationFrame(scrollLoop);
    };

    useEffect(() => {
        scrollLoop();
        return () => {
            cancelAnimationFrame(scrollLoop);
        };
    }, []);

    // parallax image display 
    /***********************************************************************/
    /***********************************************************************/

    //  console.log('selectedCourse---', selectedCourse);
    // useEffect(() => {

    //     // getCategories();
    // }, []);

    useEffect(() => {
        getCourses();
        if (passedData.passedData === false) {
            setIsSearch(false);
        }
    }, [passedData]);

    useEffect(() => {
        //getCourses();
    }, []);
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle to get next 6 Months
     * 
     */
    const getNextSixMonths = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 6; i++) {
            const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            months.push({ title: nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) });
        }
        return months;
    };

    const items = getNextSixMonths();
    /***********************************************************************/
    /***********************************************************************/

    /**
    * Handle to toggleAccordion
    * 
    */
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);

        setTimeout(() => {
            if (accordionRefs.current[index]) {
                accordionRefs.current[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 100);
    };
    /***********************************************************************/
    /***********************************************************************/


    /**
     * Handle to get courses
     * 
     */
    const getCourses = () => {
        //  setLoading(true);
        axios
            .get("user/get-all-courses")
            .then((response) => {
                // console.log('response---of course',response)
                toast.dismiss();
                if (response.data.status) {
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
                    // setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle to get categories
     * 
     */
    const getCategories = () => {
        setLoading(true);
        axios
            .get("admin/getAllcategories")
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    console.log('Courses-----', response)
                    setCategories(response.data.data);
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
     * Handle AddToCart 
     * 
     */
    const AddToCart = async (cart) => {
        console.log("cart checking here", cart);
        dispatch(addToCart(cart));
        toast.success(`${cart.course_title} added to cart!`);
    }
    /***********************************************************************/
    /***********************************************************************/

    /** 
     * Handle More info
     * 
     */
    const handleMoreInfoClick = (course) => {
        console.log('-------', course)
        // setSelectedCourse(course);
        navigate("/course-listing/course-details", { state: { course } });
    };
    /***********************************************************************/
    /***********************************************************************/

    /** 
     * Handle More info
     * 
     */
    const handleSubmit = (values, { resetForm }) => {
        console.log("Selected Month:", values.month);
        console.log("Selected Type:", values.type);

        // Set search criteria in state
        setSearchMonth(values.month || null);
        setSearchType(values.type || null);

        try {
            // Get the current date if month is not provided
            const currentDate = new Date();
            const inputDate = values.month ? new Date(values.month) : currentDate;
            const inputMonth = inputDate.getMonth();
            const inputYear = inputDate.getFullYear();

            console.log("Filtering for month/year:", inputMonth, inputYear);

            // Filter the courses based on provided inputs
            const searchCourses = courses.filter(course => {
                if (!course) return false;

                const typeMatch = values.type
                    ? course.course_type?.toLowerCase() === values.type.toLowerCase()
                    : true;

                let monthMatch = false;
                if (course.course_schedule_dates && course.course_schedule_dates.length > 0) {
                    try {
                        const courseDate = new Date(course.course_schedule_dates[0]);

                        if (!isNaN(courseDate.getTime())) {
                            monthMatch =
                                courseDate.getMonth() === inputMonth &&
                                courseDate.getFullYear() === inputYear;

                            console.log("Course date comparison:", {
                                course: course.course_title,
                                courseMonth: courseDate.getMonth(),
                                courseYear: courseDate.getFullYear(),
                                inputMonth,
                                inputYear,
                                monthMatch,
                                typeMatch
                            });
                        }
                    } catch (error) {
                        console.log("Error processing course date:", error);
                    }
                }

                // Determine final match logic based on provided inputs
                if (values.type && values.month) {
                    return typeMatch && monthMatch;
                } else if (values.type) {
                    return typeMatch;
                } else if (values.month) {
                    return monthMatch;
                }
                return false;
            });

            // Update state with the filtered courses
            setSearchCourses(searchCourses);
            setIsSearch(true);

            console.log("Search Courses:", searchCourses);

            // Reset the form after the search
            resetForm();
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
    };




    /***********************************************************************/
    /***********************************************************************/

    const handleAddToCart = async (course) => {
        const cart = course;
        console.log("add to cart- cart:", cart);
        dispatch(addToCart(cart));
        toast.success(`${cart.course_title} added to cart!`);
    }

    /***********************************************************************/
    /***********************************************************************/

    const handleViewMore = () => {
        navigate('#');
    };
    /***********************************************************************/
    /***********************************************************************/

    const handleClose = () => {
        setIsSearch(false);
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setIsSearch(false)
    }

    /***********************************************************************/
    /***********************************************************************/
    console.log('selectedCourse----', courses)
    return (
        <>
            <Header />


            <section className="hero-treatment">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 pt-40">
                            <h1 className="pb-15">CITB SMSTS Online Courses</h1>
                            <p>Online Monday to Friday, Day Release &amp; Weekend Courses Are Available</p>
                            <p>Or View Our Classroom Courses Here - Site Management Safety Training Scheme</p>
                        </div>
                    </div>
                </div>
                <div
                    className="hero-image"
                    ref={heroImageRef} // Attach the ref to this div
                    style={{
                        backgroundImage: `url(${bannerBg})`,
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed",
                        height: "500px",
                        transform: "translate3d(0, 0, 0)", // Initial transform value
                    }}
                ></div>
            </section>

            <section className="front_section bg-low-light-blue Container_wrapper pr_filter_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 pb-4">
                            <div className="section-title text-center pb-1">
                                <h4>Find your course</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row form_container_row">
                        <div className="col-lg-8 offset-lg-2 pb-25">
                            <Formik
                                initialValues={{
                                    month: "",
                                    type: "",
                                }}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    isValid,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label>Date</label>
                                                <select
                                                    className="form-control"
                                                    name="month"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.month}
                                                >
                                                    <option value="">Select Month</option>
                                                    {items.map((item, index) => (
                                                        <option key={index} value={item.title}>
                                                            {item.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* {touched.month && errors.month ? (
                                                        <small className="text-danger">{errors.month}</small>
                                                    ) : null} */}
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Type</label>
                                                <select
                                                    className="form-control"
                                                    name="type"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.type}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Monday to Friday">Monday to Friday</option>
                                                    <option value="Day Release">Day Release</option>
                                                    <option value="Weekend">Weekend</option>
                                                </select>
                                                {/* {touched.type && errors.type ? (
                                                    <small className="text-danger">{errors.type}</small>
                                                ) : null} */}
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>&nbsp;</label>
                                                <button type="submit" className="btn btn-primary">SEARCH</button>
                                            </div>

                                            <div className="form-group col-md-2">
                                                <label>&nbsp;</label>
                                                {(isSearch === false) ? (
                                                    '') : (
                                                    <button type="button" onClick={handleReset} className="btn btn-primary">RESET</button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>

                </div>
            </section >

            {!isSearch ? (
                <section className="product_wrapper front_product_section columns-1 pb-25">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="course_listing_wraps">
                                    <div className="accordion" id="ProductAccordion">
                                        <div className="tab-buttons  d-flex flex-wrap justify-center">
                                            <div className="tab_btn_panel  d-flex flex-wrap justify-center">

                                                <div className="btn_filter_panel flex flex-wrap justify-center">
                                                    {/* {items.slice(0, 3).map((item, index) => (
                                                        <button
                                                            key={index}
                                                            className={`tab-button btn btn-link text-center collapsed mr-1 ml-1 ${activeTab === index ? 'active' : ''}`}
                                                            onClick={() => handleTabClick(index)}
                                                        >
                                                            {item.title}
                                                        </button>
                                                    ))} */}

                                                    {items
                                                        // .filter(item => {
                                                        //     // Check if there are any courses in this month
                                                        //     const today = new Date();
                                                        //     return courses.some(course => {
                                                        //         const upcomingDate = course.course_schedule_dates
                                                        //             .map(dateString => new Date(dateString))
                                                        //             .find(date => date >= today);

                                                        //         if (!upcomingDate) return false;

                                                        //         const courseMonth = upcomingDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                                                        //         return courseMonth === item.title;
                                                        //     });
                                                        // })
                                                        .slice(0, 3) // Limit to first 3 months with courses
                                                        .map((item, index) => (
                                                            <button
                                                                key={index}
                                                                className={`tab-button btn btn-link text-center collapsed mr-1 ml-1 ${activeTab === index ? 'active' : ''}`}
                                                                onClick={() => handleTabClick(index)}
                                                            >
                                                                {item.title}
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                        {items.map((item, index) => (
                                            <div className={`tab-content ${activeTab === index ? 'active' : ''}`} key={index}>
                                                {activeTab === index && (
                                                    <div className="card">

                                                        <div className="card-body">
                                                            <div className="products columns-1">
                                                                {(() => {
                                                                    // const today = new Date();

                                                                    // const filteredCourses = courses.filter(course => {
                                                                    //     const upcomingDate = course.course_schedule_dates
                                                                    //         .map(dateString => new Date(dateString))
                                                                    //         .find(date => date >= today);

                                                                    //     if (!upcomingDate) return false;

                                                                    //     const courseMonth = upcomingDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                                                                    //     return courseMonth === item.title;
                                                                    // });

                                                                    // if (filteredCourses.length === 0) {
                                                                    //     return <p>No upcoming courses available for {item.title}.</p>;
                                                                    // }

                                                                    // Find the courses for the current month
                                                                    const monthData = courses.find(course => course.month === item.title);

                                                                    // If no courses for the current month, show a message
                                                                    if (!monthData || monthData.courses.length === 0) {
                                                                        return <p>No courses available for {item.title}.</p>;
                                                                    }

                                                                    return (
                                                                        <>
                                                                            <div className="products_row_listing">
                                                                                {monthData.courses.map((course, itemIndex) => (
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
                                                                                                <div className='courseType_label'><span>{course.course_type}</span></div>
                                                                                            </div>
                                                                                            <div className="pr_col product-info">
                                                                                                {/* <h2>{course.course_title} | {course.start_date} | {course.course_format}</h2> */}
                                                                                                <h2>
                                                                                                    {course.course_title} | {
                                                                                                        course.course_schedule_dates
                                                                                                            .map(dateString => new Date(dateString))
                                                                                                            .find(date => date >= today)
                                                                                                            ?.toLocaleDateString('en-GB')
                                                                                                            .split('/')
                                                                                                            .join('-') || 'No upcoming date available'
                                                                                                    } | {course.course_format}
                                                                                                </h2>
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
                                                                                                    <small className="woocommerce-price-suffix"> +{course.vat || 0}% VAT</small>
                                                                                                </h3>
                                                                                                <div className="product-other-detail">
                                                                                                    <ul>
                                                                                                        {/* <li className='pt-2'>{course.course_type}</li> */}
                                                                                                        {/* <li>Weekend</li> */}
                                                                                                        {/* <li className='pt-2'>{course.course_time}</li> */}
                                                                                                        <ul>
                                                                                                            {course.course_time.map((time, index) => (
                                                                                                                <li key={index} className='pt-2'>
                                                                                                                    {time.start} - {time.end}
                                                                                                                </li>
                                                                                                            ))}
                                                                                                        </ul>
                                                                                                        {course.course_format === 'Online' && <li className='pt-2'>Remote (Zoom)</li>}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="pr_col product-btns">
                                                                                                <div className="pr-btns">
                                                                                                    <Link to="#" className="btns add-to-cart" onClick={() => handleAddToCart(course)}>Add to cart</Link>
                                                                                                    {/* <a href="#" className="btns more-info">More info</a> */}
                                                                                                    <Link
                                                                                                        to="#"
                                                                                                        onClick={(e) => {
                                                                                                            e.preventDefault();
                                                                                                            handleMoreInfoClick(course);
                                                                                                        }}
                                                                                                        className="btns more-info"
                                                                                                    >
                                                                                                        More Info
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </>
                                                                    );

                                                                })()}
                                                            </div>
                                                        </div>
                                                        {/* )} */}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>) :
                // ********************************************
                (
                    <section className="product_wrapper front_product_section columns-1 pb-25 pt-8">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="course_listing_wraps">
                                        <div className="accordion" id="ProductAccordion">

                                            <div className="d-flex justify-content-between align-items-center mb-8">
                                                <h4 className="text-center w-100 m-0 search-heading">Showing results for your search</h4>
                                                {/* <button
                                                    type="button"
                                                    className="btn btn-sm  btn-outline-danger  p-2 mr-3"
                                                    //className="close-icon btn btn-link pr-2 text-dark" 
                                                    onClick={handleClose}>
                                                    X
                                                </button> */}
                                            </div>
                                            <div className="tab-buttons  d-flex flex-wrap justify-center">
                                                <div className="tab_btn_panel  d-flex flex-wrap justify-center">
                                                    <div className="btn_filter_panel flex flex-wrap justify-center">
                                                        <button
                                                            className="tab-button btn btn-link text-center collapsed mr-1 ml-1 "
                                                        // onClick={() => toggleAccordion(index)}
                                                        // aria-expanded={activeIndex === index}
                                                        >
                                                            {searchMonth || ''} {searchType || ''}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mt-2">

                                                {/* <div className="card-header">
                                                
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link btn-block text-left collapsed d-inline-block"
                                                        // onClick={() => toggleAccordion(index)}
                                                        // aria-expanded={activeIndex === index}
                                                        >
                                                            {searchMonth || ''} {searchType || ''}
                                                        </button>
                                                    </h2>
                                                
                                                </div> */}
                                                {/* {activeIndex === index && ( */}
                                                <div className="card-body">
                                                    <div className="products columns-1">
                                                        <div className="products_row_listing">
                                                            {searchCourses.length > 0 ? (
                                                                searchCourses.map((course, itemIndex) => (
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
                                                                                <div class="courseType_label"><span>{course.course_type}</span></div>
                                                                            </div>
                                                                            <div className="pr_col product-info">
                                                                                {/* <h2>{course.course_title} | {course.start_date} | {course.course_format}</h2> */}
                                                                                <h2>
                                                                                    {course.course_title} | {
                                                                                        course.course_schedule_dates
                                                                                            .map(dateString => new Date(dateString))
                                                                                            .find(date => date >= today)
                                                                                            ?.toLocaleDateString('en-GB')
                                                                                            .split('/')
                                                                                            .join('-') || 'No upcoming date available'
                                                                                    } | {course.course_format}
                                                                                </h2>
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
                                                                                    <small className="woocommerce-price-suffix"> +{course.vat || 0}% VAT</small>
                                                                                </h3>
                                                                                <div className="product-other-detail">
                                                                                    <ul>

                                                                                        {/* <li>Weekend</li> */}
                                                                                        {/* <li className='pt-2'>{course.course_time}</li> */}
                                                                                        <ul>
                                                                                            {course.course_time.map((time, index) => (
                                                                                                <li key={index} className='pt-2'>
                                                                                                    {time.start} - {time.end}
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                        {course.course_format === 'Online' && <li className='pt-2'>Remote (Zoom)</li>}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="pr_col product-btns">
                                                                                <div className="pr-btns">
                                                                                    <Link to="#" className="btns add-to-cart" onClick={() => AddToCart(course)}>Add to cart</Link>
                                                                                    {/* <a href="#" className="btns more-info">More info</a> */}
                                                                                    <Link
                                                                                        to="#"
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            handleMoreInfoClick(course);
                                                                                        }}
                                                                                        className="btns more-info"
                                                                                    >
                                                                                        More Info
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (<p>No courses found matching your search criteria.</p>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                )
            }


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
