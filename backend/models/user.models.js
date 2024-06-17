import mongoose, {Schema} from "mongoose";
import crypto from "crypto";

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
    },
    passwordResetToken : {
        type: String,
        default: ""
    },
    passwordResetTokenExpires :  Date
},{
    timestamps: true,
    minimize: false,
});

userSchema.methods.createResetPasswordToken = function(){

    //Not an encrypted token, omly the user has access to this token
    const resetToken = crypto.randomBytes(32).toString("hex");

    //Storing the hashed token in user model
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // console.log(resetToken, this.passwordResetToken);

    //Storing expire time - 10 mins
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //+330 * 60 * 1000 for IST

    return resetToken;
}

const User = mongoose.models.user || mongoose.model("User", userSchema);
// if created, use it else create new

export default User;