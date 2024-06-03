import { View, Text, GestureResponderEvent, Vibration, Dimensions } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from 'react-native-paper';

interface PillShapeButtonProps {
  textToBeDisplayed: string;
  colorOnTheBorderAndInTheText: string;
  function_to_run_on_touch?: Dispatch<SetStateAction<boolean>>| null;
}



export default function PillShapeButtonForDrawer({textToBeDisplayed,colorOnTheBorderAndInTheText,function_to_run_on_touch}:PillShapeButtonProps) {
  
  return (
    <View className="flex-row m-2 rounded-full h-12  items-center justify-center border-2 " style={{borderColor:colorOnTheBorderAndInTheText}} 
    onTouchEnd={()=>{function_to_run_on_touch(); Vibration.vibrate(47, false)}} 
    >
      <Text style={{color:colorOnTheBorderAndInTheText}} className="text-lg font-bold">{textToBeDisplayed}</Text>
      {/* <Button style={{width:Dimensions.get('window').width-20}} mode='contained'>{textToBeDisplayed}</Button> */}
    </View>
  )
}