// import React, { useState, useEffect } from "react";
// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import Loader from "../../components/common/Loader";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CheckoutForm({ paydepositeValue, formvalues, triggerValidation, isDirty, cart }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [message, setMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [localFormValues, setLocalFormValues] = useState({});
//     const [classLink, setClassLink] = useState([]);

//     const { toPayAmount, futurePayAmount } = paydepositeValue || {};


//     useEffect(() => {
//         getCourseZoomLink(cart);
//         setLocalFormValues(formvalues);
//     }, [formvalues]);


    // const getCourseZoomLink = async (cart) => {
    //     const courseIds = cart.map((item) => item.id)
    //     console.log("courseIds", courseIds);

    //     try {
    //         const response = await axios.get(`user/get-courses-zoomlink`, {
    //             params: { courseIds: JSON.stringify(courseIds) }
    //         });
    //         if (response.data.status === true && response.data.data) {
    //             console.log("checking courses-zoomlink data", response);
    //             const data = response.data.data;
    //             setClassLink(data);
    //         }

    //     } catch (error) {
    //         console.error("Data has not found.", error);
    //         toast.error("Data has not found.", error);
    //     }
    // }


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formErrors = await triggerValidation();
//         if (Object.keys(formErrors).length > 0 && isDirty) {
//             setMessage("Please fill out the required fields correctly.");
//             return;
//         }

//         setMessage(null);
//         if (!stripe || !elements) {
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const { error, paymentIntent } = await stripe.confirmPayment({
//                 elements,
//                 confirmParams: {},
//                 redirect: "if_required",
//             });

//             if (error) {
//                 setMessage(error.message || "An unexpected error occurred.");
//                 setIsLoading(false);
//                 return;
//             }

//             if (paymentIntent && paymentIntent.status === "succeeded") {
//                 if (toPayAmount === undefined || futurePayAmount === undefined) {
//                     try {
//                         const studentRegisterResponse = await studentRegister(localFormValues);
//                         await sendWellcomeEmail(localFormValues, cart);
//                         await sendEmail(localFormValues, paymentIntent, cart);
//                         const orderDetails = await saveOrderDetails(localFormValues, paymentIntent, cart);
//                         console.log("")
//                         await sendEmailToAdmin(localFormValues, paymentIntent, orderDetails, cart);
//                         await savePaymentDetails(studentRegisterResponse, paymentIntent, orderDetails, cart);
//                         setMessage("Payment successful, email sent, and order details saved!");
//                         navigate("/payment-done", { state: { orderDetails } });
//                     } catch (processError) {
//                         setMessage("Payment successful but failed to complete all processes. Redirecting...");
//                         console.error("Process error:", processError);
//                         navigate("/payment-done");
//                     }
//                 } else if (toPayAmount !== undefined && toPayAmount !== null && futurePayAmount !== undefined && futurePayAmount !== null) {
//                     // if student use Pay Deposite option 
//                     try {
//                         const studentRegisterResponse = await studentRegister(localFormValues);
//                         await sendWellcomeEmail(localFormValues, cart);
//                         await sendEmailToPayStudent(localFormValues, paymentIntent, toPayAmount, futurePayAmount, cart, classLink);
//                         const orderDetails = await saveTopayOrderDetails(localFormValues, paymentIntent, cart, toPayAmount, futurePayAmount);
//                         await sendEmailToPayAdmin(localFormValues, paymentIntent, orderDetails, toPayAmount, futurePayAmount, cart);
//                         await saveToPayPaymentDetails(studentRegisterResponse, paymentIntent, orderDetails, cart, toPayAmount, futurePayAmount, cart);

//                         setMessage("Payment successful, email sent, and order details saved!");
//                         navigate("/payment-done", { state: { orderDetails } });
//                     } catch (processError) {
//                         setMessage(
//                             "Payment successful but failed to complete all processes. Redirecting..."
//                         );
//                         setMessage("Payment successful but failed to complete all processes. Redirecting...");
//                         console.error("Process error:", processError);
//                         navigate("/payment-done");
//                     }
//                 }
//             } else {
//                 setMessage("Payment failed or is incomplete.");
//             }
//         } catch (err) {
//             console.error("Error during payment or email sending:", err);
//             setMessage("An unexpected error occurred.");
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     /******************************************************************************************* */

//     const paymentElementOptions = {
//         layout: "tabs",
//     };
//     /******************************************************************************************* */
//     // const paymentMethod = async(payment_method) => {
//     //     try{
//     //         const response = await axios.post(`user/get-payment-method/${payment_method}`)
//     //         console.log("Checking to the payment method.....",response);
//     //         return response;
//     //     }catch(error){
//     //         console.error('Failed to get payment method:', error.response?.data || error);
//     //     }
//     // }

//     /******************************************************************************************* */
//     const studentRegister = async (formvalues) => {
//         console.log('formvalues----SaveOrderDetails', formvalues)
//         try {
//             const response = await axios.post('user/studentRegister',
//                 { formvalues: formvalues });
//             console.log('Student register successfully:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('Failed to Student register:', error.response?.data || error);
//         }
//     }
//     /******************************************************************************************* */
//     const sendEmail = async (formvalues, paymentIntent, cart) => {
//         console.log('formvalues----inemail send function', formvalues)
//         try {
//             const coursesData = cart.map(course => ({
//                 //id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 course_type: course.course_type,
//                 buy_date: course.createdAt,
//             }));

//             const response = await axios.post('user/send-payment-email', {
//                 paymentIntent: paymentIntent.id,
//                 amount: paymentIntent.amount,
//                 email: formvalues.email,
//                 name: formvalues.firstName,
//                 courses_data: coursesData,
//             });

//             console.log('Email sent successfully:', response.data);
//             //window.location.href = "http://localhost:3000/complete";
//         } catch (emailError) {
//             console.error('Failed to send email:', emailError.response?.data || emailError);
//             // window.location.href = "http://localhost:3000/complete";
//         }
//     }

//     /*********************************************************************************************** */
//     const saveOrderDetails = async (formvalues, paymentIntent, cart) => {
//         console.log('formvalues----SaveOrderDetails', formvalues)
//         try {
//             const coursesData = cart.map(course => ({
//                 id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 course_image: course.course_image,
//                 vat: course.vat,

//             }));

//             const response = await axios.post('user/save-order-details', {
//                 paymentIntent: paymentIntent,
//                 formvalues: formvalues,
//                 coursesData: coursesData
//             });
//             console.log('Order details save successfully:', response.data);
//             return response.data.data;
//             //window.location.href = "http://localhost:3000/complete";
//         } catch (error) {
//             console.error('Failed to save order details:', error.response?.data || error);
//             // window.location.href = "http://localhost:3000/complete";
//         }
//     }
//     /*********************************************************************************************** */

//     const sendWellcomeEmail = async (formvalues, cart) => {
//         try {
//             const coursesData = cart.map(course => ({
//                 // id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 // course_type: course_type,
//                 buy_date: course.createdAt,
//             }));

//             const response = await axios.post('user/send-wellcome-email', {
//                 formvalues: formvalues,
//                 courses_data: coursesData,
//             });
//             console.log('Wellcome email send successfully:', response.data);
//         } catch (error) {
//             console.error('Failed to send wellcome email :', error.response?.data || error);
//         }
//     }
//     /*********************************************************************************************** */

//     const sendEmailToAdmin = async (formvalues, paymentIntent, toPayAmount, futurePayAmount, cart) => {
//         try {
//             console.log("cart", cart);
//             const coursesData = cart.map(course => ({
//                 // id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 // course_type: course_type,
//                 buy_date: course.createdAt,
//             }));

//             const response = await axios.post('user/send-student-enrolled-email', {
//                 formvalues: formvalues,
//                 paymentIntent: paymentIntent,
//                 toPay: toPayAmount,
//                 futurePay: futurePayAmount,
//                 // courses_data: coursesData,
//             });
//             console.log('Student enrolled email send successfully:', response.data);
//         } catch (error) {
//             console.error('Failed to send student enrolled email :', error.response?.data || error);
//         }
//     }
//     /*********************************************************************************************** */
//     const savePaymentDetails = async (studentRegisterResponse, paymentIntent, orderDetails, cart) => {
//         console.log('cart----cart', cart)
//         try {
//             const coursesData = cart.map(course => ({
//                 id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 course_image: course.course_image,
//                 vat: course.vat,

//             }));

//             const response = await axios.post('user/save-payment-details', {
//                 studentRegisterResponse: studentRegisterResponse,
//                 paymentIntent: paymentIntent,
//                 orderDetails: orderDetails,
//                 coursesData: coursesData
//             });
//             console.log('Order details save successfully:', response.data);
//             return response.data.data;
//             //window.location.href = "http://localhost:3000/complete";
//         } catch (error) {
//             console.error('Failed to save order details:', error.response?.data || error);
//             // window.location.href = "http://localhost:3000/complete";
//         }
//     }
//     /*********************************************************************************************** */
//     /*********************************************************************************************** */
//     const saveTopayOrderDetails = async (formvalues, paymentIntent, cart, toPayAmount, futurePayAmount) => {
//         try {
//             const coursesData = cart.map(course => ({
//                 id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 course_image: course.course_image,
//                 vat: course.vat,
//             }));

//             const response = await axios.post('user/save-topay-order-details', {
//                 paymentIntent: paymentIntent,
//                 formvalues: formvalues,
//                 coursesData: coursesData,
//                 toPay: toPayAmount,
//                 futurePay: futurePayAmount,
//             });
//             console.log('Order details save successfully:', response.data);
//             return response.data.data;
//             //window.location.href = "http://localhost:3000/complete";
//         } catch (error) {
//             console.error('Failed to save order details:', error.response?.data || error);
//             // window.location.href = "http://localhost:3000/complete";
//         }
//     }
//     /*********************************************************************************************** */
//     const saveToPayPaymentDetails = async (studentRegisterResponse, paymentIntent, orderDetails, cart, toPayAmount, futurePayAmount) => {
//         console.log('studentRegisterResponse----SavePaymentDetails', studentRegisterResponse)

//         try {
//             const coursesData = cart.map(course => ({
//                 id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 course_image: course.course_image,
//                 vat: course.vat,

//             }));

//             const response = await axios.post('user/save-topay-payment-details', {
//                 studentRegisterResponse: studentRegisterResponse,
//                 paymentIntent: paymentIntent,
//                 orderDetails: orderDetails,
//                 coursesData: coursesData,
//                 toPay: toPayAmount,
//                 futurePay: futurePayAmount,
//             });
//             console.log('Order details save successfully:', response.data);
//             return response.data.data;
//             //window.location.href = "http://localhost:3000/complete";
//         } catch (error) {
//             console.error('Failed to save order details:', error.response?.data || error);
//             // window.location.href = "http://localhost:3000/complete";
//         }
//     }

//     /*********************************************************************************************** */
//     const sendEmailToPayStudent = async (formvalues, paymentIntent, toPayAmount, futurePayAmount, cart, classLink) => {
//         console.log('classLinks----classLink', classLink)
//         try {

//             const coursesData = cart.map(course => ({
//                 // id: course._id,
//                 quantity: course.quantity,
//                 course_title: course.course_title,
//                 regular_price: course.regular_price,
//                 // course_type: course_type,
//                 buy_date: course.createdAt,
//             }));

//             console.log("coursesData", coursesData)

//             const response = await axios.post('user/send-topay-payment-email', {
//                 paymentIntent: paymentIntent.id,
//                 amount: paymentIntent.amount,
//                 toPay: toPayAmount,
//                 futurePay: futurePayAmount,
//                 email: formvalues.email,
//                 name: formvalues.firstName,
//                 courses_data: coursesData,
//                 classLink: classLink,
//             });
//             console.log('Email sent successfully:', response.data);
//         } catch (emailError) {
//             console.error('Failed to send email:', emailError.response?.data || emailError);
//         }
//     }
//     /*********************************************************************************************** */
//     const sendEmailToPayAdmin = async (formvalues, paymentIntent, toPayAmount, futurePayAmount, cart) => {
//         // try {

//         const coursesData = cart.map(course => ({
//             // id: course._id,
//             quantity: course.quantity,
//             course_title: course.course_title,
//             regular_price: course.regular_price,
//             // course_type: course_type,
//             buy_date: course.createdAt,
//         }));

//         console.log("coursesDatacoursesDatacoursesData", coursesData);


//         //     const response = await axios.post('user/send-topay-student-enrolled-email', {
//         //         formvalues: formvalues,
//         //         paymentIntent: paymentIntent,
//         //         toPay: toPayAmount,
//         //         futurePay: futurePayAmount,
//         //         courses_data: coursesData,
//         //     });
//         //     console.log('Student enrolled email send successfully:', response.data);
//         // } catch (error) {
//         //     console.error('Failed to send student enrolled email :', error.response?.data || error);
//         // }
//     }
//     /*********************************************************************************************** */


//     return (
//         <>
//             {loading === true ? <Loader /> : ''}

//             {/* <button class="btn btn-success" onClick={sendEmailToPayAdmin} > Call API</button> */}

//             <PaymentElement id="payment-element" options={paymentElementOptions} />

//             <button
//                 onClick={async (e) => {
//                     e.preventDefault();
//                     await triggerValidation();
//                     handleSubmit(e);
//                 }}
//                 type="button"
//                 disabled={isLoading || !stripe || !elements}
//                 id="submit"
//                 className="bg-blue text-white font-bold w-100 py-3 px-4 rounded w-full my-3"
//             >
//                 {isLoading ? <div className="spinner-border spinner-border-sm" id="spinner"></div> : "Pay now"}
//             </button>

//             {message && <p className="text-red-500 mt-2">{message}</p>}

//         </>
//     );
// }



import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ paydepositeValue, formvalues, triggerValidation, isDirty, cart }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localFormValues, setLocalFormValues] = useState({});
    const [classLink, setClassLink] = useState([]);

    console.log("Checking cart data", cart);
    const { toPayAmount, futurePayAmount } = paydepositeValue || {};

    useEffect(() => {
        getCourseZoomLink(cart);
        setLocalFormValues(formvalues);
    }, [formvalues,cart]);

    const getCourseZoomLink = async (cart) => {
        const courseIds = cart.map((item) => item.id)
        console.log("courseIds", courseIds);

        try {
            const response = await axios.get(`user/get-courses-zoomlink`, {
                params: { courseIds: JSON.stringify(courseIds) }
            });
            if (response.data.status === true && response.data.data) {
                console.log("checking courses-zoomlink data", response);
                const data = response.data.data;
                setClassLink(data);
            }

        } catch (error) {
            console.error("Data has not found.", error);
            // toast.error("Data has not found.", error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = await triggerValidation();
        if (Object.keys(formErrors).length > 0 && isDirty) {
            setMessage("Please fill out the required fields correctly.");
            // setLoading(false);
            return;
        }

        setMessage(null);

        if (!stripe || !elements) {
            // setLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            // Step 1: Confirm payment without automatic redirection
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {},
                redirect: "if_required",
            });

            if (error) {
                setMessage(error.message || "An unexpected error occurred.");
                setIsLoading(false);
                // setLoading(false);
                return;
            }

            // Step 2: Check if payment was successful
            if (paymentIntent && paymentIntent.status === "succeeded") {
                // const paymentMethodDetails = await stripe.retrievePaymentMethod(paymentMethodId);
                // console.log("Payment Method Details:", paymentMethodDetails);

                if (toPayAmount === undefined || futurePayAmount === undefined) {
                    try {
                        // Step 3: Send email and save order details sequentially
                        const studentRegisterResponse = await studentRegister(localFormValues);
                        const findInstructorResponse = await findInstructor(studentRegisterResponse, cart, paymentIntent)
                        const orderDetails = await saveOrderDetails(localFormValues, paymentIntent, cart, studentRegisterResponse, findInstructorResponse);
                        await sendEmail( paymentIntent, studentRegisterResponse, findInstructorResponse, orderDetails );  
                       // await sendEmailToAdmin(localFormValues, paymentIntent, orderDetails, cart,classLink);
                        await savePaymentDetails(studentRegisterResponse, paymentIntent, orderDetails, cart);

                        setMessage("Payment successful, email sent, and order details saved!");

                        // Step 4: Redirect after email and order details are processed
                        navigate("/payment-done", { state: { orderDetails } });
                    } catch (processError) {
                        setMessage(
                            "Payment successful but failed to complete all processes. Redirecting..."
                        );
                        console.error("Process error:", processError);

                        // Redirect even if additional steps fail
                        //window.location.href = "http://localhost:3000/payment-done";
                        navigate("/payment-done");
                    }
                } else if (toPayAmount !== undefined && toPayAmount !== null && futurePayAmount !== undefined && futurePayAmount !== null) {

                    try {
                        // Step 3: Send email and save order details sequentially
                        const studentRegisterResponse = await studentRegister(localFormValues);
                        const findInstructorResponse = await findInstructor(studentRegisterResponse, cart, paymentIntent)
                        const orderDetails = await saveTopayOrderDetails(localFormValues, paymentIntent, cart, toPayAmount, futurePayAmount, studentRegisterResponse, findInstructorResponse);
                        // await sendWellcomeEmail(localFormValues, cart);
                        await sendEmailToPayStudent(toPayAmount, futurePayAmount, paymentIntent, studentRegisterResponse, findInstructorResponse, orderDetails); 
                       // await sendEmailToPayAdmin(localFormValues, paymentIntent, orderDetails, toPayAmount, futurePayAmount, cart, classLink);
                        await saveToPayPaymentDetails(studentRegisterResponse, paymentIntent, orderDetails, cart, toPayAmount, futurePayAmount, cart);

                        setMessage("Payment successful, email sent, and order details saved!");
                        navigate("/payment-done", { state: { orderDetails } });
                    } catch (processError) {
                        // Handle email or order details saving failure
                        setMessage(
                            "Payment successful but failed to complete all processes. Redirecting..."
                        );
                        console.error("Process error:", processError);
                        navigate("/payment-done");
                    }
                }

            } else {
                setMessage("Payment failed or is incomplete.");
            }
        } catch (err) {
            console.error("Error during payment or email sending:", err);
            setMessage("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
            // setLoading(false);
        }
    };


    /******************************************************************************************* */

    const paymentElementOptions = {
        layout: "tabs",
    };
    /******************************************************************************************* */
    // const paymentMethod = async(payment_method) => {
    //     try{
    //         const response = await axios.post(`user/get-payment-method/${payment_method}`)
    //         console.log("Checking to the payment method.....",response);
    //         return response;
    //     }catch(error){
    //         console.error('Failed to get payment method:', error.response?.data || error);
    //     }
    // }

    /******************************************************************************************* */
    const studentRegister = async (formvalues) => {
        console.log('formvalues----SaveOrderDetails', formvalues)
        try {
            const response = await axios.post('user/studentRegister',
                { formvalues: formvalues });
            console.log('Student register successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to Student register:', error.response?.data || error);
        }
    }
    /******************************************************************************************* */
    const sendEmail = async ( paymentIntent, studentRegisterResponse, findInstructorResponse, orderDetails) => {
        console.log("cart.............sendEmail.....................checking cart",cart)
        try {
            const response = await axios.post('user/send-payment-email', {
                paymentIntent: paymentIntent,
                studentRegisterResponse: studentRegisterResponse,
                findInstructorResponse: findInstructorResponse,
                orderDetails: orderDetails,
            });
           
            console.log('Email sent successfully:', response.data);
           
        } catch (emailError) {
            console.error('Failed to send email:', emailError.response?.data || emailError);
        }
    }

    /*********************************************************************************************** */
    const saveOrderDetails = async (formvalues, paymentIntent, cart, studentRegisterResponse, findInstructorResponse) => {
        console.log("cart.............saveOrderDetails.....................checking cart",cart)
        try {
            const coursesData = cart.map(course => ({
                id: course._id,
                quantity: course.quantity,
                course_title: course.course_title,
                regular_price: course.regular_price,
                course_image: course.course_image,
                vat: course.vat,

            }));

            const response = await axios.post('user/save-order-details', {
                paymentIntent: paymentIntent,
                formvalues: formvalues,
                coursesData: coursesData,
                studentRegisterResponse: studentRegisterResponse,
                findInstructorResponse: findInstructorResponse
            });
            console.log('Order details save successfully:', response.data);
            return response.data.data;
            //window.location.href = "http://localhost:3000/complete";
        } catch (error) {
            console.error('Failed to save order details:', error.response?.data || error);
            // window.location.href = "http://localhost:3000/complete";
        }
    }
    /*********************************************************************************************** */

    // const sendWellcomeEmail = async (formvalues, cart) => {
    //     console.log("cart.............sendWellcomeEmail.....................checking cart",cart)

    //     try {
    //         const coursesData = cart.map(course => ({
    //             // id: course._id,
    //             quantity: course.quantity,
    //             course_title: course.course_title,
    //             regular_price: course.regular_price,
    //             // course_type: course_type,
    //             buy_date: course.createdAt,
    //         }));

    //         const response = await axios.post('user/send-wellcome-email', {
    //             formvalues: formvalues,
    //             courses_data: coursesData,
    //         });
    //         console.log('Wellcome email send successfully:', response.data);
    //     } catch (error) {
    //         console.error('Failed to send wellcome email :', error.response?.data || error);
    //     }
    // }
    /*********************************************************************************************** */
  
    // const sendEmailToAdmin = async (formvalues, paymentIntent, orderDetails,  cart, classLink) => {
    //     try {
    //         console.log('cart-------#####',cart)
    //         const coursesData = (cart).map(course => ({
    //             quantity: course.quantity,
    //             course_title: course.course_title,
    //             regular_price: course.regular_price,               
    //         }));
    //         const response = await axios.post('user/send-student-enrolled-email', {
    //             formvalues: formvalues,
    //             paymentIntent: paymentIntent,
    //             orderDetails: orderDetails,
    //             courses_data: coursesData,
    //             classLink: classLink,
    //         });
    //         console.log('Student enrolled email send successfully:', response.data);
    //     } catch (error) {
    //         console.error('Failed to send student enrolled email :', error.response?.data || error);
    //     }
    // }
    /*********************************************************************************************** */
    const savePaymentDetails = async (studentRegisterResponse, paymentIntent, orderDetails, cart) => {
        console.log("cart.............savePaymentDetails.....................checking cart",cart)
        try {
            const coursesData = cart.map(course => ({
                id: course._id,
                quantity: course.quantity,
                course_title: course.course_title,
                regular_price: course.regular_price,
                course_image: course.course_image,
                vat: course.vat,

            }));

            const response = await axios.post('user/save-payment-details', {
                studentRegisterResponse: studentRegisterResponse,
                paymentIntent: paymentIntent,
                orderDetails: orderDetails,
                coursesData: coursesData
            });
            console.log('Order details save successfully:', response.data);
            return response.data.data;
            //window.location.href = "http://localhost:3000/complete";
        } catch (error) {
            console.error('Failed to save order details:', error.response?.data || error);
            // window.location.href = "http://localhost:3000/complete";
        }
    }
    /*********************************************************************************************** */
    /*********************************************************************************************** */
    const saveTopayOrderDetails = async (formvalues, paymentIntent, cart, toPayAmount, futurePayAmount, studentRegisterResponse, findInstructorResponse) => {
        console.log("cart.............saveTopayOrderDetails.....................checking cart",cart)
        
        try {
            const coursesData = cart.map(course => ({
                id: course._id,
                quantity: course.quantity,
                course_title: course.course_title,
                regular_price: course.regular_price,
                course_image: course.course_image,
                vat: course.vat,
            }));

            const response = await axios.post('user/save-topay-order-details', {
                paymentIntent: paymentIntent,
                formvalues: formvalues,
                coursesData: coursesData,
                toPay: toPayAmount,
                futurePay: futurePayAmount,
                studentRegisterResponse: studentRegisterResponse,
                findInstructorResponse: findInstructorResponse
            });
            console.log('Order details save successfully:', response.data);
            return response.data.data;
            //window.location.href = "http://localhost:3000/complete";
        } catch (error) {
            console.error('Failed to save order details:', error.response?.data || error);
            // window.location.href = "http://localhost:3000/complete";
        }
    }
    /*********************************************************************************************** */
    const saveToPayPaymentDetails = async (studentRegisterResponse, paymentIntent, orderDetails, cart, toPayAmount, futurePayAmount) => {
        console.log("cart.............saveToPayPaymentDetails.....................checking cart",cart)

        try {
            const coursesData = cart.map(course => ({
                id: course._id,
                quantity: course.quantity,
                course_title: course.course_title,
                regular_price: course.regular_price,
                course_image: course.course_image,
                vat: course.vat,

            }));

            const response = await axios.post('user/save-topay-payment-details', {
                studentRegisterResponse: studentRegisterResponse,
                paymentIntent: paymentIntent,
                orderDetails: orderDetails,
                coursesData: coursesData,
                toPay: toPayAmount,
                futurePay: futurePayAmount,
            });
            console.log('Order details save successfully:', response.data);
            return response.data.data;
            //window.location.href = "http://localhost:3000/complete";
        } catch (error) {
            console.error('Failed to save order details:', error.response?.data || error);
            // window.location.href = "http://localhost:3000/complete";
        }
    }

    /*********************************************************************************************** */
    const sendEmailToPayStudent = async (toPayAmount, futurePayAmount, paymentIntent, studentRegisterResponse, findInstructorResponse, orderDetails) => {
       // console.log("cart.............sendEmailToPayStudent.....................checking cart",cart)
       // console.log('toPayAmount--',toPayAmount)
        try {

            const response = await axios.post('user/send-topay-payment-email', {
                paymentIntent: paymentIntent,
                studentRegisterResponse: studentRegisterResponse,
                findInstructorResponse: findInstructorResponse,
                orderDetails: orderDetails,
                toPay: toPayAmount,
                futurePay: futurePayAmount,
               
            });
           // console.log('Email sent successfully:', response.data);
            //window.location.href = "http://localhost:3000/complete";
        } catch (emailError) {
            console.error('Failed to send email:', emailError.response?.data || emailError);
            // window.location.href = "http://localhost:3000/complete";
        }
    }
    /*********************************************************************************************** */
    // const sendEmailToPayAdmin = async (formvalues, paymentIntent, orderDetails, toPayAmount, futurePayAmount, cart, classLink) => {
    //     try {

    //         console.log("cart.............sendEmailToPayAdmin.....................checking cart",cart)

    //         const coursesData = cart.map(course => ({
    //             // id: course._id,
    //             quantity: course.quantity,
    //             course_title: course.course_title,
    //             regular_price: course.regular_price,
    //             // course_type: course_type,
    //             buy_date: course.createdAt,
    //         }));

    //         const response = await axios.post('user/send-topay-student-enrolled-email', {
    //             formvalues: formvalues,
    //             paymentIntent: paymentIntent,
    //             toPay: toPayAmount,
    //             futurePay: futurePayAmount,
    //             courses_data: coursesData,
    //             orderDetails: orderDetails,
    //             classLink: classLink,
    //         });
    //         console.log('Student enrolled email send successfully:', response.data);
    //     } catch (error) {
    //         console.error('Failed to send student enrolled email :', error.response?.data || error);
    //     }
    // }
    /*********************************************************************************************** */

    const findInstructor = async (studentRegisterResponse, cart, paymentIntent) => {
        console.log("cart.............findInstructor.....................checking cart",cart)
        try {

            const coursesData = cart.map(course => ({
                 id: course._id,
                quantity: course.quantity,
                course_title: course.course_title,
                regular_price: course.regular_price,
                // course_type: course_type,
                buy_date: course.createdAt,
                classLink: classLink,
            }));

            console.log("coursesData", coursesData)

            const response = await axios.post('user/find-instructor', {
                paymentIntent: paymentIntent,
                courses_data: coursesData,
                studentRegisterResponse:studentRegisterResponse
            });
            console.log('response---of --find--instructor--',response)
            return response.data.data.data;
            //window.location.href = "http://localhost:3000/complete";
        } catch (error) {
            console.error('Failed to find instructor :', error.response?.data || error);
            // window.location.href = "http://localhost:3000/complete";
        }
    }
/*********************************************************************************************** */

    return (
        <>
            {loading === true ? <Loader /> : ''}

            <PaymentElement id="payment-element" options={paymentElementOptions} />

            <button
                onClick={async (e) => {
                    e.preventDefault();
                    await triggerValidation();
                    handleSubmit(e);
                }}
                type="button"
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="bg-blue text-white font-bold w-100 py-3 px-4 rounded w-full my-3"
            >
                {isLoading ? <div className="spinner-border spinner-border-sm" id="spinner"></div> : "Pay now"}
            </button>

            {message && <p className="text-red-500 mt-2">{message}</p>}

        </>
    );
}

