import React from "react";
import { Link} from "react-router-dom";

const FooterNavigation = () => {

    return(
        <>
            <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="footer-title pt-30">
                    <h5>Course Schedules</h5>
                </div>
                <div className="footer-info">
                    <ul>
                        <li><Link to={"#"}>All Courses</Link></li>
                        <li><Link to={"#"}>CITB Courses</Link></li>
                        <li><Link to={"#"}>Early Bird Bargains</Link></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="footer-title pt-30">
                    <h5>Our Courses</h5>
                </div>
                <div className="footer-info">
                    <ul>
                        <li><Link to={"#"}>SMSTS</Link></li>
                        <li><Link to={"#"}>SSSTS</Link></li>
                        <li><Link to={"#"}>SMSTS Refresher</Link></li>
                        <li><Link to={"#"}>SSSTS Refresher</Link></li>
                        <li><Link to={"#"}>HSA Green CSCS Card</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FooterNavigation;