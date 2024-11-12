import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Loader from "../components/common/Loader";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import citbConstructionLogo from '../assets/images/citb-SSSTS-construction-logo-300x300.png';
import bannerBg from '../assets/images/page-banner-bg.jpg'
import EmptyImage from "../assets/images/EmptyImage.png";
import CourseListing from '../components/common/courses/ListingCourses';


const Home = () => {

    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    //console.log('authINFO',authInfo)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([false]);

    useEffect(() => {
        // getCourses();
    }, []);
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle to get courses
     * 
     */
    const getCourses = () => {
        setLoading(true);
        axios
            .get("user/get-all-courses")
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
        console.log('-------', course)
        //setSelectedCourse(course);
        navigate("/course-listing/course-details", { state: { course } });
    };
    /***********************************************************************/
    /***********************************************************************/

    return (
        // <>
        //     <Header />

        //     {loading === true ? <Loader /> : ''}
        //     <section className="page_banner_wrapper pb-25">
        //         <div className="banner-bg">
        //             <img src={bannerBg} alt="" />
        //         </div>
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-lg-12  pt-40">
        //                     <div className="section-title pb-45 ">
        //                         <h1 className="pb-15">Most Popular Courses</h1>
        //                     </div>{" "}
        //                     {/* section-title */}
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        //     {/*====== PRODUCTS PART START ======*/}
        //     <section className="product_wrapper front_product_section columns-1 pb-25">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-md-12">
        //                     <div className="products columns-1">
        //                         {/* PRODUCT LIST ITEM 01 */}
        //                         {courses.map((course) => (
        //                             <div className="product">
        //                                 <div className="product_list_rows">
        //                                     {/* Product Listings */}
        //                                     <div className="pr_col product-logo">
        //                                         {/* <img src={citbConstructionLogo} /> */}
        //                                         <div className="relative" style={{ width: '175px', height: '175px' }}>
        //                                             <img
        //                                                 src={course.course_image || EmptyImage}
        //                                                 alt="Course"
        //                                                 className="w-full h-full object-cover"
        //                                                 decoding="async"
        //                                                 fetchpriority="high"
        //                                             />
        //                                         </div>
        //                                     </div>
        //                                     <div className="pr_col product-info">
        //                                         <h2>{course.course_title} | {course.start_date} | {course.course_format}</h2>
        //                                         <h3>
        //                                             {course.sale_price ? (
        //                                                 <>
        //                                                     <bdi>
        //                                                         <span className="woocommerce-Price-currencySymbol">£</span>
        //                                                         <span style={{ textDecoration: 'line-through' }}>{course.regular_price}</span>
        //                                                     </bdi>
        //                                                     <bdi className="ml-2">
        //                                                         <span className="woocommerce-Price-currencySymbol">£</span>
        //                                                         {course.sale_price}
        //                                                     </bdi>
        //                                                 </>
        //                                             ) : (
        //                                                 <bdi>
        //                                                     <span className="woocommerce-Price-currencySymbol">£</span>
        //                                                     {course.regular_price}
        //                                                 </bdi>
        //                                             )}
        //                                             <small className="woocommerce-price-suffix">+ {course.vat || 0}% VAT</small>
        //                                         </h3>
        //                                         <div className="product-other-detail">
        //                                             <ul>
        //                                                 <li>Saturday - Sunday</li>
        //                                                 <li>Weekend</li>
        //                                                 <li>{course.course_time}</li>
        //                                                 {course.course_format === 'Online' && <li>Remote (Zoom)</li>}
        //                                             </ul>
        //                                         </div>
        //                                     </div>
        //                                     <div className="pr_col product-stock-quantity">
        //                                         <strong>Places Available </strong>
        //                                         <br />
        //                                         <br />{course.enrollment_capacity}
        //                                     </div>
        //                                     <div className="pr_col product-btns">
        //                                         <div className="pr-btns">
        //                                             <a href="#" className="btns add-to-cart">
        //                                                 Add to cart
        //                                             </a>
        //                                             <a
        //                                                 href="#"
        //                                                 onClick={(e) => {
        //                                                     e.preventDefault();
        //                                                     handleMoreInfoClick(course);
        //                                                 }}
        //                                                 className="btns more-info"
        //                                             >
        //                                                 More Info
        //                                             </a>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>

        //     <Footer />

        // </>

        <>
        <CourseListing/>
        </>
    );
}

export default Home;