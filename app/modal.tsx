import {  StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import SignOutButton from '@/components/auth/SignOutButton';
import React from 'react';
import SpotifyAuth from '@/components/auth/SpotifyAuthButton';
import GoogleSigninButton from '@/components/auth/GoogleSignInButton';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View className='m-4'>
      <GoogleSigninButton />
        <SignOutButton />
        <SpotifyAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
