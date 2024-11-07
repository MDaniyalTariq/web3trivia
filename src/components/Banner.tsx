import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import anime from 'animejs';
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Popover from "./Popover";

export default function Example() {
    const [isVisible, setIsVisible] = useState(true);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const controls = useAnimation();
    const router = useRouter();
    useEffect(() => {
        if (isVisible) {
            controls.start({ opacity: 1, y: 0 });
        } else {
            controls.start({ opacity: 0, y: -50 });
        }
    }, [isVisible, controls]);

    const handleClose = () => {
        setIsVisible(false);
        anime({
            targets: '.banner',
            opacity: 0,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    };

    const handlePopoverToggle = () => {
        setIsPopoverOpen(prev => !prev);
    };
    const handleEarnNow = () => {
        setIsVisible(false);
        router.push('/login');
    };
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
            handlePopoverToggle();
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="w-full fixed top-0 z-50"
                initial={{ opacity: 0, y: -50 }}
                animate={controls}
                transition={{ duration: 0.5 }}
            >
                <div
                    role="alert"
                    tabIndex={-1}
                    className="absolute top-0 left-0 z-50 flex flex-wrap gap-4 justify-between w-full py-4 px-6 sm:px-11 bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-200"
                >
                    <div className="block text-sm">
                        <h5 className="dark:text-indigo-400 text-indigo-700 text-lg mb-1">
                            Web3 Trivia
                            <span className="text-sm dark:text-indigo-300 text-indigo-500"> powered by Orbimatrix</span>.
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                            Compete with others, earn rewards, and enjoy exclusive trivia challenges. Start playing now and discover how fun and rewarding trivia can be!
                        </p>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={handleEarnNow}
                            type="button"
                            className="py-2.5 px-5 text-xs bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 mr-8 whitespace-nowrap"
                        >
                            Login Now
                        </button>

                        <button
                            onClick={handleClose}
                            data-dismiss="alert"
                            type="button"
                            className="flex-shrink-0 inline-flex justify-center items-center text-gray-400 rounded-lg text-sm p-1 hover:text-gray-200 transition-all duration-200 dark:text-gray-300"
                        >
                            <svg
                                className="text-gray-500 hover:text-gray-800 transition-all duration-75 dark:text-gray-300"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.58325 18.4167L18.4166 7.58333M18.4166 18.4167L7.58325 7.58333"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="sr-only">Close banner</span>
                        </button>
                    </div>
                </div>

                <Popover
                    isOpen={isPopoverOpen}
                    onClose={handlePopoverToggle}
                    onEarnNow={handleEarnNow}
                />
            </motion.div>
        </AnimatePresence>
    );

}
