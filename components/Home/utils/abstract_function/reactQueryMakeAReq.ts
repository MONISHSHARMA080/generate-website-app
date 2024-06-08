import JWTStore from "@/app/store";
import { QueryFunction } from "@/components/auth/utils/functions_for_updating_tokens";
import { useQuery,UseQueryResult } from "@tanstack/react-query";


export default function reactQueryMakeAReq(textForTheNameAndKey:string, makeARequestForGetNameForTheProject:boolean, setMakeARequestForGetNameForTheProject:React.Dispatch<React.SetStateAction<boolean>>, 
    setResponnseJSONForGetNameForTheProject:React.Dispatch<React.SetStateAction<any>>, JSONObject:JSON
 ) {
    const { setJWT } = JWTStore();

    // can make get_the_name_for_the_project 'reactQueryReturn' statement
    const get_the_name_for_the_project:UseQueryResult = useQuery({
        queryKey:['get_the_name_for_the_project'],
        queryFn: ()=>QueryFunction(`get_the_name_for_the_project`,setJWT,get_the_name_for_the_project.refetch,setMakeARequestForGetNameForTheProject,setResponnseJSONForGetNameForTheProject, JSONObject),
        enabled:makeARequestForGetNameForTheProject,
        // retry:2
        // ------------ decide on the project name  ----------------
      })
      return get_the_name_for_the_project
}