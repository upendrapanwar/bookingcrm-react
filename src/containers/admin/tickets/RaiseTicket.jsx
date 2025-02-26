import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { toast } from 'react-toastify';
import RaiseTicketSchema from '../../../validation-schemas/RaiseTicketSchema';
import Loader from '../../../components/common/Loader';
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import Breadcrumb from '../../../components/admin/Breadcrumb';

const RaiseTicket = () => {
    const [loading, setLoading] = useState([false]);
    //const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const breadcrumbLinks = [
        { name: 'Home', url: '/' },
        { name: 'Tickets', url: '/admin/tickets/ticket-list' },
        { name:'Raise Ticket', url: '#'}
    ];
    useEffect(() => {

    }, []);

    /***********************************************************************/
    /***********************************************************************/
    const handleLoading = (status) => {
        setLoading(status);
    }
    /***********************************************************************/
    /***********************************************************************/
    const handleSubmitTicket = async (values, { resetForm }) => {
        handleLoading(true);
        let imageData;
        if (imageFile) {
            imageData = await handleImageUpload();
        }

        const requestData = {
            ...values,
            ...(imageData && {
                screenshot: imageData.secure_url,
                image_id: imageData.public_id
            }),
        };
        console.log('requestData----', requestData);

        axios
            .post("admin/add-ticket", requestData)
            .then((response) => {
                toast.dismiss();
                if (response.status) {

                    //handleTicketScreenshot(response.data.data.id);
                    toast.success(response.data.message, { autoClose: 3000 });
                    resetForm();
                    // navigate('/admin/admin-dashboard');
                    toast.success(`Ticket added Successfully!`);

                } else {
                    resetForm();
                    toast.error(response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
                handleLoading(false);

            })
            .catch((error) => {
                toast.dismiss();
                setLoading(false);
                if (error.response) {
                    resetForm();
                    toast.error(error.response.data.message, { autoClose: 3000 });
                    // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
                }
            })
            .finally(() => {
                setTimeout(() => {
                    handleLoading(false);
                }, 300);
            });

    };
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle image change
     * 
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5242880) {
            setImageFile(file);

            //const reader = new FileReader();
            //reader.onloadend = () => {
            //    setPreviewImage(reader.result);
            //};
            setPreviewImage(URL.createObjectURL(file));
            //reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setPreviewImage(null);
            toast.error("Image size must be less than 5 MB", { autoClose: 3000 });
        }
    };

    /***********************************************************************/
    /***********************************************************************/

    /**
    * Handle Image Upload
    * 
    */
    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'booking-crm-image');
        formData.append("cloud_name", cloudName);
        console.log('file=', imageFile);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            return response.data;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Image upload failed');
        }
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
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All users</h1>
                                </div>
                                <div className="">
                                {loading === true ? <Loader /> : ''}
                                <Formik
                                    initialValues={{
                                        tfirstName: '',
                                        tlastName: '',
                                        temail: '',
                                        subject: '',
                                        tmessage: '',
                                        screenshot: '',
                                        status: 'open'
                                    }}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmitTicket(values, { resetForm });
                                    }}
                                    validationSchema={RaiseTicketSchema}
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
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        First Name <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="tfirstName"
                                                        className={`form-control ${touched.tfirstName && errors.tfirstName ? "is-invalid" : ""}`}
                                                        placeholder="Enter your first name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.tfirstName}
                                                    />
                                                    {touched.tfirstName && errors.tfirstName ? (
                                                        <div className="text-danger">{errors.tfirstName}</div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Last Name <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="tlastName"
                                                        className={`form-control ${touched.tlastName && errors.tlastName ? "is-invalid" : ""}`}
                                                        placeholder="Enter your last name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.tlastName}
                                                    />
                                                    {touched.tlastName && errors.tlastName ? (
                                                        <div className="text-danger">{errors.tlastName}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Email Address <span className="required_sign">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="temail"
                                                        className={`form-control ${touched.temail && errors.temail ? "is-invalid" : ""}`}
                                                        placeholder="Enter email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.temail}
                                                    />
                                                    {touched.temail && errors.temail ? (
                                                        <div className="text-danger">{errors.temail}</div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Subject</label><span className="required_sign">*</span>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        className={`form-control ${touched.subject && errors.subject ? "is-invalid" : ""}`}
                                                        placeholder="Enter subject"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.subject}
                                                    />
                                                    {touched.subject && errors.subject ? (
                                                        <div className="text-danger">{errors.subject}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label>
                                                        Message
                                                        <span className="required_sign">*</span>
                                                    </label>
                                                    <textarea
                                                        name="tmessage"
                                                        className={`form-control ${touched.tmessage && errors.tmessage ? "is-invalid" : ""}`}
                                                        placeholder="Enter your message"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.tmessage}
                                                    />
                                                    {touched.tmessage && errors.tmessage ? (
                                                        <div className="text-danger">{errors.tmessage}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label>
                                                        Screenshot
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="screenshot"
                                                        className="form-control-file border border-gray-300 rounded-lg p-2 w-full"
                                                        id="screenshot"
                                                        accept="image/*"
                                                        value={values.screenshot}
                                                        //onChange={formikProps.handleChange}
                                                        onChange={(event) => {
                                                            handleChange("screenshot")(event);
                                                            handleImageChange(event);
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-12 text-center">
                                                    <button type="submit" className="btn btn-md btn-orange px-4" disabled={!isValid}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            </div>
                            
                        </div>
                        
                    </main>
                    
                </div>
                
            </div>
            
        </>

    );
};

export default RaiseTicket;
