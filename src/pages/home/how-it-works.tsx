import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircleIcon, SparklesIcon, CurrencyDollarIcon } from '@heroicons/react/outline'; // Import icons from Heroicons

const HowItWorks = () => {
    const [showPopup, setShowPopup] = useState(false);






    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleWatchVideo = () => {
        setShowPopup(true);
    };

    return (
        <section className="relative lg:pt-24 pb-24 bg-white dark:bg-black dark:bg-custom-radial">
            <div className="absolute inset-0 opacity-0 dark:opacity-20">
                <Image
                    src="/how-bg.svg"
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center items-center">
                {/* Section Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Let's kick things off with these easy-to-follow steps</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6 sm:max-w-md flex flex-col items-center custom-bg">
                        <CheckCircleIcon className="h-12 w-12 text-yellow-400 mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-medium mb-2">Sign Up and Customize</h3>
                        <p className="text-lg mb-4 text-center">Create your account in minutes and set up your unique profile. Customize your avatar with exclusive NFT items and get ready to dive into the game.</p>
                    </div>

                    {/* Card 2: Play Trivia and Compete */}
                    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6 sm:max-w-md flex flex-col items-center custom-bg">
                        <SparklesIcon className="h-12 w-12 text-blue-400 mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-medium mb-2">Play Trivia and Compete</h3>
                        <p className="text-lg mb-4 text-center">Engage in interactive sports trivia games, challenge friends, and join tournaments. Answer questions correctly to earn crypto rewards and climb the leaderboard.</p>
                    </div>

                    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6 sm:max-w-md flex flex-col items-center custom-bg">
                        <CurrencyDollarIcon className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-medium mb-2">Earn and Trade</h3>
                        <p className="text-lg mb-4 text-center">Receive cryptocurrency rewards for your achievements and participate in our marketplace. Mint, trade, and collect unique NFTs to enhance your gaming experience and showcase your skills.</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Would you like to watch a video on how this platform works?</p>
                    <button
                        onClick={handleWatchVideo}
                        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
                    >
                        Yes, Show Me!
                    </button>
                </div>
            </div>

            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-[80vw] max-w-sm mx-auto relative">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Here's how the platform works!</h3>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">Enjoy the video!</p>

                        <div className="w-full h-[50vh] max-w-xs mb-4 lg:w-[60vw] lg:h-[40vh]">
                            <video controls className="w-full h-full rounded-lg">
                                <source src="/intro.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}







        </section>
    );
};

export default HowItWorks;
