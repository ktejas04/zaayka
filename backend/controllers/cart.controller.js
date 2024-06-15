import User from '../models/user.models.js';
import Food from '../models/food.models.js';



//No need to check for user is valid or not. It has already been checked by auth middleware

//Add to Cart 

const addToCart = async(req,res) => {
    try {
        const { userId, itemId } = req.body;
        // console.log(req.body);

        //Find if the food item to be added/updated exists in the food catalog (in the food DB)
        const foodItem = await Food.findOne({_id: itemId});
        // console.log(foodItem);
        if (!foodItem) {
            return res.json({
                success: false,
                message: "Food Item Not Found"
            })
        }

        
        //Updating cartData in user collection        

        let userData = await User.findOne({_id: userId});
        // console.log(userData);
        let cartData = await userData.cartData;

        if(!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }
        // console.log(cartData);

        //Updating cartData in user collection
        // const updatedCartUser = 
        await User.findByIdAndUpdate({_id: userId}, { $set: {cartData} }, {returnDocument: "after"}); //USE $set!!!

        // const updatedCartUser  = await User.updateOne({_id: userId}, {cartData}); 
        // const updatedUser = await User.findOne({_id: userId})
        // console.log(updatedUser);

        // console.log(updatedCartUser);


        res.json({
            success: true,
            message: "Item Added to Cart",
            cartData
        })
    } catch (error) {
        console.log("Error: " + error);
        res.json({
            success: false,
            message: "Error : Item Not Added to Cart",
            error: error.message
        })
    }
}

//Remove from Cart

const removeFromCart = async(req,res) => {
    try {
        const {userId, itemId} = req.body;
    
        //Find if the food item to be removed exists in the food DB
        const foodItem = await Food.findOne({_id: itemId});
        if (!foodItem) {
            return res.json({
                success: false,
                message: "Food Item Not Found"
            })
        }
    
        //Find user and update cart data
        let userData = await User.findOne({_id: userId});
        let cartData = await userData.cartData;
    
        if(cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        }
        else if (cartData[itemId] === 1){
            const { [itemId]: _, ...restCartData } = cartData;
            cartData = { ...restCartData };
        }
        else {
            return res.json({
                success: false,
                message: "Item Not Found in Cart"
            })
        }
    
        //Updating cartData in user cart
        const removeCartUser = await User.findByIdAndUpdate({_id: userId}, { $set: {cartData} }, {returnDocument: "after"});
        // console.log(removeCartUser);
    
        res.json({
            success: true,
            message: "Item Removed from Cart",
            cartData
        })
    } catch (error) {
        console.log("Error: " , error);
        res.json({
            success: false,
            message: "Error : Item Not Removed from Cart",
            error: error.message
        })
    }
}


//Delete from Cart

const deleteFromCart = async(req,res) => {
    try {
        const {userId, itemId} = req.body;
    
        //Find if the food item to be removed exists in the food DB
        const foodItem = await Food.findOne({_id: itemId});
        if (!foodItem) {
            return res.json({
                success: false,
                message: "Food Item Not Found"
            })
        }
    
        //Find user and update cart data
        let userData = await User.findOne({_id: userId});
        let cartData = await userData.cartData;
    
        if(cartData[itemId] > 0) {
            const { [itemId]: _, ...restCartData } = cartData;
            cartData = { ...restCartData };
        }
        else {
            return res.json({
                success: false,
                message: "Item Not Found in Cart"
            })
        }
    
        //Updating cartData in user cart
        const deleteCartUser = await User.findByIdAndUpdate({_id: userId}, { $set: {cartData} }, {returnDocument: "after"});
        // console.log(deleteCartUser);
    
        res.json({
            success: true,
            message: "Item Deleted from Cart",
            cartData
        })
    } catch (error) {
        console.log("Error: " , error);
    }
}

//Get Cart Items Data

const getCart = async(req,res) => {
    const {userId} = req.body;

    try {
        //Find user and get cart data
        const userData = await User.findOne({_id: userId});
        const cartData = await userData.cartData;
    
        // console.log(cartData);
        res.json({
            success: true,
            message: "Cart Data Found",
            user: userData.name,
            cartData
        })
    } catch (error) {
        console.log("Error: ", error);
        res.json({
            success: false,
            message: "Error : Cart Data Not Found",
            error: error.message
        })
    }
}

//Clear Cart

const clearCart = async(req,res) => {
    try {
        const {userId} = req.body;
    
        //Find user and clear cart data
        const userData = await User.findOne({_id: userId});
        let cartData = await userData.cartData;
    
        if (Object.keys(cartData).length > 0){
            cartData = {};
        }
        else {
        return res.json({
            success: false,
            message: "Cart is Empty"
        })}
    
        await User.findByIdAndUpdate({_id: userId}, { $set: {cartData} });
    
    
        // const clearCartUser = await User.findByIdAndUpdate({_id: userId}, { $set: {cartData} }, {returnDocument: "after"});
        // console.log(clearCartUser);
    
        res.json({
            success: true,
            message: "Cart Data Cleared",
            user: userData.name,
            cartData
        })
    } catch (error) {
        console.log("Error: " , error);
    }
}

export { getCart, clearCart, addToCart, removeFromCart, deleteFromCart}

