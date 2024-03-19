import {  StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import SigninButton from '@/components/auth/SignInButton';
import signOut from '@/components/auth/utils/signout';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <SigninButton />
      <View>
        <Text onPress={signOut}>Sign out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
