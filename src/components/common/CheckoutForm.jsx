import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ formvalues, triggerValidation, isDirty, cart }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localFormValues, setLocalFormValues] = useState({});

    useEffect(() => {
        setLocalFormValues(formvalues);
    }, [formvalues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formErrors = await triggerValidation();
        if (Object.keys(formErrors).length > 0 && isDirty) {
            setMessage("Please fill out the required fields correctly.");
            setLoading(false);
            return;
        }
    
        setMessage(null);
    
        if (!stripe || !elements) {
            setLoading(false);
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
                setLoading(false);
                return;
            }
    
            // Step 2: Check if payment was successful
            if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    // Step 3: Send email and save order details sequentially
                    const studentRegisterResponse = await studentRegister(localFormValues);
                    await sendWellcomeEmail(localFormValues);
                    await sendEmail(localFormValues, paymentIntent);
                   const orderDetails = await saveOrderDetails(localFormValues, paymentIntent, cart);
                    await sendEmailToAdmin(localFormValues, paymentIntent, orderDetails);
                    await savePaymentDetails(studentRegisterResponse, paymentIntent, orderDetails, cart);
    
                    setMessage("Payment successful, email sent, and order details saved!");
    
                    // Step 4: Redirect after email and order details are processed
                   // window.location.href = "http://localhost:3000/payment-done";
                //    navigate("/payment-done");
                console.log("orderDetails",orderDetails)
                navigate("/payment-done", { state: { orderDetails } });
                } catch (processError) {
                    // Handle email or order details saving failure
                    setMessage(
                        "Payment successful but failed to complete all processes. Redirecting..."
                    );
                    console.error("Process error:", processError);
    
                    // Redirect even if additional steps fail
                    //window.location.href = "http://localhost:3000/payment-done";
                    navigate("/payment-done");
                }
    
    
            } else {
                setMessage("Payment failed or is incomplete.");
            }
        } catch (err) {
            console.error("Error during payment or email sending:", err);
            setMessage("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
            setLoading(false);
        }
    };
    
    
    /******************************************************************************************* */
    
        const paymentElementOptions = {
            layout: "tabs",
        };
    /******************************************************************************************* */
    const studentRegister = async (formvalues) => {
        console.log('formvalues----SaveOrderDetails', formvalues )
        try {
           const response = await axios.post('user/studentRegister', 
            {formvalues: formvalues});
            console.log('Student register successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to Student register:', error.response?.data || error);
        }
    }
    /******************************************************************************************* */
        const sendEmail = async (formvalues, paymentIntent) => {
            console.log('formvalues----inemail send function', formvalues )
            try {
               const response = await axios.post('user/send-payment-email', {
                    paymentIntent: paymentIntent.id,
                    amount: paymentIntent.amount,
                    email: formvalues.email,
                    name: formvalues.firstName,
                });
                console.log('Email sent successfully:', response.data);
                //window.location.href = "http://localhost:3000/complete";
            } catch (emailError) {
                console.error('Failed to send email:', emailError.response?.data || emailError);
               // window.location.href = "http://localhost:3000/complete";
            }
        }
    
        /*********************************************************************************************** */
        const saveOrderDetails = async (formvalues, paymentIntent, cart) => {
            console.log('formvalues----SaveOrderDetails', formvalues )
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
        
         const sendWellcomeEmail = async (formvalues) => {
            try {
               const response = await axios.post('user/send-wellcome-email', {
                    formvalues: formvalues
                });
                console.log('Wellcome email send successfully:', response.data);
            } catch (error) {
                console.error('Failed to send wellcome email :', error.response?.data || error);
            }
        }
        /*********************************************************************************************** */
        
        const sendEmailToAdmin = async (formvalues, paymentIntent) => {
            try {
               const response = await axios.post('user/send-student-enrolled-email', {
                    formvalues: formvalues,
                    paymentIntent: paymentIntent
                });
                console.log('Student enrolled email send successfully:', response.data);
            } catch (error) {
                console.error('Failed to send student enrolled email :', error.response?.data || error);
            }
        }
        /*********************************************************************************************** */
        const savePaymentDetails = async (studentRegisterResponse, paymentIntent, orderDetails, cart ) => {
            console.log('studentRegisterResponse----SavePaymentDetails', studentRegisterResponse )
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

