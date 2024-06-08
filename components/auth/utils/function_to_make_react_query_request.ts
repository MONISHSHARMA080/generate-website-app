import { useQuery } from "@tanstack/react-query";
import { QueryFunction } from "./functions_for_updating_tokens";
import { useState } from "react";


export default function function_to_make_react_query_request(search_path_for_the_backend:string, setJWT_function_from_zustand, set_The_Json_Response_in_the_state_function, setMakeARequestForTempProject, makeARequestForTempProject) {

    // const[makeaRequest, setMakeARequest] = useState(false)

    // const get_all_the_projects_of_the_user = useQuery({
    const {data, isSuccess, status, refetch} = useQuery({
        queryKey:[search_path_for_the_backend],
        queryFn: ()=>QueryFunction(search_path_for_the_backend, setJWT_function_from_zustand, refetch, setMakeARequestForTempProject, set_The_Json_Response_in_the_state_function),
        enabled:makeARequestForTempProject,
        // retry:2
        // ------------ decide on the project name  ----------------
      })

    return {data, isSuccess, status}
      
} 
  