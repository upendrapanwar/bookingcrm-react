import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Loader from "../../../components/common/Loader";
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Sidebar from '../../../components/admin/Sidebar';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";



const InstructorMoreInformation = () => {

    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const instructorId = query.get('id');
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    const [loading, setLoading] = useState([false]);
    const [instructor, setInstructor] = useState('')
    // const [instructorAvailableDates, setInstructorAvailableDates] = useState([]);
    const instructorAvailableDates = instructor.instructor_available_dates
    console.log('instructor---', instructor)
    console.log('instructorAvailableDates---', instructorAvailableDates)
    /***********************************************************************/

    useEffect(() => {
        console.log("TEST");
        getinstructor();
    }, []);

    /***********************************************************************/
    /***********************************************************************/

    /**
    * Handle image size
    * 
    */
    const getinstructor = (e) => {
        setLoading(true);
        console.log('getinstructorrun--');
        axios
            .get(`admin/get_instructor_byId/${instructorId}`)
            .then((response) => {
                // toast.dismiss();
                console.log('response of instructor---', response)
                if (response.data.status) {
                    setInstructor(response.data.data);
                    // toast.success(response.data.message, { autoClose: 3000 });


                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    // const events = (instructorAvailableDates || []).map(date => ({
    //     title: "Available",
    //     start: moment(date.date).format('YYYY-MM-DD'),
    //     //     color: '#ffcccb', // Changes background and border color
    //     // textColor: '#000000',
    //     className: 'full-height-event',
    //     // display: 'block',
    // }));

    const events = (instructorAvailableDates || []).map(date => {
        //  console.log('Raw Date:', date.date);  


        const formattedDate = moment.utc(date.date).format('YYYY-MM-DD');
        //  console.log('Formatted Date:', formattedDate); 


        const event = {
            start: formattedDate,
            className: date.status === 'Free' ? 'available-event' : 'engaged-event',
            title: "",
            backgroundColor: '',
            textColor: '',
            extendedProps: {}
        };


        if (date.status === 'Free') {
            event.title = "Available";
            event.backgroundColor = '#4CAF50';
            event.textColor = '#FFFFFF';
        } else if (date.status === 'Engaged') {
            event.title = "Engaged";
            event.backgroundColor = '#FF5722';
            event.textColor = '#FFFFFF';
            if (date.course_assign) {
                event.extendedProps.courseTitle = date.course_assign;
            }
        }

        return event;
    });


    const renderEventContent = (eventInfo) => {
        const { event } = eventInfo;
        const { title, extendedProps } = event;

        return (
            <div className="fc-event-content">

                <div className="event-title ">
                    <div> {title}</div>
                </div>
                <hr className="course-divider" />

                {extendedProps.courseTitle && (
                    <>

                        <div className="course-title">
                            {/* <br className='course-divider'/> */}
                            {/* <hr className="course-divider" /> */}
                            <strong>Course: </strong>{extendedProps.courseTitle}
                        </div>
                    </>
                )}
            </div>
        );
    };

    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        console.log('values---', values)

        const requestData = {
            ...values,
            id: instructorId,
            updated_By: authInfo.id,
            // course_schedule_dates: courseScheduleDates,
        };
        console.log('requestData---', requestData)
        axios
            .put("admin/update_instructor", requestData)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    // resetForm();
                    navigate(-1);

                } else {
                    resetForm();
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    resetForm();
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/


    /***********************************************************************/

    // console.log('instructor in react', instructor)
    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 admin-main-container">
                    <main>
                        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-full mb-1">
                                <div className="mb-4">
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Instructor Information</h1>
                                </div>
                            </div>
                            <div className="sm:flex">
                                <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                                        onClick={() => navigate(-1)}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        Back
                                    </button>

                                </div>
                            </div>
                        </div>
                        <section className="product_wrapper front_product_section columns-1 pb-25">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="instructor-details">
                                                <p><strong>Name:</strong> {instructor.first_name} {instructor.last_name} </p>
                                                <p><strong>Email:</strong> {instructor.email}</p>
                                                {/* <p><strong>Bio:</strong> Experienced instructor with over 10 years of teaching in various fields.</p>
                                                <p><strong>Availability:</strong> Mondays and Wednesdays, 9:00 AM - 3:00 PM</p> */}
                                            </div>
                                        </div>
                                        <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">

                                            <div className="col-md-12">
                                                <FullCalendar
                                                    height="125vh"
                                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                                    initialView="dayGridMonth"
                                                    headerToolbar={{
                                                        left: '',
                                                        center: 'title',
                                                        right: 'prev,next today'
                                                    }}
                                                    // dateClick={handleDateClick}
                                                    events={events}
                                                    eventContent={renderEventContent}
                                                // eventClick={handleEventClick}
                                                // eventContent={renderEventContent}
                                                // ref={calendarRef}
                                                // eventClassNames="fc-daygrid-event"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default InstructorMoreInformation;