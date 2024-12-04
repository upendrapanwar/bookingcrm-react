import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
//import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactFormSchema from '../../validation-schemas/ContactFormSchema';
import { useHeader } from './HeaderContext';
import { Button, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiOutlineSupport , HiOutlineMail } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const ContactUs = () => {

    const { setHeaderData } = useHeader();
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef();
    useEffect(() => {
        setHeaderData({
            heading: 'Get In Touch Today!',
        })
        // Start the scroll loop when the component mounts
        //scrollLoop();

        // Clean up the animation frame on unmount
       // return () => {
       //     cancelAnimationFrame(scrollLoop);
        //};
    }, [setHeaderData]);
    
    /***********************************************************************/
    /***********************************************************************/
    /**
    * Handle to toggleAccordion
    * 
    */
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
        /*
        setTimeout(() => {
            if (accordionRefs.current[index]) {
                accordionRefs.current[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 100);*/
    };
    /***********************************************************************/
    /***********************************************************************/
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    
    /***********************************************************************/
    /***********************************************************************/
    
    const handleSubmit = (values, { resetForm }) => {
        console.log("Form data", values);
        resetForm();
    };

    /***********************************************************************/
    /***********************************************************************/
    const handleSubmitTicket = (values, { resetForm }) => {
        console.log("Ticket Form data", values);
        resetForm();
    };
    return (
        <>
            <Header />
            <>
                <section className="page_section contact_form_section bgWhite product_wrapper front_product_section columns-1 pb-25">
                    <div className="container">
                    
                        <div className="row">
                            <div className="course_listing_wraps">
                                <div className="accordion" id="ProductAccordion">
                                
                                    
                                    <div className="">
                                        <Tabs aria-label="Default tabs" variant="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                                                <Tabs.Item active title="Online Contact Form" icon={HiOutlineMail}>
                                                    <div className="">
                                                        <div className="section-title text-center pb-30">
                                                            <h2 className="pb-10">Online Contact Form</h2>
                                                            <p>Submit your enquiry quickly and easily using the form below.</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
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
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-12 text-center">
                                                                                <button type="submit" className="btn btn-md btn-orange px-4" disabled={isSubmitting || !isValid}>
                                                                                    Submit
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                )}
                                                            </Formik>
                                                        </div>
                                                </Tabs.Item>
                                                <Tabs.Item title="Raise a Ticket" icon={HiOutlineSupport }>
                                                <div className="">
                                                        <div className="section-title text-center pb-30">
                                                            <h2 className="pb-10">Raise a Ticket</h2>
                                                            <p>Submit your ticket quickly and easily using the form below.</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                            <Formik
                                                                initialValues={{
                                                                    tfirstName: '',
                                                                    tlastName: '',
                                                                    temail: '',
                                                                    subject: '',
                                                                    tmessage: '',
                                                                    screenshot:'',
                                                                    status:''
                                                                }}
                                                                onSubmit={(values, { resetForm }) => {
                                                                    handleSubmitTicket(values, { resetForm });
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
                                                                    <form onSubmit={handleSubmitTicket}>
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-6">
                                                                                <label>
                                                                                    First Name <span className="required_sign">*</span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="tfirstName"
                                                                                    className={`form-control ${touched.tfirstName && errors.tfirstName ? "is-invalid" : ""}`}
                                                                                    placeholder="Enter your first name"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.tfirstName}
                                                                                />
                                                                                {touched.tfirstName && errors.tfirstName ? (
                                                                                    <div className="text-danger">{errors.tfirstName}</div>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="form-group col-md-6">
                                                                                <label>
                                                                                    Last Name <span className="required_sign">*</span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="tlastName"
                                                                                    className={`form-control ${touched.tlastName && errors.tlastName ? "is-invalid" : ""}`}
                                                                                    placeholder="Enter your last name"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.lastName}
                                                                                />
                                                                                {touched.tlastName && errors.tlastName ? (
                                                                                    <div className="text-danger">{errors.tlastName}</div>
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
                                                                                    name="temail"
                                                                                    className={`form-control ${touched.temail && errors.temail ? "is-invalid" : ""}`}
                                                                                    placeholder="Enter your email"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.temail}
                                                                                />
                                                                                {touched.temail && errors.temail ? (
                                                                                    <div className="text-danger">{errors.temail}</div>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="form-group col-md-6">
                                                                                <label>Subject</label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="subject"
                                                                                    className={`form-control ${touched.subject && errors.subject ? "is-invalid" : ""}`}
                                                                                    placeholder="Enter your email"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.subject}
                                                                                />
                                                                                {touched.subject && errors.subject ? (
                                                                                    <div className="text-danger">{errors.subject}</div>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-12">
                                                                                <label>
                                                                                    Message
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
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-12 text-center">
                                                                                <button type="submit" className="btn btn-md btn-orange px-4" disabled={isSubmitting || !isValid}>
                                                                                    Submit
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                )}
                                                            </Formik>
                                                        </div>
                                                </Tabs.Item>
                                                
                                            </Tabs> 
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </section>
            </>
            <Footer />

        </>
    );
};

export default ContactUs;
