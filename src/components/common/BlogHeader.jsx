import React, { useEffect, useRef } from 'react';
import HeaderNavigation from '../common/HeaderNavigation';
import { useHeader } from './HeaderContext';
import blogbannerBg from '../../assets/images/blog-page-banner-bg.png';

const BlogHeader = () => {
    const { headerData } = useHeader();

    const heroImageRef = useRef(null);
    const scrollLoop = () => {
        const yScrollPosition = window.scrollY;
        setTranslate(0, yScrollPosition * -0.4, heroImageRef.current);
        requestAnimationFrame(scrollLoop); // Keep looping for a smooth effect
    };

    useEffect(() => {
        // Start the scroll loop when the component mounts
        scrollLoop();

        // Clean up the animation frame on unmount
        return () => {
            cancelAnimationFrame(scrollLoop);
        };
    }, []);

    const setTranslate = (xPos, yPos, el) => {
        if (el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    };
    
    
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
            <section className="hero-treatment">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 pt-40">
                            {headerData.heading ? 
                                <h1 className="pb-15">{headerData.heading}</h1>
                                : ''}
                            {headerData.paragraph1 ? 
                                <p>{headerData.paragraph1}</p>
                                : ''}
                            {headerData.paragraph2 ? 
                                <p>{headerData.paragraph2}</p>
                                : ''}    
                            </div>
                        </div>
                    </div>
                    <div
                        className="hero-image"
                        ref={heroImageRef} // Attach the ref to this div
                        style={{
                            backgroundImage: `url(${blogbannerBg})`,
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed",
                            height: "500px",
                            transform: "translate3d(0, 0, 0)", // Initial transform value
                        }}
                       
                    ></div>
                </section>
        </>
    );
}

export default BlogHeader;