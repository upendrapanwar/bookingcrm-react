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

    const events = (instructorAvailableDates || []).map(date => ({
        title: "Available",
        start: moment(date).format('YYYY-MM-DD'),
        //     color: '#ffcccb', // Changes background and border color
        // textColor: '#000000',
        className: 'full-height-event',
        // display: 'block',
    }));

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
            <section className="product_wrapper front_product_section columns-1 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-5">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Instructor Information</h2>
                                {/* <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button> */}
                                {/* <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                                    onClick={() => navigate(-1)}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                    Back
                                </button> */}
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


            <Footer />
        </>
    );
}

export default InstructorMoreInformation;