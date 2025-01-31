import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { HiOutlineSupport, HiOutlineMail, HiTicket, HiLockClosed, HiViewList } from "react-icons/hi";
import Header from "../../../components/admin/Header";
import Sidebar from '../../../components/admin/Sidebar';
import Footer from "../../../components/admin/Footer";
import OpenTicket from './OpenTickets';
import WaitingTicket from './WaitingTickets';
import ClosedTicket from './ClosedTickets';
import AllTicket from './AllTickets';
import Breadcrumb from '../../../components/admin/Breadcrumb';

const TicketList = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef();
    const breadcrumbLinks = [
        { name: 'Home', url: '/' },
        { name: 'Ticket List', url: '#' }
    ];

    useEffect(() => {
        console.log('tabsRef=', activeTab);
    }, []);

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
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 ">

                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 admin-main-container">
                    <main>
                        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-full mb-1">
                                <div className="mb-4">
                                    <Breadcrumb links={breadcrumbLinks}/>
                                    {/*<nav className="flex mb-5" aria-label="Breadcrumb">
                                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                            <li className="inline-flex items-center">
                                                <Link to={"#"} className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Ticket List</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>*/}
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Ticket List</h1>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col">
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
                        </div>
                    </main>
                </div>


            </div>

            
        </>
    );
}

export default TicketList;