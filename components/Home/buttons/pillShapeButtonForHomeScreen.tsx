import { View, Text } from 'react-native'
import React from 'react'

export default function PillShapeButtonForHomeScreen({textToBeDisplayed,colorOnTheBorderAndInTheText}) {
  return (
    <View className="flex-row m-2 rounded-full h-14 w-40 items-center justify-center border-2 " style={{borderColor:colorOnTheBorderAndInTheText}}  >
      <Text style={{color:colorOnTheBorderAndInTheText}} className="text-lg font-bold">{textToBeDisplayed}</Text>
    </View>
  )
}