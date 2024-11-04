import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactFormSchema from '../../validation-schemas/ContactFormSchema';

const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('test');
    }, []);


    const handleSubmit = (values,{resetForm}) => {
        console.log("Form data", values);
        resetForm();
    };

    return (
        <>
            <Header />
            <>
                <section className="page_banner_wrapper pb-25">
                    <div className="banner-bg">
                        <img src={bannerBg} alt="Banner background" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 pt-40">
                                <div className="section-title pb-45">
                                    <h1 className="pb-15">Get In Touch Today!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page_section contact_form_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 pb-25">
                                <div className="section-title text-center pb-30">
                                    <h2 className="pb-10">Online Contact Form</h2>
                                    <p>Submit your enquiry quickly and easily using the form below.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row form_container_row">
                            <div className="col-lg-8 offset-lg-2 pb-25">
                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        phone: '',
                                        message: '',
                                    }}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, { resetForm });
                                    }}
                                    validationSchema={ContactFormSchema}
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
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        First Name <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                                        placeholder="Enter your first name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.firstName}
                                                    />
                                                    {touched.firstName && errors.firstName ? (
                                                        <div className="text-danger">{errors.firstName}</div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Last Name <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                                                        placeholder="Enter your last name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastName}
                                                    />
                                                    {touched.lastName && errors.lastName ? (
                                                        <div className="text-danger">{errors.lastName}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Email Address <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                        placeholder="Enter your email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    {touched.email && errors.email ? (
                                                        <div className="text-danger">{errors.email}</div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder="Enter your mobile number"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label>
                                                        Do You Have Any Questions?{" "}
                                                        <span className="required_sign">*</span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        className={`form-control ${touched.message && errors.message ? "is-invalid" : ""}`}
                                                        placeholder="Enter your message"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.message}
                                                    />
                                                    {touched.message && errors.message ? (
                                                        <div className="text-danger">{errors.message}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
                                                Submit
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            <Footer />

        </>
    );
};

export default AboutUs;
