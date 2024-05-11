import { View, TextInput, Text, Button } from 'react-native'
import * as React from 'react'
import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';
import { deleteItemAsync } from 'expo-secure-store';
import JWTStore from '@/app/store';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
import axios from 'axios';


export default function HomeScreen() {

  const router = useRouter();
  const { setJWT } = JWTStore();
  const [IsFirstRequest , setIsFirstRequest] = useState(true)
  const [inputText , setInputText] = useState(null)

 
  return (
    <View style={{ flex: 1, backgroundColor: '#010c1c', paddingTop: 150 }}>
      <Button title='remove' onPress={()=>{
  //        deleteItemAsync("JWT") , setJWT(null)
 
  // router.replace('/(main_app)/');
// console.log(inputText)

// const instance = axios.create({
//   baseURL: 'https://4b75-1-22-230-81.ngrok-free.app',
//   // You can set other default configurations here
// });

// Set JWT token in the request headers


  // instance.defaults.headers.common['Authorization'] = ``;


  axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`, {
    prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
  }
  , {
    // headers: {
    //   'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTYwNjEzLCJpYXQiOjE3MTQ1NTgyMTMsImp0aSI6IjRmNjk1ZGJhNDY0NzQyOTBiYWM4YTkxMDMzNjJkOThhIiwidXNlcl9pZCI6NH0.TEbCABoiSOJJsc9AwwVc3tWdC4W_e7mPKcq2x17pu1E`,
    //   'Content-Type': 'application/json',
    // }
  })
  .then(response => {
    console.log(response.status, "response from the axios");
  })
  .catch(error => {
    console.error(error);
  });
  

      }} />

      <View style={{ flex: 1, backgroundColor: '#5a7ead', borderTopLeftRadius: 32, borderTopRightRadius:32, paddingBottom:24 }}>
      
      <View className="flex-1 items-center justify-center">
        {IsFirstRequest? ( 
          <>
            <Text className=" text-xl font-sans font-bold text-slate-900">Hi! Let's make your website</Text>
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Generate'} colorOnTheBorderAndInTheText={'#000000'} />
          </>
        )
        :
        (
          <>
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Fix It'} colorOnTheBorderAndInTheText={'#f20a77'} />
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Deploy'} colorOnTheBorderAndInTheText={'#0ce80c'} />
          </>
        )}

      </View>

      </View>

      <View style={{ paddingTop:5, paddingBottom:10 ,position: 'absolute', bottom: 0, left: 0, right: 0, 
      alignItems:"center",backgroundColor: '#5a7ead' , borderRadius:24}}>
        <TextInput className='z-10 border-2 px-4 w-96 rounded-3xl py-4 text-white border-white h-auto max-h-44' 
            placeholder='Describe you website' placeholderTextColor={"#CACCAC"} multiline={true} numberOfLines={1} 
            onChangeText={(text) => setInputText(text)} value={inputText} 
          />
      </View>
    </View>
  )
}
