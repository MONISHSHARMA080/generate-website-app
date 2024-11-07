// import JWTStore from "@/app/store";
import { QueryFunction } from "@/components/auth/utils/functions_for_updating_tokens";
import { useQuery,UseQueryResult } from "@tanstack/react-query";
import React from "react";

type httpMethodType = "GET" | "PUT" | "POST" | "DELETE";

export default function reactQueryMakeAReq(textForTheNameAndKey:string, makeARequestForGetNameForTheProject:boolean, setMakeARequestForGetNameForTheProject:React.Dispatch<React.SetStateAction<boolean>>, 
    setResponnseJSONForGetNameForTheProject:React.Dispatch<React.SetStateAction<any>>, JSONObject:Object, setJWT:any, httpMethod:httpMethodType
 ) {
    // const { setJWT } = JWTStore();
    console.log("making a req at -->",textForTheNameAndKey, "\n  http method and object", httpMethod,JSONObject,"\n additonal things boolean state for the enabled-->", makeARequestForGetNameForTheProject);

    // can make get_the_name_for_the_project 'reactQueryReturn' statement
    const get_the_name_for_the_project:UseQueryResult = useQuery({
        queryKey:[textForTheNameAndKey],
        // queryFn: ()=>QueryFunction(textForTheNameAndKey,setMakeARequestForGetNameForTheProject,setResponnseJSONForGetNameForTheProject, JSONObject, httpMethod),
        queryFn: ()=>QueryFunction({
          URLPath_DoNoT_Include_BackSlash:textForTheNameAndKey,
          setMakeARequestWithReactQuery:setMakeARequestForGetNameForTheProject,
          setResponseOrHeadersFromAUseStateFunc:setResponnseJSONForGetNameForTheProject,
          prompt_for_the_body_do_Not_JSON_stringify:JSONObject,
          httpMethodType:httpMethod,          
        }
      ),
        enabled:makeARequestForGetNameForTheProject,
      })
      console.log("---------",get_the_name_for_the_project.data);

      return get_the_name_for_the_project
}