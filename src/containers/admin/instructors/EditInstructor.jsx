import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import ReactQuill from "react-quill";
import flatpickr from 'flatpickr';

import { SmileOutlined } from '@ant-design/icons';
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.min.css';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateInstructorSchema from '../../../validation-schemas/CreateInstructorSchema';
import Loader from "../../../components/common/Loader";
import CryptoJS from 'crypto-js';

const EditInstructor = () => {

    const navigate = useNavigate();
    const fpRef = useRef(null);
    const formikRef = useRef(null);
    const fpInstanceRef = useRef(null);
    const query = new URLSearchParams(useLocation().search);
    const instructorId = query.get('id');
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const cloudApi_key = process.env.REACT_APP_CLOUD_API_KEY;
    const cloudApi_secret = process.env.REACT_APP_CLOUD_API_SECRET;
    const [loading, setLoading] = useState([false]);
    const [instructor, setInstructor] = useState('');
    const [previewImage, setPreviewImage] = useState(instructor.instructor_image || null);
    const [imageFile, setImageFile] = useState(null);
   // const [courseScheduleDates, setCourseScheduleDates] = useState(null);



    /***********************************************************************/

    useEffect(() => {
        console.log("TEST");
         getinstructor();
    }, []);
    /***********************************************************************/

    /* useEffect for courseScheduleDates */
    // useEffect(() => {
    //     let fp = null;

    //     if (course && course.course_schedule_dates) {
    //         let initialDates = [];

    //         if (typeof course.course_schedule_dates === 'string') {
    //             initialDates = course.course_schedule_dates.split(',').map(date => date.trim());
    //         } else if (Array.isArray(course.course_schedule_dates)) {
    //             initialDates = course.course_schedule_dates;
    //         }

    //         setSelectedDates(initialDates);
    //         setCourseScheduleDates(initialDates);

    //         if (fpRef.current) {
    //             fp = flatpickr(fpRef.current, {
    //                 mode: "multiple",
    //                 dateFormat: "Y-m-d",
    //                 allowInput: true,
    //                 conjunction: ", ",
    //                 closeOnSelect: false,
    //                 inline: false,
    //                 static: false,
    //                 clickOpens: true,
    //                 altInput: true,
    //                 altFormat: "Y-m-d",
    //                 defaultDate: initialDates,
    //                 onReady: function (selectedDates, dateStr, instance) {
    //                     instance.altInput.placeholder = "Click to select dates";
    //                     instance.altInput.value = selectedDates.length ? dateStr : "Click to select dates";
    //                     instance.input.style.display = 'none';

    //                     if (formikRef.current && initialDates.length > 0) {
    //                         formikRef.current.setFieldValue('courseScheduleDates', initialDates);
    //                     }
    //                 },
    //                 onChange: (dates) => {
    //                     const formattedDates = dates.map(date => {
    //                         return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    //                             .toISOString()
    //                             .split('T')[0];
    //                     });
    //                     setSelectedDates(formattedDates);
    //                     setCourseScheduleDates(formattedDates);

    //                     if (formikRef.current) {
    //                         formikRef.current.setFieldValue('courseScheduleDates', formattedDates);
    //                     }
    //                 }
    //             });

    //             fpInstanceRef.current = fp;

    //             if (initialDates.length > 0) {
    //                 fp.setDate(initialDates, false);
    //             }
    //         }
    //     }

    //     return () => {
    //         if (fpInstanceRef.current) {
    //             fpInstanceRef.current.destroy();
    //             fpInstanceRef.current = null;
    //         }
    //     };
    // }, [course]);
    /***********************************************************************/


    /***********************************************************************/
    /**
    * Handle image size
    * 
    */
    const getinstructor = (e) => {
        setLoading(true);
        console.log('getinstructorrun--');
        axios
            .get(`admin/get_instructor_byId/${instructorId}`)
            .then((response) => {
                // toast.dismiss();
                console.log('response of instructor---', response)
                if (response.data.status) {
                    setInstructor(response.data.data);
                    setPreviewImage(response.data.data.instructor_image)
                    // toast.success(response.data.message, { autoClose: 3000 });
                    

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
    /**
    * Handle to get categories
    * 
    */

    /***********************************************************************/
    /**
     * Handle image Change
     * 
     */
    const handleImageChange = (e) => {
        // const file = e.target.files[0];
        const file = e.currentTarget.files[0];

        if (file && file.size <= 5242880) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            // setPreviewImage(null);
            setPreviewImage(instructor.instructor_image || null);
            toast.error("Image size must be less than 5 MB", { autoClose: 3000 });
        }
    };


    /***********************************************************************/

    /**
     * Handle ImageUpload
     * 
     */
    const handleImageUpload = async (file) => {
        console.log('handleImageUpload run', file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'booking-crm-image');
        formData.append("cloud_name", cloudName);

        let oldImagePublicId = null;

        if (instructor.instructor_image) {
            oldImagePublicId = instructor.instructor_image.split('/').pop().split('.')[0];
        }
        console.log('oldImagePublicId---', oldImagePublicId)
        try {
            if (oldImagePublicId) {
                await deleteOldImage(oldImagePublicId);
            }

            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            return response.data;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Image upload failed');
        }
    };

    /***********************************************************************/

    /**
     * Handle deleteOldImage
     * 
     */
    const deleteOldImage = async (publicId) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${cloudApi_secret}`;
        const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);

        const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

        try {
            const response = await fetch(cloudinaryDeleteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    public_id: publicId,
                    api_key: cloudApi_key,
                    timestamp,
                    signature
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to delete old image. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Old image with public ID ${publicId} deleted successfully.`, data);
            toast.success("Existing image deleted successfully");
            return data;

        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error("Error deleting existing image");
            throw new Error('Failed to delete old image');
        }
    };
    /***********************************************************************/

    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        console.log('values---', values)
        let imageData;
        if (imageFile) {
            // const oldImagePublicId = { imagePublicId };

            try {
                imageData = await handleImageUpload(imageFile);
                // imageData = await handleImageUpload(imageFile, oldImagePublicId);
            } catch (error) {
                console.error('Error in uploading new image:', error);
            }
            // imageUrl = await handleImageUpload(imageFile);
        }
        console.log('imageData---', imageData)
        const requestData = {
            ...values,
            id: instructorId,
            updated_By: authInfo.id,
            ...(imageData && {
                instructor_image: imageData.secure_url,
                image_id: imageData.public_id
            }),
           // course_schedule_dates: courseScheduleDates,
        };
        console.log('requestData---', requestData)
        axios
            .put("admin/update_instructor", requestData)
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


    /***********************************************************************/

    /***********************************************************************/

    // console.log('instructor in react', instructor)
    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                {Object.keys(instructor).length > 0 && (
                                    <Formik
                                        initialValues={{
                                            first_name: instructor.first_name || "",
                                            last_name: instructor.last_name || "",
                                            contact_no: instructor.contact_no || "",
                                            email: instructor.email || "",

                                            // instructor_unavailable_dates: instructor.instructor_unavailable_dates || instructorUnavailableDates
                                            // course_schedule_dates: course.course_schedule_dates || courseScheduleDates,

                                            // course_image: course.course_image || null,
                                        }}
                                        onSubmit={(values, { resetForm }) => {
                                            handleSubmit(values, { resetForm });
                                        }}
                                        validationSchema={CreateInstructorSchema}
                                    >
                                        {(formikProps) => {
                                            formikRef.current = formikProps;

                                            return (
                                                <form className="form-signin" onSubmit={formikProps.handleSubmit}>
                                                    {/* <h1 className="h3 mb-3 font-weight-normal text-center">Update Course</h1> */}
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h1 className="h3 font-weight-normal text-center">Update Instructor</h1>
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
                                                    <div className="row mb-4">
                                                        
                                                        {/* Main Form Fields Section */}
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                {/* Course Title
                                                                <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="course_title">Course Title</label>
                                                                    <input
                                                                        type="text"
                                                                        name="course_title"
                                                                        className="form-control"
                                                                        id="courseTitle"
                                                                        placeholder="Enter course title"
                                                                        onChange={formikProps.handleChange}
                                                                        onBlur={formikProps.handleBlur}
                                                                        value={formikProps.values.course_title}
                                                                    />
                                                                    {formikProps.touched.course_title && formikProps.errors.course_title ? (
                                                                        <small className="text-danger">{formikProps.errors.course_title}</small>
                                                                    ) : null}
                                                                </div> */}
                                                                {/* First Name */}
                                                                <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="first_name">First Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="first_name"
                                                                        className="form-control"
                                                                        id="firstName"
                                                                        placeholder="Enter first name"
                                                                        onChange={formikProps.handleChange}
                                                                        onBlur={formikProps.handleBlur}
                                                                        value={formikProps.values.first_name}
                                                                    />
                                                                    {formikProps.touched.first_name && formikProps.errors.first_name ? (
                                                                        <small className="text-danger">{formikProps.errors.first_name}</small>
                                                                    ) : null}
                                                                </div>

                                                                {/* Last Name */}
                                                                <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="last_name">Last Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="last_name"
                                                                        className="form-control"
                                                                        id="lastName"
                                                                        placeholder="Enter last name"
                                                                        onChange={formikProps.handleChange}
                                                                        onBlur={formikProps.handleBlur}
                                                                        value={formikProps.values.last_name}
                                                                    />
                                                                    {formikProps.touched.last_name && formikProps.errors.last_name ? (
                                                                        <small className="text-danger">{formikProps.errors.last_name}</small>
                                                                    ) : null}
                                                                </div>

                                                                {/* Contact No. */}
                                                                <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="contact_no">Contact Number</label>
                                                                    <input
                                                                        type="text"
                                                                        name="contact_no"
                                                                        className="form-control"
                                                                        id="contactNo"
                                                                        placeholder="Enter contact number"
                                                                        onChange={formikProps.handleChange}
                                                                        onBlur={formikProps.handleBlur}
                                                                        value={formikProps.values.contact_no}
                                                                    />
                                                                    {formikProps.touched.contact_no && formikProps.errors.contact_no ? (
                                                                        <small className="text-danger">{formikProps.errors.contact_no}</small>
                                                                    ) : null}
                                                                </div>

                                                                {/* Email */}
                                                                <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="email">Email</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        className="form-control"
                                                                        id="email"
                                                                        placeholder="Enter email"
                                                                        onChange={formikProps.handleChange}
                                                                        onBlur={formikProps.handleBlur}
                                                                        value={formikProps.values.email}
                                                                    />
                                                                    {formikProps.touched.email && formikProps.errors.email ? (
                                                                        <small className="text-danger">{formikProps.errors.email}</small>
                                                                    ) : null}
                                                                </div>


                                                                {/* <div className="form-group mb-4 col-md-6">
                                                                    <label htmlFor="courseScheduleDates">Select Course Schedule Dates:</label>
                                                                    <div className="course-dates">
                                                                        <input
                                                                            type="text"
                                                                            id="courseScheduleDates"
                                                                            name="courseScheduleDates"
                                                                            className="form-control"
                                                                            ref={fpRef}
                                                                            placeholder="Click to select dates"
                                                                            readOnly
                                                                        />
                                                                        {formikProps.touched.courseScheduleDates && formikProps.errors.courseScheduleDates ? (
                                                                            <small className="text-danger">{formikProps.errors.courseScheduleDates}</small>
                                                                        ) : null}
                                                                        {selectedDates.length <= 0 ? (
                                                                            <small className="text-muted d-block mt-1">
                                                                                You can select multiple dates.
                                                                            </small>
                                                                        ) : null}

                                                                        {/* Selected Dates Table 
                                                                        {selectedDates.length > 0 && (
                                                                            <div className="mt-0">
                                                                                <div className="card shadow-sm">
                                                                                    <div className="table-responsive" >
                                                                                        <table className="table table-hover table-sm mb-0">
                                                                                            <thead className="table-light sticky-top">
                                                                                                <tr>
                                                                                                    <th className="px-3 py-2">Selected Dates</th>
                                                                                                    <th className="text-center" style={{ width: '50px' }}></th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody className="small">
                                                                                                {selectedDates.map((date, index) => (
                                                                                                    <tr key={index}>
                                                                                                        <td className="px-3 py-2 align-middle">{date}</td>
                                                                                                        <td className="text-center align-middle">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                className="btn btn-sm  btn-outline-danger  p-2"
                                                                                                                onClick={() => {
                                                                                                                    const newDates = selectedDates.filter((_, i) => i !== index);
                                                                                                                    setSelectedDates(newDates);
                                                                                                                    setCourseScheduleDates(newDates);

                                                                                                                    // Update flatpickr instance with new dates
                                                                                                                    if (fpInstanceRef.current) {
                                                                                                                        const dateObjects = newDates.map(dateStr => new Date(dateStr));
                                                                                                                        fpInstanceRef.current.setDate(dateObjects, true);
                                                                                                                    }

                                                                                                                    if (formikRef.current) {
                                                                                                                        formikRef.current.setFieldValue('courseScheduleDates', newDates);
                                                                                                                    }
                                                                                                                }}
                                                                                                            >X
                                                                                                                {/* <i className="fas fa-times">X</i> 
                                                                                                            </button>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div> */}

                                                            </div>
                                                        </div>

                                                        {/* Image Upload Section */}
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="block text-gray-700 mb-2" htmlFor="instructorImage">Upload Instructor Image</label>
                                                                {/* Image Preview */}
                                                                {previewImage ? (
                                                                    <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
                                                                        <div className="relative" style={{ width: '350px', height: '300px' }}>
                                                                            <img
                                                                                // width="300"
                                                                                // height="300"
                                                                                src={previewImage}
                                                                                alt="Instructor"
                                                                                className="w-full h-full object-cover"
                                                                                decoding="async"
                                                                                fetchpriority="high"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
                                                                        <div className="relative" style={{ width: '350px', height: '300px' }}>
                                                                            <img
                                                                                src={EmptyImage}
                                                                                alt="Empty course placeholder"
                                                                                className="w-full h-full object-cover"
                                                                                decoding="async"
                                                                                fetchpriority="high"
                                                                            />
                                                                            <p className="absolute inset-0 flex items-end mb-4 justify-center text-red-500  bg-opacity-50 text-center text-sm font-semibold">
                                                                                Size must be less than 5 MB
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <input
                                                                    type="file"
                                                                    name="instructor_image"
                                                                    className="form-control-file border border-gray-300 rounded-lg p-2 w-full"
                                                                    id="instructorImage"
                                                                    accept="image/*"
                                                                    // value={values.course_image}
                                                                    onChange={(event) => {
                                                                        formikProps.setFieldValue("instructor_image", event.currentTarget.files[0]);
                                                                        // handleChange("course_image")(event);
                                                                        handleImageChange(event);
                                                                    }}
                                                                    onBlur={formikProps.handleBlur}
                                                                />
                                                                {formikProps.touched.instructor_image && formikProps.errors.instructor_image ? (
                                                                    <small className="text-red-600">{formikProps.errors.instructor_image}</small>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                                                        <i className="fas fa-plus-circle mr-2"></i> Update Instructor
                                                    </button>
                                                </form>
                                            );
                                        }}
                                    </Formik>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default EditInstructor;