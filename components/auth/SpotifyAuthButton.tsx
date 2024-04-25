import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Button, Pressable } from 'react-native';
import PillShapeButton from './PillShapeButton';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_Spotify_CLIENT_ID;

export default function AuthScreen({setTokenToSignInFromSpotify}) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', ],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // redirectUri: 'magicalfirstwebsite://redirect',
      redirectUri: `magicalfirstwebsite://`,
    },
    { authorizationEndpoint: 'https://accounts.spotify.com/authorize' }
  );

  
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // console.log("\n\nsuccess ==>>", code,"\n\n\n\n",response, "\n\n\n\n\n\n");
      setTokenToSignInFromSpotify(code)      
       
      // Exchange the code with Spotify for an access token
      // You can use fetch or any other networking library to send a POST request to Spotify's token endpoint
    }
    else if (response?.type === 'error') {
      
      Alert.alert("Login error", `Sorry , an error occured when logging in with spotify , error message from spotify :  ${response.error.description} ` )
    }
   
  }, [response]);

  return (
    <Pressable onPress={() => {
      promptAsync();
    }} >

      <PillShapeButton   textToBeDisplayed={"Spotify"} imageLocationOfLogo={require('../../assets/images/Spotify_Icon.png')} />
    </Pressable>
    
    );
}
