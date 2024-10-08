import React from "react";
import footerSecurity from '../../assets/images/footer-security.png';

const FooterContact = () => {
    return(
        <>
            <div className="col-lg-3 col-md-6">
                <div className="footer-title pt-30">
                    <h5>Payment By</h5>
                </div>
                <div className="footer-about ">
                    <p className="pb-15"><strong> Company Registration Number:</strong> 12383206.</p>
                    <p>
                        <img src={footerSecurity} alt="" />
                    </p>
                </div>
            </div>
        </>
    );
}

export default FooterContact;