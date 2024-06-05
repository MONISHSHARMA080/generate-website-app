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
      
      const router = useRouter();
      deleteItemAsync("JWT") ;
          
          //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
           setJWT(null)
          
    router.replace('/(main_app)/');
     }
    //  console.log("\n\n ================================8888888888888888-===========response and access(jsut to be sure ) -->>",refresh,"\n access -----", access);
     
    // console.log("\n\n checking both the jwt tokens -->", Jwt_string,JSON.stringify({access,refresh}), "\n\n\n are both of these same -->>", JSON.stringify({access,refresh}) === Jwt_string );
    refetch()
  
   } catch (error) {
    console.log("\n -- in the error in updateJWT(");
    // ------------------------------------------ Alert -----------------------------------------------------
    // alert the user and respond to the backend --or may be retry 
    // ------------------------------------------ Alert -----------------------------------------------------
    console.error(error)
   }
  }



  export async function QueryFunction(URLPath_DoNoT_Include_BackSlash,setJWTTokensInState_Zustand_here,refetch,setMakeARequestWithReactQuery,setResponseOrHeadersFromAUseStateFunc, prompt_for_the_body_do_Not_JSON_stringify, ) {
    let token = JSON.parse(getItem("JWT")).access
  console.log(" \n //==in it --/// \n",JSON.stringify(prompt_for_the_body_do_Not_JSON_stringify));
 
      try {
       
      
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/${URLPath_DoNoT_Include_BackSlash}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(prompt_for_the_body_do_Not_JSON_stringify)
      });
      if(response.status === 401){
        UpdateJWT(setJWTTokensInState_Zustand_here,refetch)
        refetch()
      }
      console.log(response.status, "---- from the query function func for updating token ----");
      
  
      const body = await response.json();
      // const text = await response.text();
    //   console.log("Response data from temp_website:", body, "\n\nresponse -->",response, "\n\n --t--ex--t",);
      setResponseOrHeadersFromAUseStateFunc(response)
      setMakeARequestWithReactQuery(false)
    //   console.log("\n\n =======8888888======= lets see what is getting out -->>",{body,"headers":response},"===888888===\n\n");
      
      return {body,"headers":response};
  
    } catch (error) {
  
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
    // --------------------------------------2.> setMakeARequest() .........3.> UpdateJWT()
      // data_to_return_to_react_query 
          
      // if (data.status===401){
      //   console.log("\n in the data two---");
      //   UpdateJWT(setJWT)
      //   // don't need to retuern form here as it already re runs the function
      // }
      
      // setMakeARequest(false)
  
    // -------------------------------------- now make sure i also return the response from the 2 try after refresh token ------------------
  
  
  }

function setJWT(arg0: null) {
  throw new Error("Function not implemented.");
}
// why do I have this
        