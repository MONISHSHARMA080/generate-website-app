import { View, Text, TouchableOpacity, Animated,TextInput, KeyboardAvoidingView, Platform, Button, Vibration, Linking } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import * as React from 'react';
import GoogleSigninButton from './GoogleSignInButton';
import SpotifyAuthButton from './SpotifyAuthButton';
import * as WebBrowser from 'expo-web-browser';

const SignInScreen = () => {

    const [showpassword , setShowPassword] = useState(false)


 
function login(){

}

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -62} // Adjust this value as needed
    >
      <View className="flex-1">
        <View className=" flex-1 h-1/4 bg-black ">
          <View className=" mt-8">
            <Text className=" text-3xl text-white font-semibold mb-3">
              Go ahead and set up your account
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
            <TextInput className=' relative h-12 top-12 m-3 p-3 w-11/12 rounded-2xl  border-2' 
             placeholder='your passowrd' secureTextEntry={showpassword} textContentType="password"
            />
            <View className='top-12 left-56 flex-row' >
                <Text> Show Password </Text>
                <Checkbox className=" ml-3  "  value={showpassword} onValueChange={setShowPassword} />
            </View>
            <Text   
            className=' relative h-12 top-12 m-3 p-3 mt-6 w-11/12 rounded-full text-center  border-2 bg-green-700 ' >
                Login
            </Text>
            <Text className='top-12 mt-6 self-center' >--------------------------Or login with--------------------------</Text>
            <View className=' flex-row top-12  mt-5 pl-3' >
                <GoogleSigninButton   />
                <SpotifyAuthButton />
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
