import { Alert, Pressable} from 'react-native'
import * as React from 'react';
import { GoogleSignin,  statusCodes } from '@react-native-google-signin/google-signin';
import PillShapeButton from './PillShapeButton';
import Constants from 'expo-constants';

// const env = Constants.expoConfig.extra.env;

GoogleSignin.configure({
  scopes: ['email', 'profile', ],
  webClientId: "536289115131-99enca0gqcqjhd3a3ijtji049e0th543.apps.googleusercontent.com", 
  // iosClientId: 
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120
});

export default function GoogleSigninButton  ({setTokenToSignInFromGoogle})  {
  //  set this variable in some sort of state  or encrypted storage 
    const signUserIn  = async () => {
        try {

          await GoogleSignin.hasPlayServices();
          const {idToken} = await GoogleSignin.signIn();
          // console.log(idToken,"\n\n\n\n\n ++++ from google auth component++++ \n\n\n\n\n");
          
          setTokenToSignInFromGoogle(idToken)
          
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
          else if (error.code === "12502"){
              // user probally click outside when  asked foe account so do nothing
          }
            else {
            // some other error happened
            // display the erro to user 
            Alert.alert("Error occured", "We are sorry for the error , try restating the app ")
            console.log(error);
          }
        }
      };

  return (
   
    <Pressable onTouchStart={signUserIn}  > 
      <PillShapeButton textToBeDisplayed={"Google"} imageLocationOfLogo={require('../../assets/images/google_logo_round.png')} />
    </Pressable>
    
  )
}
