// "use client";

import DashboardLayout from '@/components/DashboardLayout';
import QuestionPopover from '@/components/QuestionPopover';
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MessageInbox from '@/components/MessageInbox';
import { UserData } from '@/lib/database/model/User';
import { getUser } from '../api/auth/[...thirdweb]';
import connectDB from '@/lib/database/db_connect';

interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}
interface Props {
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
}


const PageContent: React.FC<Props> = ({ users }) => {

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const xp = searchParams.get('xp');
    const category = searchParams.get('category');  // Get the category from search parameters
    const [wallet, setWallet] = useState('');
    const router = useRouter();

    const [friendsCount, setFriendsCount] = useState(1);
    const [showPrompt, setShowPrompt] = useState(false);

   
    const isFirstCardFixed = true;
    const canUserPlay = (): boolean => {
        const outOfLivesTime = parseInt(localStorage.getItem("DeadTime") || "0");
        const canPlay = localStorage.getItem("canPlay") === "true";

        if (canPlay) {
            return true;
        }

        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - outOfLivesTime;

        // If 30 minutes have passed, allow the user to play
        if (timeElapsed >= 60 * 30 * 1000) {
            localStorage.setItem("canPlay", "true");
            return true;
        }

        return false;
    };
    const handleStart = () => {
        if (canUserPlay()) {
            startgame();
            // Fetch lives and proceed to game page
        } else {
            alert("You cannot play yet. Please wait for the cooldown period to end.");
        }
    };

    const startgame = async () => {

        try {
            let walletString: string = wallet ?? '';
            setWallet(walletString);

            setShowPrompt(false);
            router.push(`/dashboard/game-play?title=${title}&xp=${xp}&category=${category}`);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }

    };

    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                        <QuestionPopover />
                    </div>
                    {/* <MessageInbox /> */}
                </div>
                <div className="mt-2">
                    <p className="text-lg text-gray-700 dark:text-gray-400">Earn {xp}</p>
                </div>
                <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
                    <div className="mt-10 w-full max-w-2xl md:max-w-4xl">

                        <div className="p-6 md:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white border-b-4 border-blue-500 dark:border-blue-300 pb-3">
                                Game Instructions
                            </h2>
                            <ol className="space-y-4 text-gray-600 dark:text-gray-300 list-decimal list-inside">
                                <li className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-xs">1</div>
                                    <span className="leading-relaxed">
                                        You can earn tokens only if you play the game fully, and the same applies for XP.
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-xs">2</div>
                                    <span className="leading-relaxed">
                                        For every wrong answer, you lose 1 life. If you run out of lives, you need to either pay or wait for 1 hour.
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-xs">3</div>
                                    <span className="leading-relaxed">
                                        On Mainnet, the top 3 users will receive special prizes every month.
                                    </span>
                                </li>
                            </ol>
                        </div>




                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleStart}
                                className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-sm sm:text-base md:text-lg"
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );

};

const Page: React.FC<Props> = ({ users }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent users={users}/>
        </Suspense>
    );
};

export default Page;

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
        // Pass formatted transactions as props
        return {
            props: {
                users: USERData, // Include username and avatar_link in props

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