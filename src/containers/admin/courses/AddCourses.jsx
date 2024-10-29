import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateCourseSchema from '../../../validation-schemas/CreateCourseSchema';
import Loader from "../../../components/common/Loader";

const CreateCourse = () => {

    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    // console.log('cloudName---', cloudName);
    const [loading, setLoading] = useState([false]);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    /***********************************************************************/

    useEffect(() => {

        console.log('test');
    }, []);
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
     * Handle after form submission
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
        // console.log('values---', values)
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
        };

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
                                        course_format: '',
                                        regular_price: '',
                                        sale_price: '',
                                        vat: '',
                                       // availability: '',
                                        start_date: '',
                                        end_date: '',
                                        enrollment_capacity: '',
                                        course_time: '',
                                        course_information: '',
                                        additional_information: '',
                                        course_image: null,
                                    }}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, { resetForm });
                                    }}
                                    validationSchema={CreateCourseSchema}
                                >
                                    {({ values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        setFieldValue,
                                        isValid,
                                        isSubmitting
                                    }) => (
                                        <form className="form-signin" onSubmit={handleSubmit}>
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
                                                                        alt="Course Image"
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
                                                                        alt="Course default Image"
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
                                                            value={values.course_image}
                                                            onChange={(event) => {
                                                                handleChange("course_image")(event);
                                                                handleImageChange(event);
                                                            }}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.course_image && errors.course_image ? (
                                                            <small className="text-red-600">{errors.course_image}</small>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* Main Form Fields Section */}
                                                <div className="col-md-8">
                                                    <div className="row">
                                                        {/* Course Title */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="text"
                                                                name="course_title"
                                                                className="form-control"
                                                                id="courseTitle"
                                                                placeholder="Enter course title"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.course_title}
                                                            />
                                                            {touched.course_title && errors.course_title ? (
                                                                <small className="text-danger">{errors.course_title}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Category */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="text"
                                                                name="category"
                                                                className="form-control"
                                                                id="category"
                                                                placeholder="Enter course category"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.category}
                                                            />
                                                            {touched.category && errors.category ? (
                                                                <small className="text-danger">{errors.category}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Course Format */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <select
                                                                name="course_format"
                                                                className="form-control"
                                                                id="courseFormat"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.course_format}
                                                            >
                                                                <option value="" disabled>Select course format</option>
                                                                <option value="Online">Online</option>
                                                                <option value="Offline">Offline</option>
                                                                <option value="Hybrid">Hybrid (Online & Offline)</option>
                                                            </select>
                                                            {touched.course_format && errors.course_format ? (
                                                                <small className="text-danger">{errors.course_format}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Regular Price */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="number"
                                                                name="regular_price"
                                                                className="form-control"
                                                                id="regularPrice"
                                                                placeholder="Enter regular price"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.regular_price}
                                                            />
                                                            {touched.regular_price && errors.regular_price ? (
                                                                <small className="text-danger">{errors.regular_price}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Sale Price */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="number"
                                                                name="sale_price"
                                                                className="form-control"
                                                                id="salePrice"
                                                                placeholder="Enter sale price (optional)"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.sale_price}
                                                            />
                                                            {touched.sale_price && errors.sale_price ? (
                                                                <small className="text-danger">{errors.sale_price}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* VAT */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="number"
                                                                name="vat"
                                                                className="form-control"
                                                                id="vat"
                                                                placeholder="Enter VAT (percentage)"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.vat}
                                                            />
                                                            {touched.vat && errors.vat ? (
                                                                <small className="text-danger">{errors.vat}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Availability
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="text"
                                                                name="availability"
                                                                className="form-control"
                                                                id="availability"
                                                                placeholder="Availability (dd/mm/yy To dd/mm/yy)"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.availability}
                                                            />
                                                            {touched.availability && errors.availability ? (
                                                                <small className="text-danger">{errors.availability}</small>
                                                            ) : null}
                                                        </div> */}

                                                        {/* Start Date */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <label htmlFor="start_date">Start Date</label>
                                                            <input
                                                                type="date"
                                                                name="start_date"
                                                                className="form-control"
                                                                id="start_date"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.start_date}
                                                            />
                                                            {touched.start_date && errors.start_date ? (
                                                                <small className="text-danger">{errors.start_date}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* End Date */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <label htmlFor="end_date">End Date</label>
                                                            <input
                                                                type="date"
                                                                name="end_date"
                                                                className="form-control"
                                                                id="end_date"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.end_date}
                                                            />
                                                            {touched.end_date && errors.end_date ? (
                                                                <small className="text-danger">{errors.end_date}</small>
                                                            ) : null}
                                                        </div>


                                                        {/* Enrollment Capacity */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="number"
                                                                name="enrollment_capacity"
                                                                className="form-control"
                                                                id="enrollmentCapacity"
                                                                placeholder="Enter student enrollment capacity"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.enrollment_capacity}
                                                            />
                                                            {touched.enrollment_capacity && errors.enrollment_capacity ? (
                                                                <small className="text-danger">{errors.enrollment_capacity}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Course Time */}
                                                        <div className="form-group mb-4 col-md-6">
                                                            <input
                                                                type="text"
                                                                name="course_time"
                                                                className="form-control"
                                                                id="courseTime"
                                                                placeholder="Time (12:00 AM - 01:00 AM)"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.course_time}
                                                            />
                                                            {touched.course_time && errors.course_time ? (
                                                                <small className="text-danger">{errors.course_time}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Course Information */}
                                                        <div className="form-group mb-4 col-md-12">
                                                            <textarea
                                                                name="course_information"
                                                                className="form-control"
                                                                id="courseInformation"
                                                                placeholder="Enter course information"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.course_information}
                                                                rows="4"
                                                            />
                                                            {touched.course_information && errors.course_information ? (
                                                                <small className="text-danger">{errors.course_information}</small>
                                                            ) : null}
                                                        </div>

                                                        {/* Additional Information */}
                                                        <div className="form-group mb-4 col-md-12">
                                                            <textarea
                                                                name="additional_information"
                                                                className="form-control"
                                                                id="additionalInformation"
                                                                placeholder="Enter additional information (optional)"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.additional_information}
                                                                rows="4"
                                                            />
                                                            {touched.additional_information && errors.additional_information ? (
                                                                <small className="text-danger">{errors.additional_information}</small>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                                                <i className="fas fa-plus-circle mr-2"></i> Create Course
                                            </button>
                                        </form>
                                    )}
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