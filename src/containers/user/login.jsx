import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import userLoginSchema from './../../validation-schemas/userLoginSchema'
// import { SpinnerLoader } from './SpinnerLoader';
// import GLogin from './GLogin';
// import FBLogin from './FBLogin';
// import { setLoading } from './actions'; // Adjust this import according to your file structure
// import logo from './logo.png'; // Adjust this import according to your file structure
import visibleIcon from './../../assets/icons/Visible-icon.png'; // Adjust this import according to your file structure
import invisibleIcon from './../../assets/icons/Invisible-icon.png'; // Adjust this import according to your file structure

const Login = () => {
    // const dispatch = useDispatch();
    // const loading = useSelector((state) => state.global.loading);
    const [seePassword, setSeePassword] = useState(false);
    //const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

    const handleSubmit = (values, { resetForm }) => {
        // Handle form submission logic here
        console.log(values);
        resetForm();
    };

    const handlePasswordVisibility = () => {
        setSeePassword((prev) => !prev);
    };
/*
    const handleConfirmPasswordVisibility = () => {
        setSeeConfirmPassword((prev) => !prev);
    };*/

    // const handleClose = () => {
    //     props.onClick(); // Assuming this is a prop function to close the modal
    // };

    return (
        <React.Fragment>
            {/* {loading && <SpinnerLoader />} */}
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-lg">
                    <Link to="/" className="flex justify-center mb-6">
                        {/* <img src={logo} alt="logo" className="h-12" /> */}
                    </Link>
                    {/* <button onClick={handleClose} type="button" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" aria-label="Close"> */}
                    {/* &times;
                    </button> */}
                    <h4 className="text-xl font-semibold mb-4 text-center">Login Now</h4>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            // password_confirmation: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={userLoginSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                                    <input
                                        type={seePassword ? "text" : "password"}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 pr-10"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <img
                                        src={seePassword ? visibleIcon : invisibleIcon}
                                        alt="toggle visibility"
                                        onClick={handlePasswordVisibility}
                                        className="cursor-pointer absolute right-4 top-7 h-5 w-5"
                                    />
                                    {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}

                                </div>
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 focus:outline-none ${!isValid && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={!isValid}
                                >
                                    Submit
                                </button>
                                <div className="text-sm text-center">
                                    Create an Account ? <Link to="#" className="text-blue-600 hover:underline">Signup here</Link>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    {/* <GLogin />
                                    <FBLogin /> */}
                                </div>
                            </form>
                        )}

                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;

