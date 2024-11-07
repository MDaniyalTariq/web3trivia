import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    wallet_address: String,
    user_name: String,
    user_tokens: Number,
    user_xp: Number
})
leaderboardSchema.index({ user_xp: -1 });


export const LeaderboarData=mongoose.models.leaderboards || mongoose.model('leaderboards',leaderboardSchema)