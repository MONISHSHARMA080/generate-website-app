import React, { useState } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';
import DrawerToShowPreviousSites from '@/components/Home/Drawer';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import JWTStore from '@/app/store';

export default function index() {
 
  const { openDrawer, setOpenDrawer } = JWTStore();

  const modalTranslateX = useSharedValue(0);

  React.useEffect(() => {
    if (openDrawer) {
      modalTranslateX.value = withTiming(0, { duration: 300 });
    } else {
      modalTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [openDrawer, modalTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: modalTranslateX.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen  />
      <Modal visible={openDrawer} transparent={true} onRequestClose={()=>setOpenDrawer(false) }>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <DrawerToShowPreviousSites stateToToogleTheDrawerOn={openDrawer} toogleDrawer={()=>setOpenDrawer(false)} />
        </Animated.View>
      </Modal>
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