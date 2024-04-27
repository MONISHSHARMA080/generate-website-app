import * as React from 'react';
import HomeScreen from '@/components/Home/HomeScreen';
import SignInScreen from '@/components/auth/SignInScreen';
import { Redirect } from 'expo-router';
import JWTStore from '../store';

export default function TabOneScreen() {
  const { JWT,setJWT } = JWTStore();

  
  if (JWT) {
    return <Redirect href={'/(main_app)/root_app'} />;
  }

  return (
    // Render either <HomeScreen /> or <SignInScreen /> based on your requirements
    <SignInScreen />
  );
}