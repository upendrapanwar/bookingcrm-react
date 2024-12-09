import React, { useEffect, useState, useRef } from 'react';
import { useHeader } from '../HeaderContext';
import { Tabs } from "flowbite-react";
import { HiOutlineSupport, HiOutlineMail } from "react-icons/hi";
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import OpenTicket from './OpenTicket';
import WaitingTicket from './WaitingTicket';
import ClosedTicket from './ClosedTicket';
import AllTicket from './AllTicket';

const TicketList = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef();
    const { setHeaderData } = useHeader();

    useEffect(() => {
        
        setHeaderData({
            heading: 'Get In Touch Today!',
        })
    }, [setHeaderData]);

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
                                <Tabs aria-label="Default tabs" variant="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                                    <Tabs.Item active title="Open" icon={HiOutlineMail}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Open</h2>
                                            </div>
                                        </div>
                                        <OpenTicket />
                                    </Tabs.Item>
                                    <Tabs.Item title="Waiting" icon={HiOutlineSupport}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Waiting</h2>

                                            </div>
                                        </div>
                                        <WaitingTicket />
                                    </Tabs.Item>
                                    <Tabs.Item title="Closed" icon={HiOutlineSupport}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">Closed</h2>

                                            </div>
                                        </div>
                                        <ClosedTicket />
                                    </Tabs.Item>
                                    <Tabs.Item title="All" icon={HiOutlineSupport}>
                                        <div className="">
                                            <div className="section-title text-center pb-30">
                                                <h2 className="pb-10">All</h2>

                                            </div>
                                        </div>
                                        <AllTicket />
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