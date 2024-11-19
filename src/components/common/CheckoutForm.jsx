import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CheckoutForm({ dpmCheckerLink }) {
    console.log("dpmCheckerLink", dpmCheckerLink)
    const stripe = useStripe();
    const elements = useElements();

    console.log("stripe", stripe);
    console.log("elements", elements);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("elements", elements);
            console.log("stripe", stripe);
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000/complete",
                },
                // redirect: "if_required",
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Send email notification
                try {
                    await axios.post('user/send-payment-email', {
                        paymentIntent: paymentIntent.id,
                        amount: paymentIntent.amount,
                        // email: userEmail,
                        // name: userName,
                        // Add any other relevant payment details
                    });

                    // Redirect after email is sent
                    // window.location.href = "http://localhost:3000/complete";
                } catch (emailError) {
                    console.error('Failed to send email:', emailError.response?.data || emailError);
                    // Still redirect even if email fails
                    // window.location.href = "http://localhost:3000/complete";
                }
            }
        } catch (err) {
            console.error('Payment error:', err);
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }


    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <Link to={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</Link>
                </p>
            </div>
        </>
    );
}