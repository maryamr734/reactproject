
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/Wishlistcontext';
WishlistContext

useContext 

useQuery
Link


export default function RecentProducts() {
let{addProductToCart,setCart}=useContext(Cartcontext)
const[loading,setisLoading]=useState(false)
const[currentProductId,setcurrentProductId]=useState(0)


let { addToCard, setNumOfCartItems } = useContext(Cartcontext);

const [isWishListed, setIsWishListed] = useState(true);







 async function addProduct(productId){

  let response= await addProductToCart(productId)
  
  
  if(response.data.status == " success")
  {
    console.log(response.data);
setCart(response.data)
  
toast.success('product added successfully to your cart ' , {
  duration:1000,
   position:'bottom-center' })
}
  
  else{
    setisLoading(false)
    toast.error('error added product to your cart ' ,{
  duration:1000,
  position:'bottom-center'
    })
  }

 
  console.log(response);
  
}

  function getRecent(){

return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)


  }




  let {data , error ,isError ,isFetching , isLoading}= useQuery( 
    {
      queryKey:['recentProdcuts'],
      queryFn:getRecent,
  select:(data) => data.data.data
      //staleTime:0,
    }
   
    

  )
  if(isLoading)
  {

    return <div className="pu-8 w-full flex-justify-center">
       <ClipLoader  color='green'/>
    </div>
    
  
  }
 
  if(isError)
    {
  
      return <div className="pu-8 w-full flex-justify-center">
       <h3>{error}</h3>
      </div>
      
    
    }
   
  console.log(isLoading);
  
  // const [recentProducts, setRecentProducts] = useState([]);

  // Function to fetch the recent products
  function getRecentProducts() {
    axios
     // .get('https://ecommerce.routemisr.com/api/v1/products')
     // .then(({ data }) => {
      //  console.log(data.data); 
      //  setRecentProducts(data.data); 
    //  })
    //  .catch((error) => {
      //  console.error('Error fetching recent products:', error);
    //  });
//  }

  // Use useEffect to trigger the data fetch on component mount
  //useEffect(() => {
   // getRecentProducts();
 // }
 // 
 // 
 // 
 // 
 // 
 // 
 // 
 // , []); // Empty dependency array means it runs only once when the component mounts




  }
  return (
    <>
    <div className="row mt-12 mx-auto max-w-6xl">
      {data.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
          <div  className="product bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={`/details/${product.id}/${product.category.name}`}>
              {/* Product Image */}
              <img
                className="w-full h-56 object-cover"
                src={product.imageCover}
                alt={product.title.split('').slice(0, 2).join('')}
              />
  
              <div className="p-4">
                {/* Product Category */}
                <span className="block font-light text-green-600 text-sm">
                  {product.category.name}
                </span>
  
               
                <h3 className="text-lg font-medium text-gray-800 mt-2">
                  {product.title}
                </h3>
  
              
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-800">
                    {product.price} EGP
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">{product.ratingsAverage}</span>
                    <i className="fas fa-star text-yellow-500 ml-1"></i>
                  </div>
                </div>
              </div>
  
              {/* Add to Cart Button */}
             
            </Link>
            <div className="flex justify-between items-center px-3 mt-3">
                    <button onClick={() => addProduct(product.id)} className="btn mx-auto">Add To Cart</button>
                    <button onClick={() => toggleWishList(product.id)} className={isWishListed ? 'text-black-mut' : 'text-red-500'}>
                      <i className="fa-solid fa-heart text-2xl"></i>
                    </button>
                  </div>
          </div>
        </div>
      ))}
    </div>
  </>
  
  );
}
