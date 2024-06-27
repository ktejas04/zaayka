import  User  from '../models/user.models.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendResetEmail } from '../utils/sendResetEmail.js';
import crypto from "crypto";

//Creating Token

const createToken = (userId) => {
    return jwt.sign({
        id: userId
    }, process.env.JWT_SECRET
    // , {expiresIn: "1d"}
    )
}

/*const createToken = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}*/


//Register User
const registerUser = async (req, res) => {

    console.log(req.body);
    const {name, email, password} = req.body;
    // console.log(name, email, password);
    try {

        //Checking if all fields have been entered

        if([name, email, password].some(field=>field==="")){
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        // Checking for Existing User

        const isUserExisting = await User.findOne({email});
        // console.log(isUserExisting);
        if (isUserExisting) {
            return res.json({
                success: false,
                message: "User Already Exists. Please Login"
            })
        } 
        
        //  Validation of email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid Email"
            })
        }

        if (password.length<8) {
            return res.json({
                success: false,
                message: "Password should be atleast 8 characters long"
            })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10) // 5-15
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const user = new User({
            name, email, password:  hashedPassword
        })

        // Saving the user
        // const createdUser = await user.save();
        await user.save();

        // Getting user without password
        const createdUser = await User.findById(user._id).select("-password")
        
        //Token
        const token = createToken(user._id)

        //Sending response
        return res.json({
            success: true,
            message: "User Registered Successfully",
            createdUser
        })

    } catch (error) {
        console.log("Error: " , error);
        return res.json({
            success: false,
            message: "Error : User Not Registered",
            error: error.message
        })
    }
}

//Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (email==="" || password===""){
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    //Checking if user is available
    try {
        const user = await User.findOne({email}) 

        if (!user) {
            return res.json({
                success: false,
                message: "Email not registered"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = createToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");
        return res.json({
            success: true,
            message: "User Logged In Successfully",
            loggedInUser
        })
    
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error : User Not Logged In",
            error: error.message
        })
    }
}

//Reset Password Functionality

//Find user based on email id, generate a unique token and send to email of user
const sendResetLink = async (req, res) => {

    //TODOS
    // 1. Find user based on email id
    // 2. Generate a unique token
    // 3. Send token to email of user

    //1.
    try {
        const {email} = req.body;
    
        if (!email){
            return res.json({
                success: false,
                message: "Enter your email!"
            })
        }
    
        const user = await User.findOne({email}); //findOne(email)
    
        if (!user) {
            return res.json({
                success: false,
                message: "Email not registered"
            })
        }
    
        //2. Use createResetPasswordToken from models to create a token
        const resetToken = user.createResetPasswordToken();
    
        //Save the passwordResetToken and passwordResetTokenExpires in DB
        await user.save(); 
        // return res.json({
        //     success: true,
        //     message: "Reset Link Sent to your Email"
        // })

        //3. Send token to email of user

        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/reset-password/${resetToken}`;
        const message = `We received a request to reset the password for your account.\n\nIf you made this request, click the link below. If not, you can ignore this email.\n\n${resetUrl}\n\nThis link will expire in 10 minutes.`;
       try {
         await sendResetEmail({
             email,
             subject: `Reset your Zaayka password, ${user.name}`,
             message
         });

         return res.json({
             success: true,
             message: "Reset Link Sent to your Email"
         })

       } catch (error) {
            user.passwordResetToken = "";
            user.passwordResetTokenExpires = undefined;  
            await user.save({validateBeforeSave: false}); //{validateBeforeSave: false}

            return res.json({
                success: false,
                message: "Error : Reset Link Not Sent. Please try again later.",
                error: error.message
            })
       }

        //sendResetEmail returns a promise. If it is rejected,(due to any reasons), we want to rest passwordResetToken and its expires value in DB instead of returning a response
    } catch (error) {
        console.log("Error: ", error);
        return res.json({
            success: false,
            message: "Error : Reset Link Not Sent",
            error: error.message
        })
    }


}


//User enters token and new password, if correct then update password
const resetPassword = async (req, res) => {

    //TODOS
    // Compare user's entered token with the encrypted token in DB

    const {resetToken} = req.params;
    const token = crypto.createHash("sha256").update(resetToken).digest("hex");

    //return user with correct token and valid expiry date token
    const user = await User.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}});

    if(!user){
        return res.json({
            success: false,
            message: "Token is invalid or has expired!" 
        })
    }

    const {password, confirmPassword} = req.body;
    if (password !== confirmPassword){
        return res.json({
            success: false,
            message: "Passwords do not match!"
        })
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10) // 5-15
    const hashedPassword = await bcrypt.hash(password, salt);

    //Saving hashed Password
    // const newUser = await User.findByIdAndUpdate(user._id, { $set: {password: hashedPassword, passwordResetToken: "", passwordResetTokenExpires: undefined}}, { returnDocument: "after"});

    user.password = hashedPassword;
    user.passwordResetToken = "";
    user.passwordResetTokenExpires = undefined; //removes this field
    await user.save({validateBeforeSave: false}); //{validateBeforeSave: false}
    const updatedUser = await User.findById(user._id).select("-password");

    return res.json({
        success: true, 
        message: "Password has been reset. Login again",
        user,
        updatedUser
    })

}


export { loginUser, registerUser, resetPassword, sendResetLink }
