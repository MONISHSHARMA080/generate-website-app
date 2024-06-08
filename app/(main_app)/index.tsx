import * as React from 'react';
import HomeScreen from '@/components/Home/HomeScreen';
import SignInScreen from '@/components/auth/SignInScreen';
import { Redirect } from 'expo-router';
import JWTStore from '../store';
import { useEffect } from 'react';

export default function TabOneScreen() {
  const { JWT,setJWT } = JWTStore();

  if (JWT) {
    console.log("about to go to home page");
    
    return <Redirect href={'/(main_app)/root_app'} />;
    
  }
  else {
    console.log("about to go to auth page");
    return (
      // Render either <HomeScreen /> or <SignInScreen /> based on your requirements
      <SignInScreen />
    );
  }
}