"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const toggleNavbar = () => setOpenNavbar((prev) => !prev);
    const closeNavbar = () => setOpenNavbar(false);

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.getAttribute("data-theme") === "dark") {
            html.removeAttribute("data-theme");
        } else {
            html.setAttribute("data-theme", "dark");
        }
    };

    return (
        <header className="absolute inset-x-0 top-0 z-40 py-6" role="banner">
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
                <nav className="w-full flex justify-between gap-6 relative" role="navigation">
                    <div className="min-w-max inline-flex relative">
                        <Link href="/" className="z-50 flex items-center gap-3 " aria-label="Home">
                            <div className="relative overflow-hidden flex rounded-xl">
                                <Image
                                    src="/logo-1.png"
                                    alt="Logo"
                                    width={80}
                                    height={28}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="inline-flex text-lg font-semibold text-black dark:text-white">
                                Web3trivia
                            </div>
                        </Link>
                    </div>
                    <div
                        onClick={closeNavbar}
                        aria-hidden="true"
                        className={`fixed inset-0 bg-gray-800/60 bg-opacity-50 backdrop-filter backdrop-blur-xl ${openNavbar ? "flex lg:hidden" : "hidden"
                            }`}
                    />
                    <div
                        className={`flex overflow-hidden duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-gray-300 dark:bg-gray-950 lg:!bg-transparent border-x border-x-gray-400 dark:border-x-gray-900 lg:border-x-0 ${openNavbar
                            ? "visible opacity-100 translate-y-0"
                            : "invisible opacity-0 translate-y-10 lg:visible lg:opacity-100 lg:-translate-y-0"
                            }`}
                        role="menu"
                    >
                        <ul className="border-t border-gray-900 dark:border-gray-900 lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-gray-800 dark:text-gray-300 w-full lg:justify-center lg:items-center">
                            <li>
                                <Link
                                    href="/"
                                    className="duration-300 font-medium ease-linear hover:text-[#AFFFCF] py-3"
                                    onClick={closeNavbar}
                                    aria-label="Home"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="duration-300 font-medium ease-linear hover:text-[#AFFFCF] py-3"
                                    onClick={closeNavbar}
                                    aria-label="Contact Us"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="duration-300 font-medium ease-linear hover:text-[#AFFFCF] py-3"
                                    onClick={closeNavbar}
                                    aria-label="About Us"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tokenomics"
                                    className="navbar-tokenomics duration-300 font-medium ease-linear hover:text-[#AFFFCF] py-3"
                                    onClick={closeNavbar}
                                    aria-label="Tokenomics"
                                >
                                    Tokenomics
                                </Link>
                            </li>
                        </ul>
                        <div className="navbar-get-started lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-gray-900 dark:border-gray-900 lg:border-0 px-6 lg:px-0">
                            <Link
                                href="/login"
                                className="flex justify-center items-center w-full sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]"
                                aria-label="Get Started"
                            >
                                <span className="relative z-10 text-white">Get Started</span>
                            </Link>
                        </div>
                    </div>
                    <div className="min-w-max flex items-center gap-x-3">
                        <button
                            className="border-none flex relative text-gray-300 dark:text-gray-300 rounded-full p-2 lg:p-3 border border-gray-300 dark:border-gray-300"

                            aria-label="Toggle Dark Mode"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 dark:flex hidden text-white"
                                role="img"
                                aria-label="Dark Mode Icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 dark:hidden text-yellow-500"
                                role="img"
                                aria-label="Light Mode Icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                />
                            </svg>
                            <span className="sr-only">switch theme</span>
                        </button>
                        <Link
                            href="/login"
                            className="navbar-user-wallet outline-0 border-0 dark:outline-none flex relative text-gray-200 dark:text-gray-300 rounded-full p-2 lg:p-3 dark:border  dark:border-gray-900"
                            aria-label="User Wallet"
                        >
                            <AiOutlineUser className="w-6 h-6 dark:text-white text-gray-800" />
                            <span className="sr-only">User Wallet</span>
                        </Link>
                        <button
                            onClick={toggleNavbar}
                            className="outline-none flex relative text-gray-900 dark:text-gray-300 rounded-full p-2 lg:p-3 border border-gray-300 dark:border-gray-300 lg:hidden"
                            aria-label="Toggle Navigation"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15m-15 6h15m-15 6h15" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
