import React from 'react';
import FooterAddress from './FooterAddress';
import FooterNavigation from './FooterNavigation';
import FooterContact from './FooterContact';
import FooterCopyright from './FooterCopyright';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleContactUsNavigate = () => {
        navigate("/contact-us");
    };

    const handleAboutUsNavigate = () => {
        navigate("/about-us");
    };

    return (
        <>
            <footer className="footer-wrapper pt-50">
                <div className="container ">

                    <div className="footer pb-50">
                        <div className="row">
                            {/* <FooterAddress />
                            <FooterNavigation />
                            <FooterContact /> */}

                            <div id="footer-widget-area" className="row">
                                <div className="footer-widgets-1 col-md-4 col-sm-6">
                                    <aside className="widget_text widget_custom_html widget well">
                                        <h3 className="widget-title new-footer-title alt-font">Follow Us</h3>
                                        <div className=" ">
                                            <h5 className='footer-title-second'>Follow us at:</h5>
                                        </div>
                                    </aside>
                                    <aside className="widget_nav_menu widget well">
                                        <div className="menu-social-media-container footer-info">
                                            <ul className="menu nav">
                                                <li className="facebook">
                                                    <a target="_blank" href="#" title="Facebook">
                                                        <i className="fa-lg fa fa-facebook me-3"></i>
                                                        <span>Facebook/bookingcrm</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa-lg fa fa-instagram me-3"></i>
                                                        <span>Instagram/bookingcrm</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#" title="LinkedIn">
                                                        <i className="fa-lg fa fa-linkedin me-3"></i>
                                                        <span>Linkedin/bookingcrm</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </aside>
                                </div>

                                <div className="footer-widgets-2 col-md-4 col-sm-6">
                                    <aside className="widget_text widget_custom_html widget well">
                                        <h3 className="widget-title alt-font new-footer-title">Office</h3>
                                        <div className="">
                                            <h5 className='footer-title-second'>Registered Office</h5>
                                        </div>
                                        <div>
                                            <p>38, Dartford Business Centre, Victoria Road, Dartford, DA1 5FS</p>
                                            <p>Telephone: 020 3488 4472</p>
                                            <p>Email:info@fullstacksmsts.co.uk</p>
                                        </div>
                                    </aside>
                                </div>

                                <div className="footer-widgets-3 col-md-4 col-sm-6">
                                    <aside className="widget_text widget_custom_html widget well">
                                        <h3 className="widget-title alt-font new-footer-title">Why Choose Us</h3>
                                    </aside>
                                    <aside className="widget_nav_menu widget well">
                                        <div className="menu-why-choose-us-container footer-info">
                                            <ul className="menu">
                                                <li>
                                                    <button onClick={handleAboutUsNavigate}>
                                                        About Us
                                                    </button>
                                                </li>
                                                <li>
                                                    <button >
                                                        Terms & Conditions
                                                    </button>
                                                </li>
                                                <li>
                                                    <button >
                                                        Privacy Policy
                                                    </button>
                                                </li>
                                                <li>
                                                    <button >
                                                        Refund Policy
                                                    </button>
                                                </li>
                                                {/* <li>
                                                    <a href="#">Terms & Conditions</a>
                                                </li>
                                                <li>
                                                    <a href="#">Privacy Policy</a>
                                                </li>
                                                <li>
                                                    <a href="#">Refund Policy</a>
                                                </li> */}
                                                <li>
                                                    <button onClick={handleContactUsNavigate}>
                                                        Contact Us
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </aside>
                                </div>
                                {/* 
                                <div className="footer-widgets-4 col-md-3 col-sm-6">
                                    <aside className="widget_text widget_custom_html widget well">
                                        <div className="textwidget custom-html-widget">
                                            <div
                                                className="trustpilot-widget"
                                                data-locale="en-GB"
                                                data-template-id="53aa8912dec7e10d38f59f36"
                                                data-businessunit-id="6123c3c948a4e5001d9fece6"
                                                data-style-height="140px"
                                                data-style-width="100%"
                                                data-theme="dark"
                                                data-stars={5}
                                                data-review-languages="en"
                                                style={{ position: "relative" }}
                                            >
                                                <iframe
                                                    title="Customer reviews powered by Trustpilot"
                                                    loading="auto"
                                                    src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&businessunitId=6123c3c948a4e5001d9fece6#locale=en-GB&styleHeight=140px&styleWidth=100%25&theme=dark&stars=5&reviewLanguages=en"
                                                    style={{
                                                        position: "relative",
                                                        height: "140px",
                                                        width: "100%",
                                                        border: "none",
                                                        display: "block",
                                                        overflow: "hidden",
                                                    }}
                                                ></iframe>
                                            </div>
                                        </div>
                                    </aside>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
                <FooterCopyright />
            </footer>
        </>
    );
}

export default Footer;