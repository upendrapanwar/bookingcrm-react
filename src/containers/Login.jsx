import React,{ useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import UserLoginSchema from '../validation-schemas/UserLoginSchema';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        
        console.log('test');
    }, []);
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle after form submission
     * 
     */
    const handleSubmit = (values, { resetForm }) => {
        navigate('/student/student-dashboard');
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Navigate to signup page
     * 
     */
    const navigateToSignup = () => {
        navigate('/register');
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
                                                email: '',
                                                password: ''
                                                
                                            }}
                                            onSubmit={(values, { resetForm }) => {
                                                handleSubmit(values, { resetForm });
                                            }}
                                            validationSchema={UserLoginSchema}
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
                                <form className="form-signin" onSubmit={handleSubmit}>
                                    <h1 className="h3 mb-3 font-weight-normal" styleName="text-align: center"> Sign in</h1>
                                    {
                                        /*
                                    <div className="social-login">
                                        <button className="btn facebook-btn social-btn" type="button"><span><i
                                                    className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                                        <button className="btn google-btn social-btn" type="button"><span><i
                                                    className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                                    </div>
                                    <p styleName="text-align:center"> OR </p>*/
                                    }

                                    <div className="form-group">
                                        <input type="email" name="email" className="form-control" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                            anyone else.</small>
                                        {touched.email && errors.email ? (
                                            <small className="text-danger">{errors.email}</small>
                                        ) : null}    
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                                            placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                        {touched.password && errors.password ? (
                                            <small className="text-danger">{errors.password}</small>
                                        ) : null}    
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                        
                                    </div>

                                    <button className="btn btn-main btn-block" type="submit"><i className="fas fa-sign-in-alt"></i>
                                        Sign in</button>
                                    <Link to={"#"} id="forgot_pswd">Forgot password?</Link>    
                                    
                                    <hr/>
                                    
                                    <button className="btn btn-orange btn-block" type="button" id="btn-signup" onClick={navigateToSignup}>
                                        <i className="fas fa-user-plus"></i> Sign up New Account
                                    </button>
                                </form>
                            )}
                            </Formik>        
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Login;

