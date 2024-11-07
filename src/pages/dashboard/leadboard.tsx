"use client";
import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getUser } from '../api/auth/[...thirdweb]';
import { UserData } from '@/lib/database/model/User';
import connectDB from '@/lib/database/db_connect';
import { LeaderboarData } from '@/lib/database/model/leaderboard';

type LeaderboardEntry = {
    position: number;
    name: string;
    avatar: string;
    coins: number;
    xpPoints: number;
};
interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}
interface Props {
    leaderboards: LeaderboardEntry[];
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
    children: React.ReactNode;
}

interface Props {
}
const Page = ({ leaderboards, users }: Props) => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

   
    // Use Effect to set leaderboardData from props
    useEffect(() => {
        if (leaderboards) {
            // Map the incoming leaderboard data into the correct format
            const mappedData = leaderboards.map((entry: any) => ({
                position: entry.position,
                name: entry.user_name,
                avatar: `https://robohash.org/${entry.user_name || 'hello'}`, // Avatar generation
                xpPoints: entry.user_xp,
                coins: entry.user_tokens,
            }));

            setLeaderboardData(mappedData);
        }
    }, [leaderboards]); // Update when leaderboards prop changes


    // Define animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.5, // Stagger children by 0.5 seconds
                duration: 0.5,
            },
        }),
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.5 } },
    };

    return (
        <DashboardLayout  users={users}>
            <div className="min-h-screen p-4">
                <div className="w-full max-w-7xl mx-auto p-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-yellow-400">
                        Leaderboard
                    </h2>

                    {/* Improved Winner's Stair for Top 3 Positions */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col sm:flex-row sm:justify-center sm:items-end sm:space-x-8 mb-16"
                    >
                        {/* 2nd Position */}
                        {leaderboardData[1] && (
                            <motion.div
                                variants={itemVariants}
                                custom={1}
                                className="flex flex-col items-center mb-8 sm:mb-0"
                            >
                                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                                    <img
                                        className="w-16 h-16 rounded-full border-4 border-blue-500 dark:border-yellow-500"
                                        src={leaderboardData[1].avatar}
                                        alt={leaderboardData[1].name}
                                    />
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-yellow-400 mt-4">{leaderboardData[1].name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        XP: {leaderboardData[1].xpPoints} | Coins: {leaderboardData[1].coins}
                                    </p>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mt-2">#2</span>
                                </div>
                                <div className="bg-gray-300 dark:bg-gray-700 w-32 h-20 mt-4 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300">
                                    2nd
                                </div>
                            </motion.div>
                        )}
                        {/* 1st Position (Highest) */}
                        {leaderboardData[0] && (
                            <motion.div
                                variants={itemVariants}
                                custom={0}
                                className="flex flex-col items-center mb-8 sm:mb-0"
                            >
                                <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                                    <img
                                        className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900"
                                        src={leaderboardData[0].avatar}
                                        alt={leaderboardData[0].name}
                                    />
                                    <h3 className="text-2xl font-bold mt-4">{leaderboardData[0].name}</h3>
                                    <p className="text-white dark:text-gray-900 mt-2">
                                        XP: {leaderboardData[0].xpPoints} | Coins: {leaderboardData[0].coins}
                                    </p>
                                    <span className="text-2xl font-bold mt-2">#1</span>
                                </div>
                                <div className="bg-yellow-500 dark:bg-yellow-600 w-32 h-24 mt-4 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-900">
                                    1st
                                </div>
                            </motion.div>
                        )}
                        {/* 3rd Position */}
                        {leaderboardData[2] && (
                            <motion.div
                                variants={itemVariants}
                                custom={2}
                                className="flex flex-col items-center mb-8 sm:mb-0"
                            >
                                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                                    <img
                                        className="w-16 h-16 rounded-full border-4 border-blue-500 dark:border-yellow-500"
                                        src={leaderboardData[2].avatar}
                                        alt={leaderboardData[2].name}
                                    />
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-yellow-400 mt-4">{leaderboardData[2].name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        XP: {leaderboardData[2].xpPoints} | Coins: {leaderboardData[2].coins}
                                    </p>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mt-2">#3</span>
                                </div>
                                <div className="bg-gray-400 dark:bg-gray-600 w-32 h-16 mt-4 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-200">
                                    3rd
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Remaining Positions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leaderboardData.slice(3, 10).map((entry, index) => (
                            <motion.div
                                key={entry.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 * (index + 1) }} // Stagger effect for remaining positions
                                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 flex items-center space-x-6 transform transition-transform hover:-translate-y-1"
                            >
                                <img
                                    className="w-16 h-16 rounded-full border-2 border-blue-500 dark:border-yellow-500"
                                    src={entry.avatar ||'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg'}
                                    alt={entry.name}
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-yellow-400">{entry.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        XP: {entry.xpPoints} | Coins: {entry.coins}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
                                        #{entry.position}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Page;

// Fetch user and leaderboard data using getServerSideProps
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
  
      // Fetch user data based on wallet address
      const userdata = await UserData.findOne({ wallet_address });
  
      if (!userdata) {
        return {
          props: {
            users: { user_name: null, avatar_link: null, wallet_address: null }, // Provide default values
          },
        };
      }
  
      const USERData = {
        wallet_address: user.address || "",
        user_name: userdata.user_name || "N/A",
        avatar_link: userdata.avatar_link || "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
      };
  
      // Fetch the top 10 users sorted by 'xp' in descending order (leaderboard data)
      const topUsers = await LeaderboarData.find({})
        .sort({ user_xp: -1 })
        .limit(10);
  
      const leaderboards = topUsers.map((user, index) => ({
        position: index + 1,
        user_name: user.user_name,
        user_xp: user.user_xp,
        user_tokens: user.user_tokens,
      }));
  
      return {
        props: {
          users: USERData, // Include user data in props
          leaderboards:leaderboards, // Include leaderboard data in props
        },
      };
    } catch (error) {
      return {
        props: {
          error: 'Internal server error',
        },
      };
    }
  }
