// "use client";

import {useState } from 'react';

import DashboardLayout from '@/components/DashboardLayout';
import { FaCopy, FaTwitter, FaFacebook, FaWhatsapp, FaDiscord, FaTelegramPlane, FaInstagram, FaFacebookMessenger } from 'react-icons/fa';
import { useAddress } from '@thirdweb-dev/react';
import Link from 'next/link';
import { UserData } from '@/lib/database/model/User';
import { getUser } from '../api/auth/[...thirdweb]';
import connectDB from '@/lib/database/db_connect';
import axios from 'axios';

interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}

interface ReferalData {
    referralCode: string;
    tokenEarned: number;
    peopleJoined: number;



}
interface Props {
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
    referalData:ReferalData
}


const ReferAFriend: React.FC<Props> = ({ users,referalData }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenEarned, setTokenEarned] = useState<number>(0);
    const [peopleJoined, setPeopleJoined] = useState<number>(0);
    const [referralCode, setReferralCode] = useState<string>('');
    const [address, setAddress] = useState<string | undefined>(undefined);

    const walletadd = useAddress();


    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const shareText = `I'm playing *Web3 Trivia* Game powered by *Stat Ducks*!\n\nCompete, earn rewards, and enjoy exclusive trivia challenges.\n\nHere’s how you can join and benefit:\n• Join now with my *referral code: ${referalData.referralCode}*\n• Get bonus points!\n• Start playing now at *web3trivia.com*!\n\nLet’s play and win together!`;

    if (error) {
        return (
            <DashboardLayout users={users}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen flex flex-col items-center justify-center">

                <div className="w-full max-w-4xl space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg ">
                    <h1 className="lg:text-4xl text-2xl font-extrabold dark:text-white text-gray-800 mb-6 text-center tracking-wide">
                        🎉 Refer-a-Friend 🎉
                    </h1>

                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">People Joined with your Code</h2>
                        <p className="text-3xl text-blue-600 dark:text-blue-300 font-extrabold">{referalData.peopleJoined}</p>
                    </div>

                    <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Tokens Earned</h2>
                        <p className="text-3xl text-green-600 dark:text-green-300 font-extrabold">{referalData.tokenEarned}</p>
                    </div>

                    <div className="relative flex justify-between items-center bg-gradient-to-r from-purple-50 to-purple-100 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Your Referral Code</h2>
                        <div className="flex items-center space-x-4">
                            <p className="text-2xl font-mono text-purple-700 dark:text-purple-300">{referalData.referralCode}</p>
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-transform transform hover:scale-105"
                            >
                                <FaCopy />
                            </button>
                        </div>
                        <div
                            className={`absolute top-[0px] right-0 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-md transition-opacity duration-300 ${copied ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                        >
                            Copied to clipboard!
                        </div>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">or</div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Share via</h2>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <Link
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaTwitter size={24} />
                            </Link>
                            <Link
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaFacebook size={24} />
                            </Link>
                            <Link
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaWhatsapp size={24} />
                            </Link>
                            <Link
                                href={`https://discord.com/channels/@me?content=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaDiscord size={24} />
                            </Link>
                            <Link
                                href={`https://t.me/share/url?url=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaTelegramPlane size={24} />
                            </Link>
                            <Link
                                href={`fb-messenger://share?link=${encodeURIComponent(shareText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-110"
                            >
                                <FaFacebookMessenger size={24} />
                            </Link>
                        </div>
                    </div>


                </div>
            </div>
        </DashboardLayout>
    );

};

export default ReferAFriend;

// Fetch transaction data based on wallet address using getServerSideProps
export async function getServerSideProps(context: any) {
    const user = await getUser(context.req); // Get wallet address from the request (thirdweb session)
    await connectDB(); // Connect to MongoDB

    if (!user?.address) {
        // If wallet address is not found, redirect to login page
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    try {
        const wallet_address = user.address;
        // Fetch transaction data based on wallet address

        const userdata = await UserData.findOne({ wallet_address });
        const USERData = {
            wallet_address: user.address || "",
            user_name: userdata.user_name || "N/A",
            avatar_link: userdata.avatar_link || "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",

        };

        const token = process.env.NEXT_PUBLIC_JWT_TOKEN; // Replace this with the actual token


        const referralResponse = await axios.get(`https://djangosport.azurewebsites.net/api/referral/?wallet_address=${wallet_address}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const referralData = referralResponse.data;

        const referalData = {
            wallet_address:referralData.wallet_address,
            referralCode: referralData.referral_code,
            tokenEarned: referralData.total_tokens,
            peopleJoined: referralData.total_redeemed

        };
        // Pass formatted transactions as props
        return {
            props: {
                users: USERData, // Include username and avatar_link in props
                referalData:referalData

            }
        };
    } catch (error) {
        // Handle internal server error
        return {
            props: {
                error: 'Internal server error',
            }
        };
    }
}