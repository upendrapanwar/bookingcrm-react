import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import corpelLogoMain from '../../assets/images/corpel-logo-white.png';
import shoping_cart from '../../assets/icons/shoppingCart.svg';
import { useSelector } from 'react-redux';
import Loader from "../../components/common/Loader";

const HeaderNavigation = () => {
    const cart = useSelector((state) => state.cart.cart || []);
    // const authInfo = JSON.parse(localStorage.getItem("authInfo"));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigation = async (path) => {
        setLoading(true);

        // Simulate a brief loading time
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

        if (window.location.pathname === path) {
            navigate(path, { replace: true, state: { key: Date.now() } });
        } else {
            navigate(path);
        }

        window.scrollTo(0, 0);
        setLoading(false);
    };

    // Yahan har item ki quantity ko total mein add kar rahe hain
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // const logout = (e) => {
    //     localStorage.clear();
    //     navigate("/login");
    //     window.location.href = "/login";
    // }


    return (
        <>
            {loading === true ? <Loader /> : ''}
            <div className="loading-overlay">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            <div className="navigation">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-12 col-12">
                            <nav className="navbar navbar-expand-lg justify-content-between">
                                <Link to={"#"} className="navbar-brand">
                                    <img src={corpelLogoMain} alt="Logo" />
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>

                                <div className="navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/"} className="active">Home</Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link to={"#"}>Course Schedules</Link>
                                            <ul className="sub-menu">
                                                <li className="li"><Link to={"/course-listing"}>All Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>CITB Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>Early Bird Bargains</Link></li>
                                            </ul>
                                        </li> */}
                                        <li className="nav-item">

                                            <Link to={"#"}>Course Details</Link>
                                            <ul className="sub-menu">
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CITB Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>SMSTS</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Monday To Friday</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Day Release</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="/course-listing#" onClick={() => handleNavigation('/course-listing')}>Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>SSSTS</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Weekday</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>SMSTS Refresher</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Weekday</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                        <li><Link to="" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>SSSTS Refresher</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Weekday</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Classroom</Link>
                                                                    <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                    <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                    <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>HSA Green CSCS Card</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Online</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Temporary Works</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Temporary Works Supervisor</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Temporary Works Co-Ordinator</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>TWS Refresher</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>SEATS</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Directors Role Health & Safety</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Leadership & Management</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>PRINCE2 Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>PRINCE2 7th Edition Courses</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>PRINCE2 Agile Courses</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>PRINCE2 7 E-Learning Courses</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>NEBOSH Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>NEBOSH Construction</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>NEBOSH General Certificate</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>HSE Certificate H & S</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>IOSH Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>IOSH Managing Safely</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Online</Link> </li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Classroom</Link> </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>IOSH Working Safely</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 2</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 3</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 4</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 5</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 6</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>ILM Level 7</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CMI Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CMI Management & Leadership</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CMI Coaching & Mentoring</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CMI Professional Consulting</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>CMI Project Management</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>EUSR SHEA Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>SHEA Gas</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>SHEA Water</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>SHEA Power</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>18th Edition Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Level 3 Electrical (BS7671:2018)</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Update Course (2382:22)</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>First Aid Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Level 3 First Aid At Work</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="li"><Link to={"/course-listing"}>Emergency First Aid At Work</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Greater London</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Essex</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Midlands</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North East England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>North West England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Norwich</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Scotland</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South East England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South West England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>South England</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Yorkshire</Link></li>
                                                                <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Wales</Link></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Mental Health Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Mental Health & Wellbeing</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Mental Health Awareness</Link></li>
                                                        <li><Link to="/course-listing" onClick={() => handleNavigation('/course-listing')}>Mental Health First Aid</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>IEMA Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Level 1 Health & Safety</Link></li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>E-Learning Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')} >Construction</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Hospitality</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>Business</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}onClick={() => handleNavigation('/course-listing')}>Social & Care</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"} onClick={() => handleNavigation('/course-listing')}>In House Training</Link></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/course-delivery-option"}>Course Delivery Options</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/about-us"}>About Us</Link>

                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/contact-us"}>Contact Us</Link>
                                        </li>


                                        {/* <li className="nav-item position-relative">
                                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                                <img src={shoping_cart} alt="Cart" className="cart-icon-small w-5" />
                                                {courseCount > 0 && (
                                                    <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-circle">
                                                    0
                                                </span>
                                                )}
                                            </Link>
                                        </li> */}

                                        <li className="nav-item position-relative">
                                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                                <img src={shoping_cart} alt="Cart" className="cart-icon-small w-5" />
                                                <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-circle">
                                                    {totalQuantity > 0 ? totalQuantity : 0}
                                                </span>
                                            </Link>
                                        </li>

                                        {/* <li className="nav-item position-relative">
                                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                                <img src={shoping_cart} alt="Cart" className="cart-icon-small w-5" />
                                                <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-circle">
                                                    {courseCount > 0 ? courseCount : 0}
                                                </span>
                                            </Link>
                                        </li> */}
                                        {/* <li className="nav-item position-relative">
                                            <Link to="/cart" className="nav-link d-flex align-items-center">
                                                <img src={shoping_cart} alt="Cart" className="cart-icon-small w-5" />
                                                {courseCount  > 0 ? (
                                                    <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-circle">
                                                        {courseCount}
                                                    </span>                    
                                                ):(
                                                    <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-circle">
                                                        0
                                                    </span>
                                                )
                                            } 
                                                
                                            </Link>
                                        </li> */}


                                        {/* {authInfo && authInfo.name ? (
                                            <li className="nav-item">
                                                <Link to={"#"} onClick={(e) => logout()}>Logout</Link>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link to={"/login"}>Login</Link>
                                            </li>
                                        )} */}

                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HeaderNavigation;