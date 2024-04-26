import * as SecureStore from 'expo-secure-store';

export default async function getJWTTokens() {
    try {
      const result = await SecureStore.getItemAsync("JWT_tokens");
      console.log(result , "results in the getJWTTokens func ");
      
      if (result) {
        // Parse the stored string back to an object
        const tokens = JSON.parse(result);
        console.log("Stored JWT tokens:", tokens);
        return tokens
      } else {
        console.log('No values stored under that key.');
        return undefined
      }
    } catch (error) {
      console.error("Error retrieving JWT tokens:", error);
    }
  }