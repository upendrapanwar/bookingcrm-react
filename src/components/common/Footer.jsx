import React from 'react';
import FooterAddress from './FooterAddress';
import FooterNavigation from './FooterNavigation';
import FooterContact from './FooterContact';
import FooterCopyright from './FooterCopyright';

const Footer = () => {
    return (
        <>
            <footer className="footer-wrapper pt-50">
                <div className="container ">

                    <div className="footer pb-50">
                        <div className="row">
                            <FooterAddress />
                            <FooterNavigation />
                            <FooterContact />
                        </div>
                    </div>
                </div>
                <FooterCopyright />
            </footer>
        </>
    );
}

export default Footer;