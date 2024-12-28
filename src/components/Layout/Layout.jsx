import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
Outlet
export default function Layout() {
  return (
   <>
   <Navbar/>

<div className='container p-15 text-center'>

<Outlet></Outlet>


</div>





   
   
   </>
  )
}
