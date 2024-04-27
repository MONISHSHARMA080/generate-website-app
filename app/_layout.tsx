import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot , Redirect, Stack  } from 'expo-router';
import { getItem } from 'expo-secure-store';
import React from 'react';

export default function HomeLayout() {

  const queryClient = new QueryClient()

  if(getItem("JWT")){
    return (
      <>
  
       <QueryClientProvider client={queryClient}>      
          <Slot />
       </QueryClientProvider>
       
      </>
    )
  }
  else{
    return <Redirect href={'/(main_app)/'} />
  }

  
}