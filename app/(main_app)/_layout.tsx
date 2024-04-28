import { Redirect, Slot, useGlobalSearchParams, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import JWTStore from '../store';

export default function RootLayout() {
 
  return <Slot />;
}