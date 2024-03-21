// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
// import { Button, View } from 'react-native';
// import PillShapeButton from './PillShapeButton';

// WebBrowser.maybeCompleteAuthSession();

// // Endpoint
// const discovery = {
//   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//   tokenEndpoint: 'https://accounts.spotify.com/api/token',
// };

// export default function App() {
//   console.log("inside apotify func");
  
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: process.env.EXPO_PUBLIC_Spotify_CLIENT_ID,
//       scopes: ["streaming","user-read-email","user-read-private"],
//       // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
//       // this must be set to false
//       usePKCE: false,
//       redirectUri: 'magicalfirstwebsite://redirect'
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { code } = response.params;
//     }
//     console.log(response,"<----responce");
    
//   }, [response]);

//   return (
//    <View onTouchStart={()=>promptAsync} >
//      {/* <PillShapeButton textToBeDisplayed={"Spotify"} imageLocationOfLogo={require('../../assets/images/Spotify_Icon.png')} /> */}
//      <Button
//       disabled={!request}
//       title="Login with Spotify"
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//    </View>
//   );
// }
// ---------------c
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Redirect } from 'expo-router';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React = require('react');
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_Spotify_CLIENT_ID;
const REDIRECT_URI = makeRedirectUri({
  useProxy: true,

  
});

export default function AuthScreen() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      redirectUri: 'magicalfirstwebsite://redirect',
    },
    { authorizationEndpoint: 'https://accounts.spotify.com/authorize' }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log("success ==>>", code);
      
      // Exchange the code with Spotify for an access token
      // You can use fetch or any other networking library to send a POST request to Spotify's token endpoint
    }
    else if (response?.type === 'error') {
      console.log('Authentication error:', response.error);
    }
    console.log(response,"req->" ,  request  );
    
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Spotify"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
