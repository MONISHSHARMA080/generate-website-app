import { Slot , Redirect, Stack  } from 'expo-router';
import { getItem } from 'expo-secure-store';
import React from 'react';

export default function HomeLayout() {

    return (
      <>
          <Slot />
      </>
    )
}