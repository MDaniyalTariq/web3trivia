import connectDB from "@/lib/database/db_connect";
import { UserData } from "@/lib/database/model/User";
import { xptokenData } from "@/lib/database/model/XpToken";
import { NextApiRequest, NextApiResponse } from 'next';
export const dynamic = 'force-dynamic';

// Make sure to connect to the database once at the start
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Extract wallet_address from the request URL
            const wallet_address = req.query.wallet_address as string;

            if (!wallet_address) {
                return res.status(400).json({ error: 'Wallet address is required' });
            }

            // Fetch user data and xp/token data in parallel
            const [user, xpToken] = await Promise.all([
                UserData.findOne(
                    { wallet_address },
                    { _id: 0, user_name: 1, avatar_link: 1, location: 1, bio: 1, user_email: 1 }
                ).exec(),
                xptokenData.findOne(
                    { wallet_address },
                    { _id: 0, total_user_xp: 1 }
                ).exec()
            ]);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userXp = xpToken ? xpToken.total_user_xp : 0;

            // Prepare and return the response data
            const responseData = {
                user_xp: userXp,
                user_name: user.user_name,
                avatar_link: user.avatar_link,
                location: user.location,
                bio: user.bio,
                user_email: user.user_email,
            };

            return res.status(200).json(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
