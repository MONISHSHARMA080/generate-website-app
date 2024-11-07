import JWTStore from "@/app/store";
import { factory_for_http_req_body_and_head } from "@/components/helperfunc";
import axios from "axios";
import {  useRouter } from "expo-router";
import { deleteItemAsync, getItem, getItemAsync, setItem } from "expo-secure-store";
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

export type httpMethodType = "GET" | "PUT" | "POST" | "DELETE";
export type queryFunctionParamType = { URLPath_DoNoT_Include_BackSlash:string, setMakeARequestWithReactQuery:React.Dispatch<React.SetStateAction<boolean>>,
   setResponseOrHeadersFromAUseStateFunc, prompt_for_the_body_do_Not_JSON_stringify:Object,
    httpMethodType:httpMethodType
  }

  export async function QueryFunction(param: queryFunctionParamType) {
    
      
      let token = JSON.parse(getItem("JWT")).access
      console.log("\n //==in QueryFunction --/// \n", JSON.stringify(param.prompt_for_the_body_do_Not_JSON_stringify),"URLPath_DoNoT_Include_BackSlash", param.URLPath_DoNoT_Include_BackSlash);
      
   
    try {

      var fetchOptions: RequestInit = {
        method: param.httpMethodType,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      };
  
      // Only add body if the method is NOT GET
      if (param.httpMethodType !== "GET") {
        fetchOptions.body = JSON.stringify(param.prompt_for_the_body_do_Not_JSON_stringify);
      }
      
      console.log("fetchOptions-->", fetchOptions ,"\n url path -->",param.URLPath_DoNoT_Include_BackSlash );
      
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${param.URLPath_DoNoT_Include_BackSlash}`, fetchOptions);
  
      // console.log("\n\n--- Response from QueryFunction ---");
      console.log("cloned response:", JSON.stringify(response.clone()))
  
      let body;

    try {
      body = await response.json();
    } catch (jsonError) {
      console.error("Error parsing JSON response for the body--:>>", jsonError);
      body = null;
    }
      console.log("Body:", JSON.stringify(body, null, 2));
      
      // Rest of the function remains the same...
  
      param.setResponseOrHeadersFromAUseStateFunc(response)
      param.setMakeARequestWithReactQuery(false)
      
      console.log("\n\n--- Full response object ---");
      console.log(JSON.stringify({body, headers: Object.fromEntries(response.headers)}, null, 2));
      
      return {body, headers: response.headers};
  
    } catch (error) {
      console.error("Error in QueryFunction:", error);
      console.log(" the request url -->",param.URLPath_DoNoT_Include_BackSlash, " \n fetchoptions-->",fetchOptions);
  
      param.setMakeARequestWithReactQuery(false)
        if (String(error).includes("Network request failed")){
        // ------- network error on client side 
          Alert.alert("Network  error ", "Oops ! we are having trouble cause of your internet connection"  )
        }
        Alert.alert("Error", "Oops ! an error occured" , )

        console.log("error form fetching --",String(error));
        return error
  
      }  }
        

async function QueryFunction2(param: queryFunctionParamType) {
  // tryCatchAsyncForFetch
  // what will I do here -->
  // 
  // 1)fetch the thing , and 2) provide a return type

  // 1--> fetching, fetch the thing if 403 then update the jwt and refetch it(we do it in the updarejwt func )
  // 
  // <--

  // logging the state for the debugging 
  console.log(param);
  

  let token = await getItemAsync("JWT")

  let [err, JWT_value_from_store] = tryCatchFn(()=>{JSON.parse(token)})

  if(err){
    Alert.alert("Fatal error","Can't parse jwt tokens")
    return
  }
  let access_token = JWT_value_from_store.access

  let [error, JWT_value_from_storeprompt_for_the_body_that_is_stringified] = tryCatchFn(()=>JSON.stringify(param.prompt_for_the_body_do_Not_JSON_stringify))
  
  if(err){
    Alert.alert("error","Can't stringify the prompt")
    return
  }

  let requestObj:RequestInit = factory_for_http_req_body_and_head(param.httpMethodType, access_token, JWT_value_from_storeprompt_for_the_body_that_is_stringified)

  const [error_1, stringifiedResult, data] = await tryCatchAsyncForFetch(() => fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${param.URLPath_DoNoT_Include_BackSlash}`, requestObj));
    

}