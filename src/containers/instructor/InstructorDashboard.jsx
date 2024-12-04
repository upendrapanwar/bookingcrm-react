import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";

import flatpickr from 'flatpickr';
import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.min.css';


const InstructorDashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const instructorId = queryParams.get('id');
    const instructorName = queryParams.get('name');

    const [storedInstructorData, setStoredInstructorData] = useState({
        instructorId: '',
        instructorName: '',
    });

    const [courseScheduleDates, setCourseScheduleDates] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [allDates, setAllDates] = useState([]);
    const [isSuccesful, setIsSuccesful] = useState(false)

    console.log('selectedRanges--', selectedRanges)
    const fpRef = useRef(null);
    const formikRef = useRef(null);

    useEffect(() => {
        if (instructorId && instructorName) {
            const instructorData = { instructorId, instructorName };
            localStorage.setItem('instructorData', JSON.stringify(instructorData));

            const storedData = localStorage.getItem('instructorData');
            if (storedData) {
                setStoredInstructorData(JSON.parse(storedData));
            }
        }
    }, [instructorId, instructorName]);

    useEffect(() => {
        // Flatten the array of ranges and remove duplicates
        const datesSet = new Set(); // Using Set to avoid duplicate dates
        selectedRanges.forEach(([start, end]) => {
            let currentDate = new Date(start);
            const endDate = new Date(end);

            while (currentDate <= endDate) {
                // Store the date in ISO format (UTC)
                datesSet.add(currentDate.toISOString()); // Use toISOString for UTC format
                currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
            }
        });
        // Convert Set to array, sort dates in ascending order, and update state
        setAllDates([...datesSet].sort());
    }, [selectedRanges]);

    useEffect(() => {
        let fp = null;

        if (fpRef.current) {
            fp = flatpickr(fpRef.current, {
                mode: "range",
                dateFormat: "Y-m-d",
                allowInput: true,
                closeOnSelect: false,
                altInput: true,
                altFormat: "F j, Y",
                inline: true, // Keep calendar always visible
                onDayCreate: (dObj, dStr, fp, dayElem) => {
                    const dateStr = dayElem.dateObj.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

                    // Check if the date is within any previously selected range
                    selectedRanges.forEach(([start, end]) => {
                        if (dateStr >= start && dateStr <= end) {
                            dayElem.classList.add("highlighted-range");
                        }
                    });
                },
                onChange: (dates) => {
                    if (dates.length === 2) {
                        const formattedRange = dates.map(date =>
                            date.toLocaleDateString('en-CA')
                        );

                        setSelectedRanges(prevRanges => [...prevRanges, formattedRange]);

                        if (formikRef.current) {
                            formikRef.current.setFieldValue('courseScheduleDates', [...selectedRanges, formattedRange]);
                        }

                        fp.clear(); // Allow new range selection
                    }
                }
            });
            fpRef.current.flatpickr = fp;
        }

        return () => {
            if (fpRef.current && fpRef.current.flatpickr) {
              //  fpRef.current.flatpickr.destroy();
            }
        };
    }, [selectedRanges]);





    const handleSubmit = async (values, { resetForm }) => {
        // setLoading(true);
        console.log('values---', values)

        const requestData = {
            ...values,
            courseScheduleDates: allDates,
            instructorId: instructorId
        };
        console.log('requestData----', requestData)
        axios
            .post("instructor/update_shedule", requestData)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    setSelectedRanges([])
                    setIsSuccesful(true)
                    // navigate('/admin/admin-dashboard');
                    //  navigate(-1)

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
                    setSelectedRanges([])
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .finally(() => {
                setTimeout(() => {
                    // setLoading(false);
                }, 300);
            });
    }


    return (
        <>
            <Header />
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">


                            {isSuccesful ? (
                                <>
                                    {/* <h1> Thank you!</h1>
                                    <p> your Dates Submitted Successfully!</p> */}
                                    <div className="card shadow p-5 text-center">
                                        {/* <h1 className="text-success">Thank You!</h1> */}
                                        <h1> Thank you!</h1>
                                        <p>Your dates have been submitted successfully!</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1>Hi, {storedInstructorData.instructorName || ''}!</h1>
                                    <h6 className='mt-2'>Sellect your schedule dates:</h6>

                                    <div className="col-md-12 mt-2">
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

                                                            <div className="row">
                                                            <div className="col-md-6 mx-auto d-flex justify-content-center">
                                                                <div className="form-group col-md-8 pl-4">
                                                                    
                                                                        {/* <label htmlFor="courseScheduleDates">Select Schedule Dates:</label> */}
                                                                        <div className="course-dates">
                                                                            <input
                                                                                type="text"
                                                                                id="courseScheduleDates"
                                                                                name="courseScheduleDates"
                                                                                className="form-control fw-normal"
                                                                                ref={fpRef}
                                                                                placeholder="Select Schedule Dates"
                                                                                readOnly
                                                                            />
                                                                            {formikProps.touched.courseScheduleDates && formikProps.errors.courseScheduleDates ? (
                                                                                <small className="text-danger">{formikProps.errors.courseScheduleDates}</small>
                                                                            ) : null}
                                                                            {selectedRanges.length <= 0 ? (
                                                                                <small className="text-muted d-block mt-1">
                                                                                    You can select multiple dates.
                                                                                </small>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6 mx-auto d-flex justify-content-center">
                                                                <div className="form-group col-md-10 pr-2">

                                                                    {/* {selectedRanges.length > 0 && ( */}
                                                                        <div className="mt-0">
                                                                            <div className="card shadow-sm">
                                                                                <div className="table-responsive" >
                                                                                    <table className="table table-hover table-sm mb-0">
                                                                                        <thead className="table-light sticky-top">
                                                                                            <tr>
                                                                                                <th className="px-3 py-2 fw-normal">Selected Dates</th>
                                                                                                <th className="text-center" style={{ width: '50px' }}></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        {selectedRanges.length > 0 && (
                                                                                        <tbody className="small">
                                                                                            {selectedRanges.map((date, index) => (
                                                                                                <tr key={index}>
                                                                                                    <td className="px-3 py-2 align-middle">
                                                                                                        {Array.isArray(date) ? (
                                                                                                            <span>{`${date[0]} to ${date[1]}`}</span>
                                                                                                        ) : (
                                                                                                            <span>{date}</span>
                                                                                                        )}
                                                                                                    </td>
                                                                                                    <td className="text-center align-middle">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn btn-sm  btn-outline-danger  p-2"
                                                                                                            onClick={() => {
                                                                                                                const newDates = selectedRanges.filter((_, i) => i !== index);
                                                                                                                setSelectedRanges(newDates);
                                                                                                                // setCourseScheduleDates(newDates);

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

                                                                                                        </button>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ))}
                                                                                        </tbody>
                                                                                         )}
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                   
                                                                </div>
                                                                </div>
                                                            </div>

                                                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                                                                <i className="fas fa-plus-circle mr-2"></i> Submit
                                                            </button>

                                                        </form>
                                                    );
                                                }}
                                            </Formik>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
};

export default InstructorDashboard;
