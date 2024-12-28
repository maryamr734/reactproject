import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
useState

export let Cartcontext = createContext();

export default function CartContextProvider(props) {


 

  let headers = {
    token: localStorage.getItem('UserToken')  

   
  };
  let[Cart,setCart]=useState({
    items: [],
    numOfCartItems: 0,  // Track the number of items in the cart
  });

  const [CartInfo , setCartInfo] = useState(null);

  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) =>   response 
    )  
      .catch((error) => error
      );
  }
function addProductToCart(productId){

  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , { 
    
    productId: productId
  } , {
    headers
  })
  .then((response) =>   response 
)  
  .catch((error) => error
  );
}


function updateCartitemCount(productId , count){

  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , { 
    
    count: count
  } , {
    headers
  })
  .then((response) =>   response 
)  
  .catch((error) => error
  );
}
function deleteProductItem(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
    .then((response) =>   response 
  )  
    .catch((error) => error
    );
}



function checkOut( cartId , url , formValue) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, 
    { shippingAddress  :formValue

  } , {
    headers
  })
    .then((response) =>   response 
  )  
    .catch((error) => error
    );
}


function clearCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
  }).then((res) => res)
      .catch((err) => err)
}

function checkoutSession(url, shippingAddress) {
  setIsLoading(true);
  // return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress
  }, {
      headers
  })
  .then((res) => {
      setIsLoading(false);
      return res;
  })
  .catch((err) => {
      setIsLoading(false);
      setApiError(err.message || 'An error occurred');
  })
}

function getUserOrders() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      headers
  }).then((res) => res.data.find(obj => obj.user._id === userId))
      .catch((err) => err)
}





   async function getCart(){

    let response= await getLoggedUserCart()
    setCart(response.data)
   }




   
useEffect(() => {
getCart()

},[])


  return (

  <Cartcontext.Provider value={{ setCartInfo ,CartInfo,  getUserOrders,checkoutSession , clearCart , Cart ,setCart   ,deleteProductItem ,  getLoggedUserCart , addProductToCart , updateCartitemCount , checkOut ,}}>
      {props.children}
    </Cartcontext.Provider>
  );
}
