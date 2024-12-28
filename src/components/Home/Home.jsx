import React, { useContext, useEffect, useState } from 'react'
import { CounterContext } from '../../Context/Countercontext'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from  '../MainSlider/MainSlider'

useContext
useEffect
useState


export default function Home() {


  let {Counter , setCounter } = useContext(CounterContext)
  return (
    <>
    <MainSlider />
<CategoriesSlider />
   <RecentProducts/>
   
   </>
  )
}
