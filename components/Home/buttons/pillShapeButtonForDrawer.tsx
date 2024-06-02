import { View, Text, GestureResponderEvent, Vibration } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

interface PillShapeButtonProps {
  textToBeDisplayed: string;
  colorOnTheBorderAndInTheText: string;
  function_to_run_on_touch?: Dispatch<SetStateAction<boolean>>| null;
}



export default function PillShapeButtonForDrawer({textToBeDisplayed,colorOnTheBorderAndInTheText,function_to_run_on_touch}:PillShapeButtonProps) {
  
  return (
    <View className="flex-row m-2 rounded-full h-12  items-center justify-center border-2 " style={{borderColor:colorOnTheBorderAndInTheText}} 
    onTouchStart={()=>{function_to_run_on_touch(); Vibration.vibrate(47, false)}} 
    >
      <Text style={{color:colorOnTheBorderAndInTheText}} className="text-lg font-bold">{textToBeDisplayed}</Text>
    </View>
  )
}