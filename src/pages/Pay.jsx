import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// Your Stripe public key (replace with your actual key)
const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const Pay = () => {
  const [amount, setAmount] = useState(20); // Example payment amount ($20)
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  // Function to handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // Now, call your backend to create a payment intent and confirm the payment
    const res = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: amount * 100, // Convert dollars to cents
      }),
    });

    const paymentIntentResponse = await res.json();

    // Confirm the payment with the client secret from the backend
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentResponse.clientSecret
    );

    if (confirmError) {
      setErrorMessage(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      } else {
        alert("Payment failed.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 to-indigo-500 p-8 min-h-screen">
      <h1 className="mb-6 font-bold text-4xl text-center text-white">Payment Page</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-xl p-6 rounded-xl w-full max-w-lg">
        <h2 className="mb-4 font-semibold text-2xl text-gray-800">Pay ${amount}</h2>

        {/* Stripe Card Input */}
        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  border: "1px solid #ced4da",
                  padding: "10px",
                  borderRadius: "5px",
                },
              },
            }}
          />
        </div>

        {/* Error Message */}
        {errorMessage && <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>}

        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg w-full font-bold text-white transition-all duration-300"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <Pay />
    </Elements>
  );
};

export default PaymentPage;

