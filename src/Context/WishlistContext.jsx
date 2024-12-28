import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    const headers = {
        token: localStorage.getItem('UserToken')
    };

    const [wishList, setWishList] = useState([]);

    // Add product to wishlist
    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            productId
        }, {
            headers
        })
        .then((res) => res   )
        .catch((err) => err)
    }


    function getWishListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishList`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }
    function removeWishListItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishList/${productId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }



    return (
        <WishlistContext.Provider value={{ addToWishList ,  removeWishListItem  , getWishListItems , wishList , setWishList}}>
            {props.children}
        </WishlistContext.Provider>
    );
}
