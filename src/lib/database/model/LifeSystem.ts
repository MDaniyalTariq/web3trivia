// models/LifeSystem.js
import mongoose from 'mongoose';

const lifeSystemSchema = new mongoose.Schema({
    wallet_address: {
        type: String,
        required: true,
        unique: true,
        minlength: 42,
        maxlength: 42,
    },
    life: {
        type: Number,
        default: 5,
    },
    can_play: {
        type: Boolean,
        default: true,
    },
});

export const LifeSystem = mongoose.models.life_systems || mongoose.model('life_systems', lifeSystemSchema);

