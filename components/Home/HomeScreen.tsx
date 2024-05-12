  import { FlashList } from "@shopify/flash-list";
  import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
  import { View, TextInput, Text, Button } from 'react-native'
  import * as React from 'react'
  import { useEffect, useState } from 'react';
  import JWTStore from '@/app/store';
  import { Redirect, useFocusEffect, useRouter } from 'expo-router';
  import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
  import axios, { AxiosError } from 'axios';
import axiosInstance from "../auth/utils/new_tokens_auth";
  


  export default function HomeScreen() {
    
    const router = useRouter();
    const { setJWT,JWT } = JWTStore();
    const [IsFirstRequest , setIsFirstRequest] = useState(true)
    const [inputText , setInputText] = useState(null)
    useEffect(()=>{
        console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
      },[JWT])


      async function bb (){
        let a = await axiosInstance.post("/temp_website",{
          prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
        },{headers:{Authorization: 'Bearer '+JSON.parse(getItem("JWT")).access}})
        console.log("from the async function", await a);
        
      }
    
    
      async function UpdateJWT (){
        const Jwt_string = getItem('JWT')
       try {
         console.log("in the update func --->>, my tokens -->>",JSON.parse(Jwt_string).refresh );
         
         const response = await axios.post(
           `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/token/refresh/`,
           { refresh: JSON.parse(getItem('JWT')).refresh }
         );
         const { access, refresh } = response.data;
         console.log("-------above the response ------");
         
         console.log("\n response data ----",response.headers);
         
         console.log("\n\n ================================8888888888888888-===========response and access(jsut to be sure ) -->>",refresh,"\n access -----", access);
         deleteItemAsync("JWT").then(()=>{
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODI3NDQwNywiaWF0IjoxNzE1NTA5NjA3LCJqdGkiOiI3ZmI3ZGM0MzQ5Mjk0Zjk2ODk1ZWFhNGZkYjVkMGNiOCIsInVzZXJfaWQiOjR9.L_hqCl9ddWUuUnO2LcAwlFFLASbaEi2P8DyFlXcBols 
          // access ----- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NTA5NjMyLCJpYXQiOjE3MTU1MDk1NjIsImp0aSI6Ijc1OTE1NmZlNWFjMTQ5MWM4ODRkM2NlYWVmMWViNjI5IiwidXNlcl9pZCI6NH0.h75SIL0z9vWXNmkmz2-07gmuJn2MgPkHA8PIJkLy1S4
          setItem("JWT",JSON.stringify({access,refresh}))
          
        })
        console.log("\n\n checking both the jwt tokens -->", Jwt_string,JSON.stringify({access,refresh}), "\n\n\n are both of these same -->>", JSON.stringify({access,refresh}) === Jwt_string );
        
      
       } catch (error) {
        console.log("\n -- in the error in updateJWT");
        
        console.error(error)
       }
      }

      


    return (
      <View style={{ flex: 1, backgroundColor: '#010c1c', paddingTop: 150 }}>
        <Button title='remove' onPress={()=>{
    // bb()
    let token = JSON.parse(getItem("JWT")).access
    
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,

      },
      body: JSON.stringify({
        prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
      }
    ),
    })
    .then(response => {response.json(),console.log("\n response from the first -->>",response,"\n\n")

    ; return response
      
    })
  .then(data => {
    // Handle the response data here
    console.log("\n in the data one ");
    
    if (data.status===401){
  console.log("\n in the data two---");
  UpdateJWT() 
}
    
  })
  .catch(error => {
    console.log("\n err -->>",error);
    // Handle any errors
  });
  
          
            
          // let access = "access__"
          // let refresh = "refresh__"
          // console.log("\n\n ---MMMMM",JSON.stringify({access,refresh}))


          
   

  // const instance = axios.create({
  //   baseURL: 'https://4b75-1-22-230-81.ngrok-free.app',
  //   // You can set other default configurations here
  // });

  // Set JWT token in the request headers


    // instance.defaults.headers.common['Authorization'] = ``;

  

    // axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/token/verify`, {
    //   prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
    // }
    // , {
    
    // //  {"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NDE5NzUzLCJpYXQiOjE3MTU0MTczNTMsImp0aSI6IjgxZGE4MzE3ZDg3YzQ2ZjRiMDk3MTlkMmUyNWVlN2NiIiwidXNlcl9pZCI6NH0.K018a8UB0Gi0s7EuSCD8vL3kEzNDOG3h3zQij2eRoZ8", "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODE4MjE1MywiaWF0IjoxNzE1NDE3MzUzLCJqdGkiOiI4NTRmMzM3NDlmMjY0Y2MyYWY3NzcxYjliZjllY2Q5YiIsInVzZXJfaWQiOjR9.JIXJ9fP5Imz4l4F3Qob2XAJVSaQdY50FDjnsmVL58YM"}


    //   headers: {
    //     'Authorization': `Bearer ${getItem("JWT")}`,
    //     'Content-Type': 'application/json',
    //   }
    // })
    // .then(response => {
    //   console.log(response.status, "response from the axios");
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    

        }} />
        <Button title="delete jwt"
        onPress={()=>{
                  deleteItemAsync("JWT") ;
          
           console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
           setJWT(null)
          
    router.replace('/(main_app)/');
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
