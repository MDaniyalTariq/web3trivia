import mongoose from "mongoose";

// Define the schema
const TransactionSchema = new mongoose.Schema({
    wallet_address: {
        type: String,
        required: true,
        unique: true // Ensure unique wallet address if required
    },
    trans_time: {
        type: String,
        required: true
    },
    trans_date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    life_bought: {
        type: Number,
        required: true
    }
}); 

// Create and export the model
export const TransactionData = mongoose.models.transactions || mongoose.model('transactions', TransactionSchema);
