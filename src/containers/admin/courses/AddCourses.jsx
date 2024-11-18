import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import ReactQuill from "react-quill";
import flatpickr from 'flatpickr';
import { SmileOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.min.css';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateCourseSchema from '../../../validation-schemas/CreateCourseSchema';
import Loader from "../../../components/common/Loader";

const CreateCourse = () => {

    const navigate = useNavigate();
    const fpRef = useRef(null);
    const formikRef = useRef(null);
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    // console.log('cloudName---', cloudName);
    const [loading, setLoading] = useState([false]);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [courseInformationValue, setCourseInformationValue] = useState(null);
    const [courseScheduleDates, setCourseScheduleDates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [timeRanges, setTimeRanges] = useState([ { key: 0, time: null } ]);
    

    const styles = {
        editor: {
            height: '16em',
            marginBottom: '3em',
        },
    };


    /***********************************************************************/

    useEffect(() => {
        getCategories();

        let fp = null;

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
                onReady: function (selectedDates, dateStr, instance) {
                    instance.altInput.placeholder = "Click to select dates";
                    instance.altInput.value = selectedDates.length ? dateStr : "Click to select dates";
                    instance.input.style.display = 'none';
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

            // Set initial dates if they exist
            if (selectedDates.length > 0) {
                const dateObjects = selectedDates.map(dateStr => new Date(dateStr));
                fp.setDate(dateObjects, true);
            }

            // Store flatpickr instance in ref for later use
            fpRef.current.flatpickr = fp;
        }

        return () => {
            if (fpRef.current && fpRef.current.flatpickr) {
                fpRef.current.flatpickr.destroy();
            }
        };
    }, []);

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

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`; // dd-mm-yyyy format with hyphens
    };

    /***********************************************************************/

    /**
     * Handle image size
     * 
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.size <= 5242880) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setPreviewImage(null);
            toast.error("Image size must be less than 5 MB", { autoClose: 3000 });
        }
    };


    /***********************************************************************/

    /**
     * Handle Image Upload
     * 
     */
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'booking-crm-image');
        formData.append("cloud_name", cloudName);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            // return response.data.secure_url;
            return response.data;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Image upload failed');
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
            imageData = await handleImageUpload(imageFile);
        }
        console.log('imageData---', imageData)
        const requestData = {
            ...values,
            instructorId: authInfo.id,
            ...(imageData && {
                course_image: imageData.secure_url,
                image_id: imageData.public_id,
            }),
            start_date: formatDate(values.start_date),
            end_date: formatDate(values.end_date),
            course_information: courseInformationValue,
            courseScheduleDates: courseScheduleDates,
        };
        console.log('requestData----', requestData)
        axios
            .post("admin/add_course", requestData)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    // navigate('/admin/admin-dashboard');
                    navigate(-1)

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

    const handleInformationChange = (value) => {
        console.log('value1234--', value)
        setCourseInformationValue(value)
        if (formikRef.current) {
            formikRef.current.setFieldValue('course_information', value);
        }
    };


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
                start: range.time[0].format('hh:mm A'),  // Changed format here
                end: range.time[1].format('hh:mm A')     // Changed format here
            }));

            if (formikRef.current) {
                formikRef.current.setFieldValue('course_time', formattedTimes);
            }
        //formikProps.setFieldValue('course_time', formattedTimes);
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
            }
        //formikProps.setFieldValue('course_time', formattedTimes);
    };

    /***********************************************************************/
    //console.log('categories-----', categories)

    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                <Formik
                                    initialValues={{
                                        course_title: '',
                                        category: '',
                                        course_type: '',
                                        course_format: '',
                                        regular_price: '',
                                        sale_price: '',
                                        vat: '',
                                        enrollment_capacity: '',
                                        course_time: [],
                                        course_information: '',
                                        additional_information: '',
                                        course_image: null,
                                        courseScheduleDates: [],
                                        completing_the_course: '',
                                        why_use_our_training: '',
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={CreateCourseSchema}
                                >
                                    {(formikProps) => {
                                        formikRef.current = formikProps;

                                        return (
                                            <form className="form-signin" onSubmit={formikProps.handleSubmit}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <h1 className="h3 font-weight-normal text-center">Create Course</h1>
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
                                                    {/* Image Upload Section */}
                                                    <div className="col-md-4">
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
                                                                            alt="Course default"
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
                                                                //value={formikProps.values.course_image}
                                                                //onChange={formikProps.handleChange}
                                                                onChange={(event) => {
                                                                    formikProps.setFieldValue("course_image", "");
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
                                                    <div className="col-md-8">
                                                        <div className="row">
                                                            {/* Course Title */}
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
                                                            </div>

                                                            {/* Category */}
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
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
                                                            <div className="form-group mb-4 col-md-6">
                                                                <label htmlFor="enrollment_capacity">Student Enrollment Capacity</label>
                                                                <input
                                                                    type="number"
                                                                    name="enrollment_capacity"
                                                                    className="form-control"
                                                                    id="enrollmentCapacity"
                                                                    placeholder="Enter student enrollment capacity"
                                                                    onChange={formikProps.handleChange}
                                                                    onBlur={formikProps.handleBlur}
                                                                    value={formikProps.values.enrollment_capacity}
                                                                />
                                                                {formikProps.touched.enrollment_capacity && formikProps.errors.enrollment_capacity ? (
                                                                    <small className="text-danger">{formikProps.errors.enrollment_capacity}</small>
                                                                ) : null}
                                                            </div>

                                                            {/* Course Time */}
                                                            <div className="form-group mb-4 col-md-6">
                                                                <label htmlFor="course_time">Course Time</label>
                                                                <div className="time-ranges-container">
                                                                    {timeRanges.map((range, index) => (
                                                                        <div key={range.key} className="mb-2 d-flex align-items-center gap-2">
                                                                            <TimePicker.RangePicker
                                                                                prefix={<SmileOutlined />}
                                                                                format="hh:mm A"  // Changed format here
                                                                                use12Hours       // Added this to use 12-hour format
                                                                                value={range.time}
                                                                                onChange={(time) => handleTimeChange(time, index)}
                                                                                className="flex-grow-1"
                                                                            />
                                                                            {timeRanges.length > 1 && (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-sm  btn-outline-danger"
                                                                                    onClick={() => removeTimeRange(index)}
                                                                                >
                                                                                    <i className="fas">X</i>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                    
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-secondary btn-sm mt-2"
                                                                        onClick={addTimeRange}
                                                                    >
                                                                        <i className="fas  mr-1"></i> Add More
                                                                    </button>

                                                                    {/* Display selected times */}
                                                                    {/* {timeRanges.some(range => range.time) && (
                                                                        <div className="mt-3 selected-times">
                                                                            <h6 className="text-muted">Selected Time Ranges:</h6>
                                                                            <div className="selected-times-list">
                                                                                {timeRanges.map((range, index) => (
                                                                                    range.time && (
                                                                                        <div key={index} className="small text-success">
                                                                                            {range.time[0].format('hh:mm A')} - {range.time[1].format('hh:mm A')}
                                                                                        </div>
                                                                                    )
                                                                                ))}
                                                                            </div>
                                                                        </div> 
                                                                    )}*/}
                                                                </div>
                                                                {formikProps.touched.course_time && formikProps.errors.course_time ? (
                                                                    <small className="text-danger">{formikProps.errors.course_time}</small>
                                                                ) : null}
                                                            </div>

                                                            {/* courseScheduleDates */}
                                                            <div className="form-group mb-4 col-md-6">
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
                                                                                                                if (fpRef.current.flatpickr) {
                                                                                                                    const dateObjects = newDates.map(dateStr => new Date(dateStr));
                                                                                                                    fpRef.current.flatpickr.setDate(dateObjects, true);
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

                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            {/* Course Information */}
                                                            <div className="form-group mb-4 col-md-6">
                                                                <label htmlFor="course_information">Course Information</label>
                                                                <ReactQuill
                                                                    className='discr_reactquill '
                                                                    style={styles.editor}
                                                                    placeholder="Enter course information"
                                                                    value={courseInformationValue}
                                                                    onChange={handleInformationChange}
                                                                // modules={{
                                                                //     toolbar:false,
                                                                // }}
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

                                                                    {/* Completing the course */}
                                                                    <div className="form-group mb-4 col-md-6">
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

                                                                    {/* Why Use CST Training */}
                                                                    <div className="form-group mb-4 col-md-6">
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
                                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                                                    <i className="fas fa-plus-circle mr-2"></i> Create Course
                                                </button>

                                            </form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default CreateCourse;















