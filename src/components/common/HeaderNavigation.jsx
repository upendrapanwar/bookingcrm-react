import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import corpelLogoMain from '../../assets/images/corpel-logo-main.png';

const HeaderNavigation = () => {
    const authInfo = JSON.parse(localStorage.getItem("authInfo"));
    const navigate = useNavigate();
    const logout = (e) => {
        localStorage.clear();
        navigate("/login");
        window.location.href = "/login";
    }

    return (
        <>
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
                                        <li className="nav-item">
                                            <Link to={"#"}>Course Schedules</Link>
                                            <ul className="sub-menu">
                                                <li className="li"><Link to={"/course-listing"}>All Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>CITB Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>Early Bird Bargains</Link></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">

                                            <Link to={"#"}>Course Details</Link>
                                            <ul className="sub-menu">
                                                <li className="li"><Link to={"/course-listing"}>CITB Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing">SMSTS</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing">Monday To Friday</Link></li>
                                                                        <li><Link to="/course-listing">Day Release</Link></li>
                                                                        <li><Link to="/course-listing">Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="/course-listing#">Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing">Greater London</Link></li>
                                                                        <li><Link to="/course-listing">Essex</Link></li>
                                                                        <li><Link to="/course-listing">Midlands</Link></li>
                                                                        <li><Link to="/course-listing">North East England</Link></li>
                                                                        <li><Link to="/course-listing">North West England</Link></li>
                                                                        <li><Link to="/course-listing">Norwich</Link></li>
                                                                        <li><Link to="/course-listing">Scotland</Link></li>
                                                                        <li><Link to="/course-listing">South East England</Link></li>
                                                                        <li><Link to="/course-listing">South West England</Link></li>
                                                                        <li><Link to="/course-listing">South England</Link></li>
                                                                        <li><Link to="/course-listing">Yorkshire</Link></li>
                                                                        <li><Link to="">Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="">SSSTS</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="">Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="">Weekday</Link></li>
                                                                        <li><Link to="">Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="">Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="">Greater London</Link></li>
                                                                        <li><Link to="">Essex</Link></li>
                                                                        <li><Link to="">Midlands</Link></li>
                                                                        <li><Link to="">North East England</Link></li>
                                                                        <li><Link to="">North West England</Link></li>
                                                                        <li><Link to="">Norwich</Link></li>
                                                                        <li><Link to="">Scotland</Link></li>
                                                                        <li><Link to="">South East England</Link></li>
                                                                        <li><Link to="">South West England</Link></li>
                                                                        <li><Link to="">South England</Link></li>
                                                                        <li><Link to="">Yorkshire</Link></li>
                                                                        <li><Link to="">Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="">SMSTS Refresher</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="">Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="">Weekday</Link></li>
                                                                        <li><Link to="">Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="">Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="">Greater London</Link></li>
                                                                        <li><Link to="">Essex</Link></li>
                                                                        <li><Link to="">Midlands</Link></li>
                                                                        <li><Link to="">North East England</Link></li>
                                                                        <li><Link to="">North West England</Link></li>
                                                                        <li><Link to="">Norwich</Link></li>
                                                                        <li><Link to="">Scotland</Link></li>
                                                                        <li><Link to="">South East England</Link></li>
                                                                        <li><Link to="">South West England</Link></li>
                                                                        <li><Link to="">South England</Link></li>
                                                                        <li><Link to="">Yorkshire</Link></li>
                                                                        <li><Link to="">Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing">SSSTS Refresher</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Online</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing">Weekday</Link></li>
                                                                        <li><Link to="/course-listing">Weekend</Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link to="/course-listing">Classroom</Link>
                                                                    <li><Link to="/course-listing">Greater London</Link></li>
                                                                    <li><Link to="/course-listing">North West England</Link></li>
                                                                    <li><Link to="/course-listing">South West England</Link></li>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing">HSA Green CSCS Card</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Online</Link></li>
                                                                <li><Link to="/course-listing">Classroom</Link>
                                                                    <ul className="sub-menu">
                                                                        <li><Link to="/course-listing">Greater London</Link></li>
                                                                        <li><Link to="/course-listing">Essex</Link></li>
                                                                        <li><Link to="/course-listing">Midlands</Link></li>
                                                                        <li><Link to="/course-listing">North East England</Link></li>
                                                                        <li><Link to="/course-listing">North West England</Link></li>
                                                                        <li><Link to="/course-listing">Norwich</Link></li>
                                                                        <li><Link to="/course-listing">Scotland</Link></li>
                                                                        <li><Link to="/course-listing">South East England</Link></li>
                                                                        <li><Link to="/course-listing">South West England</Link></li>
                                                                        <li><Link to="/course-listing">South England</Link></li>
                                                                        <li><Link to="/course-listing">Yorkshire</Link></li>
                                                                        <li><Link to="/course-listing">Wales</Link></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing">Temporary Works</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Temporary Works Supervisor</Link></li>
                                                                <li><Link to="/course-listing">Temporary Works Co-Ordinator</Link></li>
                                                                <li><Link to="/course-listing">TWS Refresher</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing">SEATS</Link></li>
                                                        <li><Link to="/course-listing">Directors Role Health & Safety</Link></li>
                                                        <li><Link to="/course-listing">Leadership & Management</Link></li>
                                                        <li><Link to="/course-listing">Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>PRINCE2 Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing">PRINCE2 7th Edition Courses</Link></li>
                                                        <li><Link to="/course-listing">PRINCE2 Agile Courses</Link></li>
                                                        <li><Link to="/course-listing">PRINCE2 7 E-Learning Courses</Link></li>
                                                        <li><Link to="/course-listing">Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>NEBOSH Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing">NEBOSH Construction</Link></li>
                                                        <li><Link to="/course-listing">NEBOSH General Certificate</Link></li>
                                                        <li><Link to="/course-listing">HSE Certificate H & S</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>IOSH Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link to="/course-listing">IOSH Managing Safely</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Online</Link> </li>
                                                                <li><Link to="/course-listing">Classroom</Link> </li>
                                                            </ul>
                                                        </li>
                                                        <li><Link to="/course-listing">IOSH Working Safely</Link></li>
                                                        <li><Link to="/course-listing">Bulk order | Contact</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>ILM Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 2</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 3</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 4</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 5</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 6</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>ILM Level 7</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>CMI Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"}>CMI Management & Leadership</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>CMI Coaching & Mentoring</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>CMI Professional Consulting</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>CMI Project Management</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>EUSR SHEA Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"}>SHEA Gas</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>SHEA Water</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>SHEA Power</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>18th Edition Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"}>Level 3 Electrical (BS7671:2018)</Link> </li>
                                                        <li className="li"><Link to={"/course-listing"}>Update Course (2382:22)</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>First Aid Courses</Link>
                                                    <ul className="sub-menu">
                                                        <li className="li"><Link to={"/course-listing"}>Level 3 First Aid At Work</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Greater London</Link></li>
                                                                <li><Link to="/course-listing">Essex</Link></li>
                                                                <li><Link to="/course-listing">Midlands</Link></li>
                                                                <li><Link to="/course-listing">North East England</Link></li>
                                                                <li><Link to="/course-listing">North West England</Link></li>
                                                                <li><Link to="/course-listing">Norwich</Link></li>
                                                                <li><Link to="/course-listing">Scotland</Link></li>
                                                                <li><Link to="/course-listing">South East England</Link></li>
                                                                <li><Link to="/course-listing">South West England</Link></li>
                                                                <li><Link to="/course-listing">South England</Link></li>
                                                                <li><Link to="/course-listing">Yorkshire</Link></li>
                                                                <li><Link to="/course-listing">Wales</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="li"><Link to={"/course-listing"}>Emergency First Aid At Work</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link to="/course-listing">Greater London</Link></li>
                                                                <li><Link to="/course-listing">Essex</Link></li>
                                                                <li><Link to="/course-listing">Midlands</Link></li>
                                                                <li><Link to="/course-listing">North East England</Link></li>
                                                                <li><Link to="/course-listing">North West England</Link></li>
                                                                <li><Link to="/course-listing">Norwich</Link></li>
                                                                <li><Link to="/course-listing">Scotland</Link></li>
                                                                <li><Link to="/course-listing">South East England</Link></li>
                                                                <li><Link to="/course-listing">South West England</Link></li>
                                                                <li><Link to="/course-listing">South England</Link></li>
                                                                <li><Link to="/course-listing">Yorkshire</Link></li>
                                                                <li><Link to="/course-listing">Wales</Link></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>Mental Health Courses</Link>
                                                    <ul className="sub-menu">
                                                    <li><Link to="/course-listing">Mental Health & Wellbeing</Link></li>
                                                    <li><Link to="/course-listing">Mental Health Awareness</Link></li>
                                                    <li><Link to="/course-listing">Mental Health First Aid</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>IEMA Courses</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>Level 1 Health & Safety</Link></li>
                                                <li className="li"><Link to={"/course-listing"}>E-Learning Courses</Link>
                                                    <ul className="sub-menu">
                                                    <li className="li"><Link to={"/course-listing"}>Construction</Link> </li>
                                                    <li className="li"><Link to={"/course-listing"}>Hospitality</Link> </li>
                                                    <li className="li"><Link to={"/course-listing"}>Business</Link> </li>
                                                    <li className="li"><Link to={"/course-listing"}>Social & Care</Link> </li>
                                                    </ul>
                                                </li>
                                                <li className="li"><Link to={"/course-listing"}>In House Training</Link></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"#"}>Course Delivery Options</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/about-us"}>About Us</Link>

                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/contact-us"}>Contact Us</Link>

                                        </li>

                                        {authInfo && authInfo.name ? (
                                            <li className="nav-item">
                                                <Link to={"#"} onClick={(e) => logout()}>Logout</Link>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link to={"/login"}>Login</Link>
                                            </li>

                                        )}

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