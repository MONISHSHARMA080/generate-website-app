import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot , Redirect, Stack,usePathname, useGlobalSearchParams,  } from 'expo-router';
import { getItem } from 'expo-secure-store';
import React, { useEffect } from 'react';
import JWTStore from './store';
import { vexo } from 'vexo-analytics';

export default function HomeLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const {JWT} = JWTStore()

  // Track the location in your analytics provider here.
  if (!__DEV__) {
    vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY);
  }

  useEffect(() => {
    // analytics.track({ pathname, params });
    console.log(`a change occured in the ${pathname}  ---- ${ params} `);
    
  }, [pathname, params]);
  const queryClient = new QueryClient()

    return (
      <>
  
       <QueryClientProvider client={queryClient}>      
          <Slot />
       </QueryClientProvider>
       
      </>
    )
 

  
}