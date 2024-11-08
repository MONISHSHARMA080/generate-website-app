export function tryCatchFn<T>(fn: () => T): [Error | null, T | null] {
  try {
    const result = fn();
    return [null, result];
  } catch (err) {
      return [err, null]; 
    
  }
}
// type ResultForTryCatch<T> = [Error | null, T | null];

// // Generic function that infers the return type of the passed function
// export function tryCatchFn<T>(fn: () => T): ResultForTryCatch<T> {
//   try {
//     const result = fn();
//     return [null, result];
//   } catch (error) {
//     console.log("error occurred in the tryCatch function \n error is -->", error, "\n <--");
//     return [error instanceof Error ? error : new Error(String(error)), null];
//   }
// }



type Result<T> = Promise<[Error | null, any]>;

export async function tryCatchAsync<T>(fn: () => Promise<T>): Result<T> {
  try {
    const result = await fn();
    return [null, result];
  } catch (error) {
    console.log("Error occurred in the tryCatchAsync function \n error is -->", error, "\n <--");
    return [error, null];
  }
}

type ResultFromFetch<T> = Promise<[Error | null, string, Response, Object|null]>;


export async function tryCatchAsyncForFetch<T>(fn: () => Promise<Response> ): ResultFromFetch<T> {
  // implement the fetch and trycatch for the JSON.stringify() 
  try {
    const result = await fn();
    const [stringifyError, stringified] = tryCatchFn(() => JSON.stringify(result));

    if (stringifyError) {
      return [stringifyError, null, result, null];
    }

    let [error,body_object] = await tryCatchAsync(()=>{return result.json()})
   if(error){
    return [stringifyError, stringified, result, null];
  }
    
    return [null, stringified, result, body_object];
  } catch (error) {
    console.log("Error occurred in the tryCatchAsync function \n error is -->", error, "\n <--");
    return [error, null, null, null];
  }

}