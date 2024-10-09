import React from 'react';
import { Link} from "react-router-dom";
import corpelLogoMain from '../../assets/images/corpel-logo-main.png'; 

const HeaderNavigation = () => {
    return(
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
                                            <Link to={"#"} className="active">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"#"}>Course Schedules</Link>
                                                <ul className="sub-menu">
                                                    <li className="li"><Link to={"#"}>All Courses</Link></li>
                                                    <li className="li"><Link to={"#"}>CITB Courses</Link></li>
                                                    <li className="li"><Link to={"#"}>Early Bird Bargains</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                
                                                <Link to={"#"}>Course Details</Link>
                                                <ul className="sub-menu">
                                                    <li className="li"><Link to={"#"}>CITB Courses</Link></li>
                                                    <li className="li"><Link to={"#"}>CSCS Labourer Green Card</Link></li>
                                                    <li className="li"><Link to={"#"}>First Aid</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"#"}>Course Delivery Options</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"#"}>About Us</Link>
                                                
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"#"}>Contact Us</Link>
                                                
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"/login"}>Login</Link>
                                            </li>
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