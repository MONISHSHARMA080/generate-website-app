import { View, Text, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import GoogleSignInPillShaped from './GoogleSignInPillShaped';

GoogleSignin.configure({
  scopes: ['email'],
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      iosClientId: 'iosClientId for iOS, nothing special here',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120
 });


const SigninButton = () => {
 
  const [userInfo, setUSerInfo] = useState(null)
//  set this variable in some sort of state  or encrypted storage 
    const signUserIn  = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const { idToken, user}= await GoogleSignin.signIn();
          setUSerInfo(user);
        } 
         catch (error) {
          
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow so removing tokens
            async () => {
                try {
                  await GoogleSignin.revokeAccess();
                  // Google Account disconnected from your app.
                  // Perform clean-up actions, such as deleting data associated with the disconnected account.
                } catch (error) {
                  Alert.alert("Error occured", "Failed to log you out")
                }
              };
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            // set loading to true 
            async () => {
              try {
                await GoogleSignin.revokeAccess();
                // Google Account disconnected from your app.
                // Perform clean-up actions, such as deleting data associated with the disconnected account.
              } catch (error) {
              }
            };
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            // display the error 
                try {
                    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                    // google services are available
                } catch (err) {
                    Alert.alert("Error occuers", "Google Play service is not availeble or outdated")
                }
          } 
            else {
            // some other error happened
            // display the erro to user 
            Alert.alert("Error occured", "We are sorry for the error , try restating the app ")
            
          }
        }
      };

  return (
   
    <Pressable onTouchStart={signUserIn} >
      <GoogleSignInPillShaped />
    </Pressable>
    
  )
}

export default SigninButton