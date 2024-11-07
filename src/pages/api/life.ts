import { LifeSystem } from "@/lib/database/model/LifeSystem";
import connectDB from "@/lib/database/db_connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Connect to the database
    await connectDB();

    // Handle the request method
    if (req.method === "POST") {
        const { wallet_address, life } = req.body;

        // Validate the input
        if (!wallet_address || typeof life !== "number") {
            return res.status(400).json({ error: "Invalid input data" });
        }

        try {
            const updateData = {
                life,
                can_play: life > 0,
            };

            // Find the user and update life data or create a new entry
            await LifeSystem.findOneAndUpdate(
                { wallet_address },
                updateData,
                { new: true, upsert: true }
            );

            // Respond with a success message
            return res.status(200).json({ message: "Life updated successfully" });
        } catch (error) {
            // Handle server errors
            return res.status(500).json({ error: "Server error" });
        }
    } else {
        // Respond with 405 for any method other than POST
        return res.status(405).json({ error: "Method not allowed" });
    }
}
