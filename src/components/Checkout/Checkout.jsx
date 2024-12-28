import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Cartcontext } from '../../Context/Cartcontext';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { checkOut } = useContext(Cartcontext);

  // Handle CheckOut 
  async function handleCheckout(cartId, url) {
    setLoading(true);
    try {
      const { data } = await checkOut(cartId, url, formik.values);
      if (data.status === 'success') {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error("Checkout Error: ", error);
      setLoading(false);
    }
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: () => handleCheckout("6768433c206509189948893a", "http://localhost:3000"),
  });

  return (
    <div className="py-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Checkout Now</h2>
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      
      {/* Details Input */}
      <div className="relative">
        <input
          type="text"
          name="details"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your name"
        />
        {formik.errors.details && formik.touched.details && (
          <p className="text-sm text-red-500 mt-2">{formik.errors.details}</p>
        )}
      </div>
  
      {/* Phone Input */}
      <div className="relative">
        <input
          type="tel"
          name="phone"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your phone"
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-sm text-red-500 mt-2">{formik.errors.phone}</p>
        )}
      </div>
  
      {/* City Input */}
      <div className="relative">
        <input
          type="text"
          name="city"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your city"
        />
        {formik.errors.city && formik.touched.city && (
          <p className="text-sm text-red-500 mt-2">{formik.errors.city}</p>
        )}
      </div>
  
      {/* Submit Button */}
      <div className="flex items-center">
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Pay Now'}
        </button>
      </div>
    </form>
  </div>
  
  );
}