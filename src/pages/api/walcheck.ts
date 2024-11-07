import connectDB from "@/lib/database/db_connect";
import { NextRequest, NextResponse } from "next/server";
import {UserData} from "@/lib/database/model/User"  // Assuming your User model is defined in this path

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    try {
        await connectDB();

        // Extract wallet_address from query parameters
        const { searchParams } = new URL(request.url);
        const wallet_address = searchParams.get('wallet_address');        


        if (!wallet_address) {
            return NextResponse.json({ message: 'Wallet address is required' }, { status: 400 });
        }

        console.log(" Before the userdata findone")

        // Check if the wallet address exists in the User collection
        const user = await UserData.findOne({ wallet_address }).lean().exec();
        console.log(" Aft the userdata findone")


        if (user) {
            return NextResponse.json({ exists: true }, { status: 200 });
        } else {
            return NextResponse.json({ exists: false }, { status: 200 });
        }
    } catch (error) {
        console.error("Error checking wallet address:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } 
};
