import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik } from "formik";
import axios from "axios";
//import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactForm from '../../containers/student/ContactForm';
import RaiseTicket from '../../containers/student/RaiseTicket';
import { useHeader } from './HeaderContext';
import { Tabs, Button, Modal } from "flowbite-react";
import { HiOutlineSupport, HiOutlineMail, HiOutlineExclamationCircle, HiOutlineUser } from "react-icons/hi";
import ValidateEmailSchema from '../../validation-schemas/ValidateEmailSchema';

const ContactUs = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState([false]);
    const [emailNotFound, setEmailNotFound] = useState('');
    const { setHeaderData } = useHeader();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(Number(id) || 0);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef();



    useEffect(() => {
        console.log('currenttab=', activeTab);
        const tab = Number(id);
        if (!isNaN(tab)) {
            setActiveTab(tab);
        }
        //setActiveTab(id ? id : 0);
        setEmailNotFound('');
        setHeaderData({
            heading: 'Get In Touch Today!',
        })

    }, [setHeaderData]);

    /***********************************************************************/
    /***********************************************************************/
    /**
    * Handle to toggleAccordion
    * 
    */
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Function to handle tab click
     * 
     * @param {object} index
     * @returns null
     */
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    /***********************************************************************/
    /***********************************************************************/
    /**
     * Function to navigate to all ticket page
     * 
     * @param {object} e
     * @returns null
     */
    const handleAllTicket = (e) => {
        navigate('/ticket-list');
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle email field change
     * 
     * @param null
     * @returns null
     */

    const handleChange = () => {
        setEmailNotFound('');
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle modal form submit
     * 
     * @param {*} values 
     * @param {*} param1
     * @returns null
     */
    const handleSubmit = async (values, { resetForm }) => {
        const requestData = {
            ...values
        };

        axios
            .post("user/email-exist", requestData)
            .then((response) => {

                console.log("status=", response.status);
                if (response.status) {
                    localStorage.setItem('valid_email', values.email);
                    navigate('/ticket-list');
                    resetForm();
                } else {
                    setEmailNotFound('Email not found!');
                }

            })
            .catch((error) => {

                if (error.response) {
                    setEmailNotFound(error.response.data.message);
                }
            });

    };
    /***********************************************************************/
    /***********************************************************************/

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

                                        <Tabs aria-label="Default tabs" variant="default" key={activeTab} ref={tabsRef} activeTab={activeTab} onActiveTabChange={(tab) => { setActiveTab(Number(tab)) }}>
                                            <Tabs.Item active={activeTab === 0 ? 'active' : ''} title="Online Contact Form" icon={HiOutlineMail}>
                                                <div className="">
                                                    <div className="section-title text-center pb-30">
                                                        <h2 className="pb-10">Online Contact Form</h2>
                                                        <p>Submit your enquiry quickly and easily using the form below.</p>
                                                    </div>
                                                </div>
                                                <ContactForm />
                                            </Tabs.Item>
                                            <Tabs.Item active={activeTab === 1 ? 'active' : ''} title="Raise a Ticket" icon={HiOutlineSupport}>
                                                <div className="">
                                                    <div className="section-title text-center pb-30">
                                                        <h2 className="pb-10">Raise a Ticket</h2>
                                                        <p>Submit your ticket quickly and easily using the form below.</p>
                                                        <p><button type="button" className="btn btn-md btn-orange px-4 float-right" onClick={() => setOpenModal(true)}>View Tickets</button></p>
                                                    </div>
                                                </div>
                                                <RaiseTicket />
                                            </Tabs.Item>

                                        </Tabs>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header></Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Validate Yourself</h3>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                        }}
                                        enableReinitialize={true}
                                        onSubmit={(values, { resetForm }) => {
                                            handleSubmit(values, { resetForm });
                                        }}
                                        validationSchema={ValidateEmailSchema}
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
                                            <form className="mb-6" onSubmit={handleSubmit}>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <label>
                                                            Email Address <span className="required_sign">*</span>
                                                        </label>
                                                    </div>

                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                        placeholder="Enter email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    {touched.email && errors.email ? (
                                                        <div className="text-danger">{errors.email}</div>
                                                    ) : null}
                                                    <div className="text-danger">{emailNotFound}</div>
                                                </div>
                                                <div>
                                                    <div className="w-full mt-3 flex items-center gap-2">
                                                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </section>

                <section className="google-map-section">
                    <div className="map-container" style={{ width: '100%', height: '400px' }}>
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="380"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.470374523003!2d0.21264967694731273!3d51.449291617426154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b46b64e2d8f1%3A0x648e2a03b6a23b5a!2s38%20Victoria%20Rd%2C%20Dartford%20DA1%205FS%2C%20UK!5e0!3m2!1sen!2sin!4v1710251421234!5m2!1sen!2sin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

            </>
            <Footer />

        </>
    );
};

export default ContactUs;
