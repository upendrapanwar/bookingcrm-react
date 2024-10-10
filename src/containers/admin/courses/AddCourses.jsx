import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
//import citbConstructionLogo from '../assets/images/citb-SSSTS-construction-logo-300x300.png'; 
import citbConstructionLogo from '../../../assets/images/citb-SSSTS-construction-logo-300x300.png';
const CreateCourse = () => {

    const navigate = useNavigate();

    useEffect(() => {

        console.log('test');
    }, []);
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = (values, { resetForm }) => {

        axios
            .post("user/signin", values)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    // toast.success(response.data.message, {
                    //   position: "top-center",
                    //   autoClose: 3000,
                    // });

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
                    // setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/

    return (
        <>
            <Header />
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    {/* <div className="row justify-content-center">
                        <div className="col-lg-8  pt-40">
                            <div className="section-title text-center pb-45 ">
                                <h2 className="pb-15">CreateCourse</h2>
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                {/* // <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}> */}
                                <Formik
                                    initialValues={{
                                        courseTitle: '',
                                        regular_price: '',
                                        sale_price:'',
                                        vat: true,
                                        date: '',
                                        mode: '',
                                        timing: '',
                                        platform: '',
                                        availability: '',
                                        seats: '',
                                    }}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, { resetForm });
                                    }}
                                // validationSchema={UserLoginSchema}
                                >
                                    {({ values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isValid,
                                        isSubmitting
                                    }) => (
                                        <form className="form-signin" onSubmit={handleSubmit}>
                                            <h1 className="h3 mb-3 font-weight-normal text-center">Create Course</h1>
                                            <div className="flex flex-wrap -mx-4">
                                                {/* Course Title */}
                                                <div className="form-group mb-4 col-md-4">
                                                    <input
                                                        type="text"
                                                        name="course_title"
                                                        className="form-control"
                                                        id="courseTitle"
                                                        placeholder="Enter course title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.course_title}
                                                        required
                                                    />
                                                    {touched.course_title && errors.course_title ? (
                                                        <small className="text-danger">{errors.course_title}</small>
                                                    ) : null}
                                                </div>

                                                {/* Category */}
                                                <div className="form-group mb-4 col-md-4">
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
                                                    {/* <small className="form-text text-muted">Specify the category for the course.</small> */}
                                                    {touched.category && errors.category ? (
                                                        <small className="text-danger">{errors.category}</small>
                                                    ) : null}
                                                </div>

                                                {/* Course Format */}
                                                <div className="form-group mb-4 col-md-4">
                                                    <input
                                                        type="text"
                                                        name="course_format"
                                                        className="form-control"
                                                        id="courseFormat"
                                                        placeholder="Enter course format (e.g., Online)"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.course_format}
                                                        required
                                                    />
                                                    {/* <small className="form-text text-muted">Specify the format of the course.</small> */}
                                                    {touched.course_format && errors.course_format ? (
                                                        <small className="text-danger">{errors.course_format}</small>
                                                    ) : null}
                                                </div>

                                                {/* Regular Price */}
                                                <div className="form-group mb-4 col-md-4">
                                                    <input
                                                        type="number"
                                                        name="regular_price"
                                                        className="form-control"
                                                        id="regularPrice"
                                                        placeholder="Enter regular price"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.regular_price}
                                                        required
                                                    />
                                                    {/* <small className="form-text text-muted">Set the regular price for the course.</small> */}
                                                    {touched.regular_price && errors.regular_price ? (
                                                        <small className="text-danger">{errors.regular_price}</small>
                                                    ) : null}
                                                </div>

                                                {/* Sale Price */}
                                                <div className="form-group mb-4 col-md-4">
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
                                                <div className="form-group mb-4 col-md-4">
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
                                                    {/* <small className="form-text text-muted">Enter VAT percentage.</small> */}
                                                    {touched.vat && errors.vat ? (
                                                        <small className="text-danger">{errors.vat}</small>
                                                    ) : null}
                                                </div>

                                                {/* Availability */}
                                                <div className="form-group mb-4 col-md-4">
                                                    <input
                                                        type="text"
                                                        name="availability"
                                                        className="form-control"
                                                        id="availability"
                                                        placeholder="Availability"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.availability}
                                                        required
                                                    />
                                                    {touched.availability && errors.availability ? (
                                                        <small className="text-danger">{errors.availability}</small>
                                                    ) : null}
                                                </div>

                                                {/* Course Duration
                                                <div className="form-group mb-4 col-md-4">
                                                    <input
                                                        type="text"
                                                        name="course_time"
                                                        className="form-control"
                                                        id="courseTime"
                                                        placeholder="Enter course duration"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.course_time}
                                                        required
                                                    />
                                                    {/* <small className="form-text text-muted">Enter the total duration of the course.</small> */}
                                                    {/* {touched.course_time && errors.course_time ? (
                                                        <small className="text-danger">{errors.course_time}</small>
                                                    ) : null}
                                                </div> */}

                                                {/* Enrollment Capacity */}
                                                <div className="form-group mb-4 col-md-4">
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
                                                    {/* <small className="form-text text-muted">Set the maximum enrollment capacity.</small> */}
                                                    {touched.enrollment_capacity && errors.enrollment_capacity ? (
                                                        <small className="text-danger">{errors.enrollment_capacity}</small>
                                                    ) : null}
                                                </div>

                                                {/* Course Information */}
                                                <div className="form-group mb-4 col-md-6">
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
                                                    {/* <small className="form-text text-muted">Provide detailed information about the course.</small> */}
                                                    {touched.course_information && errors.course_information ? (
                                                        <small className="text-danger">{errors.course_information}</small>
                                                    ) : null}
                                                </div>

                                                {/* Additional Information */}
                                                <div className="form-group mb-4 col-md-6">
                                                    <textarea
                                                        name="additional_information"
                                                        className="form-control"
                                                        id="additionalInformation"
                                                        placeholder="Enter additional information (optional)"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.additional_information}
                                                        rows="3"
                                                    />
                                                    {touched.additional_information && errors.additional_information ? (
                                                        <small className="text-danger">{errors.additional_information}</small>
                                                    ) : null}
                                                </div>

                                            </div>
                                            <button className="btn btn-main btn-block" type="submit">
                                                <i className="fas fa-plus-circle"></i> Create Course
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