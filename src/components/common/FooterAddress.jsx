import React from "react";

const FooterAddress = () => {
    return(
        <>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-title pt-30">
                    <h5>Get In Touch</h5>
                </div>
                <div className="footer-address">
                    <ul>
                        <li>
                            <div className="icon map-i">
                                <i className="fa fa-map-marker"></i>
                            </div>
                            <div className="address">
                                <p>
                                    3546 196 High Road,<br />
                                    Wood Green, London,<br />
                                    England, N22 8HH.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="fa fa-volume-control-phone"></i>
                            </div>
                            <div className="address">
                                <p>+0203 597 3771</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="fa fa-envelope-o"></i>
                            </div>
                            <div className="address">
                                <p>info@citbsmstsonline.co.uk</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default FooterAddress;