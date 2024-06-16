const loginAdmin = async (req,res) => {
    const {adminId, password} = req.body;

    //Checking for empty fields
    if (!adminId || !password) {
        return res.json({
            success: false,
            message: "Please enter all fields"
        })
    }

    //Checking if credentials entered are correct
    if (adminId === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
        res.json({
            success: true,
            message: "Admin Logged In Successfully"
        })
    }
    else {
        res.json({
            success: false,
            message: "Invalid Credentials"
        })
    }
};

export { loginAdmin }