import React, { useState, useEffect } from 'react';
import { Select, Avatar } from "flowbite-react";
import { toast } from 'react-toastify';
import { Formik } from "formik";
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import Footer from "../../../components/admin/Footer";
import Breadcrumb from '../../../components/admin/Breadcrumb';
import axios from 'axios';
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReplyTicketSchema from '../../../validation-schemas/ReplyTicketSchema';

const ReplyTicket = () => {
    const [loading, setLoading] = useState([false]);
    const { id } = useParams();
    const [replyData, setReplyData] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [ticket, setTicket] = useState();
    const navigate = useNavigate();
    const breadcrumbLinks = [
        { name: 'Home', url: '/' },
        { name: 'Tickets', url: '/admin/tickets/ticket-list' },
        { name:'Reply Ticket', url: '#'}
    ];

    useEffect(() => {
        showAllReplies(id);

        // This is crucial to make sure Flowbite reinitializes after the component mounts
    }, []);

    /***********************************************************************/
    /***********************************************************************/
    /**
      * Get replies details by ticket id
      * 
      * @param id
      * @return Object|null
      * 
    */
    const showAllReplies = async (id) => {
        console.log('id=', id);
        await axios.get(`admin/get-replies-details/${id}`).then(response => {

            if (response.data.data) {
                if (response.data.status) {
                    //var replyData = response.data.data[0].replies_details;
                    var replyData = response.data.data;
                    let ticketArray = [];
                    var tstatus = '';
                    replyData.forEach(function (value) {
                        tstatus = value.ticket.status;
                        ticketArray.push({
                            subject: value.ticket.subject,
                            status: value.ticket.status,
                            senderEmail: value.ticket.replies_details.senderEmail,
                            recieverEmail: value.ticket.replies_details.recieverEmail,
                        })
                        return;
                    });

                    setTicket(ticketArray);
                    setSelectedValue(tstatus);
                    let replyDataArray = [];

                    replyData.forEach(function (value) {
                        console.log('value=', value);
                        const date = new Date(value.ticket.updatedAt);
                        const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }).replace(/(\w{3})/, '$1.');

                        replyDataArray.push({
                            senderEmail: value.ticket.replies_details.senderEmail,
                            recieverEmail: value.ticket.replies_details.recieverEmail,
                            reply: value.ticket.replies_details.reply,
                            replyDate: formattedDate,
                            ticketId: value.ticket._id,
                            createdBy: value.ticket.email
                        });
                    });
                    setReplyData(replyDataArray);
                }
            }
        }).catch(error => {
            if (error.response) {
                //setReplyData(replyDataArray);
                toast.error('Data is not available', { position: "top-center", autoClose: 3000 });
            }
        });
    }

    /***********************************************************************/
    /***********************************************************************/
    /**
      * Submit ticket message
      * 
      * @param null
      * @return Object|null
      * 
    */
    const handleSubmit = async (values, { resetForm }) => {
        var adminData = JSON.parse(localStorage.getItem('authInfo'));
        var replyEmail = adminData.email? adminData.email : process.env.ADMIN_EMAIL;
        setLoading(true);
        
        const requestData = {
            ...values,
            ...(replyData && {
                recieverEmail: replyData[0].createdBy,
                senderEmail: replyEmail,
                ticketId: replyData[0].ticketId,
            })
        };
        
        axios
            .post(`admin/save-ticket-reply`, requestData)
            .then((response) => {

                if (response.status) {

                    //handleTicketScreenshot(response.data.data.id);
                    toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    navigate('/admin/tickets/ticket-list');
                    //toast.success(`Ticket added Successfully!`);

                } else {
                    resetForm();
                    toast.error(response.data.message, { autoClose: 3000 });
                    
                }
                setLoading(false);

            })
            .catch((error) => {
                //toast.dismiss();
                setLoading(false);
                if (error.response) {
                    resetForm();
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    
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
    /**
      * Set status value
      * 
      * @param null
      * @return Object|null
      * 
    */
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('event.target.value=', event.target.value);
    };
    /***********************************************************************/
    /***********************************************************************/
    /**
      * Redirect back
      * 
      * @param null
      * @return Object|null
      * 
    */
    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1);
    }
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
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Reply Ticket</h1>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col">
                            <section className="page_section contact_form_section bgWhite product_wrapper front_product_section columns-1 pb-25">
                                <div className="container">
                                    <div className="row">
                                        <div className="space-y-6">

                                            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                                                <button type="button" onClick={handleBack}
                                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                                    back
                                                </button>
                                                <div className="max-w-2xl mx-auto px-4">
                                                    {ticket && (
                                                        <div>
                                                            <h2>Ticket: {ticket[0].subject}</h2>
                                                            <br /><br />
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center mb-6">
                                                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Enter Your Message</h2>
                                                    </div>

                                                    <Formik
                                                        initialValues={{
                                                            message: '',
                                                            status: selectedValue,
                                                        }}
                                                        enableReinitialize={true}
                                                        onSubmit={(values, { resetForm }) => {
                                                            handleSubmit(values, { resetForm });
                                                        }}
                                                        validationSchema={ReplyTicketSchema}
                                                    >
                                                        {({ values,
                                                            errors,
                                                            touched,
                                                            handleChange,
                                                            handleBlur,
                                                            handleSubmit,
                                                            isValid,
                                                            isSubmitting
                                                        }) => (
                                                            <form className="mb-6" onSubmit={handleSubmit}>
                                                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                                    <label for="comment" className="sr-only">Your Message</label>

                                                                    <textarea id="message" rows="6" name="message" className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 ${touched.message && errors.message ? "is-invalid" : ""}`}
                                                                        placeholder="Enter your message"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.message}
                                                                    />

                                                                </div>
                                                                {touched.message && errors.message ? (
                                                                    <div className="text-danger">{errors.message}</div>
                                                                ) : null}
                                                                <div className="py-2 px-1 mb-4 bg-white dark:bg-gray-800 dark:border-gray-700">
                                                                    <label for="comment" className="sr-only">Status</label>

                                                                    <Select id="status" rows="6" name="status" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"

                                                                        onChange={handleChange}
                                                                        value={values.status}
                                                                        onBlur={handleBlur}>
                                                                        <option value="">Select Status</option>
                                                                        <option value="open">Open</option>
                                                                        <option value="waiting">Waiting</option>
                                                                        <option value="closed">Closed</option>
                                                                    </Select>
                                                                    {touched.status && errors.status ? (
                                                                        <div className="text-danger">{errors.status}</div>
                                                                    ) : null}
                                                                </div>
                                                                <button type="submit"
                                                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                                                    Submit
                                                                </button>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                    <div>
                                                        {replyData && replyData.map((item, index) => {
                                                            const customClass = index > 0 ? 'p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900' : 'p-6 text-base bg-white rounded-lg dark:bg-gray-900';
                                                            return (
                                                                <article className={customClass}>
                                                                    <footer className="flex justify-between items-center mb-2">
                                                                        <div className="flex items-center">
                                                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><Avatar rounded />&nbsp;&nbsp;{item.senderEmail}</p>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                                                                title="February 8th, 2022">{item.replyDate}</time></p>
                                                                        </div>
                                                                    </footer>
                                                                    <p className="text-gray-500 dark:text-gray-400">{item.reply}</p>
                                                                </article>
                                                            );
                                                        }
                                                        )}

                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ReplyTicket;