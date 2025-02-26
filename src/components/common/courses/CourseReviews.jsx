import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from "../../../components/common/Loader";
import Header from '../../../components/common/Header';
import { useHeader } from '../../common/HeaderContext';
import Footer from '../../../components/common/Footer';
import axios from "axios";
import { toast } from 'react-toastify';
import bannerBg from '../../../assets/images/page-banner-bg.jpg';
import icon_hours from '../../../assets/images/Icons/24-hours.png';
import icon_course from '../../../assets/images/Icons/course.png';
import icons_test_results from '../../../assets/images/Icons/test-results.png';
import image_smsts from '../../../assets/images/SMSTS-1024x594.jpg';
import EmptyImage from "../../../assets/images/EmptyImage.png";
import Icons_calendar_outline from '../../../assets/images/Icons/calendar-outline.png';
import 'react-quill/dist/quill.snow.css';
import { Modal, Button } from "react-bootstrap";

const CourseReviews = () => {
    const query = new URLSearchParams(useLocation().search);
    const courseId = query.get('id');
    const navigate = useNavigate();
    const { setHeaderData } = useHeader();
    const today = new Date();
    //const course = location.state.course;
    const [course, setCourse] = useState('');
    const [isOpen, setIsOpen] = useState({ courseInfo: true, additionalInfo: false, Completing_the_course: false, Why_cst_training: false });
    const [varified, isVarified] = useState(false);
    const [email, setEmail] = useState("");
    const [verifiedStudentId, setVerifiedStudentId] = useState("");
    const averageRating =
        course.reviews?.length > 0
            ? course.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / course.reviews.length
            : undefined;

    const [showModal, setShowModal] = useState(false);
    const [showVarificationModal, setVarificationShowModal] = useState(false);
    const [reviewData, setReviewData] = useState({ title: "", description: "", rating: 0 });
    const [hoveredStar, setHoveredStar] = useState(0);


    // console.log('course in detail page---', course);
    useEffect(() => {
        getCourseById();
    }, []);

    useEffect(() => {
        const getNextAvailableDate = () => {
            if (course) {
                return course.course_schedule_dates
                    .map(dateString => new Date(dateString))
                    .filter(date => !isNaN(date))
                    .sort((a, b) => a - b)
                    .find(date => {
                        const localDate = new Date(date);
                        localDate.setHours(0, 0, 0, 0);
                        const localToday = new Date(today);
                        localToday.setHours(0, 0, 0, 0);
                        return localDate >= localToday;
                    })
                    ?.toLocaleDateString('en-GB')
                    .split('/')
                    .join('-') || 'No upcoming date available';
            }
        };

        setHeaderData({
            heading: 'Course Reviews',
            paragraph1: `${course.course_title} | ${getNextAvailableDate()} | ${course.course_format}`,
        });
    }, [course]);





    /***********************************************************************/
    /***********************************************************************/
    const getCourseById = (e) => {
        //const id = courseId

        axios
            .get(`user/get-course-byId/${courseId}`)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    setCourse(response.data.data);
                    // toast.success(response.data.message, { autoClose: 3000 });
                    console.log('response---', response)

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

                }, 300);
            });
    }

    /***********************************************************************/
    /***********************************************************************/
    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
    /***********************************************************************/

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // 'en-GB' will give date format as dd/mm/yyyy
    };
    /***********************************************************************/

    // const handleAddReviews = async (course) => {
    //     handleModalOpen();

    //     //console.log("course---reviews--handle:", course);
    //     //const id = course.id
    //     //navigate(`/course-listing/course-reviews?id=${id}`);
    // }
    /***********************************************************************/


    const handleVerification = async (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
        const verifyData = {
            email: email,
            courseId: courseId
        }
        // setLoading(true);
        try {
            const response = await axios.post("user/coursereview-email-verify", { verifyData });
            console.log('response--', response)
            if (response.data.status) {
                //alert(`Verification successful`);
               // isVarified(true);
                setVerifiedStudentId(response.data.data)
                toast.success(response.data.message, { autoClose: 3000 });
                handleVarificationModalClose();
                handleModalOpen();
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error(error, { autoClose: 3000 });
            //alert("An error occurred during verification. Please try again.");
            console.error("API error:", error);
        } finally {
            //setLoading(false);
        }
    };

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

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);


    const handleVarificationModalOpen = () => setVarificationShowModal(true);
    const handleVarificationModalClose = () => setVarificationShowModal(false);
    /***********************************************************************/

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
    };

    /***********************************************************************/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Review Data:", reviewData);
        const fullReviewData = {
            reviewData: reviewData,
            courseId: course.id,
            studentId: verifiedStudentId
        }
        try {

            axios
            .post('user/add-review' , fullReviewData )
            .then((response) => {
                toast.dismiss();
                console.log('response---', response)
                if (response.data.status) {
                    getCourseById();
                    // setCourse(response.data.data);
                    // toast.success(response.data.message, { autoClose: 3000 });
                    

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

                }, 300);
            });
            

            console.log("Review successfully added!");
            setShowModal(false);
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    /***********************************************************************/

    const renderStar = (star) => {
        const isFull = hoveredStar >= star || reviewData.rating >= star;
        const isHalf = hoveredStar === star - 0.5 || reviewData.rating === star - 0.5;

        if (isFull) {
            return <i className="bi bi-star-fill text-warning"></i>;
        } else if (isHalf) {
            return <i className="bi bi-star-half text-warning"></i>;
        }
        return <i className="bi bi-star text-muted"></i>;
    };

    const handleStarClick = (rating) => {
        setReviewData((prev) => ({ ...prev, rating }));
    };

    const handleMouseMove = (e, star) => {
        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;

        // Determine whether the cursor is on the left or right half
        const isHalf = offsetX < rect.width / 2;
        const value = isHalf ? star - 0.5 : star;
        setHoveredStar(value);
    };

    const handleMouseLeave = () => {
        setHoveredStar(0);
    };
    /***********************************************************************/
    /***********************************************************************/
    return (
        <>
            <Header />
            <>

                {/* {varified ? ( */}
                    <>
                        <section className="page_section course_fullInfo_section pt-3 bgWhite">
                            <div className="container">
                                <div className="row">
                                    <div className="d-flex justify-content-end mb-3">
                                        <button
                                            type="button"
                                            className="inline-flex flex items-center px-3 py-2 text-sm font-medium  btn-orange rounded-lg"
                                            onClick={() => navigate(-1)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                            </svg>
                                            Back
                                        </button>
                                    </div>
                                    <div className="col-lg-6 ">
                                        {/* <h3 className="pb-30">
                                    {course.course_title} | {course.start_date} | {course.course_format}
                                </h3> */}
                                {course ? (
                                        <h6 className="pb-30">
                                            {course.course_title} | {
                                                course.course_schedule_dates
                                                    .map(dateString => new Date(dateString))
                                                    .filter(date => !isNaN(date))
                                                    .sort((a, b) => a - b)
                                                    .find(date => {
                                                        const localDate = new Date(date);
                                                        localDate.setHours(0, 0, 0, 0);
                                                        const localToday = new Date(today);
                                                        localToday.setHours(0, 0, 0, 0);
                                                        return localDate >= localToday;
                                                    })
                                                    ?.toLocaleDateString('en-GB')
                                                    .split('/')
                                                    .join('-')
                                                || 'No upcoming date available'
                                            } | {course.course_format}
                                        </h6>):( '')}
                                        <div className="row">
                                            <div className="col-lg-12 pb-20 ">
                                                <p className="text-md text-gray-600 ">
                                                    <strong>Average Rating:</strong> {averageRating !== undefined ? averageRating.toFixed(1) : "No rating yet"}
                                                </p>
                                                <p className="rating_point d-inline-flex align-items-center mb-3">
                                                    {averageRating ? renderStarRating(averageRating) : ""}

                                                </p>
                                            </div>

                                            <div className="col-lg-12 flex justify-between ">
                                                <button
                                                    className="btn btn-md btn-orange me-5"
                                                    //onClick={(e) => handleAddReviews(course)}
                                                    onClick={handleVarificationModalOpen}
                                                >
                                                    Add Review
                                                </button>
                                            </div>
                                        </div>{" "}
                                    </div>
                                    <div className="col-lg-6 pb-10">
                                        <div className="section-thumbnail">
                                            {/* <img src={course.course_image || EmptyImage} alt="" /> */}
                                            <img
                                                src={course.course_image || EmptyImage}
                                                alt=""
                                                style={{ width: '75%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }}
                                            />
                                        </div>{" "}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="page_section bg-blue course_detail_accordian">
                            <div className="container">
                                <div className="row">

                                    <div className="card">

                                        <div className="card-body">

                                            {course.reviews && course.reviews.length > 0 ? (
                                                course.reviews.map((review, index) => (
                                                    <div key={index} className="border-bottom ms-4 mt-4">

                                                        <div className="d-flex justify-content-between align-items-start">

                                                            <div className="d-flex flex-column justify-content-start align-items-start ">
                                                                <h6 className="m-0 p-1">{review.review?.title}</h6>
                                                                <p className="mb-2 p-1 text-muted pt-2 pb-2">{review.review?.description}</p>
                                                            </div>


                                                            {/* <div className="d-flex justify-content-end align-items-center">
                                                                {verifiedStudentId === review.studentId.id ? (
                                                                    <button
                                                                        className="btn btn-link text-danger p-0 ms-2 custom-delete-btn"
                                                                        title="Delete"
                                                                    >
                                                                        <svg
                                                                            stroke="currentColor"
                                                                            fill="currentColor"
                                                                            strokeWidth="0"
                                                                            viewBox="0 0 448 512"
                                                                            height="1.5em"
                                                                            width="1.5em"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                                                        </svg>
                                                                    </button>
                                                                ) : ('')}
                                                            </div> */}
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-start ">
                                                            <div className="col-lg-12 m-0 p-0">
                                                                <p>{review ? renderStarRating(review.rating) : ""}</p>
                                                            </div>
                                                        </div>


                                                        <div className="d-flex justify-content-between align-items-start  ">
                                                            <p className="font-medium text-secondary">
                                                                {review.studentId?.first_name || ''} {review.studentId?.last_name || ''} |{' '}
                                                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="border-bottom py-3">

                                                    <div className="text-center py-4">
                                                        <p className="text-muted">No reviews available.</p>
                                                    </div>
                                                </div>
                                            )}
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
                                            <Link className="btn btn-md btn-orange" to="/contact-us">
                                                Get in touch
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                {/* ) : ( )} */}

                    <Modal show={showVarificationModal} onHide={handleVarificationModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <section className="page_section course_fullInfo_section pt-3 bgWhite d-flex justify-content-center align-items-center" >
                        <div className="container">
                            <div className="row justify-content-center">
                                {/* <div className="d-flex justify-content-end mb-3">
                                    <button
                                        type="button"
                                        className="inline-flex flex items-center px-3 py-2 text-sm font-medium  btn-orange rounded-lg"
                                        onClick={() => navigate(-1)}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        Back
                                    </button>
                                </div> */}
                                <div className="col-lg-12 col-md-8 col-sm-10">
                                    <div className="card shadow-lg p-4  ">
                                        {/* <h4 className="text-center mb-4">Verification Form</h4> */}
                                        <form onSubmit={handleVerification}
                                        >
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit " className="btn btn-primary w-50">
                                                    Verify
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    </Modal.Body>
                </Modal>

               


                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter review title"
                                    value={reviewData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter review description"
                                    value={reviewData.description}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">
                                    Rating
                                </label>
                                <div className="rating d-flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleStarClick(hoveredStar)}
                                        onMouseMove={(e) => handleMouseMove(e, star)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ cursor: "pointer", fontSize: "24px", margin: "0 5px" }}
                                    >
                                        {renderStar(star)}
                                    </span>
                                ))}
                            </div>
                            </div>
                            <Button type="submit" variant="success" className="w-100">
                                Submit Review
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>

            </>
            <Footer />
        </>
    );
};

export default CourseReviews;
