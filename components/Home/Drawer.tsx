import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Linking, Alert } from 'react-native';
import { Button, Drawer,Text } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import PillShapeButtonForDrawer from './buttons/pillShapeButtonForDrawer';
import { FlashList } from '@shopify/flash-list';
import JWTStore from '@/app/store';


interface propsInThisComponent{
  stateToToogleTheDrawerOn:Boolean,
  toogleDrawer
}
export default function DrawerToShowPreviousSites(
    { stateToToogleTheDrawerOn, toogleDrawer}:propsInThisComponent,
    
        ) {
          // stateToToggleItOn can be the reactQuery state too that way we can get fetch when opened true and may be store the previous state in the
          // storage and zustand
          // const [stateToToggleItOn, setstateToToggleItOn]= useState(stateToToogleTheDrawerOn)
          
          // useEffect(()=>{
            //   setTimeout(()=>{console.log("stateToToggleItOn-- ",stateToToggleItOn);
            //         setstateToToggleItOn(true)
            // }, 2700)
            // },[stateToToggleItOn])

  const {  sitePromptArray, User_Name_from_Req } = JWTStore();
  const [drawerOnTheSide, setDrawerOnTheSide] = useState('');
  const drawerTranslateX = useSharedValue(-Dimensions.get('window').width /2);

  React.useEffect(() => {
    if (stateToToogleTheDrawerOn) {
      drawerTranslateX.value = withTiming(0, { duration: 110 });
    } else {
      drawerTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [stateToToogleTheDrawerOn, drawerTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drawerTranslateX.value }],
      // zIndex: 100, 
    };
  });

  console.log("\n\n in the drawer -->>",sitePromptArray, " -- type of sitePromptArray ",typeof sitePromptArray, " --sitePromptArray[0]",sitePromptArray[0],"\n\n");


  return (
    // <View className="bg-slate-700 flex-1">
    <Animated.View
      style={[
        {
          // height: '100%',
          height: Dimensions.get('window').height -14,
          backgroundColor: "#011f4a",
          borderRadius: 45,
          width: Dimensions.get('window').width -20,
          alignSelf:'center',
          zIndex:100
        },
        animatedStyle,
      ]}
      className="m-4"
    >

        <View className="justify-end pb-4" style={{ height: '100%' }}>
          <Text className=' text-2xl self-center p-3 text-white'>Previous  website</Text>
          {sitePromptArray[0].length > 0 ? (
          <FlashList
            data={sitePromptArray}
            renderItem={({ item }) => (
              <View style={{ borderRadius: 20, overflow: 'hidden' }}>
                <PillShapeButtonForDrawer
                  textToBeDisplayed={item}
                  colorOnTheBorderAndInTheText={'#2b87ff'}
                  function_to_run_on_touch={async() => {
                    console.log("clicked on -->",process.env.EXPO_PUBLIC_SVELTE_URL+"/"+User_Name_from_Req+"/"+item);
                    
                    let a = await Linking.canOpenURL(process.env.EXPO_PUBLIC_SVELTE_URL+"/"+User_Name_from_Req+"/"+item)
                    if (a){
                      Linking.openURL(process.env.EXPO_PUBLIC_SVELTE_URL+"/"+User_Name_from_Req+"/"+item)
                    }
                    else{
                      Alert.alert("Can't open the link", "Sorry we can't open the url in a web browser ,please copy it and paste it there")
                    }
                  }}
                />
              </View>
            )}
            estimatedItemSize={20}
          />
        ) : (
          <FlashList
            data={['Deploy a project to see it here']}
            renderItem={({ item }) => (
              <View style={{ borderRadius: 20, overflow: 'hidden' }}>
                <Text className=' self-center mt-3 text-black text-lg'>Click here to close this</Text>
                <PillShapeButtonForDrawer
                  textToBeDisplayed={item}
                  colorOnTheBorderAndInTheText={'#fc035a'}
                  function_to_run_on_touch={() => {
                    toogleDrawer()
                  }}
                />
              </View>
            )}
            estimatedItemSize={20}
          />
        )}
      </View>
    </Animated.View>
  // </View>
  );
}
