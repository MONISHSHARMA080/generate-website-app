import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React  from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';


export default function HomeLayout() {
  

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
