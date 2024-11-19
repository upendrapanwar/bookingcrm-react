import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loader from "../../components/common/Loader";

export default function CheckoutForm({ dpmCheckerLink, isFormValid, triggerValidation, isDirty }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = await triggerValidation();
        console.log(formErrors);

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

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-done",
            },
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
        }

        setIsLoading(false);
        setLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

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
                className="bg-blue text-white font-bold w-100 py-2 px-4 rounded w-full my-3"
            >
                {isLoading ? <div class="spinner-border spinner-border-sm" id="spinner"></div> : "Pay now"}
            </button>

            {message && <p className="text-red-500 mt-2">{message}</p>}

        </>
    );
}
