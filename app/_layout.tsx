import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
// import { getItem } from 'expo-secure-store';
import React, { useEffect } from 'react';
import JWTStore from './store';
import { vexo } from 'vexo-analytics';
import axios from 'axios';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeLayout() {
  
  // const pathname = usePathname();
  // const params = useGlobalSearchParams();
  // const {JWT,setJWT} = JWTStore()
  // Track the location in your analytics provider here.

  if (!__DEV__) {

    vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY);

  }
  // if(__DEV__){
  //   console.log("\n Running in the dev mode");
    
  // }

  const queryClient = new QueryClient({});


    return (
      <>
  
       <QueryClientProvider client={queryClient}>     
        <PaperProvider>
          <SafeAreaView style={{flex:1, backgroundColor:"#010c1c"}}>
              <Slot />
          </SafeAreaView>
        </PaperProvider> 
       </QueryClientProvider>
       
      </>
    )
 

  
}