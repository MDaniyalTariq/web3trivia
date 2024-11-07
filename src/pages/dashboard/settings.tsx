// "use client";
import DashboardLayout from '@/components/DashboardLayout';
import UserModal from '@/components/UserModal';
import React, { useState, useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import connectDB from "@/lib/database/db_connect";
import { UserData } from "@/lib/database/model/User";
import { getUser } from "../api/auth/[...thirdweb]";
import { xptokenData } from '@/lib/database/model/XpToken';
import { useDisconnect } from "@thirdweb-dev/react";
import router from 'next/router';
import DashboardTour from '@/components/DashboardTour';


interface User {
    wallet_address: string;
    user_name: string;
    user_email: string;
    location: string;
    avatar_link: string;
    user_xp: string;
}
interface ProfileProps {
    users: User;
}



const Profile = ({ users }: ProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const disconnect = useDisconnect();
    


    const handleDisconnect = () => {
        disconnect();  // Disconnect the user
        router.push("/login");  // Redirect to login page
    };


    // const [wallet, setWallet] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState({
        user_name: '',
        user_email: '',
        location: '',
        avatar_link: '',
        user_xp: ''
    });


    useEffect(() => {

        // Check if we're on the client side before using localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalSave = (updatedData: any) => {
        setUserData(updatedData);
    };
    const handleSave = (updatedData: { user_name: any; user_email: any; location: any; bio: any; avatar_link: any; user_xp: any }) => {
        // Update the user data state after the data is saved
        setUserData({
            user_name: updatedData.user_name,
            user_email: updatedData.user_email,
            location: updatedData.location,
            avatar_link: updatedData.avatar_link || '/bruce-mars.jpg',
            user_xp: updatedData.user_xp
        });
    };


    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen p-4">
                {isLoading ? (
                    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="flex justify-between items-center mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center">
                                <motion.h2
                                    className="text-2xl font-semibold dark:text-white"
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Profile
                                </motion.h2>
                            </div>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
                                <img
                                    src={users.avatar_link || '/NFT.jpg'}
                                    alt="User Avatar"
                                    className="w-24 h-24 rounded-lg mr-4 object-cover"
                                />
                                <div>
                                    <motion.h3
                                        className="text-xl font-semibold text-gray-900 dark:text-white"
                                        initial={{ x: -20 }}
                                        animate={{ x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {users.user_name}
                                    </motion.h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{users.user_xp} XP</p>


                                </div>
                            </div>
                        </motion.div>


                        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}>

                            <motion.div
                                className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none opacity-50 "
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center text-red-500 font-bold mb-4">Coming Soon</div>

                                <motion.h3
                                    className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Platform Settings
                                </motion.h3>
                                <div className="mb-4">

                                    <h4 className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-300 mb-6">Account</h4>
                                    <label className="flex items-center justify-between cursor-pointer mb-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-400">Email me when someone wants to play with me</span>
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>

                                    <label className="flex items-center justify-between cursor-pointer mb-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-400">Email me when someone wants to message me</span>
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-300 mb-6">Application</h4>
                                    <label className="flex items-center justify-between cursor-pointer mb-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-400">New launches and projects</span>
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer mb-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-400">Monthly product updates</span>
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer mb-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-400">Subscribe to newsletter</span>
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </motion.div>

                            <motion.div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                                    <a href="#!" className="text-gray-600 dark:text-gray-400">
                                        <FaUserEdit className="edit-info-button text-2xl" onClick={handleEditClick} />
                                    </a>
                                </div>
                                {/* <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">{userData.bio}</p> */}
                                <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent" />
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white dark:bg-gray-800 border-0 rounded-t-lg text-sm text-gray-700 dark:text-gray-400">
                                        <strong className="text-gray-900 dark:text-white mr-2">User Name:</strong>
                                        {users.user_name}
                                    </li>
                                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white dark:bg-gray-800 border-0 border-t-0 text-sm text-gray-700 dark:text-gray-400">
                                        <strong className="text-gray-900 dark:text-white mr-2">Email:</strong>
                                        {users.user_email}
                                    </li>
                                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white dark:bg-gray-800 border-0 border-t-0 text-sm text-gray-700 dark:text-gray-400">
                                        <strong className="text-gray-900 dark:text-white mr-2">Location:</strong>
                                        {users.location}
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none opacity-90"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center text-red-500 dark:text-red-400 font-bold mb-4">Coming Soon</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Up Coming Games!</h3>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative flex items-center px-0 py-2 mb-2 border-0 rounded-t-lg text-inherit">
                                        <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="/famrer.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 leading-normal text-gray-900 dark:text-gray-200 text-sm">Farmer Tycoon</h6>
                                            <p className="mb-0 leading-tight text-gray-600 dark:text-gray-400 text-xs">NFT Farmer Staking Game!</p>
                                        </div>
                                    </li>
                                    <li className="relative flex items-center px-0 py-2 mb-2  border-0 border-t-0 text-inherit">
                                        <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="/chess.png" alt="marie" className="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 leading-normal text-gray-900 dark:text-gray-200 text-sm">Chess</h6>
                                            <p className="mb-0 leading-tight text-gray-600 dark:text-gray-400 text-xs">A Chess Game where you can Earn Crypto Rewards!</p>
                                        </div>
                                    </li>
                                    <li className="relative flex items-center px-0 py-2 mb-2  border-0 border-t-0 text-inherit">
                                        <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="/carding.png" alt="ivana" className="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 leading-normal text-gray-900 dark:text-gray-200 text-sm">Card Rush</h6>
                                            <p className="mb-0 leading-tight text-gray-600 dark:text-gray-400 text-xs">Card Matching with Boosters, Rewards and Much More!</p>
                                        </div>
                                    </li>
                                    {/* <li className="relative flex items-center px-0 py-2 mb-2  border-0 border-t-0 text-inherit">
                                        <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-4.jpg" alt="peterson" className="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 leading-normal text-gray-900 dark:text-gray-200 text-sm">Peterson</h6>
                                            <p className="mb-0 leading-tight text-gray-600 dark:text-gray-400 text-xs">Have a great afternoon..</p>
                                        </div>
                                    </li>
                                    <li className="relative flex items-center px-0 py-2  border-0 border-t-0 rounded-b-lg text-inherit">
                                        <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-3.jpg" alt="nick" className="w-full shadow-soft-2xl rounded-xl" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 leading-normal text-gray-900 dark:text-gray-200 text-sm">Nick Daniel</h6>
                                            <p className="mb-0 leading-tight text-gray-600 dark:text-gray-400 text-xs">Hi! I need more information..</p>
                                        </div>
                                    </li> */}
                                </ul>
                            </motion.div>

                        </motion.div>
                        <motion.div
                            className="wallet-address bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-start shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 my-5"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Wallet Address</h3>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 break-words w-full max-w-full">
                                {users.wallet_address || '0x9F0a2b0C76C3cBc6A13E3A2F9e4B5A63F9F6dC6C'}
                            </p>
                        </motion.div>

                    </>
                )}
            </div>
            
            {isModalOpen && <UserModal userData={userData} onClose={() => setIsModalOpen(false)} onSave={handleSave} isOpen={true} />}
        </DashboardLayout>
    );
};
export default Profile;


// Fetch user data based on wallet address using getServerSideProps
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


    // Fetch user and XP token data from MongoDB using the wallet address
    const [existingUser, xpToken] = await Promise.all([
        UserData.findOne(
            { wallet_address: user.address },
            { _id: 0, user_name: 1, avatar_link: 1, location: 1, user_email: 1 }
        ).exec(),
        xptokenData.findOne(
            { wallet_address: user.address },
            { _id: 0, total_user_xp: 1 }
        ).exec(),
    ]);


    if (!existingUser) {
        // If user is not found, redirect to login
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const userXp = xpToken ? xpToken.total_user_xp : 0;


    const userData = {
        wallet_address: user.address || "",
        user_name: existingUser.user_name || "N/A",
        user_email: existingUser.user_email || "N/A",
        location: existingUser.location || "N/A",
        avatar_link: existingUser.avatar_link || "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
        user_xp: userXp,
    };
    // Return the user data as props to the settings page
    return {
        props: {

            users: userData,
        }
    };
}
