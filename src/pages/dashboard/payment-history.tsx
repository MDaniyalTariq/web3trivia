"use client";
import { useState, useEffect, useCallback } from "react";

import DashboardLayout from "@/components/DashboardLayout";
import { CurrencyDollarIcon, EyeIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import { useAddress, useWallet } from "@thirdweb-dev/react";
import { TransactionData } from "@/lib/database/model/payment";
import connectDB from "@/lib/database/db_connect";
import { getUser } from "../api/auth/[...thirdweb]";
import { UserData } from "@/lib/database/model/User";

interface TransactionData {
    wallet_address: string;
    trans_time: string;
    trans_date: string;
    amount: number;
    life_bought: number;
}

interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}
interface Props {
    transactions: TransactionData[];
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
    children: React.ReactNode;
}



type SortOption = 'amount' | 'trans_date' | 'trans_time';

const TransactionDataPage: React.FC<Props> = ({ children, transactions, users }) => {
    const [transactionData, setTransactionData] = useState<TransactionData[] | null>(transactions); // Initialize with fetched transactions
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [sortOption, setSortOption] = useState<SortOption>('trans_date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);



    const filteredData = transactionData?.filter((transaction) => {
        const transactionDate = new Date(transaction.trans_date);

        if (startDate && transactionDate < startDate) return false;
        if (endDate && transactionDate > endDate) return false;

        return true;
    });

    const sortedTransactionData = filteredData?.sort((a, b) => {
        if (sortOption === 'amount') {
            return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortOption === 'trans_date') {
            return sortOrder === 'asc' ? new Date(a.trans_date).getTime() - new Date(b.trans_date).getTime() : new Date(b.trans_date).getTime() - new Date(a.trans_date).getTime();
        } else if (sortOption === 'trans_time') {
            return sortOrder === 'asc' ? new Date(a.trans_time).getTime() - new Date(b.trans_time).getTime() : new Date(b.trans_time).getTime() - new Date(a.trans_time).getTime();
        }
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedTransactionData?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((sortedTransactionData?.length ?? 0) / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages && indexOfLastItem < (sortedTransactionData?.length ?? 0)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [option, order] = event.target.value.split(':') as [SortOption, 'asc' | 'desc'];
        setSortOption(option);
        setSortOrder(order);
    };

    const handleDownloadReport = () => {
        if (transactionData) {
            const csv = Papa.unparse(transactionData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'transaction_history.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 dark:bg-gray-900">
                <motion.h1
                    className="text-xl sm:text-2xl md:text-2.5xl lg:text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Transaction History
                </motion.h1>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 sm:w-1/3">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start Date:</label>
                        <DatePicker
                            placeholderText="Enter start Date"
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            className="block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="flex-1 sm:w-1/3">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">End Date:</label>
                        <DatePicker
                            placeholderText="Enter end Date"
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            className="block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="flex-1 sm:w-1/3">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Sort By:</label>
                        <select
                            onChange={handleSortChange}
                            value={`${sortOption}:${sortOrder}`}
                            className="block w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        >
                            <option value="trans_date:desc">Sort by Date (Newest First)</option>
                            <option value="trans_date:asc">Sort by Date (Oldest First)</option>
                            <option value="amount:desc">Sort by Amount (Highest First)</option>
                            <option value="amount:asc">Sort by Amount (Lowest First)</option>
                            <option value="trans_time:desc">Sort by Time (Newest First)</option>
                            <option value="trans_time:asc">Sort by Time (Oldest First)</option>
                        </select>
                    </div>
                </div>

                <motion.div
                    className="w-full mx-auto max-w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {loading ? (
                        <div className="text-center text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">Error: {error}</div>
                    ) : currentItems && currentItems.length > 0 ? (
                        <ul className="space-y-4 sm:space-y-6">
                            {currentItems.map((transaction, index) => (
                                <motion.li
                                    key={index}
                                    className="p-4 sm:p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                        <div className="flex-1">
                                            <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                Transaction Time:{" "}
                                                <span className="font-normal text-gray-900 dark:text-gray-200">
                                                    {transaction.trans_time}
                                                </span>
                                            </p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                Transaction Date:{" "}
                                                <span className="font-normal text-gray-900 dark:text-gray-200">
                                                    {transaction.trans_date}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
                                            <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                Amount:{" "}
                                                <span className="font-normal text-green-600 dark:text-green-400">
                                                    $ {transaction.amount} USD
                                                </span>

                                            </p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                Life Bought:{" "}
                                                <span className="font-normal text-blue-600 dark:text-blue-400">
                                                    {transaction.life_bought}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="mt-4 sm:mt-0">
                                            <div className="hidden lg:block">
                                                <motion.div
                                                    className="popover popover-hover relative"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <label className="popover-trigger bg-transparent cursor-pointer flex items-center">
                                                        <EyeIcon className="h-6 w-6 text-blue-600 mr-2 dark:text-blue-400" />
                                                        <span className="text-base text-blue-600 dark:text-blue-400">
                                                            View Wallet Address
                                                        </span>
                                                    </label>

                                                    <div className="popover-content absolute z-10 w-max max-w-xs left-20 top-10 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600">
                                                        <div className="popover-arrow absolute -top-2 right-4 transform rotate-45 h-4 w-4 bg-white dark:bg-gray-700 border-l border-t border-gray-300 dark:border-gray-600"></div>
                                                        <div className="text-xs p-2">
                                                            <p className="text-gray-700 dark:text-gray-300">
                                                                {transaction.wallet_address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            <div className="block lg:hidden">
                                                <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400">
                                                    Wallet Address:{" "}
                                                    <span className="font-normal text-gray-900 dark:text-gray-200 break-all">
                                                        {transaction.wallet_address}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-500">No transactions found.</div>
                    )}
                </motion.div>

                <div className="flex flex-col items-center mt-8 space-y-4">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastItem, transactionData?.length ?? 0)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{transactionData?.length}</span> Entries
                    </span>
                    <div className="inline-flex space-x-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-colors duration-300 ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages || indexOfLastItem >= (transactionData?.length ?? 0)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-colors duration-300 ${currentPage >= totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleDownloadReport}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                    >
                        Download Report
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransactionDataPage;

// Fetch transaction data based on wallet address using getServerSideProps
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
        // Fetch transaction data based on wallet address
        const transactions = await TransactionData.find({ wallet_address });

        const userdata = await UserData.findOne({ wallet_address });


        if (transactions.length === 0 && !userdata) {
            // If no transactions found, return empty array
            return {
                props: {
                    transactions: [], // Return empty array for transactions
                    user: { username: null, avatar_link: null }, // Provide default values if no user data found

                }
            };
        }

        // Format transaction date to yyyy-mm-dd
        const formattedTransactions = transactions.map(transaction => {
            const { trans_date, _id, ...rest } = transaction.toObject();
            const date = new Date(trans_date);
            const formattedDate = date.toISOString().split('T')[0]; // Extract yyyy-mm-dd
            return { ...rest, trans_date: formattedDate, _id: _id.toString() }; // Convert _id to string
        });

        const USERData = {
            wallet_address: user.address || "",
            user_name: userdata.user_name || "N/A",
            avatar_link: userdata.avatar_link || "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",

        };
        // Pass formatted transactions as props
        return {
            props: {
                transactions: formattedTransactions,
                users: USERData, // Include username and avatar_link in props

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