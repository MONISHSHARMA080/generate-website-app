import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View } from '../Themed';
import PillShapeButton from './PillShapeButton';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyAuthButton() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'CLIENT_ID',
      scopes: ['user-read-email', 'playlist-modify-public'],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'magicalfirstwebsite'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
   <View onTouchStart={()=>promptAsync} >
     <PillShapeButton textToBeDisplayed={"Spotify"} imageLocationOfLogo={require('../../assets/images/Spotify_Icon.png')} />
   </View>
  );
}