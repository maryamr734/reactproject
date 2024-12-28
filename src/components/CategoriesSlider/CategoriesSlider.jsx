import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { boolean } from 'yup';

axios
useEffect
useState

export default function CategoriesSlider() {



  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay:true
  }

  const [Categories, setCategories] = useState([]);

  // Function to fetch the recent products
  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        console.log(data.data); 
        setCategories(data.data); 
      })
      .catch((error) => {
        console.error('Error fetching recent products:', error);
      });
  }

  useEffect(() => {
getCategories();
  },[])




  return (
   <>
<div className="py-5 mt-20"> {/* Adding mt-20 to push the content down from the navbar */}
  <Slider {...settings}>
    {Categories.map((category) => (
      <div key={category.id}>
        <img className="category-img w-full" src={category.image} alt={category.name} />
        <h3 className="font-light mt-2 text-center">{category.name}</h3>
      </div>
    ))}
  </Slider>
</div>





   </>
  )
}
