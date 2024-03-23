import { View, TextInput } from 'react-native'
import * as React from 'react'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', paddingTop: 150 }}>
      <View style={{ flex: 1, backgroundColor: '#718096', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
      </View>
      <View style={{ padding: 20, position: 'absolute', bottom: 0, left: 0, right: 0, alignItems:"center" }}>
      <TextInput className='z-10 border-2 px-4 w-96  rounded-3xl py-4 text-white border-neutral-100 h-auto max-h-44' 
            placeholder='Message' placeholderTextColor={"#CACCAC"} multiline={true} numberOfLines={1} 
            // onChangeText={handleTextChange}
          />
      </View>
    </View>
  )
}


{/* <View style={{ flex: 1, backgroundColor: '#1F2937', paddingTop: 100, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, backgroundColor: '#718096', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
      </View>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <TextInput
          style={{ backgroundColor: '#4A5568', borderRadius: 20, color: '#CACCAC', paddingHorizontal: 20, paddingVertical: 10 }}
          placeholder='Message'
          placeholderTextColor='#CACCAC'
          multiline={true}
          numberOfLines={1}
          // onChangeText={handleTextChange}
        />
      </View>
    </View> */}



    // ---- my design 
  
  // <View className='flex-1 bg-stone-900 rounded-2xl relative pt-24'>

  //       <View
  //         className=" flex-1   bg-slate-200 "
  //         style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
  //       >
          
  //       </View>

  //       <View className='absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-center justify-center'>
  //         <TextInput className='z-10 border-2 px-4 w-96  rounded-3xl py-4 text-white border-neutral-100 h-auto max-h-44' 
  //           placeholder='Message' placeholderTextColor={"#CACCAC"} multiline={true} numberOfLines={1} 
  //           // onChangeText={handleTextChange}
  //         />
  //       </View>
  //     </View> 