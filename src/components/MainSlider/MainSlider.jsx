import React from 'react';
import main from '../../assets/images/main.jpg';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import Slider from "react-slick";

const MainSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For tablets and small screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // For very small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        {/* Main Slider */}
        <div className="w-full md:w-2/3">
          <Slider {...settings}>
            <div className="relative w-full h-72 md:h-96">
              <img
                src={main}
                className="object-cover w-full h-full rounded-lg"
                alt="Main Image"
              />
            </div>
            <div className="relative w-full h-72 md:h-96">
              <img
                src={slide3}
                className="object-cover w-full h-full rounded-lg"
                alt="Slide 3"
              />
            </div>
          </Slider>
        </div>

        {/* Smaller images */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="relative w-full h-72 md:h-96">
            <img
              src={slide1}
              className="object-cover w-full h-full rounded-lg"
              alt="Slide 1"
            />
          </div>
          <div className="relative w-full h-72 md:h-96">
            <img
              src={slide2}
              className="object-cover w-full h-full rounded-lg"
              alt="Slide 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
