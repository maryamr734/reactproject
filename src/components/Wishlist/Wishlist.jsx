import React, { useContext, useState } from 'react'
import { WishlistContext } from '../../Context/Wishlistcontext'
import { Cartcontext } from '../../Context/Cartcontext'
import axios from 'axios'


import toast from 'react-hot-toast'
import { useEffect } from 'react'




export default function Wishlist() {




    const [wishListDetails, setWishListDetails] = useState(null);
    let { getWishListItems, removeWishListItem, wishList, setWishList } = useContext(WishlistContext);
    let { addProductToCart } = useContext(Cartcontext);

    async function getWishList() {
        let res = await getWishListItems();
        setWishListDetails(res.data);
    }

    async function removeItem(productId) {
        let res = await removeWishListItem(productId);
        setWishListDetails(res.data);
        console.log(res)
    }


    async function addProduct(productId) {
        let res = await addProductToCart(productId);
        await removeItem(productId);
        if(res.data.status === 'success') {
            toast.success('Product added successfully to your cart.', {
                duration: 1500,
            });
        }
        else {
            toast.error('Error adding product to your cart.', {
                duration: 1500,
            });
        }
    }

    useEffect(() => {
        getWishList();
        // console.log(wishListDetails);
    }, [wishListDetails]);

  return (
    <>
  <div className="relative overflow-x-auto bg-gray-50 shadow-md sm:rounded-lg mt-12 p-6">
  <h2 className="text-2xl font-semibold capitalize mb-6 text-gray-800">My Wish List</h2>
  <table className="w-full text-xl text-start rtl:text-right text-black">
    <tbody>
      {wishListDetails?.data?.length > 0 ? (
        wishListDetails?.data?.map((product) => (
          <tr key={product.id} className="border-b flex flex-wrap sm:flex-nowrap">
            <td className="sm:w-1/2 md:w-2/6 xl:w-1/6 py-4">
              <img
                src={product.imageCover}
                className="w-full aspect-[1/1] object-contain rounded-lg shadow-lg"
                alt={product.title}
              />
            </td>
            <td className="sm:w-1/2 md:w-4/6 xl:w-5/6 flex flex-col sm:flex-row flex-wrap sm:flex-nowrap justify-between items-center py-4">
              <div className="md:w-2/3 flex flex-col justify-center">
                <div className="font-semibold text-gray-900">{product.title}</div>
                <div className="text-lg text-accent">{product.price} EGP</div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-sm mt-2 text-start hover:cursor-pointer text-red-600 flex items-center"
                >
                  <i className="fa fa-trash mr-2"></i>
                  <span>Remove</span>
                </button>
              </div>
              <div className="md:w-1/3 mt-4 sm:mt-0 flex justify-center items-center">
                <button
                  onClick={() => addProduct(product.id)}
                  className="bg-[#4fa74f] text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2" className="font-medium text-xl text-center py-6 text-gray-600">
            No Items yet.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

</>
  )
}
