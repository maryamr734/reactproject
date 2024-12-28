import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

import useProducts from '../../Hooks/useProducts';




import toast from 'react-hot-toast';

import axios from 'axios';


export default function Products() {
  const { data, error, isError, isFetching, isLoading } = useProducts();

 

const [cartId, setCartId] = useState('');

const [isWishListed, setIsWishListed] = useState(true);

async function addProductToCard(productId) {
  let res = await (productId);    
  if(res.data.status === 'success') {
      toast.success('Product added successfully to your cart.', {
          duration: 1500,
      });
      setNumOfCartItems(res.data.numOfCartItems);
  }
  else {
      toast.error('Error adding product to your cart.', {
          duration: 1500,
      });
  }
}




  useEffect(() => {
   


  }, []);

  if (isLoading) {
    return (
      <div className="pu-8 w-full flex-justify-center">
        <ClipLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pu-8 w-full flex-justify-center">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="row mt-12 mx-auto max-w-6xl">
      {data?.data.data.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
          <div className="product bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={`/details/${product.id}/${product.category.name}`}>
              {/* Product Image */}
              <img
                className="w-full h-56 object-cover"
                src={product.imageCover}
                alt={product.title.split('').slice(0, 2).join('')}
              />

              <div className="p-4">
                {/* Product Category */}
                <span className="block font-light text-green-600 text-sm">{product.category.name}</span>

                {/* Product Title */}
                <h3 className="text-lg font-medium text-gray-800 mt-2">{product.title}</h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-gray-800">{product.price} EGP</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">{product.ratingsAverage}</span>
                    <i className="fas fa-star text-yellow-500 ml-1"></i>
                  </div>
                </div>
              </div>

              {/* Wishlist and Cart Buttons */}
              <div className="flex justify-between items-center px-3 mt-3">
                    <button onClick={() => addProductToCard(product.id)} className="btn mx-auto">Add To Cart</button>
                    <button onClick={() => toggleWishList(product.id)} className={isWishListed ? 'text-black-mut' : 'text-red-500'}>
                      <i className="fa-solid fa-heart text-2xl"></i>
                    </button>
                  </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
