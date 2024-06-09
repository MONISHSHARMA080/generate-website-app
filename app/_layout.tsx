import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
// import { getItem } from 'expo-secure-store';
import React, { useEffect } from 'react';
// import JWTStore from './store';
import { vexo } from 'vexo-analytics';
// import axios from 'axios';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';



export default function HomeLayout() {
  
  // const pathname = usePathname();
  // const params = useGlobalSearchParams();
  // const {JWT,setJWT} = JWTStore()
  // Track the location in your analytics provider here.
  // if (Boolean(process.env.EXPO_ PUBLIC_PRODUCTION)) {
    // console.log("\n Running in the dev mode -->> ",Constants.expoConfig.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID);
    // console.log("\n Running in the dev mode -->> ",Const ants.manifest2.extra.expoClient.env);
    // console.log("\n Running in the dev mode -->> ",Constants.expoConfig);

  //   

  // }
  if(!__DEV__){
    vexo("d2fa3b3d-2a9c-4173-b598-85d5b3906bf7");
  }

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
