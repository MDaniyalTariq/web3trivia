import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import GooglePayButton from '@google-pay/button-react';
import { useAddress, useWallet } from '@thirdweb-dev/react';


/*global google*/

const GooglesPayButton = ({ amount }: { amount: number }) => {
  const [loaded, setLoaded] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
  const wallet = useAddress();


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error('Failed to load the Google Pay script');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const submitTransaction = async (amount: number) => {
    try {
      const response = await axios.post(
        "https://djangosport.azurewebsites.net/api/trans/",
        {
          wallet_address: wallet,
          amount: parseFloat(amount.toString()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      localStorage.setItem("canPlay", "true");

    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };


  const loadPaymentData = () => {
    if (!(window as any).google) {
      console.error('Google Pay is not available');
      return;
    }

    const paymentsClient = new (window as any).google.payments.api.PaymentsClient({ environment: 'TEST' });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA', 'JCB', 'INTERAC', 'DISCOVER', 'AMEX'

          ],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      }],
      merchantInfo: {
        merchantId: '01234567890123456789', // Replace with your merchant ID
        merchantName: 'Example Merchant',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: amount.toString(),
        currencyCode: 'USD',
        countryCode: 'US',
      },
    };

    paymentsClient.loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        console.log('Payment successful', paymentData);
        //api for tranasction

        if (amount && wallet) {
          submitTransaction(amount);


        }



        setShowPopover(true);
      })
      .catch((error: any) => {
        console.error('Payment failed', error);
      });
  };

  const handlePaymentSuccess = (paymentRequest: any) => {
    console.log('Payment successful', paymentRequest);

    if (amount && wallet) {
      submitTransaction(amount);
    }

    setShowPopover(true);
  };

  const handleOkClick = () => {
    setShowPopover(false);
    window.location.href = '/dashboard/general';
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const listener = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', listener);

    return () => {
      darkModeMediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return (
    <>
      {/* {loaded ? (
        <button onClick={loadPaymentData} className="w-full bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          Pay with Google
        </button>
      ) : (
        <p>Loading Google Pay...</p>
      )} */}
      <div className="mt-5"> {/* Add margin-top using Tailwind CSS */}

        <GooglePayButton
          environment="TEST"
          buttonType="checkout"
          buttonColor={isDarkMode ? 'white' : 'black'}
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA', 'JCB', 'INTERAC', 'DISCOVER', 'AMEX'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '01234567890123456789', // Replace with your merchant ID
              merchantName: 'Example Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: amount.toString(),
              currencyCode: 'USD',
              countryCode: 'US',
            },
          }}
          onLoadPaymentData={handlePaymentSuccess}
        />

      </div>



      {showPopover && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0">
            <DotLottieReact
              src="https://lottie.host/88f0600f-051b-4141-8850-0305b47b2703/GvpgTmEoAI.json"
              backgroundColor="transparent"
              speed={1}
              style={{ width: '100%', height: '100%', opacity: 0.5 }}
              loop
              autoplay
            />
          </div>
          <div className="relative p-6 bg-white dark:bg-gray-800 dark:bg-neutral-700 rounded-lg shadow-lg max-w-sm w-full text-center z-10">

            <h2 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Congratulations!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-400">
              You have successfully spent <span className="font-bold text-green-400">${amount}</span>.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOkClick}
              className="mt-6 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              OK
            </motion.button>
          </div>
        </div>
      )}

    </>
  );
};

export default GooglesPayButton;
