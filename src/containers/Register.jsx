import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import CommonRegistrationSchema from '../validation-schemas/CommonRegistrationSchema';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Register = () => {
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
        //navigate("/login");
        axios.post('user/signup', values).then(response => {
            toast.dismiss();
            //console.log(response.data);
            if (response.data.status) {
                toast.success(response.data.message, { autoClose: 3000 });
                resetForm();
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

                if (
                    response.data.data.data.role === "student"
                ) {
                    navigate("/student/student-dashboard");
                }
                if (response.data.data.data.role === "instructor") {
                    navigate("/instructor/instructor-dashboard");
                }
                if (response.data.data.data.role === "manager") {
                    navigate("/manager/manager-dashboard");
                }

            }
        }).catch(error => {
            toast.dismiss();
            if (error.response) {
                const message = "User already Exists!<br>Please login or complete the Subscription Registration Form if not already completed.";
                toast.error(
                    <div dangerouslySetInnerHTML={{ __html: message }} />,
                    { position: "top-center", autoClose: 3000 }
                );
               // recaptchaRef.current.reset(); 
            }
        }).finally(() => {
            setTimeout(() => {
               // setLoading(false);
            }, 300);
        });
    }
    return (
        <>
        <Header/>
        <section className="main_container pt-70 pb-25">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="logreg-forms" className="logreg-forms-panel">
                        <Formik 
                            initialValues ={{
                                            firstName: '',
                                            lastName: '',
                                            email:'',
                                            password:'',
                                            confirmPassword:'',
                                            role:''
                                            
                                        }}
                            onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, { resetForm });
                            }}
                            validationSchema={CommonRegistrationSchema}
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
                            <form onSubmit={handleSubmit} className="form-signin">
                                <h1 className="h3 mb-3 font-weight-normal" styleName="text-align: center"> Create Account</h1>
                                <div className="form-group">
                                    <input type="text" id="user-name" name="firstName" className="form-control" placeholder="First name"
                                        required="" autofocus="" onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
                                    {touched.firstName && errors.firstName ? (
                                        <small className="text-danger">{errors.firstName}</small>
                                    ) : null}    
                                </div>
                                <div className="form-group">
                                    <input type="text" id="last-name" name="lastName" className="form-control" placeholder="Last name"
                                        required="" autofocus="" onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
                                    {touched.lastName && errors.lastName ? (
                                        <small className="text-danger">{errors.lastName}</small>
                                    ) : null}    
                                </div>
                                <div className="form-group">
                                    <input type="email" id="user-email" name="email" className="form-control" placeholder="Email address"
                                        required autofocus="" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                    {touched.email && errors.email ? (
                                        <small className="text-danger">{errors.email}</small>
                                    ) : null}    
                                </div>
                                <div className="form-group">
                                    <input type="password" id="user-pass" name="password" className="form-control" placeholder="Password"
                                        required autofocus="" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    {touched.password && errors.password ? (
                                        <small className="text-danger">{errors.password}</small>
                                    ) : null}    
                                </div>
                                <div className="form-group">
                                    <input type="password" id="user-repeatpass" name="confirmPassword" className="form-control"
                                        placeholder="Repeat Password" required autofocus="" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <small className="text-danger">{errors.confirmPassword}</small>
                                    ) : null}    
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="role" id="exampleFormControlSelect1" onChange={handleChange} onBlur={handleBlur} value={values.role} >
                                        <option value="">Select User Type</option>
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                    {touched.role && errors.role ? (
                                        <small className="text-danger">{errors.role}</small>
                                    ) : null}
                                </div>
                                
                                <button className="btn btn-orange btn-block" type="submit"><i className="fas fa-user-plus"></i>
                                    Sign Up</button>
                                <Link to={"/login"} id="cancel_signup"><i className="fas fa-angle-left"></i>Back</Link>    
                                
                            </form>
                        )}
                        </Formik>
                            <br/>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>    
    );
};

export default Register;

