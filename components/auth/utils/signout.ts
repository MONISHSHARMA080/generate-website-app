import { GoogleSignin } from "@react-native-google-signin/google-signin";

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    // setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default signOut;