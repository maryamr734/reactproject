import React, { useEffect, useState, useContext } from 'react'
import { Formik, useFormik, yupToFormErrors } from 'formik'


import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup';

import toast from 'react-hot-toast';
import axios from 'axios';

axios
export default function VerifyResetCode() {


    const navigate = useNavigate();


 
    async function ResetCode(values) {
        const toastid = toast.loading("checking....")
       try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            method:"POST",
            data:values,
        }
            const{data} = await axios.request(options);
            if(data.status === "Success") {
                toast.success("Success")
                setTimeout(() => {
                    navigate("/resetpassword")
                }, 2000);
            }
            console.log(data)
       } 
       catch (error) {
        console.log(error)
       }
       finally {
        toast.dismiss(toastid)
       }
     }
    


     const formik = useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:ResetCode,
    })



  return (
    <>
    <h1 className="text-2xl font-semibold text-gray-700 mb-6">Reset Your Account Password</h1>
    <form className="mt-5 space-y-4" onSubmit={formik.handleSubmit}>
      {/* Reset Code Input */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Enter Reset Code" 
          className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg text-gray-700 placeholder-gray-400"
          name="resetCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resetCode}
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <p className="text-sm text-red-500 mt-2">{formik.errors.resetCode}</p>
        )}
      </div>
  
      {/* Submit Button */}
      <div>
        <button 
          type="submit"
          className="w-full py-3 mt-4 text-lg font-semibold text-white bg-green-600 rounded-lg border-2 border-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          Verify
        </button>
      </div>
    </form>
  </>
  
  )
}
