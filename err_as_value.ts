
function tryCatchFn(fn: () => any): [Error, any] {

  let return_val_of_func: any

  try {
    return_val_of_func = fn()
    return [null, return_val_of_func]

  } catch (error) {
    console.log("error occurred in the tryCatch function \n error is -->", error, "\n <--");
    return [error, null]
  }

}

let [a, b] = tryCatchFn(() => { JSON.parse("<iucbewiuc>eecb") })
setTimeout(() => console.log("value of the result is ", b), 3000
)

type Result<T> = Promise<[Error | null, any]>;

async function tryCatchAsync<T>(fn: () => Promise<T>): Result<T> {
  try {
    const result = await fn();
    return [null, result];
  } catch (error) {
    console.log("Error occurred in the tryCatchAsync function \n error is -->", error, "\n <--");
    return [error, null];
  }
}

type ResultFromFetch<T> = Promise<[Error | null, string, any]>;


async function tryCatchAsyncForFetch<T>(fn: () => Promise<Response> ): ResultFromFetch<T> {
  // implement the fetch and trycatch for the JSON.stringify() 
  try {
    const result = await fn();
    const [stringifyError, stringified] = tryCatchFn(() => JSON.stringify(result));

    if (stringifyError) {
      return [new Error(`Failed to stringify response: ${stringifyError.message}`), null, result];
    }
    
    return [null, stringified, result];
  } catch (error) {
    console.log("Error occurred in the tryCatchAsync function \n error is -->", error, "\n <--");
    return [error, null, null];
  }

}