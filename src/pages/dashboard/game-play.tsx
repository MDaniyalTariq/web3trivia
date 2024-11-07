// "use client";

import DashboardLayout from '@/components/DashboardLayout';
import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
const QuizStepper = dynamic(() => import('@/components/QuizStepper'), { ssr: false });
const QuestionPopover = dynamic(() => import('@/components/QuestionPopover'), { ssr: false });
import { BackspaceIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import { UserData } from '@/lib/database/model/User';
import connectDB from '@/lib/database/db_connect';
import { getUser } from '../api/auth/[...thirdweb]';
import { LifeSystem } from '@/lib/database/model/LifeSystem';
import { Trivia } from '@/lib/database/model/trivia';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}
interface LifeData {
    life: number;
    can_play: boolean;
}
interface Props {
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
    lifedata: LifeData ; // Life data retrieved from the database
    responseData: Question[];


}


const PageContent: React.FC<Props> = ({ users,lifedata,responseData }) => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const xp = searchParams.get('xp');

    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen p-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{title}</h2>
                        <QuestionPopover />
                    </div>
                    <div className="flex items-center">
                        {/* <button
                            type="button"
                            className="flex items-center justify-center text-white bg-gradient-to-r from-green-500 via-green-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm w-32 h-12 transition-all duration-300"
                        >
                            <BackspaceIcon className="w-5 h-5 mr-2" />
                            Exit Game
                        </button> */}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-lg text-neutral-700 dark:text-gray-300 transition-colors duration-300">
                        Earn {xp}
                    </p>
                </div>

                <div className="mt-12">
                    <div className="flex justify-between">
                        <div className="flex space-x-5 mb-12">
                            {[
                                {
                                    name: 'James',
                                    src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
                                },
                                {
                                    name: 'Maria',
                                    src: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
                                },
                                {
                                    name: 'Anna',
                                    src: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80',
                                },
                                {
                                    name: 'Brian',
                                    src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
                                },
                            ].map((person, idx) => (
                                <div key={idx} className="hs-tooltip inline-block">
                                    <img
                                        className="hs-tooltip-toggle relative inline-block size-[46px] rounded-full ring-2 ring-neutral-900 dark:ring-white hover:z-10"
                                        src={person.src}
                                        alt="Avatar"
                                    />
                                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700 transition-opacity duration-300">
                                        {person.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <QuizStepper  lifedata={lifedata}  responseData={responseData} />
                </div>
            </div>
        </DashboardLayout>
    );

};

const Page: React.FC<Props> = ({ users,lifedata,responseData }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent users={users} lifedata={lifedata} responseData={responseData} />
            </Suspense>
    );
};

export default Page;


// Fetch transaction data based on wallet address using getServerSideProps
export async function getServerSideProps(context: any) {
    const { category } = context.query; // Get the 'category' from the query params

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

        const lifeData = await LifeSystem.findOne({ wallet_address }).exec();

        if (!lifeData) {
            return {
                notFound: true, // Return 404 if user not found
            };
        }

        // Fetch 10 random trivia questions based on the category
        const questions = await Trivia.aggregate([
            { $match: { Category: category } },
            { $sample: { size: 10 } }
        ]);

        // Format the response data
        const responseData = questions.map(q => ({
            question: q.Question,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D,
            difficulty: q.Difficulty,
            answer: q.Answer
        }));
        
        const lifedata= {
            life: lifeData.life,
            can_play: lifeData.can_play,
        }
        // Pass formatted transactions as props
        return {
            props: {
                users: USERData,
                lifedata:lifedata, // Include username and avatar_link in props
                responseData:responseData
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