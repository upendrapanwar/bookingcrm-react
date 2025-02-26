import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateCourseSchema from '../../../validation-schemas/CreateCourseSchema';
import Loader from "../../../components/common/Loader";
import CryptoJS from 'crypto-js';

const CourseDetails = () => {

    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const courseId = query.get('id');
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const [loading, setLoading] = useState([false]);

    const [course, setCourse] = useState('');
    const [activeTab, setActiveTab] = useState("ratings");
    const averageRating =
        course.reviews?.length > 0
            ? course.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / course.reviews.length
            : undefined;




    /***********************************************************************/

    useEffect(() => {
        getCourse();
    }, []);
    /***********************************************************************/



    /***********************************************************************/
    /**
    * Handle image size
    * 
    */
    const getCourse = (e) => {
        setLoading(true);
        axios
            .get(`admin/get_course_byId/${courseId}`)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    console.log('response--course in details page----', response.data.data)
                    setCourse(response.data.data);
                    // toast.success(response.data.message, { autoClose: 3000 });
                    console.log('response---', response)

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
    /***********************************************************************/


    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        console.log('values---', values)


        axios
            .put("admin/update_course", values)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    // resetForm();
                    navigate(-1);

                } else {
                    resetForm();
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    resetForm();
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
    const renderStarRating = (ratingValue) => {
        const stars = [];
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue - fullStars >= 0.5;


        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {

                stars.push(<li className="star rated" key={i}>★</li>);
            } else if (hasHalfStar && i === fullStars) {

                stars.push(<li className="star half-star" key={i}>★</li>);
            } else {

                stars.push(<li className="star empty" key={i}>☆</li>);
            }
        }

        return <ul className="rating">{stars}</ul>;
    };

    /***********************************************************************/
    /***********************************************************************/

    const handleDelete = (reviewId) => {
        console.log('reviewId---for delete---', reviewId)
        const deleteData = {
            reviewId: reviewId,
            courseId: course.id
        }
        axios
            .delete("admin/delete-course-review", {data: deleteData})
            .then((response) => {
                console.log('response----delete--', response)
                toast.dismiss();
                if (response.data.status) {
                    getCourse();
                    toast.success(response.data.message, { autoClose: 3000 });
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
    };

    /***********************************************************************/
    /***********************************************************************/

    console.log('course in react', course)
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
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Course details</h1>
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


                        <div className="flex flex-col">
                            <section className="product_wrapper front_product_section columns-1 pt-0">
                                <div className="container">
                                  
                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto w-full">
                                            <div className="min-w-full align-middle">
                                                <div className="overflow-hidden shadow">
                                                    <div className="flex flex-col p-4">
                                                        <div className="flex flex-row w-full h-auto bg-white shadow-lg pt-0">
                                                            {/* Course Image */}
                                                            <div className="w-1/2 h-full flex justify-center items-center">
                                                                <div className="flex flex-col">
                                                                    {course ? (
                                                                        
                                                                        <div className="relative" style={{ width: '350px', height: '200px' }}>
                                                                            <img
                                                                                src={course.course_image || EmptyImage}
                                                                                alt="Course"
                                                                                className="w-full h-full object-cover border-4 border-gray-300 rounded-md"
                                                                                decoding="async"
                                                                                fetchpriority="high"
                                                                            />
                                                                        </div>

                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 ">
                                                                            <span className="text-gray-500 text-lg">Image Not Available</span>
                                                                        </div>
                                                                    )}
                                                                    <h2 className="text-2xl font-bold text-gray-800 text-center  pt-3 pb-4">{course.course_title}</h2>
                                                                </div>
                                                            </div>

                                                            {/* Course Details */}
                                                            <div className="w-1/2 h-full flex flex-col justify-center p-6">
                                                                <p className="text-md text-gray-600 ">
                                                                    <strong >Type:</strong> {course.course_type}
                                                                </p>
                                                                <p className="text-md text-gray-600 ">
                                                                    <strong >Category:</strong> {course.category}
                                                                </p>
                                                                <p className="text-md text-gray-600 ">
                                                                    <strong >Price:</strong> £{course.regular_price?.toFixed(2)}
                                                                </p>

                                                                {/* Reviews */}
                                                                <div className="flex items-center ">
                                                                    <div className="flex flex-col">
                                                                        <p className="text-md text-gray-600 ">
                                                                            <strong>Average Rating:</strong> {averageRating !== undefined ? averageRating.toFixed(1) : "0.0"}
                                                                        </p>
                                                                        <p className="rating_point d-inline-flex align-items-center mb-3">
                                                                            {averageRating ? renderStarRating(averageRating) : ""}

                                                                        </p>
                                                                    </div>
                                                                    {/* <span className="text-gray-600 ml-3 text-lg">{course.reviews.length} Reviews</span> */}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Tabs Section */}
                                                        <div className="mt-5">
                                                            <ul className="flex border-b">
                                                                <li className="mr-1">
                                                                    <button
                                                                        className={`text-sm px-4 py-2 bg-white ${activeTab === 'ratings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
                                                                            }`}
                                                                        onClick={() => setActiveTab('ratings')}
                                                                    >
                                                                        Reviews
                                                                    </button>
                                                                </li>
                                                                {/* Additional tabs can go here */}
                                                            </ul>

                                                            <div className="p-4">
                                                                {activeTab === 'ratings' && (
                                                                    <div>
                                                                        {course.reviews && course.reviews.length > 0 ? (
                                                                            course.reviews?.map((review, index) => (

                                                                                <div key={index} className="border-bottom py-2">
                                                                                    {/* Title Section with Delete Icon */}
                                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                                        <div>
                                                                                            <h6 className=" mb-3">{review.review?.title}</h6>
                                                                                            <p className=" mb-0 text-muted">
                                                                                                {review.review?.description}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button
                                                                                                className="btn btn-link text-danger p-0 ms-2 custom-delete-btn"
                                                                                                title="Delete"
                                                                                                onClick={() => handleDelete(review._id)}
                                                                                            >
                                                                                                <svg
                                                                                                    stroke="currentColor"
                                                                                                    fill="currentColor"
                                                                                                    strokeWidth="0"
                                                                                                    viewBox="0 0 448 512"
                                                                                                    height="2em"
                                                                                                    width="2em"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                                                                                </svg>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* Rating */}
                                                                                    <p className="rating_point d-inline-flex align-items-center mt-3">
                                                                                        {averageRating ? renderStarRating(averageRating) : ""}
                                                                                    </p>

                                                                                    <p className="font-medium text-secondary">
                                                                                        {review.studentId?.first_name || ''} {review.studentId?.last_name || ''} |{' '}
                                                                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                                            year: 'numeric',
                                                                                            month: 'short',
                                                                                            day: 'numeric',
                                                                                        })}
                                                                                    </p>
                                                                                </div>

                                                                            ))

                                                                        ) : (<div className="border-bottom py-2">
                                                                            {/* Title Section with Delete Icon */}
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <div className='py-2 text-center'>
                                                                                    <p className="text-muted">No reviews available.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>


                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default CourseDetails;