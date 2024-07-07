import React, { useState } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';
import DrawerToShowPreviousSites from '@/components/Home/Drawer';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import JWTStore from '@/app/store';

export default function index() {
 
  const { openDrawer, setOpenDrawer } = JWTStore();
  const modalTranslateX = useSharedValue(0);
  const [isActive, setIsActive] = useState(false);


  React.useEffect(()=>{
    console.log("\n\n ------ openDrawer, setOpenDrawer from index.tsx-",openDrawer, setOpenDrawer);
    
  },[isActive,setIsActive, openDrawer, setOpenDrawer])

  React.useEffect(() => {
    if (openDrawer) {
      console.log(" we have the drawer in the index.tsx");
      
      modalTranslateX.value = withTiming(0, { duration: 300 });
    } else {
      modalTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [
    openDrawer,
     modalTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: modalTranslateX.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen
        isActive={isActive}
        setIsActive={(value: boolean) => setIsActive(value)}      />
      {/* <Modal visible={openDrawer} transparent={true} onRequestClose={()=>setOpenDrawer(false) }>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <DrawerToShowPreviousSites stateToToogleTheDrawerOn={openDrawer} toogleDrawer={()=>setOpenDrawer(!openDrawer)} />
        </Animated.View>
      </Modal> */}
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