import React, { useState } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';
import DrawerToShowPreviousSites from '@/components/Home/Drawer';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function index() {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const modalTranslateX = useSharedValue(0);

  React.useEffect(() => {
    if (showDrawer) {
      modalTranslateX.value = withTiming(0, { duration: 300 });
    } else {
      modalTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [showDrawer, modalTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: modalTranslateX.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen toggleDrawer={toggleDrawer} />
      <Modal visible={showDrawer} transparent={true} onRequestClose={toggleDrawer}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <DrawerToShowPreviousSites stateToToogleTheDrawerOn={showDrawer} toogleDrawer={toggleDrawer} />
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