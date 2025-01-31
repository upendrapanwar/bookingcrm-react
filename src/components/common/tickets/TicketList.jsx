import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useHeader } from '../HeaderContext';
import { Tabs } from "flowbite-react";
import { HiOutlineSupport, HiOutlineMail, HiTicket, HiLockClosed, HiViewList } from "react-icons/hi";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import OpenTicket from './OpenTicket';
import WaitingTicket from './WaitingTicket';
import ClosedTicket from './ClosedTicket';
import AllTicket from './AllTicket';

const TicketList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef();
    const { setHeaderData } = useHeader();
    const validEmail = localStorage.getItem('valid_email');
    
    useEffect(() => {
        
        if(!validEmail) {
            navigate('/contact-us');
        }
        console.log('tabsRef=',activeTab);
        setHeaderData({
            heading: 'Get In Touch Today!',
        })
    }, [setHeaderData]);

    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle Tab Click
     * 
     * @param {*} index 
     * @returns null
     */
    const handleTabClick = (index) => {
        setKey(prevKey => prevKey + 1);
        setActiveTab(index);
    };
    /***********************************************************************/
    /***********************************************************************/
    return (
        <>
            <Header />
            <section className="page_section contact_form_section bgWhite product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>TicketList</h1>
                        </div>
                    </div>
                    <div className="course_listing_wraps">
                        <div className="accordion" id="ProductAccordion">
                            <div className="">
                                <Tabs aria-label="Default tabs" variant="default" ref={tabsRef} onActiveTabChange={handleTabClick}>
                                    <Tabs.Item active title="All" icon={HiTicket} >
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">All</h2>

                                            </div>
                                        </div>
                                        {activeTab === 0 ? <AllTicket key={key} /> : ''}
                                        
                                    </Tabs.Item>

                                    <Tabs.Item title="Open" icon={HiOutlineMail}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Open</h2>
                                            </div>
                                        </div>
                                        {activeTab === 1 ? <OpenTicket key={key} /> : ''}
                                        
                                    </Tabs.Item>
                                    <Tabs.Item title="Waiting" icon={HiViewList}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Waiting</h2>

                                            </div>
                                        </div>
                                        {activeTab === 2 ? <WaitingTicket key={key} /> : ''}
                                        
                                    </Tabs.Item>
                                    <Tabs.Item title="Closed" icon={HiLockClosed}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Closed</h2>

                                            </div>
                                        </div>
                                        {activeTab === 3 ? <ClosedTicket key={key} /> : ''}
                                        
                                    </Tabs.Item>
                                    

                                </Tabs>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default TicketList;