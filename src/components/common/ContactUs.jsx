import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
//import bannerBg from '../../assets/images/page-banner-bg.jpg';
import ContactForm from '../../containers/student/ContactForm';
import RaiseTicket from '../../containers/student/RaiseTicket';
import { useHeader } from './HeaderContext';
import { Tabs } from "flowbite-react";
import { HiOutlineSupport , HiOutlineMail } from "react-icons/hi";

const ContactUs = () => {
    
    const [loading, setLoading] = useState([false]);
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
                                                    <ContactForm />
                                                </Tabs.Item>
                                                <Tabs.Item title="Raise a Ticket" icon={HiOutlineSupport }>
                                                    <div className="">
                                                        <div className="section-title text-center pb-30">
                                                            <h2 className="pb-10">Raise a Ticket</h2>
                                                            <p>Submit your ticket quickly and easily using the form below.</p>
                                                        </div>
                                                    </div>
                                                    <RaiseTicket />
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
