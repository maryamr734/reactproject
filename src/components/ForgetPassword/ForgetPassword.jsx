import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null); // Manage API errors here

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => forgetpass(values),
  });

  // API call function for password reset
  async function forgetpass(values) {
    const toastid = toast.loading('Waiting.....');
    setIsLoading(true);
    setApiError(null); // Reset any previous API errors

    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        method: 'POST',
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.statusMsg === 'success') {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/verifyresetcode');
        }, 2000);
      } else {
        setApiError(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      setApiError('An error occurred while processing your request.');
    } finally {
      toast.dismiss(toastid);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='py-6 mx-auto'>
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}
        <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-6 capitalize'>
          Please enter your Email
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Enter Your Email :
            </label>
          </div>

          {/* Form validation error message */}
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}

          <div className='flex justify-between items-center'>
            <button
              type="submit"
              className={`btn-outline-accent ${formik.dirty && formik.isValid ? 'enabled-btn' : 'disabled-btn'}`}
              disabled={!(formik.dirty && formik.isValid) || isLoading}
            >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
