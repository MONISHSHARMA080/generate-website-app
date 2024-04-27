import { Slot , Redirect, Stack  } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getItem } from 'expo-secure-store';
import { useStore } from 'zustand';
import store from '../store';

export default function AppLayout() {
  const { JWT } = useStore(store);    
  console.log("JWT form zustand ",JWT);
  
  // useEffect for that using zustand's value as dependecy
  
 

  if (JWT){
    return (
      <>
          <Slot />
      </>
    );
  }
  else if (!JWT){

    
    return( <Redirect href="/sign-in" /> )
  }
}