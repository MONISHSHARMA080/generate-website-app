
import * as React from 'react';
import HomeScreen from '@/components/Home/HomeScreen';
import SignInScreen from '@/components/auth/SignInScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function TabOneScreen() {
  

  return (
    // <HomeScreen />

     
      <SignInScreen />
    
  )
}

