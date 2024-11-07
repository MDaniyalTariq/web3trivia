import connectDB from "@/lib/database/db_connect";
import { NextResponse } from "next/server";
import { LeaderboarData } from "@/lib/database/model/leaderboard";


export const dynamic = 'force-dynamic';

export const GET = async () => {
    connectDB();

    try {
       
        // Fetch the top 10 users sorted by 'xp' in descending order
        const topUsers = await LeaderboarData.find({})
            .sort({ user_xp: -1 })
            .limit(10)

        // console.log(" the top users are: ", topUsers);

        // Prepare response data with rankings
        const response_data = topUsers.map((user, index) => ({
            position: index + 1,
            user_name: user.user_name,
            user_xp: user.user_xp,
            user_tokens: user.user_tokens,
        }));

        // Disable caching
        return NextResponse.json(response_data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });

    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        return NextResponse.json({ error: "Error fetching leaderboard data" });
    }
};
