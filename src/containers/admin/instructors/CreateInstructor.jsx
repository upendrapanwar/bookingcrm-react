import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import flatpickr from 'flatpickr';
import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.min.css';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import CreateInstructorSchema from '../../../validation-schemas/CreateInstructorSchema';
import Loader from "../../../components/common/Loader";

const CreateInstructor = () => {

    const navigate = useNavigate();
    const fpRef = useRef(null);
    const formikRef = useRef(null);
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    // console.log('cloudName---', cloudName);
    const [loading, setLoading] = useState([false]);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [courseScheduleDates, setCourseScheduleDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);


    /***********************************************************************/

    useEffect(() => {
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
                        formikRef.current.setFieldValue('instructor_unavailable_dates', formattedDates);
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
        console.log('values of instructor form---', values)
        let imageData;
        if (imageFile) {
            imageData = await handleImageUpload(imageFile);
        }
        console.log('imageData of instructor form---', imageData)
        const requestData = {
            ...values,
            ...(imageData && {
                instructor_image: imageData.secure_url,
                image_id: imageData.public_id,
            }),
            // instructor_unavailable_dates: courseScheduleDates,
            created_by: authInfo.id,
        };
        console.log('requestData of instructor form----', requestData)
        axios
            .post("admin/add_instructor", requestData)
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


    /***********************************************************************/


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
                                        first_name: '',
                                        last_name: '',
                                        contact_no: '',
                                        email: '',
                                        instructor_image: '',
                                        instructor_unavailable_dates: [],
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={CreateInstructorSchema}
                                >
                                    {(formikProps) => {
                                        formikRef.current = formikProps;

                                        return (
                                            <form className="form-signin" onSubmit={formikProps.handleSubmit}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <h1 className="h3 font-weight-normal text-center">Create Instructor</h1>
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
                                                <hr className="my-4 border-2 border-gray-300" />

                                                <div className="row mb-4">
                                                    {/* Main Form Fields Section */}
                                                    <div className="col-md-8">
                                                        <div className="row">
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

                                                        </div>
                                                    </div>

                                                    {/* Image Upload Section */}
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="block text-gray-700 mb-2" htmlFor="courseImage">Upload Instructor Image</label>
                                                            {/* Image Preview */}
                                                            {previewImage ? (
                                                                <div className="pr_col product-logo md:w-2/12 mb-4 md:mb-0 flex-shrink-0">
                                                                    <div className="relative" style={{ width: '350px', height: '300px' }}>
                                                                        <img
                                                                            // width="300"
                                                                            // height="300"
                                                                            src={previewImage}
                                                                            alt="instructor"
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
                                                                            alt="instructor default"
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
                                                                id="courseImage"
                                                                accept="image/*"
                                                                //value={formikProps.values.course_image}
                                                                //onChange={formikProps.handleChange}
                                                                onChange={(event) => {
                                                                    formikProps.setFieldValue("instructor_image", "");
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

export default CreateInstructor;















