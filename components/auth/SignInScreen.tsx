import { View, Text, TouchableOpacity, Animated,TextInput, KeyboardAvoidingView, Platform, Button, Vibration, Linking } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { useEffect, useState } from 'react';
import  React from 'react';
import GoogleSigninButton from './GoogleSignInButton';
import SpotifyAuthButton from './SpotifyAuthButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SignInScreen = () => {

    const [showpassword , setShowPassword] = useState(false)
    const [tokenToSignInFromGoogle, setTokenToSignInFromGoogle ] = useState(null)
    const [tokenToSignInFromSpotify, setTokenToSignInFromSpotify ] = useState(null)
    
    const mutation = useMutation({
      
      mutationFn: (id_token) => {
        // console.log("from the mutation function ",id_token);        
        // return axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${path}`, id_token)
        return axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/signup/spotify`, {id_token})
      },
    })

    const response_form_google_login_api = useMutation({
      mutationFn: (id_token) => {
        // console.log("from the mutation function ",id_token); 
        // return axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${path}`, id_token)
        return axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/signup/google`, {id_token}) 
      },
    })    

    //  follow the example in the docs of react query ; make 2 mutation function just for the learning sake 
    useEffect(()=>{

      if (tokenToSignInFromSpotify){

        console.log("\n\n", tokenToSignInFromSpotify, "\n\n ", "----", "tokenToSignInFromSpotify \n\n");
        mutation.mutate(tokenToSignInFromSpotify); 
    // console.log("Mutation =>",mutation.failureReason,"\n\n",mutation.isSuccess,"\n\n" , mutation.data);

      }
      else if (tokenToSignInFromGoogle){
        
        console.log(tokenToSignInFromGoogle,"\n\n\n -----tokenToSignInFromGoogle");
        response_form_google_login_api.mutate(tokenToSignInFromGoogle)

      }

    },[tokenToSignInFromGoogle,tokenToSignInFromSpotify])

    useEffect(()=>{
      
      if (mutation.isSuccess) {
        console.log("Response body from spotify:", mutation.data.data); // Access the response body here
      }
      if (response_form_google_login_api.isSuccess) {
        console.log("Response body of google login :", response_form_google_login_api.data.data); // Access the response body here
        if (response_form_google_login_api.data.data.status ==200 || response_form_google_login_api.data.data.status ==200 ){
          
        
          const tokensString = JSON.stringify(response_form_google_login_api.data.data.tokens);
          SecureStore.setItemAsync("JWT_tokens", tokensString)
            .then(() => {
              console.log("JWT tokens stored successfully!");
            })
            .catch(error => {
              console.error("Error storing JWT tokens:", error);
            });
          console.log("Setting thing in the seq. storeage =-=-=---=-=-==---=-==--=-=-");
               
        }
      }
      if (response_form_google_login_api.error) {
        console.log("response in google",response_form_google_login_api.failureReason);
        console.log("error in google",response_form_google_login_api.error); 
      }

    },[mutation.isSuccess,response_form_google_login_api.isSuccess,response_form_google_login_api.error,response_form_google_login_api.data])
  

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -190} // Adjust this value as needed
    >
      <View className="flex-1">
        <View className=" flex-1 h-1/4 bg-black ">
          <View className=" mt-14 ">
            <Text className=" text-3xl text-white font-semibold mb-3">
              Alright let's set up your account
            </Text>
            <Text className=" text-lg text-gray-500">
              You are just steps away to reach the world
            </Text>
          </View>
        </View>
        <View
          className="absolute inset-x-0 bottom-0 h-3/4 bg-slate-200 "
          style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
            
            <TextInput className=' relative h-12 top-12 m-3 p-3 w-11/12 rounded-2xl border-2' 
             placeholder='your@email.com' textContentType="emailAddress"
            />
            <TextInput className=' relative h-12 top-12 m-3 p-3 w-11/12 rounded-2xl border-2' 
             placeholder='User name' textContentType="givenName"
            />
            <TextInput className=' relative h-12 top-12 m-3 p-3 w-11/12 rounded-2xl  border-2' 
             placeholder='your passowrd' secureTextEntry={showpassword} textContentType="password"
            />
            <View className='top-12 left-56 flex-row' >
                <Text> Hide Password </Text>
                <Checkbox className=" ml-3  "  value={showpassword} onValueChange={setShowPassword} />
            </View>
            <Text   
            className=' relative h-12 top-12 m-3 p-3 mt-6 w-11/12 rounded-full text-center  border-2 bg-green-700 ' >
                Login
            </Text>
            <Text className='top-12 mt-6 self-center' >--------------------------Or login with--------------------------</Text>
            <View className=' flex-row top-12  mt-5 pl-3' >
                <GoogleSigninButton setTokenToSignInFromGoogle={setTokenToSignInFromGoogle}  />
                <SpotifyAuthButton setTokenToSignInFromSpotify={setTokenToSignInFromSpotify} />
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;