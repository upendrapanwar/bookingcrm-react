import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import ErrorText from "../../components/utility/Errortext";
import AdminLoginSchema from '../../validation-schemas/AdminLoginSchema';
import axios from "axios";
import LogoImg from '../../assets/images/corpel-logo-main.png';

const AdminLogin = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        console.log('test');
    }, []);
    //toast.configure();
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = (values, { resetForm }) => {
        //navigate('student/student-dashboard');
        axios.post('admin/signin', values).then(response => {
            toast.dismiss();
            if (response.data.status) {
                toast.success(response.data.message, { position: "top-center", autoClose: 3000 });
                let authInfo = {
                    expTime: response.data.data.expTime,
                    id: response.data.data['_id'],
                    token: response.data.data.token,
                    name: response.data.data.first_name + ' ' + response.data.data.last_name,
                    email: response.data.data.email,
                    role: response.data.data.role,
                };


                localStorage.setItem('authInfo', JSON.stringify(authInfo));

                resetForm();

                if (response.data.data.role === 'admin') {
                    navigate('/admin/admin-dashboard');
                } else {
                    navigate('/admin/login');
                }

            } else {
                resetForm();
                toast.error(response.data.message, { autoClose: 3000 });
            }

        }).catch(error => {
            toast.dismiss();
            if (error.response) {
                resetForm();
                toast.error(error.response.data.message, { autoClose: 3000 });
            }
        }).finally(() => {
            setTimeout(() => {

            }, 300);
        });
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
                <Link to={"#"} className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                    {/*<img src="/images/logo.svg" className="mr-4 h-11" alt="FlowBite Logo" />*/}
                    <img src={LogoImg} className="h-8 mr-3" alt="Admin Logo" />
                </Link>

                <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Admin Login
                    </h2>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''

                        }}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values, { resetForm });
                        }}
                        validationSchema={AdminLoginSchema}
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
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                    {touched.email && errors.email ? (
                                        <small className="text-danger">{errors.email}</small>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    {touched.password && errors.password ? (
                                        <small className="text-danger">{errors.password}</small>
                                    ) : null}
                                </div>
                              
                                <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                                <button type="submit" className="px-5 py-3 text-base font-medium text-center btn-orange">Login to your account</button>
                               
                            </form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    );
}

export default AdminLogin;