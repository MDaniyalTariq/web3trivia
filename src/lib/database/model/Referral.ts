import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true, // The user who created the referral code
  },
  redeemedBy: [
    {
      walletAddress: String,
      redeemedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  maxRedemptions: {
    type: Number,
    default: 3, // Maximum redemptions allowed
  },
});

export const Referral = mongoose.model('Referrals', ReferralSchema) ||mongoose.models.Referrals ;

