import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React  from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



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
