  import { FlashList } from "@shopify/flash-list";
  import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
  import { View, TextInput, Text, Button, Alert } from 'react-native'
  import * as React from 'react'
  import { useEffect, useState } from 'react';
  import JWTStore from '@/app/store';
  import { Redirect, useFocusEffect, useRouter } from 'expo-router';
  import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
//   import axios, { AxiosError } from 'axios';
// import axiosInstance from "../auth/utils/new_tokens_auth";
import { useQuery } from "@tanstack/react-query";
import UpdateJWT, { QueryFunction } from "../auth/utils/functions_for_updating_tokens";
import { alert_user_for_common__errors_from_backend_given_by_Rquery } from "../auth/utils/func_to_alert_user_for_common_querystatus_and_message_to_displa";
  


  export default function HomeScreen() {    
    const router = useRouter();
    const { setJWT,JWT } = JWTStore();
    const [IsFirstRequest , setIsFirstRequest] = useState(true)
    const [inputText , setInputText] = useState(null)
    const [makeARequest , setMakeARequest] = useState(false)
    const [makeARequestFormTempToProject , setMakeARequestFormTempToProject] = useState(false)
    const [responnseJSON , setResponnseJSON] = useState(null)
    const [project_name , setProject_name] = useState("trial-from-button")
    useEffect(()=>{
        console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT,"\n ====>make a request -->",makeARequest)
      },[JWT,makeARequest])


    // async function bb (){
    //   let a = await axiosInstance.post("/temp_website",{
    //     prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
    //   },{headers:{Authorization: 'Bearer '+JSON.parse(getItem("JWT")).access}})
    //   console.log("from the async function", await a);
      
    // }

    
    
      

      

  // ------------------------------- react query ------------------------------
  
// const { isSuccess ,refetch, status, data}= useQuery({
//   queryKey:['fetch-the-temp-website'],
//   queryFn: ()=>QueryFunction("temp_website",setJWT,refetch,setMakeARequest,setResponnseJSON),
//   enabled:makeARequest,
//   // retry:2
//   // pass the body from the outside
// })
// ------- this one is specifically for the set the project name func

const { isSuccess ,refetch, status, data}= useQuery({
  queryKey:['fetch-the-temp-website'],
  queryFn: ()=>QueryFunction(`temp_website_to_production?project_name=${project_name}`,setJWT,refetch,setMakeARequestFormTempToProject,setResponnseJSON),
  enabled:makeARequestFormTempToProject,
  // retry:2
  // pass the body from the outside
})

// -------make a function that takes in the data from react query amd alerts all teh function of the  common errors 400 , 500 , message to display to the userrs


useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",responnseJSON );
if (data){
  alert_user_for_common__errors_from_backend_given_by_Rquery(data)
}


},[data,responnseJSON])

  
  // ------------------------------- react query ------------------------------

      


    return (
      <View style={{ flex: 1, backgroundColor: '#010c1c', paddingTop: 150 }}>
        <Button title='remove' onPress={async ()=>{
          setMakeARequest(true)

          setProject_name(()=>"trial-from-button")
          if (project_name != null){
            setMakeARequestFormTempToProject(true)
          }
          else{
            Alert.alert("","Project name can't be empty")
          }

          // const token = JSON.parse(getItem("JWT")).access;
          // const prompt =
          //   "Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations";
      
          // try {
          //   const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`, {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${token}`,
          //     },
          //     body: JSON.stringify({ prompt }),
          //   });
      
          //   const data = await response.json();
          //   console.log("Response from fetch---->>>>>:", data,"\n\n");
      
          //   // Handle the response data as needed
          // } catch (error) {
          //   console.error("Error:", error);
          //   // Handle the error
          // }
          
// ------------------------------------------------------------------------------------------
//  let a = axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`)
//  setTimeout(()=>{console.log(a.data,"\n ---==-00----=---")
//  },4000)
// fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`,{
//   // method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Authorization': 'Bearer '+token,

//   },
//   body: JSON.stringify({
//     prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
//   }
// ),
// })
// .then(response => {response.json(),console.log("\n response from the first -->>",response,"\n\n")

// ; return response
  
// })
// .then(data => {
// // Handle the response data here probally  alert the user and tell them to respond to the backend 
// console.log("\n in the data one ",data.json());

// if (data.status===401){
//   console.log("\n in the data two---");
//   // UpdateJWT(setJWT)
//   // don't need to retuern form here as it already re runs the function
// }

// // setMakeARequest(false)
// return data
// // log

// })
// .catch(error => {
// console.log("\n err||| -->>",error);
// // Handle any errors
// console.log("\n\n |||error form thequery func / temp-->website ");



// });
// -------------------------------------- now make sure i also return the response from the 2 try after refresh token ------------------
// ----------------------------------------------------------
// ------------------------------------------  or maybe don't need to as Refetch works --- try an example to see  -->> yup I think it works 
// -------------------------------------------- lets make a abstract function
// --------------------------------------2.> setMakeARequest() .........3.> UpdateJWT()
// data_to_return_to_react_query   
//   return data_to_return_to_react_query
// -------------------------------------- now make sure i also return the response from the 2 try after refresh token ------------------



  

























// ------------------------------------------------------------------------------------------
// bb()
//     let token = JSON.parse(getItem("JWT")).access
    
//     fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/temp_website`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '+token,

//       },
//       body: JSON.stringify({
//         prompt :"Create website with many pages for a GYM that is on the way to create a revolution  ; give us a very  dope looking website that has too many colors as i ma trying to target the younger generation that like colors and photos and futuristic and modernly colorful, with animations"
//       }
//     ),
//     })
//     .then(response => {response.json(),console.log("\n response from the first -->>",response,"\n\n")

//     ; return response
      
//     })
//   .then(data => {
//     // Handle the response data here
//     console.log("\n in the data one ");
    
//     if (data.status===401){
//   console.log("\n in the data two---");
//   // UpdateJWT() 
// }
    
//   })
//   .catch(error => {
//     console.log("\n err -->>",error);
//     // Handle any errors
//   });
  
          
            
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
        <View className="mt-3">
        <Button title="delete jwt"
        onPress={()=>{
                  deleteItemAsync("JWT") ;
          
           console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
           setJWT(null)
          
    router.replace('/(main_app)/');
        }} />
        </View>

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