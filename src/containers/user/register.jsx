import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import axios from "axios";
import userRegistrationSchema from './../../validation-schemas/userRegistrationSchema'
// import { SpinnerLoader } from './SpinnerLoader';
// import GLogin from './GLogin';
// import FBLogin from './FBLogin';
// import { setLoading } from './actions'; // Adjust this import according to your file structure
// import logo from './logo.png'; // Adjust this import according to your file structure
import visibleIcon from './../../assets/icons/Visible-icon.png'; // Adjust this import according to your file structure
import invisibleIcon from './../../assets/icons/Invisible-icon.png'; // Adjust this import according to your file structure

const Register = () => {
    // const dispatch = useDispatch();
    // const loading = useSelector((state) => state.global.loading);
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
    const [emailCheckStatus, setEmailCheckStatus] = useState(null);
    const navigate = useNavigate();
    const recaptchaRef = useRef(null);
    

    const handleSubmit = (values, { resetForm }) => { 
        // if (emailCheckStatus) {
        //     console.log("Email already exists");
        //     return;
        // }

       // setLoading(true);


        //this.dispatch(setLoading({loading: true}));
        axios.post('user/signup', values).then(response => {
            toast.dismiss();
            console.log('response',response);
            if (response.data.status) {
                toast.success(response.data.message, { autoClose: 3000 });
                resetForm();
                // let authInfo = {
                //     id: response.data.data['_id'],
                //     isSubscriberRegister: ''
                // };
                // localStorage.setItem('authInfo', JSON.stringify(authInfo));
                let authInfo = {
                    expTime: response.data.data.authData.expTime,
                    id: response.data.data.data["_id"],
                    token: response.data.data.authData.token,
                };
                let userInfo = {
                    id: response.data.data.data["_id"],
                    name:
                        response.data.data.data.firstname + " " + response.data.data.data.surname,
                    email: response.data.data.data.email,
                    role: response.data.data.data.role,
                };
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                localStorage.setItem("authInfo", JSON.stringify(authInfo));
                localStorage.setItem("isLoggedIn", 1);
                //toast.success(response.data.message, { autoClose: 3000 });
                navigate('/');
            }
        }).catch(error => {
            toast.dismiss();
            console.log('catch run--',error.response)
            if (error.response) {
                const message = "User already Exists!<br>Please login or complete the Subscription Registration Form if not already completed.";
                // toast.error(
                //     <div dangerouslySetInnerHTML={{ __html: message }} />,
                //     { position: "top-center", autoClose: 3000 }
                // );
                toast.error(error.response.data.message);
               // recaptchaRef.current.reset(); // Reset the ReCAPTCHA
            }
        }).finally(() => {
            setTimeout(() => {
                //setLoading(false);
            }, 300);

        // if (error.response) {
        //     const message = (
        //         <div>
        //             User already Exists!<br />
        //             Please login or complete the Subscription Registration Form if not already completed.
        //         </div>
        //     );
    
        //     // Toast with JSX content
        //     toast.error(message, {
        //         position: "top-center",
        //         autoClose: 3000, // Change to your preference
        //     });
        // }

        });
    };

    const handlePasswordVisibility = () => {
        setSeePassword((prev) => !prev);
    };

    const handleConfirmPasswordVisibility = () => {
        setSeeConfirmPassword((prev) => !prev);
    };

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
                    <h4 className="text-xl font-semibold mb-4 text-center">Register Now</h4>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            password_confirmation: '',
                            date_of_birth: '',
                            phone_number: '',
                            gender: '',
                            // address: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={userRegistrationSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        id="name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                                </div>
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
                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        id="phone_number"
                                        name="phone_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone_number}
                                    />
                                    {touched.phone_number && errors.phone_number && <small className="text-red-500">{errors.phone_number}</small>}
                                </div>

                                <div className="flex flex-wrap -mx-2">
                                    {/* Date of Birth */}
                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.date_of_birth}
                                        />
                                        {touched.date_of_birth && errors.date_of_birth && (
                                            <small className="text-red-500">{errors.date_of_birth}</small>
                                        )}
                                    </div>

                                    {/* Gender */}
                                    <div className="w-full md:w-1/2 px-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-blue-600"
                                                    id="gender_male"
                                                    name="gender"
                                                    value="male"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label htmlFor="gender_male" className="ml-2">Male</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-blue-600"
                                                    id="gender_female"
                                                    name="gender"
                                                    value="female"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label htmlFor="gender_female" className="ml-2">Female</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-blue-600"
                                                    id="gender_other"
                                                    name="gender"
                                                    value="other"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label htmlFor="gender_other" className="ml-2">Other</label>
                                            </div>
                                        </div>
                                        {touched.gender && errors.gender && (
                                            <small className="text-red-500">{errors.gender}</small>
                                        )}
                                    </div>
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

                                <div className="relative">
                                    <label htmlFor="c_password" className="block text-sm font-medium text-gray-700">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type={seeConfirmPassword ? "text" : "password"}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 pr-10"
                                        id="c_password"
                                        name="password_confirmation"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password_confirmation}
                                    />
                                    <img
                                        src={seeConfirmPassword ? visibleIcon : invisibleIcon}
                                        alt="toggle visibility"
                                        onClick={handleConfirmPasswordVisibility}
                                        className="cursor-pointer absolute right-4 top-7 h-5 w-5"
                                    />
                                    {touched.password_confirmation && errors.password_confirmation && (
                                        <small className="text-red-500">{errors.password_confirmation}</small>
                                    )}
                                </div>
                                {/*<div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Complete Address <span className="text-red-500">*</span></label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="3"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                    ></textarea>
                                    {touched.address && errors.address && <small className="text-red-500">{errors.address}</small>}
                                </div>*/}
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 focus:outline-none ${!isValid && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={!isValid}
                                >
                                    Submit
                                </button>
                                <div className="text-sm text-center">
                                    Already have an account? <Link to="login" className="text-blue-600 hover:underline">Login here</Link>
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

export default Register;

