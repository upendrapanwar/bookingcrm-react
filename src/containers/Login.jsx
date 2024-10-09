import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import userLoginSchema from '../validation-schemas/userLoginSchema'
import axios from "axios";
import { toast } from "react-toastify";
// import { SpinnerLoader } from './SpinnerLoader';
// import GLogin from './GLogin';
// import FBLogin from './FBLogin';
// import { setLoading } from './actions'; // Adjust this import according to your file structure
// import logo from './logo.png'; // Adjust this import according to your file structure
import visibleIcon from '../assets/icons/Visible-icon.png'; // Adjust this import according to your file structure
import invisibleIcon from '../assets/icons/Invisible-icon.png'; // Adjust this import according to your file structure

const Login = () => {
    // const dispatch = useDispatch();
    // const loading = useSelector((state) => state.global.loading);
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();
    //const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

    const handleSubmit = (values, { resetForm }) => {
        axios
            .post("user/signin", values)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    // toast.success(response.data.message, {
                    //   position: "top-center",
                    //   autoClose: 3000,
                    // });
                    let authInfo = {
                        expTime: response.data.data.expTime,
                        id: response.data.data["_id"],
                        token: response.data.data.token,
                    };
                    let userInfo = {
                        id: response.data.data["_id"],
                        name:
                            response.data.data.firstname + " " + response.data.data.surname,
                        email: response.data.data.email,
                        role: response.data.data.role,
                    };
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    localStorage.setItem("authInfo", JSON.stringify(authInfo));
                    localStorage.setItem("isLoggedIn", 1);
                    resetForm();

                    if (
                        response.data.data.role === "student"
                    ) {
                        navigate("/");
                    }
                    // if (
                    //     response.data.data.role === "registered_learner"
                    // ) {
                    //     navigate("/cart");
                    // }
                    // if (
                    //     response.data.data.role === "subscriber"
                    // ) {
                    //     navigate("/learner/dashboard");
                    // }
                    // if (response.data.data.role === "ambassador") {
                    //     navigate("/ambessador/dashboard");
                    // }
                    // if (response.data.data.role === "owner") {
                    //     navigate("/owner/dashboard");
                    // }
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
                   // setLoading(false);
                }, 300);
            });
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
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="logreg-forms" className="logreg-forms-panel">
                                {/* Sign In Form */}
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                        // fullName: '',
                                        // repeatPassword: '',
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={userLoginSchema} // Define the validation schema using Yup or any preferred validation library
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <h1 className="h3 mb-3 font-weight-normal text-center">Sign In</h1>

                                            {/* Social Login Buttons */}
                                            <div className="social-login flex justify-center space-x-4">
                                                <button className="btn facebook-btn social-btn" type="button">
                                                    <i className="fab fa-facebook-f"></i> Sign in with Facebook
                                                </button>
                                                <button className="btn google-btn social-btn" type="button">
                                                    <i className="fab fa-google-plus-g"></i> Sign in with Google+
                                                </button>
                                            </div>

                                            <p className="text-center">OR</p>

                                            {/* Email Field */}
                                            <div className="form-group">
                                                <label htmlFor="email" className="block text-sm font-medium">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control mt-1 block w-full"
                                                    id="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    placeholder="Enter email"
                                                />
                                                {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
                                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                            </div>

                                            {/* Password Field */}
                                            <div className="form-group">
                                                <label htmlFor="password" className="block text-sm font-medium">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type={seePassword ? "text" : "password"}
                                                    className="form-control mt-1 block w-full"
                                                    id="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    placeholder="Password"
                                                />
                                                {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
                                            </div>

                                            {/* Checkbox */}
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className={`btn btn-main btn-block ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={!isValid}
                                            >
                                                <i className="fas fa-sign-in-alt"></i> Sign In
                                            </button>

                                            <div className="text-center mt-2">
                                                <a href="#" id="forgot_pswd">Forgot password?</a>
                                            </div>

                                            <hr />

                                            <button className="btn btn-orange btn-block" type="button" id="btn-signup " onClick={'///'}>
                                                <i className="fas fa-user-plus"></i> Sign up New Account
                                            </button>

                                            {/* Reset Password Form */}
                                            {/* <form action="/reset/password/" className="form-reset hidden">
                                                <h1 className="h3 mb-3 font-weight-normal text-center">Reset Password</h1>
                                                <input
                                                    type="email"
                                                    id="resetEmail"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    required
                                                />
                                                <button className="btn btn-orange btn-block" type="submit">Reset Password</button>
                                                <a href="#" id="cancel_reset"><i className="fas fa-angle-left"></i> Back</a>
                                            </form> */}

                                            {/* Signup Form */}
                                            {/* <form action="/signup/" className="form-signup hidden">
                                                <h1 className="h3 mb-3 font-weight-normal text-center">Create Account</h1>

                                                <div className="social-login flex justify-center space-x-4">
                                                    <button className="btn facebook-btn social-btn" type="button">
                                                        <i className="fab fa-facebook-f"></i> Sign up with Facebook
                                                    </button>
                                                    <button className="btn google-btn social-btn" type="button">
                                                        <i className="fab fa-google-plus-g"></i> Sign up with Google+
                                                    </button>
                                                </div>

                                                <p className="text-center">OR</p>

                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        id="fullName"
                                                        name="fullName"
                                                        className="form-control"
                                                        placeholder="Full name"
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fullName}
                                                    />
                                                    {touched.fullName && errors.fullName && <small className="text-red-500">{errors.fullName}</small>}
                                                </div>

                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        id="userEmail"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Email address"
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
                                                </div>

                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
                                                    />
                                                    {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
                                                </div>

                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        id="repeatPassword"
                                                        name="repeatPassword"
                                                        className="form-control"
                                                        placeholder="Repeat Password"
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.repeatPassword}
                                                    />
                                                    {touched.repeatPassword && errors.repeatPassword && <small className="text-red-500">{errors.repeatPassword}</small>}
                                                </div>

                                                <button className="btn btn-orange btn-block" type="submit">
                                                    <i className="fas fa-user-plus"></i> Sign Up
                                                </button>
                                                <a href="#" id="cancel_signup"><i className="fas fa-angle-left"></i> Back</a>
                                            </form> */}
                                        </form>
                                    )}
                                </Formik>

                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Login;

