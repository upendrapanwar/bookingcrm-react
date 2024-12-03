import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactFormSchema from '../../validation-schemas/ContactFormSchema';

const ContactUs = () => {
    const navigate = useNavigate();

    const heroImageRef = useRef(null); // Create a ref for the hero image

    const setTranslate = (xPos, yPos, el) => {
        if (el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    };

    const scrollLoop = () => {
        const yScrollPosition = window.scrollY;
        setTranslate(0, yScrollPosition * -0.4, heroImageRef.current);
        requestAnimationFrame(scrollLoop); // Keep looping for a smooth effect
    };

    useEffect(() => {
        // Start the scroll loop when the component mounts
        scrollLoop();

        // Clean up the animation frame on unmount
        return () => {
            cancelAnimationFrame(scrollLoop);
        };
    }, []);

    useEffect(() => {
        console.log('test');
    }, []);


    const handleSubmit = (values, { resetForm }) => {
        console.log("Form data", values);
        resetForm();
    };

    return (
        <>
            <Header />
            <>

                <section className="hero-treatment">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 pt-40">
                                <h1 className="pb-15">Get In Touch Today!</h1>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hero-image"
                        ref={heroImageRef} // Attach the ref to this div
                        style={{
                            backgroundImage: `url(${bannerBg})`,
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed",
                            height: "500px",
                            transform: "translate3d(0, 0, 0)", // Initial transform value
                        }}
                    ></div>
                </section>

                <section className="page_section contact_form_section bgWhite">
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
                        </div>
                    </div>
                </section>
            </>
            <Footer />

        </>
    );
};

export default ContactUs;


// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Formik } from "formik";
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';
// import bannerBg from '../../assets/images/page-banner-bg.jpg';
// import ContactFormSchema from '../../validation-schemas/ContactFormSchema';

// const AboutUs = () => {
//     const navigate = useNavigate();

//     const heroImageRef = useRef(null); // Create a ref for the hero image

//     const setTranslate = (xPos, yPos, el) => {
//         if (el) {
//             el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
//         }
//     };

//     const scrollLoop = () => {
//         const yScrollPosition = window.scrollY;
//         setTranslate(0, yScrollPosition * -0.4, heroImageRef.current);
//         requestAnimationFrame(scrollLoop); // Keep looping for a smooth effect
//     };

//     useEffect(() => {
//         // Start the scroll loop when the component mounts
//         scrollLoop();

//         // Clean up the animation frame on unmount
//         return () => {
//             cancelAnimationFrame(scrollLoop);
//         };
//     }, []);

//     useEffect(() => {
//         console.log('test');
//     }, []);


//     const handleSubmit = (values, { resetForm }) => {
//         console.log("Form data", values);
//         resetForm();
//     };

//     return (
//         <>
//             <Header />
//             <>

//                 <section className="hero-treatment">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-12 pt-40">
//                                 <h1 className="pb-15">Get In Touch Today!</h1>
//                             </div>
//                         </div>
//                     </div>
//                     <div
//                         className="hero-image"
//                         ref={heroImageRef} // Attach the ref to this div
//                         style={{
//                             backgroundImage: `url(${bannerBg})`,
//                             backgroundSize: "cover",
//                             backgroundAttachment: "fixed",
//                             height: "500px",
//                             transform: "translate3d(0, 0, 0)", // Initial transform value
//                         }}
//                     ></div>
//                 </section>

//                 <section className="page_section contact_form_section bgWhite">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-8 offset-lg-2 pb-25">
//                                 <div className="section-title text-center pb-30">
//                                     <h2 className="pb-10">Online Contact Form</h2>
//                                     <p>Submit your enquiry quickly and easily using the form below.</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row form_container_row">
//                             <div className="col-lg-8 offset-lg-2 pb-25">
//                                 <Formik
//                                     initialValues={{
//                                         firstName: '',
//                                         lastName: '',
//                                         email: '',
//                                         phone: '',
//                                         message: '',
//                                     }}
//                                     onSubmit={(values, { resetForm }) => {
//                                         handleSubmit(values, { resetForm });
//                                     }}
//                                     validationSchema={ContactFormSchema}
//                                 >
//                                     {({ values,
//                                         errors,
//                                         touched,
//                                         handleChange,
//                                         handleBlur,
//                                         handleSubmit,
//                                         isValid,
//                                         isSubmitting
//                                     }) => (
//                                         <form onSubmit={handleSubmit}>
//                                             <div className="form-row">
//                                                 <div className="form-group col-md-6">
//                                                     <label>
//                                                         First Name <span className="required_sign">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         name="firstName"
//                                                         className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
//                                                         placeholder="Enter your first name"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.firstName}
//                                                     />
//                                                     {touched.firstName && errors.firstName ? (
//                                                         <div className="text-danger">{errors.firstName}</div>
//                                                     ) : null}
//                                                 </div>
//                                                 <div className="form-group col-md-6">
//                                                     <label>
//                                                         Last Name <span className="required_sign">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         name="lastName"
//                                                         className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
//                                                         placeholder="Enter your last name"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.lastName}
//                                                     />
//                                                     {touched.lastName && errors.lastName ? (
//                                                         <div className="text-danger">{errors.lastName}</div>
//                                                     ) : null}
//                                                 </div>
//                                             </div>
//                                             <div className="form-row">
//                                                 <div className="form-group col-md-6">
//                                                     <label>
//                                                         Email Address <span className="required_sign">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="email"
//                                                         name="email"
//                                                         className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
//                                                         placeholder="Enter your email"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.email}
//                                                     />
//                                                     {touched.email && errors.email ? (
//                                                         <div className="text-danger">{errors.email}</div>
//                                                     ) : null}
//                                                 </div>
//                                                 <div className="form-group col-md-6">
//                                                     <label>Phone Number</label>
//                                                     <input
//                                                         type="tel"
//                                                         name="phone"
//                                                         className="form-control"
//                                                         placeholder="Enter your mobile number"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.phone}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="form-row">
//                                                 <div className="form-group col-md-12">
//                                                     <label>
//                                                         Do You Have Any Questions?{" "}
//                                                         <span className="required_sign">*</span>
//                                                     </label>
//                                                     <textarea
//                                                         name="message"
//                                                         className={`form-control ${touched.message && errors.message ? "is-invalid" : ""}`}
//                                                         placeholder="Enter your message"
//                                                         onChange={handleChange}
//                                                         onBlur={handleBlur}
//                                                         value={values.message}
//                                                     />
//                                                     {touched.message && errors.message ? (
//                                                         <div className="text-danger">{errors.message}</div>
//                                                     ) : null}
//                                                 </div>
//                                             </div>
//                                             <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
//                                                 Submit
//                                             </button>
//                                         </form>
//                                     )}
//                                 </Formik>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </>
//             <Footer />

//         </>
//     );
// };

// export default AboutUs;
