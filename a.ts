async function fetchData(url) {
        const response = await fetch(url); // Make the fetch call
       
        // console.log(String(response));
        const data = await response.json(); // Parse the JSON from the response
        console.log(data," \n\n" ,response);
        return data; // Return the parsed data
    
}

// Usage example:
fetchData('https://deployfirstwebsite-tofly-production.up.railway.app/api/create_temp_and_name_dir_for_user')
    