import { Slot , Redirect, Stack  } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getItem } from 'expo-secure-store';

export default function AppLayout() {
  const[a , seta] = useState(getItem("JWT"))


  
  if (a){
    console.log("WE have JWT",a);
    return (
      <>
  
          <Slot />
       
      </>
    );
  }
  else if (!a){
    console.log("we dont have JWT");
    return( <Redirect href="/sign-in" /> )
  }
}