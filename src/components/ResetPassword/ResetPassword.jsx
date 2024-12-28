import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';  // Fixing the import for Yup
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ResetPassword() {
  const navigate = useNavigate();

  // Password regex for validation
  const passwordRegex = /^[A-Z][a-z]{4,10}$/;

  // Function to handle the reset password process
  async function ResetPass(values) {
    const ToastId = toast.loading("Waiting......");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Reset Password successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(ToastId);
    }
  }

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex, 
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number, and one special character"
      ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: ResetPass,
  });

  return (
    <>
      <h1 className="text-xl ml-3 text-slate-700 font-semibold mb-5">
        Reset your account password
      </h1>
      <form className="space-y-3 ml-3" onSubmit={formik.handleSubmit}>
        <div className="email">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
              * {formik.errors.email}
            </p>
          )}
        </div>
        <div className="password">
          <input 
            type="password" 
            placeholder="Enter password" 
            className="form-control w-full"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="newPassword"
            value={formik.values.newPassword}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
              * {formik.errors.newPassword}
            </p>
          )}
        </div>
        <button 
          type="submit" 
          className="w-fit btn font-bold uppercase bg-transparent border-2 border-primary-600 hover:text-white transition-all text-slate-400 hover:bg-primary-800"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
