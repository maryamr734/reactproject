import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/Usercontext'; 
import ForgetPassword from '../ForgetPassword/ForgetPassword';




export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Access the setuserlogin function from context
  const { setuserlogin } = useContext(UserContext);

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z]{4,10}$/, 'Password must be valid')
      .required('Password is required'),
  });

  // Form submission handler
  const handleLogin = async (values) => {
    setLoading(true);
    setApiError(""); // Clear previous errors

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

      if (response.data.message === 'success') {
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('UserToken', token);

        // Update the userToken in context
        setuserlogin(token);

        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <form className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg" onSubmit={formik.handleSubmit}>
    {apiError && (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
        <span>{apiError}</span>
      </div>
    )}
  
    <div className="mb-5">
      <input
        type="email"
        name="email"
        className="w-full border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your email"
      />
      {formik.errors.email && formik.touched.email && (
        <div className="text-red-600 text-sm">{formik.errors.email}</div>
      )}
    </div>
  
    <div className="mb-5">
      <input
        type="password"
        name="password"
        className="w-full border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter your password"
      />
      {formik.errors.password && formik.touched.password && (
        <div className="text-red-600 text-sm">{formik.errors.password}</div>
      )}
    </div>
  
    <div className="flex flex-col items-center">
      <button
        type="submit"
        className="w-full py-3 bg-[#4fa74f] text-white rounded-lg hover:bg-[#458d44] focus:ring-4 focus:ring-green-300 active:bg-[#417f3e]"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Login'}
      </button>
  
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account yet?{' '}
        <span className="font-semibold text-blue-600">
          <Link to="/register">REGISTER NOW</Link>
        </span>
      </p>
  
      <p className="mt-2 text-center text-sm text-gray-600">
        <span className="font-semibold text-blue-600 hover:text-blue-500">
          <Link to="/forgetpassword">Forgot Password?</Link>
        </span>
      </p>
    </div>
  </form>
  

  );
}
