import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext(null)

const ContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [discountRate, setDiscountRate] = useState(0)
    const url = 'https://api.zaayka.vercel.app/';
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);
    const [name, setName] = useState("")

    // useEffect(() => console.log("Hello ",name),[name]);


    // Add to Cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) { //if prod with this id is not in cart add it
            setCartItems(prev => ({...prev, [itemId] : 1})) //adding quantity 1 for first time
        }
        else {
            setCartItems(prev => ({...prev, [itemId] : prev[itemId] + 1})) //adding quantity as required
        }

        if (token) {
            // await axios.post(`${url}/api/v1/cart/add`, {itemId}, {headers: {token}}); // 'token': token
            const reponse = await axios.post(`${url}/api/v1/cart/add`, {itemId}, {headers: {token}}) // 'token': token
               .then(res => {
                    console.log(res.data);
                })
               .catch(err => {
                    console.log(err);
                })
        }
    }

    // Remove from Cart
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 1) {
            // delete cartItems[itemId]
            setCartItems(prev => ({...prev, [itemId] : prev[itemId] - 1 }))
        }
        else { //study
            setCartItems(prev => {
                const {[itemId]: _, ...newCartItems} = prev
                return newCartItems
            })
        }

        if (token) {
           // await axios.post(`${url}/api/v1/cart/remove`  , {itemId}, {headers : {token}});
           const response =  await axios.post(`${url}/api/v1/cart/remove`  , {itemId}, {headers : {token}});
           if (response.data.success){
                console.log(response.data);
            }
            else {
                console.log(response.data);
                console.log("ERROR : ", response.data.error);
 
           }
        }
    }

    //Delete from Cart
    const deleteFromCart = async (itemId) => {
        setCartItems(prev => {
            const {[itemId]: _,...newCartItems} = prev
            return newCartItems
        })

        if (token) {
            // await axios.post(`${url}/api/v1/cart/delete`, {itemId}, {headers: {token}});
            const response = await axios.post(`${url}/api/v1/cart/delete`, {itemId}, {headers: {token}});
            if (response.data.success){
                console.log(response.data);
            }
            else {
                console.log(response.data);
                console.log("ERROR : ", response.data.error);
 
            }
        }
    }

    // Clear Cart
    const clearCart = async () => {
        setCartItems({})

        if (token) {
            // await axios.post(`${url}/api/v1/cart/clear`, {}, {headers: {token}});
            const response = await axios.post(`${url}/api/v1/cart/clear`, {}, {headers: {token}});
            if (response.data.success){
                console.log(response.data);
            }
            else {
                console.log(response.data);
                console.log("ERROR : ", response.data.error);
 
           }
        }
    }

    //Get Total

    // const getTotalCartAmount = () => {
    // Object.keys(cartItems).reduce((totalAmount, itemId) => 
    //     totalAmount + food_list.find(food_item => food_item._id === itemId).price * cartItems[itemId], 
    //     0);
    //     return totalAmount;
    // }

    const getTotalCartAmount = () => {
        // console.log(cartItems);
        let totalAmount = 0;
        for (const item in cartItems) {
            totalAmount += food_list.find(food_item => food_item._id === item).price * cartItems[item];
        }
        // console.log(totalAmount);
        return totalAmount;
    }
    // cartItems.reduce((acc, item) => acc + item.price * cartItems[item._id], 0)

    const totalAmount = getTotalCartAmount();
    const platformFee = 2
    const deliveryCharges = 0    

    //check the cart items on each update
    /*useEffect(() => {
        console.log(cartItems);
    },[cartItems])*/

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/v1/food/list");
        if (response.data.success) {
        setFoodList(response.data.data)
        }
        else {
            console.log(response.data);
            console.log("ERROR : ", response.data.error);

       }
    }

    const loadCartData = async (token) => {
        const response = await axios.get(`${url}/api/v1/cart/get`, {headers: {token}}) //for post keep 2nd parameter empty object
        // console.log(response);
        if (response.data.success) {
            // console.log(response.data, response.data.cartData);
            setName(response.data.user);
            setCartItems(response.data.cartData);
        }
        else {
            console.log(response.data);
            console.log("ERROR : ", response.data.error);

       }
    }

    useEffect(() => {
        (async () => {
            await fetchFoodList();
            const token = localStorage.getItem("token");
            if (token){
                setToken(token);
                await loadCartData(token);
            }

            // console.log(foodList);
        })();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        totalAmount,
        platformFee,
        deliveryCharges,
        discountRate,
        url, 
        token,
        name,
        setName,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        setDiscountRate,
        // getTotalCartAmount,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
