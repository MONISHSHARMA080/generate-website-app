import { deleteItemAsync } from "expo-secure-store";

export default function signOut_BY_ONLY_REMOVING_JWT_NOT_CALLING_SIGNOUT_FROM_AUTH_PROVIDERS(key:string) {
  
deleteItemAsync(key)

}
