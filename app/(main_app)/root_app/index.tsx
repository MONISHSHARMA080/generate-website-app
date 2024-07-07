import React, { useState } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';
import DrawerToShowPreviousSites from '@/components/Home/Drawer';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import JWTStore from '@/app/store';

export default function index() {
 
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen    />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});