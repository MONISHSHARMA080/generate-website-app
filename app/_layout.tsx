import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot , Redirect, Stack  } from 'expo-router';
import React from 'react';

export default function HomeLayout() {

  const queryClient = new QueryClient()

  

  return (
    <>

     <QueryClientProvider client={queryClient}>      
        <Slot />
     </QueryClientProvider>
     
    </>
  );
}