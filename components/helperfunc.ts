import { httpMethodType } from "./auth/utils/functions_for_updating_tokens";

export function factory_for_http_req_body_and_head(httpMethodType:httpMethodType, token:string, prompt_for_the_body_that_is_stringified:string) :RequestInit {
    return   {
        method: httpMethodType,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body :(httpMethodType !== "GET"? prompt_for_the_body_that_is_stringified: "" ) ,
      };
}