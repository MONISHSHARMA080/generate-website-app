
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

// let [a,b] =  tryCatchfn(()=>fetchData('https://deployfirstwebsite-tofly-production.up.railway.app/api/create_temp_and_name_dir_for_user'))
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

async function abc() {
  console.log("in the async func");

  let [aa, bb] = await tryCatchAsync(async () => fetchData('https://deployfirstwebsite-tofly-production.up.railway.app/api/create_temp_and_name_dir_for_user'))
  
  console.log(`aa is ${aa} and \n bb is ${bb}`);
  console.log('bb is:', JSON.stringify(bb, null, 2));

}

abc()

type ResultFromFetch<T> = Promise<[Error | null, string, any]>;


async function tryCatchAsyncForFetch<T>(fn: () => Promise<T>): ResultFromFetch<T> {
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





async function fetchData(url) {
  const response = await fetch(url); // Make the fetch call

  // console.log(String(response));
  const data = await response.json(); // Parse the JSON from the response
  console.log(data, " \n\n", response);
  return data; // Return the parsed data

}

// Usage example:
// fetchData('https://deployfirstwebsite-tofly-production.up.railway.app/api/create_temp_and_name_dir_for_user')
