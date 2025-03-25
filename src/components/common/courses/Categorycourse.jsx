

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from "../Loader";
import Header from '../Header';
import { useHeader } from '../HeaderContext';
import Footer from '../Footer';
import { addToCart } from '../../../store/reducers/cart-reducer';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import bannerBg from '../../../assets/images/page-banner-bg.jpg';
import icon_hours from '../../../assets/images/Icons/24-hours.png';
import icon_course from '../../../assets/images/Icons/course.png';
import icons_test_results from '../../../assets/images/Icons/test-results.png';
import image_smsts from '../../../assets/images/SMSTS-1024x594.jpg';
import EmptyImage from "../../../assets/images/EmptyImage.png";
import Icons_calendar_outline from '../../../assets/images/Icons/calendar-outline.png';
import 'react-quill/dist/quill.snow.css';

const CategoryCourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setHeaderData } = useHeader();
    const today = new Date();
    // const course = location.state.course;
      const [course, setCourse] = useState(location.state?.course || {});
    //   const [course, setCourse] = useState('');
    const [isOpen, setIsOpen] = useState({ courseInfo: true, additionalInfo: false, Completing_the_course: false, Why_cst_training: false });
    

    useEffect(() => {
        const getNextAvailableDate = (dates) => {
            return dates?.map((date) => (
              <p key={date.id}>{date.name}</p>
            )) || [];
          };
          
        // const getNextAvailableDate = () => {
        //     return course.course_schedule_dates
        //         .map(dateString => new Date(dateString))
        //         .filter(date => !isNaN(date))
        //         .sort((a, b) => a - b)
        //         .find(date => {
        //             const localDate = new Date(date);
        //             localDate.setHours(0, 0, 0, 0);
        //             const localToday = new Date(today);
        //             localToday.setHours(0, 0, 0, 0);
        //             return localDate >= localToday;
        //         })
        //         ?.toLocaleDateString('en-GB')
        //         .split('/')
        //         .join('-') || 'No upcoming date available';
        // };

        setHeaderData({
            heading: `${course.course_title} | ${getNextAvailableDate()} | ${course.course_format}`,
            paragraph1: 'Online Monday to Friday, Day Release & Weekend Courses Are Available',
        });
    }, [course]);


    if (!course) {
        return <p>No course details available!</p>;
    }
    console.log('course in detail page---', course);
    /***********************************************************************/
    /***********************************************************************/
    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
    /***********************************************************************/

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); 
    };
    /***********************************************************************/

    const handleAddToCart = async (course, e) => {
        // e.preventDefault();
        const cart = { ...course };
        console.log("add to cart- cart:", cart);
        dispatch(addToCart(cart));
        toast.success(`${cart.course_title} added to cart!`);
    }
    /***********************************************************************/
    /***********************************************************************/

    const handleReviews = async (course) => {
        // e.preventDefault();
        // const course = { ...course };
        console.log("course---reviews--handle:", course);
        const id = course.id
        navigate(`/course-listing/course-reviews?id=${id}`);
    }
    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            <Header />
            <>
                <section className="page_section course_fullInfo_section pt-3 bgWhite">
                    <div className="tmpl-pricing_tables-2 boldgrid-section dynamic-gridblock color-neutral-background-color color-neutral-text-contrast bg-background-color">
                        {" "}
                        <div className="container">
                            {" "}
                            <div className="row" style={{ paddingTop: 26, paddingBottom: 0 }}>
                                {" "}
                                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12" />{" "}
                                <div className="col-md-3 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-online-monday-to-friday/"
                                            >
                                                Online – SMSTS Mon to Fri
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <p className="">
                                        <span style={{ color: "#fff" }}>s</span>
                                    </p>{" "}
                                </div>{" "}
                                <div className="col-md-8 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-day-release-online/"
                                            >
                                                Online – SMSTS Day Release
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <p className="">
                                        <span style={{ color: "#fff" }}>s</span>
                                    </p>{" "}
                                </div>{" "}
                                <div className="col-md-1 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-online-weekend/"
                                            >
                                                Online – SMSTS Weekend
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <p className="">
                                        <span style={{ color: "#fff" }}>s</span>
                                    </p>{" "}
                                </div>{" "}
                                <div className="col-lg-1 col-md-12 col-sm-12 col-xs-12" />{" "}
                            </div>{" "}
                            <div className="row" style={{ paddingTop: 12, paddingBottom: 0 }}>
                                {" "}
                                <div className="col-md-3 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-greater-london/"
                                            >
                                                Greater London
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <div className="row">
                                        {" "}
                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                            {" "}
                                            <div
                                                className="bg-box bg-box-square bg-box-border-thin color-neutral-border-color"
                                                style={{
                                                    background: "#fff",
                                                    color: "#333",
                                                    border: "1px solid"
                                                }}
                                            >
                                                {" "}
                                                <p className="" style={{ textAlign: "center" }}>
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-dartford/">
                                                            Dartford
                                                        </a>
                                                    </span>{" "}
                                                    |{" "}
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-croydon/">
                                                            Croydon
                                                        </a>
                                                    </span>{" "}
                                                    |&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-north-london/">
                                                            North London
                                                        </a>
                                                    </span>
                                                    &nbsp;|&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-central-london/">
                                                            Central London
                                                        </a>
                                                    </span>
                                                    &nbsp;|&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-west-london/">
                                                            West London
                                                        </a>
                                                    </span>
                                                    &nbsp;|&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-slough/">
                                                            Slough
                                                        </a>
                                                    </span>{" "}
                                                    |{" "}
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-watford/">
                                                            Watford
                                                        </a>
                                                    </span>
                                                </p>{" "}
                                            </div>{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>{" "}
                                <div className="col-md-3 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-essex/"
                                            >
                                                Essex
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <div className="row">
                                        {" "}
                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                            {" "}
                                            <div
                                                className="bg-box bg-box-square bg-box-border-thin color-neutral-border-color"
                                                style={{
                                                    background: "#fff",
                                                    color: "#333",
                                                    border: "1px solid"
                                                }}
                                            >
                                                {" "}
                                                <p className="" style={{ textAlign: "center" }}>
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-chelmsford/">
                                                            Chelmsford
                                                        </a>
                                                    </span>
                                                </p>{" "}
                                            </div>{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>{" "}
                                <div className="col-md-3 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-midlands/"
                                            >
                                                Midlands
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <div className="row">
                                        {" "}
                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                            {" "}
                                            <div
                                                className="bg-box bg-box-square bg-box-border-thin color-neutral-border-color"
                                                style={{
                                                    background: "#fff",
                                                    color: "#333",
                                                    border: "1px solid"
                                                }}
                                            >
                                                {" "}  
                                                <p>
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-birmingham/">
                                                            Birmingham
                                                        </a>
                                                    </span>{" "}
                                                    |{" "}
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-coventry/">
                                                            Coventry
                                                        </a>
                                                    </span>{" "}
                                                    |&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-lincoln/">
                                                            Lincoln
                                                        </a>
                                                    </span>
                                                    &nbsp;|&nbsp;
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-nottingham/">
                                                            Nottingham
                                                        </a>
                                                    </span>
                                                </p>{" "}
                                            </div>{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>{" "}
                                <div className="col-md-3 col-xs-12 col-sm-6 text-center col-lg-3">
                                    {" "}
                                    <p className="">
                                        <strong>
                                            <a
                                                className="btn btn-block btn-pill btn-color-1"
                                                href="https://www.csttraining.co.uk/smsts-north-east-england/"
                                            >
                                                North East England
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <div className="row">
                                        {" "}
                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                            {" "}
                                            <div
                                                className="bg-box bg-box-square bg-box-border-thin color-neutral-border-color"
                                                style={{
                                                    background: "#fff",
                                                    color: "#333",
                                                    border: "1px solid"
                                                }}
                                            >
                                                {" "}
                                                <p className="" style={{ textAlign: "center" }}>
                                                    <span style={{ textDecoration: "underline" }}>
                                                        <a href="https://www.csttraining.co.uk/smsts-newcastle/">
                                                            Newcastle
                                                        </a>
                                                    </span>
                                                </p>{" "}
                                            </div>{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>
                </section>
            </>

            <Footer />
        </>
    );
};

export default CategoryCourse;
