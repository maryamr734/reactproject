import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/Usercontext';  // Import UserContext

export default function ProtectedRoute(props) {
  const { userToken } = useContext(UserContext);  // Get the userToken from context

  // If the userToken exists, render the protected children; otherwise, redirect to login page
  if (userToken) {
    return props.children; 
  } else {
    return <Navigate to="/login" />;  // Redirect to login if not logged in
  }
}
