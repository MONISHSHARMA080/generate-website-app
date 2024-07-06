import JWTStore from "@/app/store";
import { useRouter } from "expo-router";
import { deleteItemAsync } from "expo-secure-store";
import { Alert } from "react-native";

export  function alert_user_for_common__errors_from_backend_given_by_Rquery(data) {

   try {
    let data_body_status_code 
    let data_body_message_for_the_user 

        try {
            data_body_status_code = data.body.status_code
        } catch (error) {
            data_body_status_code = undefined
        }

        try {
            data_body_message_for_the_user = data.body.data.body.message_for_the_user
        } catch (error) {
            data_body_message_for_the_user = undefined
        }
     

     if (data === undefined || data === null || data.body.status_code === null || data.body.status_code === undefined || data_body_message_for_the_user === undefined ){
         console.log("\n\n-------------------data is null in the func alert_user_for_common__errors_from_backend_given_by_Rquery-----------null--------------------------",data,"\n\n");
         return 
     }
     if (!data){
         console.log("\n\n-------------------data is not here and this is not happening, in the func alert_user_for_common__errors_from_backend_given_by_Rquery-----------null--------------------------\n\n");
         return
     }
     
     // console.log("hopefully read ++\n\n --data-->>",data);
     if (data.body.status_code ===200 || data.body.status_code ===201 ){        
         return
     }
 
     // console.log("\n\n data from the alert_user_for_common__errors_from_backend_given_by_Rquery--->>>",data);
     // return data
 
     // console.log(" in func alerting the user");
     if (String(data_body_message_for_the_user).length > 2) {
     //    console.log(" in func alerting the user 222222 ,  \n\n", typeof data.body.message_for_the_user, "\n\n ==Oops! Your name was not found on the server-> ",data.body.message_for_the_user.trim()==="Oops! Your name was not found on the server");
    
        
      if (data.body.status_code >= 500) {
          Alert.alert("Something went wrong on our side", data_body_message_for_the_user);
      } else {
          Alert.alert("Something went wrong", data_body_message_for_the_user);
      }
    }
   } catch (error) {
    Alert.alert("Something went wrong on our side");
    console.log("error while parcing the data ", error);
    
   }
    
}

