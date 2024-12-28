import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function Brands() {
  // Function to fetch brands
  const getBrands = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  };

  // Updated useQuery to use the object signature format
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['brands'], // The query key should be an array
    queryFn: getBrands,  // The function to fetch data
  });

  // Log the fetched data for debugging
  console.log(data?.data.data);

  // Extract the products from the response
  const products = data?.data.data;

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Error state
  if (isError) return <div>Error loading brands</div>;

  // Return JSX to display the brands
  return (
    <div className="container mx-auto p-5">
  <h1 className="font-extrabold text-[#4fa74f] text-center">
All BRANDS
</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => {
        const { image, _id, name } = item;
        return (
          <div key={_id} className="relative rounded-lg overflow-hidden shadow-lg group">
            <Link to={`/product/${_id}`}>
              <img
                src={image}
                className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105"
                alt={name}
              />
            </Link>
          </div>
        );
      })}
    </div>
  </div>
  
  );
}

export default Brands;
