import React, { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onEarnNow: () => void;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, onEarnNow }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50"
                aria-hidden="true"
            ></motion.div>
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <div ref={popoverRef} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
                    <h4 className="text-lg font-semibold mb-4">Let's Get Started!</h4>
                    <p className="text-sm mb-4">
                        We're excited to have you on board. Watch the video below to learn how to play and earn through our trivia game.
                    </p>
                    <div className="relative w-full max-w-4xl mx-auto">
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg"
                            src="https://www.youtube.com/embed/id4EFexyVis?si=vfqWYKfumKW8TxLt"
                            frameBorder="0"
                            title="How to play WE3 Game to Earn Crypto"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            style={{ aspectRatio: '16 / 9' }}
                        ></iframe>
                    </div>
                    <div className="flex items-center mb-6 justify-between">
                        <button
                            onClick={onClose}
                            className="mt-4 py-2 px-4 text-xs bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                        >
                            Close
                        </button>
                        <button
                            onClick={onEarnNow}
                            className="mt-4 py-2 px-4 text-xs bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                        >
                            Connect Your Wallet & Earn Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Popover;
