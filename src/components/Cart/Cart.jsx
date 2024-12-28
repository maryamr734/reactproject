import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from '../../Context/Cartcontext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; // Make sure you have this import

export default function Cart() {
  const { getLoggedUserCart, updateCartitemCount, deleteProductItem  , setCart} = useContext(Cartcontext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Cart items from API
  async function getCartItems() {
    try {
      let response = await getLoggedUserCart();
      if (response && response.data && response.data.data && response.data.data.products) {
        setCartDetails(response.data.data); 
         // Set the cart data if response is valid
      } else {
        toast.error("Failed to fetch cart details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching cart items.");
    } finally {
      
      setLoading(false); // Set loading to false after fetching
    }
  }

  // Update item count in cart
  async function updateCartCount(productId, count) {
    try {
      if (count < 1) return;  // Prevent reducing the count below 1
      let response = await updateCartitemCount(productId, count);
      if (response && response.data && response.data.data) {
        setCartDetails(response.data.data);  // Update cart details after count update
        toast.success("Cart updated successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart item.");
    }
  }

  // Delete item from cart
  async function deleteItem(productId) {
    try {
      let response = await deleteProductItem(productId);
      if (response && response.data && response.data.data) {
        setCartDetails(response.data.data); 
        setCart()
        toast.success("Item removed from cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item from cart.");
    }
  }

  // Fetch cart items when component mounts
  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  return (
    <div className="relative overflow-x-auto -md sm:rounded-lg">
      <table className="w-full md:w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {CartDetails?.products?.length > 0 ? (
            CartDetails.products.map((product) => (
              <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full object-contain"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateCartCount(product.product.id, product.count - 1)}
                      className="inline-flex items-center justify-center p-1 mr-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Decrease Quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span>{product.count}</span>
                    <button 
                      onClick={() => updateCartCount(product.product.id, product.count + 1)}
                      className="inline-flex items-center justify-center p-1 ml-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Increase Quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                    Remove
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to={'/checkout'}>
        <div className="p-4 pt-0">
          <button className="btn bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all duration-300">
            Check out
          </button>
        </div>
      </Link>
    </div>
  );
}
