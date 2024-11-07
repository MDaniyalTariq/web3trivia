import React from 'react';

const Benefits = () => {
    return (
        <section className="max-w-screen-lg mx-auto px-4">
            <div className="flex flex-col justify-center ">
                <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-center text-gray-800 dark:text-white">Benefits You Will Get</h2>
                <p className="text-xl mb-8 text-center text-gray-800 dark:text-white">See what our users are saying about us.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Benefit 1 */}
                    <div className="custom-bg py-6 px-4 rounded-xl shadow-md flex flex-col items-center text-center h-auto">
                        <img src="token.png" alt="Earn Cryptocurrency" className="h-[200px] w-full rounded-xl mb-4 object-cover" />
                        <h3 className="text-xl font-bold mb-2">Earn Cryptocurrency</h3>
                        <ul className="space-y-4 text-left p-0 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Receive crypto rewards for correct answers and achievements.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Secure and instant transactions using the Polygon blockchain.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Accumulate valuable digital assets as you play and win.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Benefit 2 */}
                    <div className="custom-bg py-6 px-4 rounded-xl shadow-md flex flex-col items-center text-center h-auto">
                        <img src="education.png" alt="Enhance Knowledge" className="h-[200px] w-full rounded-xl mb-4 object-cover" />
                        <h3 className="text-xl font-bold mb-2">Enhance Knowledge</h3>
                        <ul className="space-y-4 text-left p-0 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Expand your understanding of various sports and historical events.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Learn through engaging and interactive trivia questions.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Stay updated with the latest sports facts and news.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Benefit 3 */}
                    <div className="custom-bg py-6 px-4 rounded-xl shadow-md flex flex-col items-center text-center h-auto">
                        <img src="nft.png" alt="Exclusive NFT Ownership" className="h-[200px] w-full rounded-xl mb-4 object-cover" />
                        <h3 className="text-xl font-bold mb-2">Exclusive NFT Ownership</h3>
                        <ul className="space-y-4 text-left p-0 text-gray-500 dark:text-gray-400">
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Customize and own unique avatars and items as NFTs.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Trade and collect rare, limited-edition items on our marketplace.</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>Showcase your gaming achievements with exclusive digital assets.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Benefits;
