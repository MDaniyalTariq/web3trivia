import mongoose from 'mongoose';

const XpTokenSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true, unique: true },
    total_user_token: { type: Number, default: 0 },
    total_user_xp: { type: Number, default: 0 },
    user_name: { type: String, required: true },
}, { collection: 'xp_token' });

export const xptokenData= mongoose.models.xp_token || mongoose.model('xp_token', XpTokenSchema);
