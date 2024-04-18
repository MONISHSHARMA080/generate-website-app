import { View, TextInput, Text, Button } from 'react-native'
import * as React from 'react'
import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';


export default function HomeScreen() {

  const [messages, setMessages] = useState([
    { id: '1', sender: 'user', text: 'Hello!' },
    { id: '2', sender: 'other', text: 'Hi there!' },
    { id: '3', sender: 'user', text: 'How are you?' },
    { id: '4', sender: 'other', text: 'I am good, thank you!' },
    { id: '5', sender: 'other', text: 'lorem ipsum ckjewc er ee' },

  ]);

  

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', paddingTop: 150 }}>

      <View style={{ flex: 1, backgroundColor: '#718096', borderTopLeftRadius: 32, borderTopRightRadius:32, paddingBottom:24 }}>
      <FlashList
      data={messages}
      renderItem={({ item }) =>(

        <View className={` rounded-2xl ${item.sender === "user" ?('bg-green-500 self-end'):('bg-red-500 self-start')} p-3  m-2   `} >
          <Text >{item.text}</Text>
        </View>

      )}
      estimatedItemSize={200}
    />
      </View>
      <View style={{ paddingTop:5, paddingBottom:10 ,position: 'absolute', bottom: 0, left: 0, right: 0, 
      alignItems:"center",backgroundColor: '#718096' , borderRadius:24}}>
        <TextInput className='z-10 border-2 px-4 w-96 rounded-3xl py-4 text-white border-white h-auto max-h-44' 
            placeholder='Message' placeholderTextColor={"#CACCAC"} multiline={true} numberOfLines={1} 
            // onChangeText={handleTextChange}
          />
      </View>
    </View>
  )
}

// <Button  
      
//       title='Hi'
      
//       onPress={()=>{

// setTimeout(()=>{
//   setMessages([...messages,
//     { id: (messages.length + 1).toString(), sender: 'user', text: 'New message from user' },
//       { id: (messages.length + 2).toString(), sender: 'other', text: 'New message from other' },
//       { id: (messages.length + 3).toString(), sender: 'user', text: 'Another new message from user' },
//       { id: (messages.length + 4).toString(), sender: 'other', text: 'Another new message from other' },
//   ])
// },1200)


//       }} />
