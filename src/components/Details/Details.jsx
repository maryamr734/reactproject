import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { WishlistContext } from '../../Context/Wishlistcontext';
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';

export default function Details() {
  let { id, category } = useParams(); // Get the product ID and category from the URL params

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [ProductDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [isWishListed, setIsWishListed] = useState(false); // Track wishlist status

  // Context for Cart and Wishlist
  let { addProductToCart, setNumOfCartItems } = useContext(Cartcontext);
  let { addToWishList, removeWishListItem, getWishListItems, wishList } = useContext(WishlistContext);

  // Fetch product details by product ID
  const getProductDetails = (id) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response.data.data);  // Assuming the response data is in 'data.data'
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError('There was an error fetching the product details.');
        setLoading(false);
      });
  };

  // Fetch related products based on category
  const getRelatedProducts = (category) => {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')  // Fetch all products
      .then((response) => {
        let allProducts = response.data.data;  // Assuming the response data is in 'data.data'
        // Filter products by category
        let related = allProducts.filter((product) => product.category.name === category);
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.error('Error fetching related products:', error);
        setError('There was an error fetching related products.');
        setLoading(false);
      });
  };

  // Add product to cart
  const addProduct = async (productId) => {
    let res = await addProductToCart(productId);
    if (res.data.status === 'success') {
      toast.success('Product added successfully to your cart.', { duration: 1500 });
      setNumOfCartItems(res.data.numOfCartItems);
    } else {
      toast.error('Error adding product to your cart.', { duration: 1500 });
    }
  };

  // Toggle wishlist status for a product
  const toggleWishList = async (productId) => {
    setIsWishListed(!isWishListed);
    if (isWishListed) {
      let res = await removeWishListItem(productId);
      if (res.data.status === 'success') {
        toast.success('Product removed from your wishlist.', { duration: 1500 });
      } else {
        toast.error('Error removing product from your wishlist.', { duration: 1500 });
      }
    } else {
      let res = await addToWishList(productId);
      if (res.data.status === 'success') {
        toast.success('Product added to your wishlist.', { duration: 1500 });
      } else {
        toast.error('Error adding product to your wishlist.', { duration: 1500 });
      }
    }
  };

  // Fetch product and related products on component mount
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="row mt-8 mx-auto max-w-6xl">
        {/* Left side - Product Image */}
        <div className="w-1/4 mt-24">
          <Slider {...settings}>
            {ProductDetails?.images?.map((src, index) => (
              <div key={index}>
                <img src={src} alt={ProductDetails?.title} className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold text-gray-950">{ProductDetails?.title}</h1>
          <p className="text-gray-600 mt-4 font-light leading-relaxed">{ProductDetails?.description}</p>

          <div className="flex justify-between items-center mt-6">
            <span className="text-2xl font-semibold text-gray-800">{ProductDetails.price} EGP</span>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">{ProductDetails.ratingsAverage}</span>
              <i className="fas fa-star text-yellow-500 ml-1"></i>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => addProduct(ProductDetails.id)}
              className="bg-green-600 text-white font-semibold py-2 px-8 rounded-md hover:bg-green-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => toggleWishList(ProductDetails.id)}
              className={isWishListed ? 'text-black-mut' : 'text-red-500'}
            >
              <i className={`fa-solid fa-heart text-2xl ${isWishListed ? 'text-red-500' : 'text-black-mut'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-950">Related Products</h2>
        {RelatedProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-6 mt-4">
            {RelatedProducts.map((product) => (
              <div key={product.id} className="product bg-white rounded-lg shadow-lg overflow-hidden">
                <Link to={`/details/${product.id}/${product.category.name}`}>
                  {/* Product Image */}
                  <img
                    className="w-full h-56 object-cover"
                    src={product.imageCover}
                    alt={product.title}
                  />

                  <div className="p-4">
                    <span className="block font-light text-green-600 text-sm">{product.category.name}</span>
                    <h3 className="text-lg font-medium text-gray-800 mt-2">{product.title}</h3>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-semibold text-gray-800">{product.price} EGP</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">{product.ratingsAverage}</span>
                        <i className="fas fa-star text-yellow-500 ml-1"></i>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex justify-between items-center px-3 mt-3">
                    <button onClick={() => addProduct(product.id)} className="btn mx-auto">Add To Cart</button>
                    <button onClick={() => toggleWishList(product.id)} className={isWishListed ? 'text-black-mut' : 'text-red-500'}>
                      <i className="fa-solid fa-heart text-2xl"></i>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>No related products found.</div>
        )}
      </div>
    </>
  );
}
