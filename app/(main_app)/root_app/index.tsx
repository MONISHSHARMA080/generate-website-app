import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import HomeScreen from '@/components/Home/HomeScreen';
import DrawerToShowPreviousSites from '@/components/Home/Drawer';

export default function index() {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen toggleDrawer={toggleDrawer} />
      <Modal
        visible={showDrawer}
        transparent={true}
        onRequestClose={toggleDrawer}
        animationType='none'
      >
        <DrawerToShowPreviousSites stateToToogleTheDrawerOn={showDrawer} toogleDrawer={toggleDrawer} />
      </Modal>
    </View>
  );
}