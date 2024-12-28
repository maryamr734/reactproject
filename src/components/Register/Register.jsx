import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Usercontext'; // Correctly import UserContext

export default function Register() {
  const { setuserlogin } = useContext(UserContext); // Accessing setuserlogin correctly
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name must be at most 10 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z]{4,10}$/, 'Password must be valid')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required')
  });

  // Form submission handler
  const handleRegister = async (values) => {
    setLoading(true);
    setApiError(""); // Clear previous errors

    try {
      // API call for registration
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);

      if (response.data.message === 'success') {
        localStorage.setItem('UserToken', response.data.token); // Save token to localStorage
        setuserlogin(response.data.token); // Set the login state using setuserlogin
        navigate('/login'); // Redirect to login page
      } else {
        setApiError('Registration failed. Please try again.'); // Handle API error
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || 'An error occurred during registration');
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <form className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg" onSubmit={formik.handleSubmit}>
  
    {apiError && (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
        <span>{apiError}</span>
      </div>
    )}
  
    {/* Name field */}
    <div className="mb-5">
      <input
        type="text"
        name="name"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your name"
      />
      {formik.errors.name && formik.touched.name && (
        <div className="text-red-600 text-sm">{formik.errors.name}</div>
      )}
    </div>
  
    {/* Email field */}
    <div className="mb-5">
      <input
        type="email"
        name="email"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your email"
      />
      {formik.errors.email && formik.touched.email && (
        <div className="text-red-600 text-sm">{formik.errors.email}</div>
      )}
    </div>
  
    {/* Phone field */}
    <div className="mb-5">
      <input
        type="text"
        name="phone"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your phone"
      />
      {formik.errors.phone && formik.touched.phone && (
        <div className="text-red-600 text-sm">{formik.errors.phone}</div>
      )}
    </div>
  
    {/* Password field */}
    <div className="mb-5">
      <input
        type="password"
        name="password"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your password"
      />
      {formik.errors.password && formik.touched.password && (
        <div className="text-red-600 text-sm">{formik.errors.password}</div>
      )}
    </div>
  
    {/* Confirm password field */}
    <div className="mb-5">
      <input
        type="password"
        name="rePassword"
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Confirm your password"
      />
      {formik.errors.rePassword && formik.touched.rePassword && (
        <div className="text-red-600 text-sm">{formik.errors.rePassword}</div>
      )}
    </div>
  
    {/* Submit button */}
    <button
      type="submit"
      className="w-full py-3 bg-[#4fa74f] text-white rounded-md hover:bg-[#458d44] focus:ring-4 focus:ring-green-300 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>
  
  );
}
