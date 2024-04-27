import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot , Redirect, Stack  } from 'expo-router';
import { getItem } from 'expo-secure-store';
import React from 'react';

{/* <script src="http://localhost:8097"></script> */}

export default function HomeLayout() {

  const queryClient = new QueryClient()

    return (
      <>
  
       <QueryClientProvider client={queryClient}>      
          <Slot />
       </QueryClientProvider>
       
      </>
    )
 

  
}