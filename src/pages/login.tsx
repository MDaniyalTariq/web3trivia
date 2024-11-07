"use client";
import {
    ConnectEmbed,
    Theme,
    useAddress,
    useSDK,
    useShowConnectEmbed,
    useUser,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import { lightTheme, darkTheme } from "thirdweb/react";
import LoginTour from "@/components/LoginTour";
import { getUser } from "./api/auth/[...thirdweb]";
import connectDB from "@/lib/database/db_connect";
import { UserData } from "@/lib/database/model/User";

// Set loginOptional to false to require the user to login
const loginOptional = false;

const Login = () => {
    const showConnectEmbed = useShowConnectEmbed();
    const wallet_address = useAddress();
    const { isLoggedIn } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showTour, setShowTour] = useState(false);
    const [tourShown, setTourShown] = useState(false);

    // useEffect(() => {
    //     if (!tourShown) {
    //         setShowTour(true);
    //         setTourShown(true);
    //     }
    // }, [wallet_address, tourShown]);

    const fetchUserData = useCallback(async () => {


        setLoading(true);
        try {
            const checkResponse = await axios.post(`/api/checkUser`, {
                wallet_address: wallet_address,
            });

            if (checkResponse.data.exists) {
                // User exists, redirect to settings
                router.push("/dashboard/settings");
            } else {
                // User doesn't exist, create and then redirect
                const user_data = await axios.post(`/api/register`, {
                    wallet_address: wallet_address,
                });


                router.push("/dashboard/settings");


            }
        } catch (err) {
            console.error("Error fetching user data: ", err);
        } finally {
            setLoading(false);
        }
    }, [wallet_address, router]);



    useEffect(() => {
        if (isLoggedIn && wallet_address) {
            fetchUserData();
        }
        // router.push("/dashboard/settings");

    }, [isLoggedIn, wallet_address]);

    const customTheme: Theme = {
        colors: {
            accentButtonBg: "#4f46e5",
            accentButtonText: "#ffffff",
            accentText: "#4f46e5",
            borderColor: "#e5e7eb",
            connectedButtonBg: "#22c55e",
            connectedButtonBgHover: "#16a34a",
            danger: "#ef4444",
            inputAutofillBg: "#f0f0f0",
            modalBg: "#ffffff",
            modalOverlayBg: "rgba(0, 0, 0, 0.5)",
            primaryButtonBg: "#3b82f6",
            primaryButtonText: "#ffffff",
            primaryText: "#111827",
            scrollbarBg: "#d1d5db",
            secondaryButtonBg: "#e5e7eb",
            secondaryButtonHoverBg: "#d1d5db",
            secondaryButtonText: "#111827",
            secondaryIconColor: "#6b7280",
            secondaryIconHoverBg: "#d1d5db",
            secondaryIconHoverColor: "#374151",
            secondaryText: "#6b7280",
            selectedTextBg: "#e0f2fe",
            selectedTextColor: "#0284c7",
            separatorLine: "#e5e7eb",
            skeletonBg: "#f3f4f6",
            success: "#10b981",
            tooltipBg: "#111827",
            tooltipText: "#f9fafb",
            walletSelectorButtonHoverBg: ""
        },
        fontFamily: "Poppins, sans-serif",
        type: "light",
    };

    const darkTheme: Theme = {
        colors: {
            accentButtonBg: "#4f46e5",
            accentButtonText: "#ffffff",
            accentText: "#c7d2fe",
            borderColor: "#374151",
            connectedButtonBg: "#22c55e",
            connectedButtonBgHover: "#16a34a",
            danger: "#ef4444",
            inputAutofillBg: "#1f2937",
            modalBg: "#1f2937",
            modalOverlayBg: "rgba(0, 0, 0, 0.75)",
            primaryButtonBg: "#2563eb",
            primaryButtonText: "#ffffff",
            primaryText: "#f9fafb",
            scrollbarBg: "#4b5563",
            secondaryButtonBg: "#4b5563",
            secondaryButtonHoverBg: "#374151",
            secondaryButtonText: "#f9fafb",
            secondaryIconColor: "#9ca3af",
            secondaryIconHoverBg: "#4b5563",
            secondaryIconHoverColor: "#d1d5db",
            secondaryText: "#9ca3af",
            selectedTextBg: "#2563eb",
            selectedTextColor: "#ffffff",
            separatorLine: "#4b5563",
            skeletonBg: "#374151",
            success: "#10b981",
            tooltipBg: "#374151",
            tooltipText: "#f9fafb",
            walletSelectorButtonHoverBg: ""
        },
        fontFamily: "Poppins, sans-serif",
        type: "dark",
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener("change", handleChange);
        return () => {
            darkModeMediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black overflow-auto pt-20 flex flex-col justify-between">
            <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">

                <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80" />
            </div>
            <span className="absolute right-6 md:right-10 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
            <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90" />
            <div className="flex items-start justify-center">
                {loading ? (
                    <div className=" text-gray-900 dark:text-white text-center">
                        <p className="mb-2">Saving Data! Please wait...</p>
                        <div
                            className="animate-spin inline-block w-6 h-6 border-4 border-current border-t-transparent rounded-full text-blue-600 dark:text-blue-500"
                            role="status"
                            aria-label="loading"
                        />
                    </div>
                ) : showConnectEmbed ? (
                    <div className="flex flex-col items-center justify-center my-4 space-y-6 max-w-md w-full p-6 ">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">Signup Connect Your Wallet</h2>
                        <p className="text-base text-gray-600 dark:text-gray-400 text-center mb-4">
                            Please connect your wallet to access exclusive features and services.
                        </p>
                        <ConnectEmbed
                            theme={isDarkMode ? darkTheme : customTheme}
                            showThirdwebBranding={false}
                            auth={{
                                loginOptional,
                            }}
                            className="connect-embed w-full p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                        />
                    </div>
                ) : null}
            </div>

            {/* {showTour && <LoginTour onClose={() => {
                setShowTour(false);
            }} />} */}
            <Footer />
        </div>
    );
};

// Server-side function to check if the user is logged in and redirect to the home page if not
export async function getServerSideProps(context: any) {
    try {
        const user = await getUser(context.req);
        if (!user?.address) {
            return {
                props: {},
            };
        }

        await connectDB();
        const existingUser = await UserData.findOne({ wallet_address: user.address });

        if (existingUser) {
            return {
                redirect: {
                    destination: "/dashboard/settings",
                    permanent: false,
                },
            };
        }
        return {
            props: {},
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return {
            props: {
                error: "Failed to fetch user data",
            },
        };
    }
}

export default Login;
