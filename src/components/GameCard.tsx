import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface CardProps {
    xp: string;
    title: string;
    imageSrc: string;
    category: string; // New category prop

    link: string;
}

const Card: React.FC<CardProps> = ({ xp, title, imageSrc, link, category }) => {
    const queryParams = new URLSearchParams({ xp, title, category }).toString();
    const dynamicLink = `${link}?${queryParams}`;

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 dark:bg-gray-800 shadow-lg">
            <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-700 dark:to-blue-400 text-white shadow-gray-300 dark:shadow-blue-500/40 shadow-lg -mt-4 grid h-16 w-16 place-items-center">
                <Image src={imageSrc} alt="" className="w-10 h-10" width={50} height={50} />
            </div>

            <div className="p-4 text-right">
                <h4 className="block antialiased font-sans text-sm leading-normal font-normal dark:text-white text-blue-gray-600">{xp}</h4>
                <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug dark:text-white text-blue-gray-900">
                    {title}
                </p>
            </div>
            <div className="border-t border-blue-gray-50 dark:border-gray-600 p-4">
                <div className="flex justify-end">
                    <Link href={dynamicLink} legacyBehavior>
                        <a className="shadow-lg dark:shadow-none inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium dark:text-white dark:bg-blue-700 rounded-lg border border-blue-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Play Now
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
