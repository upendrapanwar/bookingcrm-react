import React, { useEffect, useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { toast } from 'react-toastify';
//import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactFormSchema from '../../validation-schemas/ContactFormSchema';

const ContactForm = () => {
    //const navigate = useNavigate();
    //const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState([false]);

    useEffect(() => {

    }, []);

    /***********************************************************************/
    /***********************************************************************/
    /**
    * Handle to toggleAccordion
    * 
    */
   /*
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
        
        setTimeout(() => {
            if (accordionRefs.current[index]) {
                accordionRefs.current[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 100);
    };*/
    /***********************************************************************/
    /***********************************************************************/
    /*const handleTabClick = (index) => {
        //setActiveTab(index);
    };*/

    /***********************************************************************/
    /***********************************************************************/

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
               
        const requestData = {
            ...values,
        };
        console.log('requestData----', requestData);
        
        axios
            .post("user/contact-us", requestData)
            .then((response) => {
                toast.dismiss();
                if (response.status) {
                    
                    //handleTicketScreenshot(response.data.data.id);
                    toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    // navigate('/admin/admin-dashboard');
                    toast.success(`Message Send Successfully!`);

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
    };

    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            <div className="">
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        subject:'',
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
                            <div className="form-group col-md-6">
                                    <label>
                                        Subject <span className="required_sign">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className={`form-control ${touched.subject && errors.subject ? "is-invalid" : ""}`}
                                        placeholder="Enter your subject"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subject}
                                    />
                                    {touched.subject && errors.subject ? (
                                        <div className="text-danger">{errors.subject}</div>
                                    ) : null}
                                </div>
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







        </>

    );
};

export default ContactForm;
