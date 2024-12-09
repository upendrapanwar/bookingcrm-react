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
import Sidebar from '../../../components/admin/Sidebar';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateCourseSchema from '../../../validation-schemas/CreateCourseSchema';
import Loader from "../../../components/common/Loader";
import CryptoJS from 'crypto-js';

const EditCourse = () => {

    const navigate = useNavigate();
    const fpRef = useRef(null);
    const formikRef = useRef(null);
    const fpInstanceRef = useRef(null);
    const query = new URLSearchParams(useLocation().search);
    const courseId = query.get('id');
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const cloudApi_key = process.env.REACT_APP_CLOUD_API_KEY;
    const cloudApi_secret = process.env.REACT_APP_CLOUD_API_SECRET;
    // console.log('cloudName---', cloudName);
    const [loading, setLoading] = useState([false]);
    // const [previewImage, setPreviewImage] = useState(null);
    const [course, setCourse] = useState('');
    const [previewImage, setPreviewImage] = useState(course.course_image || null);
    const [imageFile, setImageFile] = useState(null);
    const [courseInformationValue, setCourseInformationValue] = useState(null);
    const [courseScheduleDates, setCourseScheduleDates] = useState(null);
    const [zoomLinks, setZoomLinks] = useState([]);
    const [linkInput, setLinkInput] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [timeRanges, setTimeRanges] = useState([{ key: 0, time: null }]);

    const styles = {
        editor: {
            height: '16em',
            marginBottom: '3em',
        },
    };

    /***********************************************************************/

    useEffect(() => {
        getCourse();
        getCategories();
    }, []);
    /***********************************************************************/

    /* useEffect for courseScheduleDates */
    useEffect(() => {
        let fp = null;

        if (course && course.course_schedule_dates) {
            let initialDates = [];

            if (typeof course.course_schedule_dates === 'string') {
                initialDates = course.course_schedule_dates.split(',').map(date => date.trim());
            } else if (Array.isArray(course.course_schedule_dates)) {
                initialDates = course.course_schedule_dates;
            }

            setSelectedDates(initialDates);
            setCourseScheduleDates(initialDates);

            if (fpRef.current) {
                fp = flatpickr(fpRef.current, {
                    mode: "multiple",
                    dateFormat: "Y-m-d",
                    allowInput: true,
                    conjunction: ", ",
                    closeOnSelect: false,
                    inline: false,
                    static: false,
                    clickOpens: true,
                    altInput: true,
                    altFormat: "Y-m-d",
                    defaultDate: initialDates,
                    onReady: function (selectedDates, dateStr, instance) {
                        instance.altInput.placeholder = "Click to select dates";
                        instance.altInput.value = selectedDates.length ? dateStr : "Click to select dates";
                        instance.input.style.display = 'none';

                        if (formikRef.current && initialDates.length > 0) {
                            formikRef.current.setFieldValue('courseScheduleDates', initialDates);
                        }
                    },
                    onChange: (dates) => {
                        const formattedDates = dates.map(date => {
                            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                                .toISOString()
                                .split('T')[0];
                        });
                        setSelectedDates(formattedDates);
                        setCourseScheduleDates(formattedDates);

                        if (formikRef.current) {
                            formikRef.current.setFieldValue('courseScheduleDates', formattedDates);
                        }
                    }
                });

                fpInstanceRef.current = fp;

                if (initialDates.length > 0) {
                    fp.setDate(initialDates, false);
                }
            }
        }

        return () => {
            if (fpInstanceRef.current) {
                fpInstanceRef.current.destroy();
                fpInstanceRef.current = null;
            }
        };
    }, [course]);
    /***********************************************************************/

    /* useEffect for coursetime */
    useEffect(() => {
        if (course.course_time && Array.isArray(course.course_time)) {
            const initialTimeRanges = course.course_time.map((timeSlot, index) => {
                const startTime = dayjs(timeSlot.start, 'hh:mm A');
                const endTime = dayjs(timeSlot.end, 'hh:mm A');
                return {
                    key: index,
                    time: [startTime, endTime]
                };
            });
            setTimeRanges(initialTimeRanges.length > 0 ? initialTimeRanges : [{ key: 0, time: null }]);
        }
    }, [course.course_time]);

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
                    setCourse(response.data.data);
                    setPreviewImage(response.data.data.course_image)
                    setZoomLinks(response.data.data.zoom_links || []);
                    // toast.success(response.data.message, { autoClose: 3000 });
                    console.log('response---', response)

                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
                if (response.data.data.course_information) {
                    setCourseInformationValue(response.data.data.course_information);
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
            setPreviewImage(course.course_image || null);
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

        if (course.course_image) {
            oldImagePublicId = course.course_image.split('/').pop().split('.')[0];
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
            id: courseId,
            updated_By: authInfo.id,
            ...(imageData && {
                course_image: imageData.secure_url,
                image_id: imageData.public_id
            }),
            // course_information: courseInformationValue,
            course_information: courseInformationValue === '<p><br></p>' ? '' : courseInformationValue,
            course_schedule_dates: courseScheduleDates,
            zoom_links: zoomLinks,
        };
        console.log('requestData---', requestData)
        axios
            .put("admin/update_course", requestData)
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

    // const formatDate = (date) => {
    //     const [day, month, year] = date.split('-');
    //     return `${year}-${month}-${day}`; // yyyy-mm-dd format
    // }

    /***********************************************************************/

    // const formatDateTosave = (date) => {
    //     const d = new Date(date);
    //     const day = String(d.getDate()).padStart(2, '0');
    //     const month = String(d.getMonth() + 1).padStart(2, '0');
    //     const year = d.getFullYear();
    //     return `${day}-${month}-${year}`; // dd-mm-yyyy format with hyphens
    // };
    /***********************************************************************/

    const handleInformationChange = (value) => {
        // Store the raw HTML value
        setCourseInformationValue(value);

        const isEmptyContent = !value || value === '<p><br></p>' || value.replace(/<(.|\n)*?>/g, '').trim().length === 0;

        // Update Formik with empty string if content is empty, otherwise use the value
        if (formikRef.current) {
            formikRef.current.setFieldValue('course_information', isEmptyContent ? '' : value);
            // Mark the field as touched to trigger validation
            formikRef.current.setFieldTouched('course_information', true);
        }
    };

    // Helper function to parse and format dates
    // const formatDateString = (dateStr) => {
    //     if (!dateStr) return null;
    //     const date = new Date(dateStr);
    //     if (isNaN(date.getTime())) return null; // Invalid date
    //     return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    // };


    /***********************************************************************/

    const handleTimeChange = (timeRange, index) => {
        const newTimeRanges = [...timeRanges];
        newTimeRanges[index] = {
            ...newTimeRanges[index],
            time: timeRange
        };
        setTimeRanges(newTimeRanges);

        // Format times in AM/PM format
        const formattedTimes = newTimeRanges
            .filter(range => range.time)
            .map(range => ({
                start: range.time[0].format('hh:mm A'),
                end: range.time[1].format('hh:mm A')
            }));

        if (formikRef.current) {
            formikRef.current.setFieldValue('course_time', formattedTimes);
            // setUpdatedTime(formattedTimes);
        }
    };

    const addTimeRange = () => {
        setTimeRanges([
            ...timeRanges,
            { key: timeRanges.length, time: null }
        ]);
    };

    const removeTimeRange = (indexToRemove) => {
        const newTimeRanges = timeRanges.filter((_, index) => index !== indexToRemove);
        setTimeRanges(newTimeRanges);

        const formattedTimes = newTimeRanges
            .filter(range => range.time)
            .map(range => ({
                start: range.time[0].format('hh:mm A'),
                end: range.time[1].format('hh:mm A')
            }));

        if (formikRef.current) {
            formikRef.current.setFieldValue('course_time', formattedTimes);
            //setUpdatedTime(formattedTimes);
        }
    };

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
                                    <nav className="flex mb-5" aria-label="Breadcrumb">
                                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                            <li className="inline-flex items-center">
                                                <Link to={"#"} className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                    <Link to={"#"} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Courses</Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Update Course</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Update Course</h1>
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
                        </div>
                        <div className="flex flex-col">
                            <section className="product_wrapper front_product_section columns-1 pb-25">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                                {Object.keys(course).length > 0 && (
                                                    <Formik
                                                        initialValues={{
                                                            course_title: course?.course_title || '',
                                                            category: course.category || '',
                                                            course_type: course.course_type || '',
                                                            course_format: course.course_format || '',
                                                            regular_price: course.regular_price || '',
                                                            sale_price: course.sale_price || '',
                                                            vat: course.vat || '',
                                                            enrollment_capacity: course.enrollment_capacity || '',
                                                            course_time: course.course_time || [],
                                                            course_information: course.course_information || '',
                                                            additional_information: course.additional_information || '',
                                                            course_schedule_dates: course.course_schedule_dates || courseScheduleDates,
                                                            zoom_links: course.zoom_links || '',
                                                            completing_the_course: course.completing_the_course || '',
                                                            why_use_our_training: course.why_use_our_training || '',
                                                            // course_image: course.course_image || null,
                                                        }}
                                                        onSubmit={(values, { resetForm }) => {
                                                            handleSubmit(values, { resetForm });
                                                        }}
                                                        validationSchema={CreateCourseSchema}
                                                    >
                                                        {(formikProps) => {
                                                            formikRef.current = formikProps;

                                                            return (
                                                                <form className="form-signin" onSubmit={formikProps.handleSubmit}>
                                                                    {/* <h1 className="h3 mb-3 font-weight-normal text-center">Update Course</h1> */}
                                                                    <div className="row mb-2">
                                                                        {/* Image Upload Section */}
                                                                        <div className="col-md-5">
                                                                            <div className="form-group">
                                                                                <label className="block text-gray-700 mb-2" htmlFor="courseImage">Upload Course Image</label>
                                                                                {/* Image Preview */}
                                                                                {previewImage ? (
                                                                                    <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
                                                                                        <div className="relative" style={{ width: '350px', height: '300px' }}>
                                                                                            <img
                                                                                                // width="300"
                                                                                                // height="300"
                                                                                                src={previewImage}
                                                                                                alt="Course"
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
                                                                                    name="course_image"
                                                                                    className="form-control-file border border-gray-300 rounded-lg p-2 w-full"
                                                                                    id="courseImage"
                                                                                    accept="image/*"
                                                                                    // value={values.course_image}
                                                                                    onChange={(event) => {
                                                                                        formikProps.setFieldValue("course_image", event.currentTarget.files[0]);
                                                                                        // handleChange("course_image")(event);
                                                                                        handleImageChange(event);
                                                                                    }}
                                                                                    onBlur={formikProps.handleBlur}
                                                                                />
                                                                                {formikProps.touched.course_image && formikProps.errors.course_image ? (
                                                                                    <small className="text-red-600">{formikProps.errors.course_image}</small>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>

                                                                        {/* Main Form Fields Section */}
                                                                        <div className="col-md-7">
                                                                            <div className="row">
                                                                                {/* Course Title */}
                                                                                <div className="form-group mb-4 col-md-12">
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
                                                                                </div>

                                                                                {/* Category */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="category">Category</label>
                                                                                    <select
                                                                                        name="category"
                                                                                        className="form-control"
                                                                                        id="category"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.category}
                                                                                    >
                                                                                        <option value="" disabled>Select course category</option>
                                                                                        {categories.map((categories, index) => (
                                                                                            <option key={index} value={categories.category}>
                                                                                                {categories.category}
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                    {formikProps.touched.category && formikProps.errors.category ? (
                                                                                        <small className="text-danger">{formikProps.errors.category}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Course Type */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="courseType">Course Type</label>
                                                                                    <select
                                                                                        name="course_type"
                                                                                        className="form-control"
                                                                                        id="courseType"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.course_type}
                                                                                    >
                                                                                        <option value="" disabled>Select course type</option>
                                                                                        <option value="Monday to Friday">Monday to Friday</option>
                                                                                        <option value="Day Release">Day Release</option>
                                                                                        <option value="Weekend">Weekend</option>
                                                                                    </select>
                                                                                    {formikProps.touched.course_type && formikProps.errors.course_type ? (
                                                                                        <small className="text-danger">{formikProps.errors.course_type}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Course Format */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="control">Course Format</label>
                                                                                    <select
                                                                                        name="course_format"
                                                                                        className="form-control"
                                                                                        id="courseFormat"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.course_format}
                                                                                    >
                                                                                        <option value="" disabled>Select course format</option>
                                                                                        <option value="Online">Online</option>
                                                                                        <option value="Offline">Offline</option>
                                                                                        <option value="Hybrid">Hybrid (Online & Offline)</option>
                                                                                    </select>
                                                                                    {formikProps.touched.course_format && formikProps.errors.course_format ? (
                                                                                        <small className="text-danger">{formikProps.errors.course_format}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Regular Price */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="regular_price">Regular Price</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        name="regular_price"
                                                                                        className="form-control"
                                                                                        id="regularPrice"
                                                                                        placeholder="Enter regular price"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.regular_price}
                                                                                    />
                                                                                    {formikProps.touched.regular_price && formikProps.errors.regular_price ? (
                                                                                        <small className="text-danger">{formikProps.errors.regular_price}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Sale Price */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="sale_price">Sale Price</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        name="sale_price"
                                                                                        className="form-control"
                                                                                        id="salePrice"
                                                                                        placeholder="Enter sale price (optional)"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.sale_price}
                                                                                    />
                                                                                    {formikProps.touched.sale_price && formikProps.errors.sale_price ? (
                                                                                        <small className="text-danger">{formikProps.errors.sale_price}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* VAT */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="vat">Vat</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        name="vat"
                                                                                        className="form-control"
                                                                                        id="vat"
                                                                                        placeholder="Enter VAT (percentage)"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.vat}
                                                                                    />
                                                                                    {formikProps.touched.vat && formikProps.errors.vat ? (
                                                                                        <small className="text-danger">{formikProps.errors.vat}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* Enrollment Capacity */}
                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label>Student Enrollment Capacity</label>
                                                                                    <div>
                                                                                        {[...Array(7)].map((_, i) => (
                                                                                            <div key={i} className="form-check form-check-inline">
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    name="enrollment_capacity"
                                                                                                    className="form-check-input"
                                                                                                    id={`capacity${i + 6}`}
                                                                                                    value={i + 6}
                                                                                                    onChange={formikProps.handleChange}
                                                                                                    onBlur={formikProps.handleBlur}
                                                                                                    checked={formikProps.values.enrollment_capacity == i + 6}
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor={`capacity${i + 6}`}>
                                                                                                    {i + 6}
                                                                                                </label>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                    {formikProps.touched.enrollment_capacity && formikProps.errors.enrollment_capacity ? (
                                                                                        <small className="text-danger">{formikProps.errors.enrollment_capacity}</small>
                                                                                    ) : null}
                                                                                </div>




                                                                                {/* Course Time */}

                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="course_time">Course Time</label>
                                                                                    <div className="time-ranges-container">
                                                                                        {timeRanges.map((range, index) => (
                                                                                            <div key={range.key} className="mb-2 d-flex align-items-center gap-2">
                                                                                                <TimePicker.RangePicker
                                                                                                    prefix={<SmileOutlined />}
                                                                                                    format="hh:mm A"
                                                                                                    use12Hours
                                                                                                    value={range.time}
                                                                                                    onChange={(time) => handleTimeChange(time, index)}
                                                                                                    className="flex-grow-1"
                                                                                                />
                                                                                                {timeRanges.length > 1 && (
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-sm btn-outline-danger"
                                                                                                        onClick={() => removeTimeRange(index)}
                                                                                                    >
                                                                                                        <i className="fas">X</i>
                                                                                                    </button>
                                                                                                )}
                                                                                            </div>
                                                                                        ))}

                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-outline-secondary btn-md mt-2 px-3"
                                                                                            onClick={addTimeRange}
                                                                                        >
                                                                                            Add More
                                                                                        </button>
                                                                                    </div>
                                                                                    {formikProps.touched.course_time && formikProps.errors.course_time ? (
                                                                                        <small className="text-danger">{formikProps.errors.course_time}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/*courseScheduleDates */}
                                                                                <div className="form-group mb-4 col-md-12">
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

                                                                                        {/* Selected Dates Table */}
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
                                                                                                                                {/* <i className="fas fa-times">X</i> */}
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
                                                                                </div>

                                                                                <div className="form-group mb-4 col-md-12">
                                                                                    <label htmlFor="zoomLinks">Add Zoom Links:</label>
                                                                                    <div className="zoom-links">
                                                                                        {/* Input Field for Adding New Links */}
                                                                                        <input
                                                                                            type="text"
                                                                                            id="zoomLinks"
                                                                                            name="zoomLinks"
                                                                                            className="form-control"
                                                                                            value={linkInput}
                                                                                            onChange={(e) => setLinkInput(e.target.value)}
                                                                                            placeholder="Enter a Zoom link"
                                                                                        />
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-outline-secondary btn-md mt-2 px-3"
                                                                                            onClick={() => {
                                                                                                if (linkInput) {
                                                                                                    const newLinks = [...zoomLinks, linkInput];
                                                                                                    setZoomLinks(newLinks);
                                                                                                    setLinkInput("");
                                                                                                    if (formikRef.current) {
                                                                                                        formikRef.current.setFieldValue("zoomLinks", newLinks);
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            Add Link
                                                                                        </button>
                                                                                        {formikProps.touched.zoomLinks && formikProps.errors.zoomLinks ? (
                                                                                            <small className="text-danger">{formikProps.errors.zoomLinks}</small>
                                                                                        ) : null}

                                                                                        {/* Zoom Links Table */}
                                                                                        {zoomLinks.length > 0 && (
                                                                                            <div className="mt-4">
                                                                                                <div className="card shadow-sm">
                                                                                                    <div className="table-responsive">
                                                                                                        <table className="table table-hover table-sm mb-0">
                                                                                                            <thead className="table-light sticky-top">
                                                                                                                <tr>
                                                                                                                    <th className="px-3 py-2">Zoom Links</th>
                                                                                                                    <th className="text-center" style={{ width: "100px" }}>Actions</th>
                                                                                                                </tr>
                                                                                                            </thead>
                                                                                                            <tbody className="small">
                                                                                                                {zoomLinks.map((link, index) => (
                                                                                                                    <tr key={index}>
                                                                                                                        <td className="px-3 py-2 align-middle">
                                                                                                                            {/* Editable Input Field */}
                                                                                                                            <input
                                                                                                                                type="text"
                                                                                                                                className="form-control"
                                                                                                                                value={link}
                                                                                                                                onChange={(e) => {
                                                                                                                                    const updatedLinks = [...zoomLinks];
                                                                                                                                    updatedLinks[index] = e.target.value;
                                                                                                                                    setZoomLinks(updatedLinks);
                                                                                                                                    if (formikRef.current) {
                                                                                                                                        formikRef.current.setFieldValue("zoomLinks", updatedLinks);
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </td>
                                                                                                                        <td className="text-center align-middle">
                                                                                                                            {/* Delete Button */}
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                className="btn btn-md btn-outline-danger p-2 px-3"
                                                                                                                                onClick={() => {
                                                                                                                                    const updatedLinks = zoomLinks.filter((_, i) => i !== index);
                                                                                                                                    setZoomLinks(updatedLinks);
                                                                                                                                    if (formikRef.current) {
                                                                                                                                        formikRef.current.setFieldValue("zoomLinks", updatedLinks);
                                                                                                                                    }
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Delete
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
                                                                                </div>


                                                                            </div>
                                                                        </div>


                                                                        <div className="col-md-12">
                                                                            <div className="row">

                                                                                {/* Course Information */}
                                                                                <div className="form-group mb-4 col-md-6">
                                                                                    <label htmlFor="course_information">Course Information</label>
                                                                                    <ReactQuill
                                                                                        className='discr_reactquill'
                                                                                        style={styles.editor}
                                                                                        placeholder="Enter course information"
                                                                                        value={courseInformationValue || ''}
                                                                                        onChange={handleInformationChange}
                                                                                        onBlur={() => {
                                                                                            // Mark field as touched when focus leaves the editor
                                                                                            formikRef.current?.setFieldTouched('course_information', true);
                                                                                        }}
                                                                                    />
                                                                                    {formikProps.touched.course_information && formikProps.errors.course_information ? (
                                                                                        <small className="text-danger">{formikProps.errors.course_information}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                {/* <div className="col-md-6">
                                                                    <div className="collum"> */}
                                                                                {/* Additional Information */}
                                                                                <div className="form-group mb-4 col-md-6">
                                                                                    <label htmlFor="additional_information">Aditional Information</label>
                                                                                    <textarea
                                                                                        name="additional_information"
                                                                                        className="form-control"
                                                                                        id="additionalInformation"
                                                                                        placeholder="Enter additional information (optional)"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.additional_information}
                                                                                        rows="12"
                                                                                    />
                                                                                    {formikProps.touched.additional_information && formikProps.errors.additional_information ? (
                                                                                        <small className="text-danger">{formikProps.errors.additional_information}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                <div className="form-group mb-3 col-md-6">
                                                                                    <label htmlFor="completing_the_course">Completing the course</label>
                                                                                    <textarea
                                                                                        name="completing_the_course"
                                                                                        className="form-control"
                                                                                        id="completingthecourse"
                                                                                        placeholder="Enter completing the course information (optional)"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.completing_the_course}
                                                                                        rows="8"
                                                                                    />
                                                                                    {formikProps.touched.completing_the_course && formikProps.errors.completing_the_course ? (
                                                                                        <small className="text-danger">{formikProps.errors.completing_the_course}</small>
                                                                                    ) : null}
                                                                                </div>

                                                                                <div className="form-group mb-3 col-md-6">
                                                                                    <label htmlFor="why_use_our_training">Why Use Bookinglive Training</label>
                                                                                    <textarea
                                                                                        name="why_use_our_training"
                                                                                        className="form-control"
                                                                                        id="whyuseourtraining"
                                                                                        placeholder="Enter why use Bookinglive training"
                                                                                        onChange={formikProps.handleChange}
                                                                                        onBlur={formikProps.handleBlur}
                                                                                        value={formikProps.values.why_use_our_training}
                                                                                        rows="8"
                                                                                    />
                                                                                    {formikProps.touched.why_use_our_training && formikProps.errors.why_use_our_training ? (
                                                                                        <small className="text-danger">{formikProps.errors.why_use_our_training}</small>
                                                                                    ) : null}
                                                                                </div>
                                                                                {/* </div>
                                                                </div> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-md px-4 rounded">
                                                                        Update Course
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
                        </div>


                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default EditCourse;