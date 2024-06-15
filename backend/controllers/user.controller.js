import  User  from '../models/user.models.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


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
    console.log(name, email, password);
    try {

        // Checking for Existing User

        const isUserExisting = await User.findOne({email});
        // console.log(isUserExisting);
        if (isUserExisting) {
            return res.json({
                success: false,
                message: "User Already Exists"
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
        res.json({
            success: true,
            message: "User Registered Successfully",
            createdUser,
            token
        })

    } catch (error) {
        console.log("Error: " , error);
        res.json({
            success: false,
            message: "Error : User Not Registered",
            error: error.message
        })
    }
}

//Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    //Checking if user is available
    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.json({
                success: false,
                message: "User Does Not Exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Incorrect Credentials"
            })
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            message: "User Logged In Successfully",
            user,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error : User Not Logged In",
            error: error.message
        })
    }
}


export { loginUser, registerUser }
