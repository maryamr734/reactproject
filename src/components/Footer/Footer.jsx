

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Section - Brand Name */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-green-400">
              ORI
              <br />
              GIN
            </h2>
            <p className="mt-3 text-xl font-light">FOR EVERYONE BUT NOT ANYONE</p>
          </div>

          {/* Middle Section - Links */}
          <div className="flex flex-wrap justify-between gap-8">
            {/* Product Section */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">PRODUCT</h3>
              <ul className="space-y-2 text-sm">
                <li>Jackets</li>
                <li>Shirts</li>
                <li>Dresses</li>
                <li>Outwears</li>
                <li>Hats</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">BUYING</h3>
              <ul className="space-y-2 text-sm">
                <li>Shop</li>
                <li>Terms of Use</li>
                <li>Privacy</li>
                <li>How it Works</li>
                <li>Customer Service</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">SOCIAL</h3>
              <ul className="space-y-2 text-sm">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">JOIN OUR COMMUNITY</h2>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                placeholder="EMAIL ADDRESS"
              />
              <i
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 cursor-pointer fas fa-paper-plane"
              ></i>
            </div>
          </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;