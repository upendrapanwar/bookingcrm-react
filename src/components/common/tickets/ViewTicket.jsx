import React, { useState, useEffect } from 'react';
import { Toast, Select } from "flowbite-react";
import { Formik } from "formik";
import Header from '../Header';
import Footer from '../Footer';
import { useHeader } from '../HeaderContext';
import { Avatar } from 'flowbite-react';
import axios from 'axios';
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { useParams,useNavigate } from 'react-router-dom';
import ReplyTicketSchema from '../../../validation-schemas/ReplyTicketSchema';

const ViewTicket = () => {
  const [loading, setLoading] = useState([false]);
  const { setHeaderData } = useHeader();
  const { id } = useParams();
  const [replyData, setReplyData] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [ticket, setTicket] = useState();
  const navigate = useNavigate();
  //const [replyVisible, setReplyVisible] = useState(false)
  useEffect(() => {
    //showAllReplies(id);
    
    // This is crucial to make sure Flowbite reinitializes after the component mounts
  }, []);

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
    setLoading(true);
    const requestData = {
      ...values,
      ...(replyData && {
        recieverEmail: replyData[0].recieverEmail,
        senderEmail: replyData[0].senderEmail,
        ticketId: replyData[0].ticketId,
      })
    };
    console.log('requestData----', requestData);
    axios
            .post(`user/save-ticket-reply`, requestData)
            .then((response) => {
              
                if (response.status) {
                    
                    //handleTicketScreenshot(response.data.data.id);
                    <Toast>
                      <FaTelegramPlane className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
                      <div className="pl-4 text-sm font-normal">Message submitted successfully.</div>
                      
                    </Toast>
                    //toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    navigate('/ticket-list');
                    //toast.success(`Ticket added Successfully!`);

                } else {
                    resetForm();
                    <Toast>
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                        <HiExclamation className="h-5 w-5" />
                      </div>
                      <div className="ml-3 text-sm font-normal">{response.data.message}</div>
                      <Toast.Toggle />
                    </Toast>
                    //toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
                setLoading(false);
                
            })
            .catch((error) => {
                //toast.dismiss();
                setLoading(false);
                if (error.response) {
                    resetForm();
                    <Toast>
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                        <HiExclamation className="h-5 w-5" />
                      </div>
                      <div className="ml-3 text-sm font-normal">{error.response.data.message}</div>
                      <Toast.Toggle />
                    </Toast>
                    //toast.error(error.response.data.message, { autoClose: 3000 });
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
  /**
    * Set status value
    * 
    * @param null
    * @return Object|null
    * 
  */
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('event.target.value=',event.target.value);
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
      <>
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
                        status:selectedValue,
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
      </>
      <Footer />
    </>
  )
};

export default ViewTicket;