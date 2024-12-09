import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import EmptyImage from "../../assets/images/EmptyImage.png";
import bannerBg from '../../assets/images/page-banner-bg.jpg';
import aboutPic from "../../assets/images/about-pic.jpg";
import smstsImage from '../../assets/images/SMSTS-1024x594.jpg';
import examIcon from '../../assets/images/Icons/exam.png';
import professionalismIcon from '../../assets/images/Icons/professionalism.png';
import architect from '../../assets/images/architect-3979490_1280.jpg';
import { useHeader } from './HeaderContext';

const AboutUs = () => {
    const navigate = useNavigate();
    const { setHeaderData } = useHeader();

    const heroImageRef = useRef(null); // Create a ref for the hero image

    // const setTranslate = (xPos, yPos, el) => {
    //     if (el) {
    //         el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    //     }
    // };

    // const scrollLoop = () => {
    //     const yScrollPosition = window.scrollY;
    //     setTranslate(0, yScrollPosition * -0.4, heroImageRef.current);
    //     requestAnimationFrame(scrollLoop); // Keep looping for a smooth effect
    // };

    useEffect(() => {
        setHeaderData({
            heading: 'CITB SMSTS Online Courses',
            paragraph1: 'Online Monday to Friday, Day Release &amp; Weekend Courses Are Available',
            paragraph2: 'Or View Our Classroom Courses Here - Site Management Safety Training Scheme'
        })
        // Start the scroll loop when the component mounts
        //scrollLoop();

        // Clean up the animation frame on unmount
       // return () => {
       //     cancelAnimationFrame(scrollLoop);
        //};
    }, [setHeaderData]);

    useEffect(() => {
        console.log('test');
    }, []);

    return (
        <>
            <Header />

            {/* <section className="hero-treatment">
            <div className="container">
                    <div className="row">
                        <div className="col-lg-12 pt-40">
                            <h1 className="pb-15">CITB SMSTS Online Courses</h1>
                            <p>Online Monday to Friday, Day Release &amp; Weekend Courses Are Available</p>
                            <p>Or View Our Classroom Courses Here - Site Management Safety Training Scheme</p>
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
            </section>        */}

            <section className="front_section Container_wrapper about_section bgWhite">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pb-10">
                            <div className="section-thumbnail">
                                {/* <img src="assets/images/SMSTS-1024x594.jpg" alt="" /> */}
                                <img src={smstsImage} alt="SMSTS Online Course" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="pb-30">
                                <h3 className="pb-10">Complete Your SMSTS Online Course in Just 5 Days for £360 Plus VAT for real-time translation in any language and transcription services in our SMSTS courses.</h3>
                                <p className="pb-15">With a success rate of 98%, this course could be your key to unlocking new opportunities in the construction industry. Enrol today in our CITB SMSTS Online Training for just £360 plus VAT and start paving your way toward a successful career in site management</p>
                                <h3 className="pb-10">Achieve Your Goals Faster with Our SMSTS Online Course</h3>
                                <p className="pb-15">Our SMSTS Online Course is helping site managers achieve their goals in record time. Managing responsibilities while staying current with health and safety regulations can be challenging for aspiring site managers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="front_section bg-orange certification_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 pb-25">
                            <div className="section-title text-center pb-30">
                                <h2 className="pb-10">Certification Process</h2>
                                <p>Completing your CITB SMSTS training course validates your knowledge and skills in site management safety, proving your compliance with UK health and safety legislation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 pb-10">
                            <div className="content-col text-center pb-30">
                                <figure className="pb-10">
                                    {/* <img src="assets/images/Icons/exam.png" alt="" /> */}
                                    <img src={examIcon} alt="SMSTS Online Course" />
                                </figure>
                                <h3 className="pb-15">Post-Exam Journey</h3>
                                <p className="pb-15">After passing the final exam, primarily consisting of multiple-choice questions, you’ll receive your official documentation within two weeks. Many delegates further their professional development by enrolling in the NVQ Level 6 in Construction Site Management or NVQ Level 6 in Contracting Operations Management courses.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="content-col text-center pb-30">
                                <figure className="pb-10">
                                    {/* <img src="assets/images/Icons/professionalism.png" alt="" /> */}
                                    <img src={professionalismIcon} alt="" />
                                </figure>
                                <h3 className="pb-15">Maintaining Certification Status</h3>
                                <p className="pb-15">Maintaining your certification status and staying updated with changes in regulations and best practices are crucial. Your initial CITB SMSTS certificate is valid for five years. After that, renewal through an SMSTS refresher two-day course is necessary.</p>
                                <p>Continuous learning is integral to responsible professional construction site management.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="front_section Container_wrapper service_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pb-10">
                            <div className="section-thumbnail">
                                {/* <img src="assets/images/architect-3979490_1280.jpg" alt="" /> */}
                                <img src={architect} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="pb-30">
                                <h2 className="pb-10">Flexible Course Delivery Options</h2>
                                <p className="pb-15">Our CITB SMSTS training courses are designed to be flexible and cater to the needs of site managers, agents, and other responsible individuals. Booking your course online offers unparalleled convenience. The cost is just £360 plus VAT, making it an affordable investment in your career.</p>
                                <p className="pb-15">Our CITB SMSTS training courses are designed to be flexible and cater to the needs of site managers, agents, and other responsible individuals. Booking your course online offers unparalleled convenience. The cost is just £360 plus VAT, making it an affordable investment in your career.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="front_section bg-light-blue Container_wrapper service_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="pb-30">
                                <h2 className="pb-10">Flexible Course Delivery Options</h2>
                                <p className="pb-15">Our CITB SMSTS training courses are designed to be flexible and cater to the needs of site managers, agents, and other responsible individuals. Booking your course online offers unparalleled convenience. The cost is just £360 plus VAT, making it an affordable investment in your career.</p>
                                <p className="pb-15">Our CITB SMSTS training courses are designed to be flexible and cater to the needs of site managers, agents, and other responsible individuals. Booking your course online offers unparalleled convenience. The cost is just £360 plus VAT, making it an affordable investment in your career.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 pb-10">
                            <div className="section-thumbnail">
                                {/* <img src="assets/images/architect-3979490_1280.jpg" alt="" /> */}
                                <img src={architect} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="front_section bg-blue benefits_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 pb-25">
                            <div className="section-title text-center pb-30">
                                <h2 className="pb-10">Benefits of Completing Your SMSTS Online</h2>
                                <p>Completing your SMSTS online has numerous advantages. Beyond flexibility, you save time and travel costs and gain access to the latest updates on health and safety regulations in construction. Remote learning is increasingly popular, making a CITB SMSTS training course online highly beneficial for site managers or those responsible for managing staff at construction sites.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 pb-10">
                            <div className="content-col text-center pb-30">
                                <figure className="pb-10">
                                    {/* <img src="assets/images/Icons/exam.png" alt="" /> */}
                                    <img src={examIcon} alt="SMSTS Online Course" />
                                </figure>
                                <h3 className="pb-15">Advance Your Career</h3>
                                <p className="pb-15">An SMSTS certification is a significant credential in the construction industry. It signifies that you possess theoretical knowledge and practical skills in site management safety practices, which employers highly value. Maintaining high standards of health and safety has a direct impact on productivity and accident rates.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content-col text-center pb-30">
                                <figure className="pb-10">
                                    {/* <img src="assets/images/Icons/professionalism.png" alt="" /> */}
                                    <img src={professionalismIcon} alt="" />
                                </figure>
                                <h3 className="pb-15">Boost Your Professional Reputation</h3>
                                <p className="pb-15">An SMSTS certificate can open doors for career advancement within your organisation or the broader sector. Site managers with this qualification are often preferred candidates for senior roles due to their understanding of best practices and legal requirements for site safety.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content-col text-center pb-30">
                                <figure className="pb-10">
                                    {/* <img src="assets/images/Icons/professionalism.png" alt="" /> */}
                                    <img src={professionalismIcon} alt="" />
                                </figure>
                                <h3 className="pb-15">Investing in Your Future</h3>
                                <p className="pb-15">If you aim to climb the professional ladder, investing time and effort into gaining CITB SMSTS certification is wise. It is recognised across the UK as a quality mark of a competent site manager, capable of ensuring safety standards are met and risks minimised.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />

        </>
    );
};

export default AboutUs;
