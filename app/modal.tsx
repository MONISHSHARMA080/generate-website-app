import {  StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import SigninButton from '@/components/auth/SignInButton';
import signOut from '@/components/auth/utils/signout';
import SignOutButton from '@/components/auth/SignOutButton';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <SigninButton />
      {/* <View className='m-4'>
        <SignOutButton />
      </View> */}
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
