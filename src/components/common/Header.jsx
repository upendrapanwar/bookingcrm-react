import React from 'react';
import HeaderNavigation from '../common/HeaderNavigation';

const Header = () => {
    return (
        <>
            <header id="header-part">
                <div className="header-top pt-10 pb-10">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-xl-12">
                                <div className="address text-center text-lg-right">
                                    <p><i className="fa fa-volume-control-phone"></i> (+ 0203 597 3771) <i
                                            className="fa fa-envelope-o"></i>info@citbsmstsonline.co.uk

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <HeaderNavigation />
                
            </header>
        </>
    );
}

export default Header;