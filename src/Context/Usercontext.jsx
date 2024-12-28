import React, { createContext, useState, useEffect } from 'react';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';

import axios from 'axios';
import VerifyResetCode from '../components/VerifyResetCode/VerifyResetCode';
import ResetPassword from '../components/ResetPassword/ResetPassword';
axios
ForgetPassword

// Create a Context for the user token
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // Initialize userToken state from localStorage if available
  const [userToken, setUserToken] = useState(localStorage.getItem('UserToken') || null);
  const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  // Function to update the userToken in context
  const setuserlogin = (token) => {
    setUserToken(token);
  };

  // Function to log out the user
  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('UserToken');
  };

  function handleUserAuth(endPoint, formValues, navigate, navigatePath, method = 'post') {
    setIsLoading(true);
    axios({
            method: method,
            url: `https://ecommerce.routemisr.com/api/v1/auth${endPoint}`,
            data: formValues
        })
        .then((apiResponse) => {
            if (apiResponse && apiResponse.data) {
                if (['/logout', '/login' , '/resetpassword'].includes(endPoint)) {
                  setuserlogin(apiResponse.data.token);
                    localStorage.setItem('UserToken', apiResponse.data.token);
                    localStorage.setItem('NumOfCartItems', 0);
                }
                if(['/forgetpassword' , '/verifyresetcode'].includes(endPoint) && apiResponse.data.statusMsg === 'success') {
                    toast.success(apiResponse.data.message, {
                        duration: 1500,
                    });
                }
                if (navigate && navigatePath) {
                    navigate(navigatePath);
                }
            } else {
                setApiError(apiResponse?.response?.data?.message || 'Unexpected error');
            }
            setIsLoading(false);
        })
        .catch((apiResponse) => {
            setIsLoading(false);
            setApiError(apiResponse?.response?.data?.message || 'An error occurred');
        })
}










  return (
    <UserContext.Provider value={{ userToken, setuserlogin, logout , handleUserAuth , setApiError,setIsLoading,isLoading,apiError}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
