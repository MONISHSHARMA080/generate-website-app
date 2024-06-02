import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '@/components/Home/HomeScreen'
import DrawerToShowPreviousSites from '@/components/Home/Drawer'

export default function index() {
  return (
    <>
      <HomeScreen />
      {/* <DrawerToShowPreviousSites 
        stateToToggleItOn={true}
         /> */}
    </>
  )
}