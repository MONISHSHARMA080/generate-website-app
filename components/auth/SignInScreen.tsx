import { View, Text, TouchableOpacity, Animated,TextInput, KeyboardAvoidingView, Platform, Button } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import React = require('react');

const SignInScreen = () => {

    const [showpassword , setShowPassword] = useState(false)

function login(){

}

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -60} // Adjust this value as needed
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
             placeholder='your@email.com'
            />
            <TextInput className=' relative h-12 top-12 m-3 p-3 w-11/12 rounded-2xl  border-2' 
             placeholder='your passowrd' secureTextEntry={showpassword}
            />
             <CheckBox
               className='m-4'
                disabled={false}
                value={showpassword}
                onValueChange={() => setShowPassword(!showpassword)}
            />

            <Text className=' relative h-12 top-12 m-3 p-3 mt-6 w-11/12 rounded-full text-center  border-2 bg-green-700 ' >Login</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

// return (
//     <View style={styles.container}>
//       <View style={[styles.topContainer, { height: topHeight }]} />
//       <View style={styles.bottomContainer}>
//         <View style={styles.squareBox} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   topContainer: {
//     backgroundColor: 'purple',
//   },
//   bottomContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   squareBox: {
//     borderTopLeftRadius: 48,
//     borderTopRightRadius: 48,
//     backgroundColor: 'white',
//     flex: 1,
//   },
// });