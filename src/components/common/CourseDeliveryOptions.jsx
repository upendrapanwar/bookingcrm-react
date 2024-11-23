import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import bannerBg from '../../assets/images/page-banner-bg.jpg';
import Loader from "../../components/common/Loader";

const CourseDeliveryOptions = () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("test----")
    }, []);

    return (
        <>
            {loading && <Loader />}
            <Header />
            <section className="page_banner_wrapper pb-25">
                <div className="banner-bg">
                    <img src={bannerBg} alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 pt-40">
                            <div className="pb-25">
                                <h1 className="pb-15">CITB SMSTS Online Courses</h1>
                                <p>Online Monday to Friday, Day Release &amp; Weekend Courses Are Available</p>
                                <p>Or View Our Classroom Courses Here - Site Management Safety Training Scheme</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="site grid-container container hfeed" id="page">
                <div className="site-content" id="content">
                    <div className="content-area" id="primary">
                        <main className="site-main" id="main">
                            <article
                                id="post-242"
                                className="post-242 page type-page status-publish"
                                itemType="https://schema.org/CreativeWork"
                                itemScope=""
                            >
                                <div className="inside-article">
                                    <div className="entry-content" itemProp="text">
                                        <section className="wp-block-gutentor-m3 alignfull section-gm0ad570b gutentor-module gutentor-container-cover has-color-bg has-custom-bg">
                                            <div className="grid-container">
                                                <div className="grid-row">
                                                    <div className="gutentor-single-column grid-lg-12 grid-md-12 grid-12">
                                                        <div className="gutentor-col-wrap">
                                                            <div
                                                                className="gutentor-element gutentor-element-button button-align-center-mobile popmake-547 pum-trigger"
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span className="gutentor-button-wrap">
                                                                    <Link className="gutentor-button gutentor-block-button gutentor-icon-after" to="#">
                                                                        <i className="gutentor-button-icon fas fa-arrow-right" />
                                                                        <span>Six E-Books: Just £39.99</span>
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section
                                            id="gmcc4d399"
                                            className="wp-block-gutentor-m3 section-gmcc4d399 gutentor-module gutentor-container-cover"
                                        >
                                            <div className="grid-container">
                                                <section
                                                    id="gm34d9e5b"
                                                    className="wp-block-gutentor-m4 section-gm34d9e5b gutentor-module gutentor-advanced-columns"
                                                >
                                                    <div className="grid-container">
                                                        <div className="grid-row">
                                                            <div
                                                                id="col-gm09daed"
                                                                className="wp-block-gutentor-m4-col col-gm09daed gutentor-single-column  grid-lg-12 grid-md-12 grid-12"
                                                            >
                                                                <div
                                                                    id="section-gm09daed"
                                                                    className="section-gm09daed gutentor-col-wrap"
                                                                >
                                                                    <div
                                                                        id="section-g63a303"
                                                                        className="wp-block-gutentor-e1 section-g63a303 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h3 className="gutentor-text">
                                                                                Mastering the SMSTS Online Course: A
                                                                                Comprehensive Guide
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g370e29"
                                                                        className="wp-block-gutentor-e1 section-g370e29 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">Introduction</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g54e12d"
                                                                        className="wp-block-gutentor-e0 section-g54e12d gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Welcome to “Mastering the SMSTS Online Course:
                                                                                A Comprehensive Guide.” This ebook aims to
                                                                                provide a thorough understanding of the Site
                                                                                Management Safety Training Scheme (SMSTS) and
                                                                                its significance in the construction industry.
                                                                                The SMSTS course is essential for site
                                                                                managers, providing them with the knowledge
                                                                                and skills necessary to ensure the safety and
                                                                                well-being of everyone on a construction site.
                                                                                <br />
                                                                                <br />
                                                                                Taking the SMSTS course online offers numerous
                                                                                benefits, including flexibility,
                                                                                cost-effectiveness, and access to the most
                                                                                up-to-date information. This guide will walk
                                                                                you through the course content, preparation
                                                                                strategies, and key insights to help you
                                                                                succeed in obtaining your SMSTS certification.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g2b94b3"
                                                                        className="wp-block-gutentor-e1 section-g2b94b3 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 1: Understanding the SMSTS Course
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gc77bf3"
                                                                        className="wp-block-gutentor-e0 section-gc77bf3 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                The SMSTS (Site Management Safety Training
                                                                                Scheme) is a comprehensive training course
                                                                                designed to equip site managers, agents, and
                                                                                other responsible individuals with the
                                                                                knowledge and skills necessary to effectively
                                                                                manage health and safety on construction
                                                                                sites. Developed by the Construction Industry
                                                                                Training Board (CITB), this course covers a
                                                                                wide range of topics, including relevant
                                                                                health and safety legislation, risk assessment
                                                                                strategies, site hazard identification and
                                                                                control, and the roles and responsibilities of
                                                                                site managers.
                                                                                <br />
                                                                                <br />
                                                                                Obtaining the SMSTS certification is crucial
                                                                                for anyone in a supervisory role within the
                                                                                construction industry. It demonstrates a
                                                                                commitment to maintaining high safety
                                                                                standards and is widely recognized by
                                                                                employers and industry professionals.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gef7ac7"
                                                                        className="wp-block-gutentor-e1 section-gef7ac7 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 2: Preparing for the SMSTS Online
                                                                                Course
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g3ce8a6"
                                                                        className="wp-block-gutentor-e0 section-g3ce8a6 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Preparing for the SMSTS online course requires
                                                                                careful planning and organization. Creating a
                                                                                study plan and managing your time effectively
                                                                                are critical steps to ensure success. Here are
                                                                                some tips to help you get started:
                                                                                <br />
                                                                                <br />
                                                                                <strong>Create a Study Schedule:</strong>{" "}
                                                                                Allocate specific times each day for studying
                                                                                and stick to the schedule. Consistency is key.
                                                                                <br />
                                                                                <br />
                                                                                <strong>Gather Study Materials:</strong>{" "}
                                                                                Utilize recommended resources such as
                                                                                textbooks, online articles, and practice tests
                                                                                to reinforce your understanding.
                                                                                <br />
                                                                                <br />
                                                                                <strong>Set Up Your Study Space:</strong>{" "}
                                                                                Choose a quiet, comfortable area with minimal
                                                                                distractions to maximize your focus.
                                                                                <br />
                                                                                <br />
                                                                                <strong>
                                                                                    Active Learning Techniques:
                                                                                </strong>{" "}
                                                                                Engage with the material by taking notes,
                                                                                participating in online discussions, and
                                                                                practicing with mock exams.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g435a0a"
                                                                        className="wp-block-gutentor-e1 section-g435a0a gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 3: Health and Safety Legislation
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gcb2399"
                                                                        className="wp-block-gutentor-e0 section-gcb2399 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Health and safety legislation forms the
                                                                                backbone of the SMSTS course. Key pieces of
                                                                                legislation include the Health and Safety at
                                                                                Work Act and the Construction (Design and
                                                                                Management) Regulations. These laws outline
                                                                                the legal responsibilities of site managers
                                                                                and employers to ensure a safe working
                                                                                environment.
                                                                                <br />
                                                                                <br />
                                                                                Understanding and complying with these
                                                                                regulations is essential to prevent accidents
                                                                                and injuries on construction sites. This
                                                                                chapter will explore these laws in detail and
                                                                                provide real-world examples to highlight their
                                                                                significance.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g991e69"
                                                                        className="wp-block-gutentor-e1 section-g991e69 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 4: Risk Assessments and Method
                                                                                Statements
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g497fde"
                                                                        className="wp-block-gutentor-e0 section-g497fde gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Conducting risk assessments and developing
                                                                                method statements are critical components of
                                                                                site management. Risk assessments involve
                                                                                identifying potential hazards, evaluating the
                                                                                risks, and implementing control measures to
                                                                                mitigate those risks. Method statements
                                                                                provide detailed instructions on how to carry
                                                                                out tasks safely.
                                                                                <br />
                                                                                <br />
                                                                                This chapter will guide you through the
                                                                                processes of conducting thorough risk
                                                                                assessments and developing comprehensive
                                                                                method statements, ensuring that all safety
                                                                                measures are communicated and implemented
                                                                                effectively.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g3603fa"
                                                                        className="wp-block-gutentor-e1 section-g3603fa gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 5: Site Hazard Identification and
                                                                                Control
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-ge3d711"
                                                                        className="wp-block-gutentor-e0 section-ge3d711 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Construction sites are inherently hazardous
                                                                                environments, with risks ranging from working
                                                                                at heights to machinery operations.
                                                                                Identifying and controlling these hazards is
                                                                                vital to maintaining a safe worksite.
                                                                                <br />
                                                                                <br />
                                                                                This chapter will cover common hazards,
                                                                                strategies for mitigating them, and the
                                                                                crucial role of personal protective equipment
                                                                                (PPE). Proper use of PPE can significantly
                                                                                reduce the risk of injury and ensure the
                                                                                safety of all workers on site.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g028070"
                                                                        className="wp-block-gutentor-e1 section-g028070 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 6: Roles and Responsibilities of Site
                                                                                Managers
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g507130"
                                                                        className="wp-block-gutentor-e0 section-g507130 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Site managers play a pivotal role in
                                                                                maintaining safe working practices on
                                                                                construction sites. Their responsibilities
                                                                                include overseeing site operations, ensuring
                                                                                compliance with safety regulations, and
                                                                                leading the site team effectively.
                                                                                <br />
                                                                                <br />
                                                                                This chapter will delve into the specific
                                                                                roles and responsibilities of site managers,
                                                                                provide leadership and communication
                                                                                strategies, and emphasize the importance of
                                                                                ongoing training and professional development.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g4936bf"
                                                                        className="wp-block-gutentor-e1 section-g4936bf gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 7: Exam Preparation Strategies
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gc29c4e"
                                                                        className="wp-block-gutentor-e0 section-gc29c4e gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Preparing for the SMSTS exam can be a daunting
                                                                                task, but with the right strategies, you can
                                                                                approach it with confidence. This chapter will
                                                                                provide tips for managing your time and
                                                                                stress, an overview of the exam format, and
                                                                                sample questions to help you practice and
                                                                                identify areas for improvement.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gf5a484"
                                                                        className="wp-block-gutentor-e1 section-gf5a484 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h4 className="gutentor-text">
                                                                                Chapter 8: Booking Your SMSTS Training Course
                                                                                Online
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gac7270"
                                                                        className="wp-block-gutentor-e0 section-gac7270 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                The convenience of booking your CITB SMSTS
                                                                                training course online is undeniable. It
                                                                                offers you the flexibility to choose a time
                                                                                that suits you best without leaving your
                                                                                construction site or office.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gc5be24"
                                                                        className="wp-block-gutentor-e1 section-gc5be24 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h3 className="gutentor-text">
                                                                                Pre-course Requirements
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gf97a71"
                                                                        className="wp-block-gutentor-e0 section-gf97a71 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                To extract maximum value from their training,
                                                                                participants must have a firm grasp on the
                                                                                English language. This requirement ensures
                                                                                everyone can fully engage with the material
                                                                                and successfully complete assessment exercises
                                                                                in this UK CITB SMSTS Training Course.
                                                                                <br />
                                                                                <br />
                                                                                In addition to linguistic proficiency,
                                                                                delegates should also possess some experience
                                                                                within the construction industry before
                                                                                embarking on this journey. Practical knowledge
                                                                                bolsters comprehension of the theoretical
                                                                                concepts taught during these courses.
                                                                                <br />
                                                                                <br />
                                                                                If you meet these prerequisites, then an
                                                                                initial assessment awaits completion prior to
                                                                                starting your chosen course. This helps gauge
                                                                                if any additional support may be required
                                                                                throughout your learning expedition.
                                                                                <br />
                                                                                <br />
                                                                                Apart from the prerequisites mentioned above,
                                                                                it’s important to remember to bring along a
                                                                                photographic ID the first day as part of the
                                                                                CITB SMSTS regulation for identification
                                                                                purposes.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g135db4"
                                                                        className="wp-block-gutentor-e1 section-g135db4 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h3 className="gutentor-text">
                                                                                Online Booking Process
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gee4ec7"
                                                                        className="wp-block-gutentor-e0 section-gee4ec7 gutentor-element gutentor-element-advanced-text"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                You’ll appreciate how user-friendly our
                                                                                platform is when making bookings—everything
                                                                                happens at the click of a button. Simply
                                                                                navigate through the listed courses according
                                                                                to availability dates, select one that fits
                                                                                your schedule, and proceed with the
                                                                                registration process by providing the
                                                                                necessary details and payment information.
                                                                                <br />
                                                                                An email containing joining instructions will
                                                                                follow post-confirmation, so keep a close eye
                                                                                on your inbox. If there’s anything unclear
                                                                                about the procedure, or perhaps you need more
                                                                                detailed information on specific aspects of
                                                                                the coursework, don’t hesitate to get in touch
                                                                                with the friendly team available to answer
                                                                                queries and provide assistance whenever
                                                                                needed. 0203 597 3771.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </section>
                                        {/* <section
                                            id="gm8a8211f"
                                            className="wp-block-gutentor-m3 alignfull section-gm8a8211f gutentor-module gutentor-container-cover has-color-bg has-custom-bg"
                                        >
                                            <div className="grid-container">
                                                <section
                                                    id="gm59f95ff"
                                                    className="wp-block-gutentor-m4 section-gm59f95ff gutentor-module gutentor-advanced-columns"
                                                >
                                                    <div className="grid-container">
                                                        <div className="grid-row">
                                                            <div
                                                                id="col-gm254afd"
                                                                className="wp-block-gutentor-m4-col col-gm254afd gutentor-single-column  grid-lg-12 grid-md-12 grid-12"
                                                            >
                                                                <div
                                                                    id="section-gm254afd"
                                                                    className="section-gm254afd gutentor-col-wrap"
                                                                >
                                                                    <div
                                                                        id="section-g8fb61e"
                                                                        className="wp-block-gutentor-e1 section-g8fb61e gutentor-element gutentor-element-advanced-text text-align-center-mobile"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <h2 className="gutentor-text">Need help?</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-gd6d929"
                                                                        className="wp-block-gutentor-e0 section-gd6d929 gutentor-element gutentor-element-advanced-text text-align-center-mobile"
                                                                    >
                                                                        <div className="gutentor-text-wrap">
                                                                            <p className="gutentor-text">
                                                                                Call us to discuss, ask questions, or book
                                                                                your course in person.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        id="section-g2d8ade"
                                                                        className="wp-block-gutentor-e2 section-g2d8ade gutentor-element gutentor-element-button button-align-center-mobile popmake-557 pum-trigger"
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <span className="gutentor-button-wrap">
                                                                            <a
                                                                                className="gutentor-button gutentor-block-button gutentor-icon-hide"
                                                                                href="#"
                                                                            >
                                                                                <i className="gutentor-button-icon fas fa-book" />
                                                                                <span>Get in touch</span>
                                                                            </a>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </section> */}

                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </div>

            <section className="front_section bg-orange needhelp_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 pb-25">
                            <div className="section-title text-center pb-30">
                                <h2 className="pb-10">Need help?</h2>
                                <p className="pb-20">
                                    Call us to discuss, ask questions, or book your course in person.
                                </p>
                                <a className="btn btn-md btn-white" href="#">
                                    Get in touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>



    )
}

export default CourseDeliveryOptions;