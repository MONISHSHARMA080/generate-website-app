import { GoogleSignin } from "@react-native-google-signin/google-signin";
import signOut_BY_ONLY_REMOVING_JWT_NOT_CALLING_SIGNOUT_FROM_AUTH_PROVIDERS from "./SignOutBy_ONLY_RemovingJwtFromStorage";

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    // setState({ user: null }); // Remember to remove the user from your app's state as well
    signOut_BY_ONLY_REMOVING_JWT_NOT_CALLING_SIGNOUT_FROM_AUTH_PROVIDERS("JWT_tokens")
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default signOut;