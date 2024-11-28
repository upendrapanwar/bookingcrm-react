import React, { useEffect, useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik } from "formik";


import flatpickr from 'flatpickr';
import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.min.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';  // For date click interaction
import axios from 'axios';
// import '@fullcalendar/daygrid/index.css';
//import '@fullcalendar/core/main.min.css';
// import '@fullcalendar/daygrid/main.css'; 
// import '@fullcalendar/interaction/main.css'; 

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For date click interaction

const InstructorDashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const instructorId = queryParams.get('id');
    const instructorName = queryParams.get('name');

    const [storedInstructorData, setStoredInstructorData] = useState({
        instructorId: '',
        instructorName: '',
    });

    const [selectedDates, setSelectedDates] = useState([]);

    const [courseScheduleDates, setCourseScheduleDates] = useState([]);

    const fpRef = useRef(null);
    const formikRef = useRef(null);

    useEffect(() => {
        // If URL parameters are present, store them in localStorage
        if (instructorId && instructorName) {
            const instructorData = { instructorId, instructorName };
            localStorage.setItem('instructorData', JSON.stringify(instructorData));
            // setStoredInstructorData(instructorData);

            const storedData = localStorage.getItem('instructorData');
            if (storedData) {
                setStoredInstructorData(JSON.parse(storedData));
            }
        }
    }, [instructorId, instructorName]);

    useEffect(() => {

        let fp = null;

        if (fpRef.current) {
            fp = flatpickr(fpRef.current, {
                mode: "multiple",
                dateFormat: "Y-m-d",
                allowInput: true,
                conjunction: ", ",
                closeOnSelect: false,
                inline: false,
                static: false,
                clickOpens: true,
                altInput: true,
                altFormat: "Y-m-d",
                onReady: function (selectedDates, dateStr, instance) {
                    instance.altInput.placeholder = "Click to select dates";
                    instance.altInput.value = selectedDates.length ? dateStr : "Click to select dates";
                    instance.input.style.display = 'none';
                },
                onChange: (dates) => {
                    const formattedDates = dates.map(date => {
                        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                            .toISOString()
                            .split('T')[0];
                    });
                    setSelectedDates(formattedDates);
                    setCourseScheduleDates(formattedDates);

                    if (formikRef.current) {
                        formikRef.current.setFieldValue('courseScheduleDates', formattedDates);
                    }
                }
            });

            // Set initial dates if they exist
            if (selectedDates.length > 0) {
                const dateObjects = selectedDates.map(dateStr => new Date(dateStr));
                fp.setDate(dateObjects, true);
            }

            // Store flatpickr instance in ref for later use
            fpRef.current.flatpickr = fp;
        }

        return () => {
            if (fpRef.current && fpRef.current.flatpickr) {
                fpRef.current.flatpickr.destroy();
            }
        };
    }, []);



    const handleSubmit = async (values, { resetForm }) => {
        // setLoading(true);
        // console.log('values---', values)
        // let imageData;
        // if (imageFile) {
        //     imageData = await handleImageUpload(imageFile);
        // }
        // console.log('imageData---', imageData)
        // const requestData = {
        //     ...values,
        //     instructorId: authInfo.id,
        //     ...(imageData && {
        //         course_image: imageData.secure_url,
        //         image_id: imageData.public_id,
        //     }),
        //     course_information: courseInformationValue,
        //     courseScheduleDates: courseScheduleDates,
        // };
        // console.log('requestData----', requestData)
        // axios
        //     .post("admin/add_course", requestData)
        //     .then((response) => {
        //         toast.dismiss();
        //         if (response.data.status) {
        //             toast.success(response.data.message, { autoClose: 3000 });
        //             resetForm();
        //             // navigate('/admin/admin-dashboard');
        //             navigate(-1)

        //         } else {
        //             resetForm();
        //             toast.error(response.data.message, { autoClose: 3000 });
        //             // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
        //         }
        //     })
        //     .catch((error) => {
        //         toast.dismiss();
        //         if (error.response) {
        //             resetForm();
        //             toast.error(error.response.data.message, { autoClose: 3000 });
        //             // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
        //         }
        //     })
        //     .finally(() => {
        //         setTimeout(() => {
        //             setLoading(false);
        //         }, 300);
        //     });
    }


    return (
        <>
            <Header />
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Hi, {storedInstructorData.instructorName || ''}!</h1>
                            {/* <p>Instructor ID from localStorage: {storedInstructorData.instructorId || 'Not available'}</p>
                            <p>Instructor Name from localStorage: {storedInstructorData.instructorName || 'Not available'}</p> */}



                            <div className="col-md-12">
                                <div className="w-full p-6 bg-slate-500 rounded-lg shadow-md">
                                    <Formik
                                        initialValues={{
                                            
                                            courseScheduleDates: []
                                           
                                        }}
                                        onSubmit={handleSubmit}
                                    >
                                        {(formikProps) => {
                                            formikRef.current = formikProps;

                                            return (
                                                <form className="form-signin" onSubmit={formikProps.handleSubmit}>


                                                    <div className="form-group mb-4 col-md-6">
                                                        <label htmlFor="courseScheduleDates">Select Course Schedule Dates:</label>
                                                        <div className="course-dates">
                                                            <input
                                                                type="text"
                                                                id="courseScheduleDates"
                                                                name="courseScheduleDates"
                                                                className="form-control"
                                                                ref={fpRef}
                                                                placeholder="Click to select dates"
                                                                readOnly
                                                            />
                                                            {formikProps.touched.courseScheduleDates && formikProps.errors.courseScheduleDates ? (
                                                                <small className="text-danger">{formikProps.errors.courseScheduleDates}</small>
                                                            ) : null}
                                                            {selectedDates.length <= 0 ? (
                                                                <small className="text-muted d-block mt-1">
                                                                    You can select multiple dates.
                                                                </small>
                                                            ) : null}

                                                            {/* Selected Dates Table */}
                                                            {selectedDates.length > 0 && (
                                                                <div className="mt-0">
                                                                    <div className="card shadow-sm">
                                                                        <div className="table-responsive" >
                                                                            <table className="table table-hover table-sm mb-0">
                                                                                <thead className="table-light sticky-top">
                                                                                    <tr>
                                                                                        <th className="px-3 py-2">Selected Dates</th>
                                                                                        <th className="text-center" style={{ width: '50px' }}></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="small">
                                                                                    {selectedDates.map((date, index) => (
                                                                                        <tr key={index}>
                                                                                            <td className="px-3 py-2 align-middle">{date}</td>
                                                                                            <td className="text-center align-middle">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-sm  btn-outline-danger  p-2"
                                                                                                    onClick={() => {
                                                                                                        const newDates = selectedDates.filter((_, i) => i !== index);
                                                                                                        setSelectedDates(newDates);
                                                                                                        setCourseScheduleDates(newDates);

                                                                                                        // Update flatpickr instance with new dates
                                                                                                        if (fpRef.current.flatpickr) {
                                                                                                            const dateObjects = newDates.map(dateStr => new Date(dateStr));
                                                                                                            fpRef.current.flatpickr.setDate(dateObjects, true);
                                                                                                        }

                                                                                                        if (formikRef.current) {
                                                                                                            formikRef.current.setFieldValue('courseScheduleDates', newDates);
                                                                                                        }
                                                                                                    }}
                                                                                                >X
                                                                                                    {/* <i className="fas fa-times">X</i> */}
                                                                                                </button>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>


                                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                                                        <i className="fas fa-plus-circle mr-2"></i> Create Course
                                                    </button>

                                                </form>
                                            );
                                        }}
                                    </Formik>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
};

export default InstructorDashboard;
