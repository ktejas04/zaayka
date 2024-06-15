import Order from '../models/order.models.js';
import User from '../models/user.models.js';

import Stripe from "stripe"


//Placing order from frontend
const placeOrder = async (req, res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const frontend_url = "https://zaayka.vercel.app/";
    // console.log(req.body);
    const {userId, items, amount, address} = req.body;
    
    // console.log(items);
    try {
        const newOrder = new Order({
            user: userId,
            items,
            amount,
            address
        })
        // console.log(newOrder);
        
        await newOrder.save(); //Save in Order DB
        
        //Clear user cart
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { cartData: {}}}, {returnDocument: "after"});
        // console.log(updatedUser);
        
        //Logic for payment link
        
        const line_items = items.map(lineItem => {
            console.log(lineItem.name); // Ensure this prints correctly
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: lineItem.name,
                    },
                    unit_amount: lineItem.price * 100
                },
                quantity: lineItem.quantity
            };
        });

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        // Logging the line_items array for debugging
        // console.log("Line items:", JSON.stringify(line_items, null, 2));
        //Creating session
        const session =  await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            // payment_method_types: ["card"],
            success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        // console.log(session);

        res.json({
            success: true,
            message: "Order Placed Successfully",
            session
        })
    } catch (error) {
        console.log("Error ", error);
        res.json({
            success: false,
            message: "Error : Order Not Placed",
            error: error.message
        })
    }
}

//Verify Order - set Payment status and keep/delete order based on it
const verifyOrder = async (req, res) => {
    const {orderId, success } = req.body;
   try {
     if (success === "true") {
         //Update payment status
         await Order.findByIdAndUpdate(orderId, { $set: { paymentStatus: true}});
         res.json({
             success: true,
             message: "Payment Successful"
         })
     }
     else {
        //Delete payment as it was unsuccessful
        await Order.findByIdAndDelete(orderId);
        res.json({
            success: false,
            message: "Payment Unsuccessful"
        })
     }
   } catch (error) {
        console.log("Error: ", error);
        res.json({
            success: false,
            message: "Error : Order Not Verified",
            error: error.message
        })
   }
}


//List orders of a specific user
const listOrders = async (req, res) => {

    //Find Orders of the specific user's id using their id

    // console.log(req.body);
    const {userId} = req.body;
    try {
        const orders = await Order.find({user: userId});
        res.json({
            success: true,
            message: "Orders Listed Successfully",
            orders
        })
    } catch (error) {
        console.log("Error: ", error);
        res.json({
            success: false,
            message: "Error : Orders Not Listed",
            error: error.message
        })
    }
}

//List all orders(admin)
const listAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            success: true,
            message: "Orders Listed Successfully",
            orders
        })
    } catch (error) {
        console.log("Error: ", error);
        res.json({
            success: false,
            message: "Error : Orders Not Listed",
            error: error.message
        })
    }
}


//Change Order Status
const updateOrderStatus = async (req, res) => {
    const {orderId, status} = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: { status }}, {returnDocument: "after"});
        // console.log(updatedOrder);

        //Check if order was updated, if not it means ID was wrong, order does not exist
        if (!updatedOrder) {
            return res.json({
                success: false,
                message: "Order Not Found"
            })
        }
        res.json({
            success: true,
            message: "Order Status Updated",
            updatedOrder : { id: updatedOrder._id, status: updatedOrder.status}
        })
    } catch (error) {
        console.log("Error: ", error);
        res.json({
            success: false,
            message: "Error : Order Status Not Changed",
            error: error.message
        })
    }
}


export { placeOrder, verifyOrder, listOrders, listAllOrders, updateOrderStatus }


