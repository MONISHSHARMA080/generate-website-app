import JWTStore from "@/app/store";
import axios from "axios";
import {  useRouter } from "expo-router";
import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { Alert } from "react-native";


export default async function UpdateJWT (setJWTTokens, refetch ){
    // const Jwt_string = getItem('JWT')
   try {
    //  console.log("in the update func --->>, my tokens -->>",JSON.parse(Jwt_string).refresh );
     
     const response = await axios.post(
       `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/token/refresh/`,
       { refresh: JSON.parse(getItem('JWT')).refresh }
     );
     const { access, refresh } = response.data;
    //  console.log("-------above the response ------",response);
    //  console.log("----status code ------",response.status);  
    //  status code is 200 here 
     
    //  console.log("\n response data ----",response.headers);
     if (response.status === 200){
      console.log(" deleting the jwt in the update function");
      
      deleteItemAsync("JWT").then(()=>{
        setItem("JWT",JSON.stringify({access,refresh}))
        setJWTTokens(JSON.stringify({access,refresh}))
        
      })
     }
     else{
      console.log(" \n ||| deleting the jwt |||| \n ");
      const { setJWT } = JWTStore();
      const router = useRouter();
      deleteItemAsync("JWT") ;
          
          //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
           setJWT(null)
          
    router.replace('/(main_app)/');
     }
    //  console.log("\n\n ================================8888888888888888-===========response and access(jsut to be sure ) -->>",refresh,"\n access -----", access);
     
    // console.log("\n\n checking both the jwt tokens -->", Jwt_string,JSON.stringify({access,refresh}), "\n\n\n are both of these same -->>", JSON.stringify({access,refresh}) === Jwt_string );
  console.log("about to refetch in the updatejwt ",);
  
    refetch()
  
   } catch (error) {
    console.log("\n -- in the error in updateJWT(");
    // ------------------------------------------ Alert -----------------------------------------------------
    // alert the user and respond to the backend --or may be retry 
    // ------------------------------------------ Alert -----------------------------------------------------
    console.error(error)
    return
   }
  }


// ------------------------------------------------------------------------------------------

type httpMethodType = "GET" | "PUT" | "POST" | "DELETE";

  export async function QueryFunction(URLPath_DoNoT_Include_BackSlash, setJWTTokensInState_Zustand_here, refetch, setMakeARequestWithReactQuery, 
    setResponseOrHeadersFromAUseStateFunc, prompt_for_the_body_do_Not_JSON_stringify, httpMethodType:httpMethodType) {
    
      
      let token = JSON.parse(getItem("JWT")).access
      console.log("\n //==in QueryFunction --/// \n", JSON.stringify(prompt_for_the_body_do_Not_JSON_stringify),"URLPath_DoNoT_Include_BackSlash", URLPath_DoNoT_Include_BackSlash);
      
      const a = {a:0}
      
   
    try {
      var fetchOptions: RequestInit = {
        method: httpMethodType,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      };
  
      // Only add body if the method is NOT GET
      if (httpMethodType !== "GET") {
        fetchOptions.body = JSON.stringify(prompt_for_the_body_do_Not_JSON_stringify);
      }
      
      console.log("fetchOptions-->", fetchOptions ,"\n url path -->",URLPath_DoNoT_Include_BackSlash );
      
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${URLPath_DoNoT_Include_BackSlash}`, fetchOptions);
  
      // console.log("\n\n--- Response from QueryFunction ---");
      console.log("cloned response:", JSON.stringify(response.clone()))
      // console.log("Headers:", JSON.stringify(Object.fromEntries(response.headers), null, 2));
      // console.log("response type:", typeof response);
  
      let body;
    try {
      body = await response.json();
    } catch (jsonError) {
      console.error("Error parsing JSON response for the body--:>>", jsonError);
      body = null;
    }
      console.log("Body:", JSON.stringify(body, null, 2));
      
      // Rest of the function remains the same...
  
      setResponseOrHeadersFromAUseStateFunc(response)
      setMakeARequestWithReactQuery(false)
      
      console.log("\n\n--- Full response object ---");
      console.log(JSON.stringify({body, headers: Object.fromEntries(response.headers)}, null, 2));
      
      return {body, headers: response.headers};
  
    } catch (error) {
      console.error("Error in QueryFunction:", error);
      console.log(" the request url -->",URLPath_DoNoT_Include_BackSlash, " \n fetchoptions-->",fetchOptions);
  
        setMakeARequestWithReactQuery(false)
        if (String(error).includes("Network request failed")){
        // ------- network error on client side 
          Alert.alert("Network  error ", "Oops ! we are having trouble cause of your internet connection"  )
        }
        Alert.alert("Error", "Oops ! an error occured" , )
        // ------------------ alert message here (above)
        
        console.log("error form fetching --",String(error));
        return error
  
      // ----------------------------------- got a error  -- respond to the user -------------------------
      // Alert.alert("","")
      // ----------------------------------- got a error  -- respond to the user -------------------------
  
    }
    // -------------------------------------- now make sure i also return the response from the 2 try after refresh token ------------------
    // ----------------------------------------------------------
    // ------------------------------------------  or maybe don't need to as Refetch works --- try an example to see  -->> yup I think it works 
    // -------------------------------------------- lets make a abstract function
    // --------------------------------------2.> setMakeARequest() .........3.> Upd ateJWT()
      // data_to_return_to_react_query 
    
  }

// function setJWT(arg0: null) {
//   throw new Error("Function not implemented.");
// }
// why do I have this
        