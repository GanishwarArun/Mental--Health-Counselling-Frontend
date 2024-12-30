import React, { useState, useEffect } from "react";
import axios from "axios";

const PayPalIntegration = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);

  // PayPal credentials and environment from .env
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const paypalApiUrl =
    import.meta.env.VITE_PAYPAL_ENVIRONMENT === "sandbox"
      ? "https://api.sandbox.paypal.com"
      : "https://api.paypal.com";

  // Dynamically load PayPal SDK script
  const loadPayPalSdk = () => {
    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => setError("Failed to load PayPal SDK.");
    document.body.appendChild(script);
  };

  // Fetch Access Token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const clientSecret = import.meta.env.VITE_PAYPAL_CLIENT_SECRET;
        const response = await axios.post(
          `${paypalApiUrl}/v1/oauth2/token`,
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (err) {
        console.error("Error fetching PayPal token:", err);
        setError("Failed to authenticate with PayPal. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
    loadPayPalSdk();
  }, []);

  // Render PayPal Button
  const renderPayPalButton = () => {
    if (!sdkReady || !window.paypal) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "50.00", // Payment amount
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Payment Successful! Transaction ID: ${details.id}`);
          });
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
          setError("Payment failed. Please try again later.");
        },
      })
      .render("#paypal-button-container");
  };

  // Trigger rendering PayPal button when SDK is ready
  useEffect(() => {
    if (sdkReady) {
      renderPayPalButton();
    }
  }, [sdkReady]);

  return (
    <div className="bg-gray-100 shadow-md mx-auto mt-12 p-8 rounded-lg max-w-xl font-sans text-gray-800">
      <h1 className="mb-4 font-bold text-2xl">Pay with PayPal</h1>
      {error && <div className="mt-4 text-lg text-red-600">{error}</div>}
      {loading && <p className="text-gray-600 text-lg">Loading PayPal system...</p>}
      <div id="paypal-button-container" className="mt-6"></div>
    </div>
  );
};

export default PayPalIntegration;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PayPalIntegration = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // PayPal credentials and environment
//   const clientId = "ATTB3YYNeA-Q9GymxIzvvuBUkoSP2D7VsVCvVCVLOiFVFZZwx_2t1l_kJ5VLIBRE6mCV-gGPD3F6b1SA";
//   const clientSecret = "ELrzAbjZwxeWs5bvDUwtKAyckDR0YHoUbPa5aXF_ho0gB8nR9wZks5I2EJpQ08ZTVfKJNbZuxEseJp_I";
//   const paypalApiUrl = "https://api.sandbox.paypal.com"; // Use sandbox for testing

//   // Fetch Access Token
//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.post(
//           `${paypalApiUrl}/v1/oauth2/token`,
//           "grant_type=client_credentials",
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//               Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//           }
//         );
//         setAccessToken(response.data.access_token);
//         console.log("Access Token:", response.data.access_token);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching PayPal token:", err);
//         setError("Failed to authenticate with PayPal. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchAccessToken();
//   }, []);

//   // Render PayPal Button
//   const renderPayPalButton = () => {
//     if (!accessToken || !window.paypal) return;

//     window.paypal
//       .Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: "50.00", // Payment amount
//                   currency_code: "USD",
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: (data, actions) => {
//           return actions.order.capture().then((details) => {
//             alert(`Payment Successful! Transaction ID: ${details.id}`);
//           });
//         },
//         onError: (err) => {
//           console.error("PayPal Error:", err);
//           setError("Payment failed. Please try again later.");
//         },
//       })
//       .render("#paypal-button-container");
//   };

//   // Trigger rendering PayPal button when accessToken is available
//   useEffect(() => {
//     if (accessToken) {
//       renderPayPalButton();
//     }
//   }, [accessToken]);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Pay with PayPal</h1>
//       {error && <div style={styles.errorMessage}>{error}</div>}
//       {loading && <p style={styles.loadingText}>Loading PayPal system...</p>}
//       <div id="paypal-button-container" style={styles.paypalButton}></div>
//     </div>
//   );
// };

// // Inline styles for the component
// const styles = {
//   container: {
//     backgroundColor: "#f9f9f9",
//     color: "#333",
//     fontFamily: "Arial, sans-serif",
//     padding: "30px",
//     borderRadius: "12px",
//     maxWidth: "600px",
//     margin: "50px auto",
//     textAlign: "center",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   },
//   errorMessage: {
//     color: "#d9534f",
//     fontSize: "16px",
//     marginTop: "15px",
//   },
//   loadingText: {
//     fontSize: "18px",
//     color: "#555",
//   },
//   paypalButton: {
//     marginTop: "20px",
//   },
// };

// export default PayPalIntegration;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PayPalButton = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [error, setError] = useState(null);
//   const [amount, setAmount] = useState(''); // Customer input amount
//   const [isProcessing, setIsProcessing] = useState(false); // For loading state

//   const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID; // Using the environment variable
//   const clientSecret = import.meta.env.VITE_PAYPAL_CLIENT_SECRET; // Using the environment variable
//   const paypalApiUrl = import.meta.env.VITE_PAYPAL_ENVIRONMENT === 'sandbox' 
//     ? 'https://api.sandbox.paypal.com' 
//     : 'https://api.paypal.com'; // API URL based on environment

//   // Fetch PayPal access token
//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       try {
//         const response = await axios.post(
//           `${paypalApiUrl}/v1/oauth2/token`,
//           `grant_type=client_credentials`,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//           }
//         );
//         setAccessToken(response.data.access_token);
//         console.log('PayPal Access Token:', response.data.access_token);
//       } catch (err) {
//         console.error('Error fetching PayPal token:', err);
//         setError('Failed to authenticate with PayPal');
//       }
//     };

//     fetchAccessToken();
//   }, [clientId, clientSecret, paypalApiUrl]);

//   // Handle the creation and rendering of PayPal button
//   useEffect(() => {
//     if (accessToken && window.paypal) {
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: amount || '10.00', // Default value is 10.00 if no amount is entered
//                 currency_code: 'USD',
//               },
//             }],
//           });
//         },
//         onApprove: (data, actions) => {
//           setIsProcessing(true); // Show loading during payment capture
//           return actions.order.capture().then((details) => {
//             alert(`Payment successful! Transaction ID: ${details.id}`);
//             // You can store the details or handle them as needed (e.g., save to backend)
//             setIsProcessing(false);
//           });
//         },
//         onError: (err) => {
//           console.error('PayPal Error:', err);
//           setError('Payment failed. Please try again later.');
//           setIsProcessing(false); // Stop loading
//         },
//       }).render('#paypal-button-container');
//     }
//   }, [accessToken, amount]); // Re-run when access token or amount changes

//   // Handle amount change
//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   return (
//     <div className="paypal-payment-container">
//       <h1>Pay with PayPal</h1>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
      
//       {/* Allow the user to enter a custom payment amount */}
//       <div>
//         <label htmlFor="amount">Enter Payment Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           value={amount}
//           onChange={handleAmountChange}
//           placeholder="Enter amount"
//           min="1"
//           step="any"
//         />
//       </div>

//       {isProcessing && <p>Processing your payment...</p>}

//       {/* If there's no access token yet, show a loading message */}
//       {!accessToken && <p>Loading PayPal payment system...</p>}

//       <div id="paypal-button-container"></div> {/* PayPal button container */}
//     </div>
//   );
// };

// export default PayPalButton;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PayPalButton = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [error, setError] = useState(null);

//   const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID; // Using the environment variable
//   const clientSecret = import.meta.env.VITE_PAYPAL_CLIENT_SECRET; // Using the environment variable
//   const paypalApiUrl = import.meta.env.VITE_PAYPAL_ENVIRONMENT === 'sandbox' 
//     ? 'https://api.sandbox.paypal.com' 
//     : 'https://api.paypal.com'; // API URL based on environment

//   useEffect(() => {
//     // Fetch PayPal access token
//     const fetchAccessToken = async () => {
//       try {
//         const response = await axios.post(
//           `${paypalApiUrl}/v1/oauth2/token`,
//           `grant_type=client_credentials`,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
//             },
//           }
//         );
//         setAccessToken(response.data.access_token); // Store the access token
//         console.log('PayPal Access Token:', response.data.access_token);
//       } catch (err) {
//         console.error('Error fetching PayPal token:', err);
//         setError('Failed to authenticate with PayPal');
//       }
//     };

//     fetchAccessToken();
//   }, [clientId, clientSecret, paypalApiUrl]);

//   useEffect(() => {
//     // Check if PayPal script is loaded
//     if (accessToken && window.paypal) {
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: '10.00', // Set the payment amount
//                 currency_code: 'USD', // Set the currency
//               },
//             }],
//           });
//         },
//         onApprove: (data, actions) => {
//           return actions.order.capture().then((details) => {
//             alert('Payment successful! Transaction ID: ' + details.id);
//             // Handle payment success (e.g., show success message or redirect)
//           });
//         },
//         onError: (err) => {
//           console.error('PayPal Error:', err);
//           setError('Payment failed. Please try again later.');
//         },
//       }).render('#paypal-button-container'); // Render PayPal button into the container
//     }
//   }, [accessToken]);

//   return (
//     <div>
//       <h1>Pay with PayPal</h1>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {!accessToken && <p>Loading PayPal payment system...</p>}
//       <div id="paypal-button-container"></div> {/* PayPal button container */}
//     </div>
//   );
// };

// export default PayPalButton;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PAYPAL_API_URL = 'https://api.sandbox.paypal.com'; // or use 'https://api.paypal.com' for production

// const PayPalComponent = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // To show loading state for button

//   const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID; // Using the environment variable
//   const clientSecret = import.meta.env.VITE_PAYPAL_CLIENT_SECRET; // Using the environment variable

//   useEffect(() => {
//     // Fetch PayPal access token when the component mounts
//     const fetchPayPalToken = async () => {
//       try {
//         const response = await axios.post(
//           `${PAYPAL_API_URL}/v1/oauth2/token`,
//           `grant_type=client_credentials`,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//           }
//         );
//         setAccessToken(response.data.access_token);
//       } catch (err) {
//         console.error('Error fetching PayPal token:', err);
//         setError('Failed to authenticate with PayPal');
//       }
//     };

//     fetchPayPalToken();
//   }, [clientId, clientSecret]);

//   const handlePayPalPayment = async () => {
//     if (!accessToken) {
//       console.error('No PayPal Access Token available');
//       return;
//     }

//     setIsLoading(true); // Show loading while processing the payment

//     try {
//       // Use the access token for API requests, for example, creating a payment
//       const paymentResponse = await axios.post(
//         `${PAYPAL_API_URL}/v1/payments/payment`,
//         {
//           intent: 'sale',
//           payer: {
//             payment_method: 'paypal',
//           },
//           transactions: [
//             {
//               amount: {
//                 total: '10.00',
//                 currency: 'USD',
//               },
//               description: 'Payment for services.',
//             },
//           ],
//           redirect_urls: {
//             return_url: 'https://example.com/return', // Replace with your actual return URL
//             cancel_url: 'https://example.com/cancel', // Replace with your actual cancel URL
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log('Payment created:', paymentResponse.data);
//       // Handle redirection for payment approval
//       const approvalUrl = paymentResponse.data.links.find(link => link.rel === 'approval_url').href;
//       window.location.href = approvalUrl;
//     } catch (err) {
//       console.error('Error making PayPal payment:', err);
//       setError('Payment creation failed');
//     } finally {
//       setIsLoading(false); // Hide loading after payment processing
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>PayPal Payment Example</h1>
//       {error && <div style={styles.error}>{error}</div>}

//       <div style={styles.buttonContainer}>
//         <button 
//           onClick={handlePayPalPayment} 
//           disabled={!accessToken || isLoading}
//           style={styles.payButton}
//         >
//           {isLoading ? 'Processing Payment...' : 'Pay with PayPal'}
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#f4f4f4',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//     minHeight: '100vh',
//   },
//   heading: {
//     fontSize: '24px',
//     color: '#333',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   error: {
//     color: 'red',
//     margin: '10px 0',
//   },
//   buttonContainer: {
//     marginTop: '20px',
//   },
//   payButton: {
//     backgroundColor: '#0070ba',
//     color: '#fff',
//     fontSize: '16px',
//     padding: '12px 24px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     minWidth: '150px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default PayPalComponent;

