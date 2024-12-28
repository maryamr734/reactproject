import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; // Correct import
import { Link } from 'react-router-dom';

// Function to fetch categories
function getCategories() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}

function Categories() {
  // Use the object-based query signature
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['Categories'], // The query key (used to identify the query)
    queryFn: getCategories,   // The function that fetches the data
  });

  // Log the fetched data for debugging
  console.log(data?.data.data);

  // Extract the products from the response
  const products = data?.data.data;

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (isError) return <div>Error loading categories</div>;

  return (
    <div className="container mx-auto p-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => {
        const { image, _id, name } = item;
        return (
          <div key={_id} className="relative rounded-lg overflow-hidden shadow-lg group">
            <Link>
              <img
                src={image}
                className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
                alt={name}
              />
            </Link>
            <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <h5 className="text-white text-lg font-semibold capitalize">{name}</h5>
            </div>
            {/* Category name below the image */}
            <div className="text-center mt-2">
              <h5 className="text-[#4fa74f] text-sm font-medium capitalize">{name}</h5>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  
  );
}

export default Categories;
