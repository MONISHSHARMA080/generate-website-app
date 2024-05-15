import { Alert } from "react-native";

export  function alert_user_for_common__errors_from_backend_given_by_Rquery(data) {
    // console.log("{{}}}}}--==",data);
    if (data === undefined || data === null ){
        console.log("\n\n------------------------------null--------------------------\n\n");
        
        return 
    }
    if (!data){
        console.log("-----===-0=o=iwecbkewciuew");

        
        return
    }
    
    console.log("hopefully read ++\n\n --data-->>",data);
    if (data.body.status_code ===200 || data.body.status_code ===201 ){
        console.log("hopefully read ");
        
        return
    }
    console.log("\n\n data from the alert_user_for_common__errors_from_backend_given_by_Rquery--->>>",data);
    // return data
   if (String(data.body.message_for_the_user).length > 2) {
     if (data.body.status_code >= 500) {
         Alert.alert("Something went wrong on our side", data.body.message_for_the_user);
     } else {
         Alert.alert("Something went wrong", data.body.message_for_the_user);
     }
   }
    
}