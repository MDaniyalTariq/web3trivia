import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    avatar_link: { type: String, required: false,default: "" },
    location: { type: String,required:false,default: "" },
    wallet_address: { type: String, required: true, unique: true,index:true },
    user_name: { type: String, required: false ,default: ""},
    user_email: { type: String, required: false,default: "" },
});

UserSchema.index({ wallet_address: 1 });  // 1 for ascending index, -1 for descending

export const UserData= mongoose.models.users || mongoose.model('users', UserSchema);