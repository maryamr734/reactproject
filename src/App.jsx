import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserContextProvider from './Context/Usercontext'; // Correct import
import CounterContextProvider from './Context/Countercontext';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Wishlist from './components/Wishlist/Wishlist';
import Brands from './components/Brands/Brands';
import 'font-awesome/css/font-awesome.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './Context/Cartcontext';  // Make sure you import this
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Checkout from './components/Checkout/Checkout';
import { Toaster } from 'react-hot-toast';

import WishlistContextProvider from './Context/Wishlistcontext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AllOrders from './components/Order/Order';


ResetPassword
AllOrders
VerifyResetCode

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'details/:id/:category', element: <ProtectedRoute><Details /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'forgetpassword', element: <ProtectedRoute><ForgetPassword /></ProtectedRoute> },
        { path: 'verifyresetcode', element: <ProtectedRoute><VerifyResetCode /></ProtectedRoute> },
        { path: 'resetpassword', element: <ProtectedRoute><ResetPassword /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      
        { path: 'login', element: <Login /> },
        { path: 'logout', element: <Logout /> },
        { path: 'register', element: <Register /> }
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CounterContextProvider>
          <CartContextProvider>
     <WishlistContextProvider>
     <RouterProvider router={router}  />

              <Toaster />
           
            <ReactQueryDevtools initialIsOpen={false} />
            </WishlistContextProvider>
          </CartContextProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
