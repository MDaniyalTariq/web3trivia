
import connectDB from "@/lib/database/db_connect";
import { TransactionData } from "@/lib/database/model/payment";
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
   connectDB();
   
    // Extract wallet_address from the request URL
    const { searchParams } = new URL(request.url);
    const wallet_address = searchParams.get('wallet_address');

    if (!wallet_address) {
        return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    try {
        // Fetch transaction data based on wallet address
        const transactions = await TransactionData.find({ wallet_address });

        if (transactions.length === 0) {
            return NextResponse.json({ message: 'No transactions found for this wallet address' }, { status: 404 });
        }

        // Format transaction date to yyyy-mm-dd
        const formattedTransactions = transactions.map(transaction => {
            const { trans_date, ...rest } = transaction.toObject();
            const date = new Date(trans_date);
            const formattedDate = date.toISOString().split('T')[0]; // Extract yyyy-mm-dd
            return { ...rest, trans_date: formattedDate };
        });

        // Prepare and return the response data
        return NextResponse.json(formattedTransactions, { status: 200 });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }



}