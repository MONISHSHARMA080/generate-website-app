import { View, TextInput } from 'react-native'
import * as React from 'react'

export default function HomeScreen() {
  return (
    <View className='flex-1 bg-gray-800 rounded-2xl relative'>
       <View className='absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-center justify-center'>
        <TextInput className='z-10   border-2 px-4 w-96  rounded-3xl  py-4 border-gray-100 h-auto max-h-44' 
          placeholder='Message' placeholderTextColor={"#CACCAC"} multiline={true} numberOfLines={1}
          // onChangeText={handleTextChange}
        />
      </View>
    </View>
  )
}