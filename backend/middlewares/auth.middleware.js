import jwt  from 'jsonwebtoken';

//This middleware will decode the token to get user id using which we can perform cart functions

const authMiddleware = async (req, res, next) => {
    
    //Get token from req.headers
    // console.log(req.headers);
    const {token} = req.headers
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized, please login again"
        })
    }

    //Verify token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decodedToken);

        //The decoded token is an object with id property
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({
            success: false,
            message: "Not Authorized, please login again"
        })
    }


}

export default authMiddleware;