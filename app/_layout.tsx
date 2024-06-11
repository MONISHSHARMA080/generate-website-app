import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React  from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePostHog, PostHogProvider } from 'posthog-react-native'


export default function HomeLayout() {
  

  const queryClient = new QueryClient({});

    return (
      <>
  
       <QueryClientProvider client={queryClient}>     
        <PaperProvider>
          <SafeAreaView style={{flex:1, backgroundColor:"#010c1c"}}>
          <PostHogProvider apiKey="phc_FaxP3jV1XlJNVzFW98VXtcj0v11PJUPXocegXioVpOq" options={{
            host: "https://us.i.posthog.com",
        }}>

              <Slot />
          </PostHogProvider>
          </SafeAreaView>
        </PaperProvider> 
       </QueryClientProvider>
       
      </>
    )
 

  
}
