import React from 'react'
import dynamic from 'next/dynamic'
import DashboardLayout from '@/components/DashboardLayout'
import { getUser } from '../api/auth/[...thirdweb]';
import { UserData } from '@/lib/database/model/User';
import connectDB from '@/lib/database/db_connect';


interface Users {
    user_name: string;
    avatar_link: string;
    wallet_address: string;

}
interface Props {
    users: Users; // Assuming `users` is singular based on your MongoDB query, adjust if it's an array
  }


const PricingsCards = dynamic(() => import('@/components/PricingsCards'), {
    ssr: false, 
    loading: () => <p>Loading...</p>, 
});

const Page: React.FC<Props> = ({ users }) => {
    return (
        <DashboardLayout users={users}>
            <div className="min-h-screen p-4">
                <PricingsCards />
            </div>
        </DashboardLayout>
    )
}

export default Page



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
        const wallet_address=user.address;
        // Fetch transaction data based on wallet address

        const userdata = await UserData.findOne({ wallet_address });


        if (!userdata) {
            // If no transactions found, return empty array
            return {
                props: {
                    user: { username: null, avatar_link: null }, // Provide default values if no user data found

                }
            };
        }
        const USERData = {
            wallet_address: user.address || "",
            user_name: userdata.user_name || "N/A",
            avatar_link: userdata.avatar_link || "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
           
        };
        // Pass formatted transactions as props
        return {
            props: {
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