import { View, Text, GestureResponderEvent } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

interface PillShapeButtonProps {
  textToBeDisplayed: string;
  colorOnTheBorderAndInTheText: string;
  function_to_run_on_touch?: Dispatch<SetStateAction<boolean>>| null;
}



export default function PillShapeButtonForHomeScreen({textToBeDisplayed,colorOnTheBorderAndInTheText,function_to_run_on_touch}:PillShapeButtonProps) {
  
  return (
    <View className="flex-row m-2 rounded-full h-14 w-40 items-center justify-center border-2 " style={{borderColor:colorOnTheBorderAndInTheText}} 
    onTouchStart={()=>{function_to_run_on_touch()}} 
    >
      <Text style={{color:colorOnTheBorderAndInTheText}} className="text-lg font-bold">{textToBeDisplayed}</Text>
    </View>
  )
}