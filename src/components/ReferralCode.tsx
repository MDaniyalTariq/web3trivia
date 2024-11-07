import { TriviaABI, triviaAddres } from '@/lib/coonections';
import { ThirdwebSDK, useAddress, useWallet } from '@thirdweb-dev/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const ReferralCodeForm = () => {
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const walletaddress = useAddress();


  const handleInputChange = (e: { target: { value: any; }; }) => {
    const code = e.target.value;
    setReferralCode(code);
    setError('');
    setIsSuccess(false);

    if (code.length > 0 && code.length < 6) {
      setError('Referral code must be at least 6 characters long');
    }
  };

  async function sendTransaction(referralCode: string, userWalletAddress: string) {
    try {
      const token = process.env.NEXT_PUBLIC_JWT_TOKEN; // Replace this with the actual token


      const response = await axios.post(
        "https://djangosport.azurewebsites.net/api/referral/",
        {
          wallet_address: userWalletAddress, // Use the variable with the wallet address
          referral_code: referralCode, // Use the variable with the referral code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token
            "Content-Type": "application/json", // Content type is also included
          },
        }
      );
      if (response.status == 200) {
        const tokens = 3;
        const blockchainResponse = await axios.post('/api/blockchain', {
          wallet: userWalletAddress,
          tokens: tokens
        })


      }



      return response.data; // Return the data from the response
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (referralCode.length < 6) {
      setError('Referral code must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (walletaddress) {
      const transactionResult = await sendTransaction(referralCode, walletaddress);

      if (transactionResult) {
        setIsSuccess(true);
        setIsLoading(false);
        setError(''); // Clear any previous errors
      } else {
        setIsSuccess(false);
        setIsLoading(false);
      }
    }


  };



  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Enter Referral Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Referral Code
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={referralCode}
              onChange={handleInputChange}
              className={`block w-full pr-10 sm:text-sm rounded-md focus:ring-2 focus:ring-offset-2 ${error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              placeholder="Enter your referral code"
              aria-describedby="referral-error"
            />
            {isSuccess && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaCheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
              </div>
            )}
            {error && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaTimesCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" id="referral-error">
              {error}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } ${isLoading ? '' : 'dark:bg-indigo-500 dark:hover:bg-indigo-600'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Referral Code'
            )}
          </button>
        </div>
      </form>
      {isSuccess && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-md">
          <p className="text-sm text-green-700 dark:text-green-300">Referral code successfully applied!</p>
        </div>
      )}
    </div>
  );
};

export default ReferralCodeForm;