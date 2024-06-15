import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    cartData : {
        type: Object,
        default: {}
    }
},{
    timestamps: true,
    minimize: false,
});

const User = mongoose.models.user || mongoose.model("User", userSchema);
// if created, use it else create new

export default User;