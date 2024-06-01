import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Drawer } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function DrawerToShowPreviousSites(
    // { stateToToggleItOn }
        ) {
    // stateToToggleItOn can be the reactQuery state too that way we can get fetch when opened true and may be store the previous state in the
    // storage and zustand
    const [stateToToggleItOn, setstateToToggleItOn]= useState(false)

    setTimeout(()=>{console.log("stateToToggleItOn-- ",stateToToggleItOn);
            setstateToToggleItOn(true)
    }, 2000)
  const [drawerOnTheSide, setDrawerOnTheSide] = useState('');
  const drawerTranslateX = useSharedValue(-Dimensions.get('window').width);

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
    <Animated.View style={[{ height: Dimensions.get('window').height }, animatedStyle]}>
      <Drawer.Section title="Previous sites" showDivider={true} className="pb-14 text-2xl">
        <Drawer.Item
          label="First Item"
          active={drawerOnTheSide === 'first'}
          onPress={() => setDrawerOnTheSide('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={drawerOnTheSide === 'second'}
          onPress={() => setDrawerOnTheSide('second')}
        />
        <Drawer.Item
          label="remove it "
          active={drawerOnTheSide === 'second'}
          onPress={() => setstateToToggleItOn(false)}
        />
      </Drawer.Section>
    </Animated.View>
  );
}