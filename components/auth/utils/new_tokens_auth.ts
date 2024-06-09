import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getItem,setItem,deleteItemAsync } from 'expo-secure-store';
import { Alert } from 'react-native';
import JWTStore from '@/app/store';
import Constants from 'expo-constants';

interface TokenResponse {
  access: string;
  refresh: string;
}

const refreshAccessToken = async () => {
    // const { setJWT,JWT } = JWTStore();
    console.log("\n------------- from updating the refresh tokens ------------\n");
    
  const refreshToken = JSON.parse(getItem('JWT')).refresh;
  console.log("tokens from the axios interpose  ,, refresh", refreshToken, "\n both ->",getItem('JWT'));
  
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(
      `https://generate-a-website.fly.dev/api/token/refresh/`,
      { refresh: refreshToken }
    );
console.log("\n response from tying to refresh the tokens -->>",response,"\n response.data -->>",response.data,"\n\n");
// setJWT(JSON.stringify(response.data))

    const { access, refresh } = response.data;
    console.log("\n\n response and access(jsut to be sure ) -->>",refresh, access);
    
    if (refresh && access){
        console.log("----in the loop --------",JSON.stringify({access,refresh}));
        
        deleteItemAsync("JWT").then(()=>{
            console.log("\n----in the function  --------");

            setItem("JWT",JSON.stringify({access,refresh}))
            console.log("\nseeing if we got the  new jwt --->>>",getItem("JWT"));
            
        }) }
    else{
        Alert.alert("Error occurred","Oops! we are having trouble going to the server ") 
        // ----------------
        // add a button here to report it to the backend 
        // ----------------
    }
    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
    // ---------------probally do not do anything as i already returnd the error 
    // ------------------No wait the above error was for not fetching the tokens --------------
    // here tell te user about the error and also repor the backend  
  }
};

const axiosInstance = axios.create({
  baseURL: "https://generate-a-website.fly.dev",
  headers: {
    Authorization: `Bearer ${getItem('JWT')}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const access = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (error) {
        console.error('Error refreshing access token:', error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;