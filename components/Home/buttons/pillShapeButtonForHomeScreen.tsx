import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'

interface PillShapeButtonProps {
  textToBeDisplayed: string;
  colorOnTheBorderAndInTheText: string;
  function_to_run_on_touch?: (event: GestureResponderEvent) => void | null;
}



export default function PillShapeButtonForHomeScreen({textToBeDisplayed,colorOnTheBorderAndInTheText,function_to_run_on_touch}:PillShapeButtonProps) {
  const handleTouch = (event: GestureResponderEvent) => {
    if (function_to_run_on_touch) {
      function_to_run_on_touch(event);
    } else {
      console.log('Hello World');
    }
  };
  return (
    <View className="flex-row m-2 rounded-full h-14 w-40 items-center justify-center border-2 " style={{borderColor:colorOnTheBorderAndInTheText}} 
    onTouchStart={handleTouch} >
      <Text style={{color:colorOnTheBorderAndInTheText}} className="text-lg font-bold">{textToBeDisplayed}</Text>
    </View>
  )
}