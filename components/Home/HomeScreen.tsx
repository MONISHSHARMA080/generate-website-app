import { View, TextInput, Text, Button } from 'react-native'
import * as React from 'react'
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from 'react';
import { deleteItemAsync } from 'expo-secure-store';
import JWTStore from '@/app/store';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
import axios from 'axios';


export default function HomeScreen() {

  const router = useRouter();
  const { setJWT,JWT } = JWTStore();
  const [IsFirstRequest , setIsFirstRequest] = useState(true)
  const [inputText , setInputText] = useState(null)
useEffect(()=>{},[JWT])
 
  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
  return (
    <View style={{ flex: 1, backgroundColor: '#010c1c', paddingTop: 150 }}>
      <Button title='remove' onPress={()=>{
         deleteItemAsync("JWT") ;
         
         console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
         setJWT(null)
        
  router.replace('/(main_app)/');

// const instance = axios.create({
//   baseURL: 'https://4b75-1-22-230-81.ngrok-free.app',
//   // You can set other default configurations here
// });

// Set JWT token in the request headers


  // instance.defaults.headers.common['Authorization'] = ``;


  // axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`, {
  //   prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
  // }
  // , {
  //
  //  {"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NDE5NzUzLCJpYXQiOjE3MTU0MTczNTMsImp0aSI6IjgxZGE4MzE3ZDg3YzQ2ZjRiMDk3MTlkMmUyNWVlN2NiIiwidXNlcl9pZCI6NH0.K018a8UB0Gi0s7EuSCD8vL3kEzNDOG3h3zQij2eRoZ8", "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODE4MjE1MywiaWF0IjoxNzE1NDE3MzUzLCJqdGkiOiI4NTRmMzM3NDlmMjY0Y2MyYWY3NzcxYjliZjllY2Q5YiIsInVzZXJfaWQiOjR9.JIXJ9fP5Imz4l4F3Qob2XAJVSaQdY50FDjnsmVL58YM"}


  //   // headers: {
  //   //   'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTYwNjEzLCJpYXQiOjE3MTQ1NTgyMTMsImp0aSI6IjRmNjk1ZGJhNDY0NzQyOTBiYWM4YTkxMDMzNjJkOThhIiwidXNlcl9pZCI6NH0.TEbCABoiSOJJsc9AwwVc3tWdC4W_e7mPKcq2x17pu1E`,
  //   //   'Content-Type': 'application/json',
  //   // }
  // })
  // .then(response => {
  //   console.log(response.status, "response from the axios");
  // })
  // .catch(error => {
  //   console.error(error);
  // });
  

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
