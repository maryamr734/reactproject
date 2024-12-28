import React from 'react'
import { useQuery } from '@tanstack/react-query'
export default function useProducts() {



    




  function getRecent(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    
    
      }
    
    
      let responseObject= useQuery( 
        {
          queryKey:['recentProdcuts'],
          queryFn:getRecent,
     staleTime:80000,
         
        }
       
    )
    
  return responseObject
}
