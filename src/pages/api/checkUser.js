// pages/api/checkUser.js
import connectDB from "@/lib/database/db_connect";
import { UserData } from "@/lib/database/model/User"; // Adjust path as necessary

export default async function handler(req, res) {
    await connectDB(); // Ensure you are connected to your database

    if (req.method === 'POST') {
        const { wallet_address } = req.body;

        if (!wallet_address) {
            return res.status(400).json({ message: 'Wallet address is required.' });
        }

        try {
            const user = await UserData.findOne({ wallet_address });

            if (user) {
                return res.status(200).json({ exists: true });
            } else {
                return res.status(200).json({ exists: false });
            }
        } catch (error) {
            console.error("Error checking user: ", error);
            return res.status(500).json({ message: 'Error checking user.' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}
