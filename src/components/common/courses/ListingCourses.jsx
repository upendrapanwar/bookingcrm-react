import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Loader from "../../../components/common/Loader";
import EmptyImage from "../../../assets/images/EmptyImage.png";

const CourseListing = () => {

    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [selectedCourse, setSelectedCourse] = useState(null);

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
        setSelectedCourse(course);
        navigate("course-details", { state: { course } });
    };
    /***********************************************************************/
    /***********************************************************************/
console.log('selectedCourse----',selectedCourse)
    return (
        <>
            {loading === true ? <Loader /> : ''}
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                <div className="container mx-auto mt-8">
                                    {courses.length > 0 ? (
                                        courses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="product_list_rows flex flex-col md:flex-row items-start md:items-center justify-between border p-4 rounded-lg shadow-lg mb-4">
                                                <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
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

                                                {/* Product Information */}
                                                <div className="pr_col product-info md:w-7/12 space-y-2 flex-shrink-0">
                                                    <h2 className="text-xl font-semibold">{course.course_title} | {course.course_format}</h2>
                                                    {/* | 26-06-2024 */}

                                                    <h3 className="text-lg font-bold">
                                                        <span className="woocommerce-Price-amount">
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
                                                    <div className="product-other-detail">
                                                        <ul className="list-disc ml-5 space-y-1">
                                                            <li>{course.availability}</li>
                                                            {/* <li>1 Day</li>*/}
                                                            <li>{course.course_time}</li>
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
                                                        <button
                                                           // onClick={() => handleMoreInfoClick(course)}
                                                            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 block text-center"
                                                        >
                                                            More Info
                                                        </button>
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
        </>
    );
}

export default CourseListing;