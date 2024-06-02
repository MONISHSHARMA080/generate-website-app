import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Button, Drawer,Text } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import PillShapeButtonForDrawer from './buttons/pillShapeButtonForDrawer';
import { FlashList } from '@shopify/flash-list';


interface propsInThisComponent{
  stateToToogleTheDrawerOn:Boolean
}
export default function DrawerToShowPreviousSites(
    { stateToToogleTheDrawerOn }:propsInThisComponent
        ) {
          
    // stateToToggleItOn can be the reactQuery state too that way we can get fetch when opened true and may be store the previous state in the
    // storage and zustand
    const [stateToToggleItOn, setstateToToggleItOn]= useState(false)

    useEffect(()=>{
      setTimeout(()=>{console.log("stateToToggleItOn-- ",stateToToggleItOn);
            setstateToToggleItOn(true)
    }, 2700)
    },[stateToToggleItOn])
  const [drawerOnTheSide, setDrawerOnTheSide] = useState('');
  const drawerTranslateX = useSharedValue(-Dimensions.get('window').width /2);

  React.useEffect(() => {
    if (stateToToggleItOn) {
      drawerTranslateX.value = withTiming(0, { duration: 100 });
    } else {
      drawerTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
    }
  }, [stateToToggleItOn, drawerTranslateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drawerTranslateX.value }],
    };
  });

  return (
    <View className="bg-slate-700 flex-1">
      <Animated.View
        style={[
          {
            // height: '100%',
            height: Dimensions.get('window').height -40,
            backgroundColor: "#fff",
            borderRadius: 45,
            width: Dimensions.get('window').width -20,
            alignSelf:'center'
          },
          animatedStyle,
        ]}
        className="m-4"
      >

          <View className="justify-end pb-4" style={{ height: '100%' }}>
            <Text className=' text-2xl self-center p-3'>Previous  website</Text>
            <FlashList
              data={['ewuin','jn','hercb','hjern','fewew','ewhb','hjwe','2','','egtrg','','','3','ds','last','dd','qwd','lastlast']}
              renderItem={({ item }) => (
                <View style={{ borderRadius: 20, overflow: 'hidden' }}>
                  <PillShapeButtonForDrawer
                    textToBeDisplayed={item}
                    colorOnTheBorderAndInTheText={'#999aaa'}
                    function_to_run_on_touch={()=>console.log("clicked the ",item)
                    }
                  />
                </View>
              )}
              estimatedItemSize={20}
            />
          </View>
      </Animated.View>
    </View>
  );
}
