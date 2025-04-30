import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cart,setCart] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [product_list, setProductList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for(const item in cartItems) {
    //         if (cartItems[item]>0) {
    //             let itemInfo = product_list.find((product) => product._id === item);
            
    //         }
    //     }
    // }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = product_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
                
                
            }

        }
        return totalAmount;
    }

    const getTotalQuantity = ()=> {
        let totalQuantity = 0;
        for (const itemId in cartItems) {
            totalQuantity += cartItems[itemId];
        }
        return totalQuantity;
    };
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setProductList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        product_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        getTotalQuantity,
        cart,
        setCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
