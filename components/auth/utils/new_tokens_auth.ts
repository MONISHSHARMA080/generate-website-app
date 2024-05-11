import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

interface TokenResponse {
  access: string;
  refresh: string;
}

const refreshTokens = async (refreshToken: string): Promise<TokenResponse> => {
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/token/refresh/`,
      { refresh: refreshToken }
    );

    return response.data;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    throw error;
  }
};

const setAuthorizationHeader = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  try {
    const storedTokens = await SecureStore.getItemAsync('JWT');
    if (storedTokens) {
      const tokens: TokenResponse = JSON.parse(storedTokens);
      const currentDate = new Date();

      if (tokens.access && tokens.refresh) {
        config.headers!.Authorization = `Bearer ${tokens.access}`;
        return config;
      }

      if (tokens.refresh) {
        const newTokens = await refreshTokens(tokens.refresh);
        await SecureStore.setItemAsync('JWT', JSON.stringify(newTokens));
        config.headers!.Authorization = `Bearer ${newTokens.access}`;
        return config;
      }
    }

    return config;
  } catch (error) {
    console.error('Error setting authorization header:', error);
    throw error;
  }
};

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => setAuthorizationHeader(config as InternalAxiosRequestConfig),
  (error: any) => Promise.reject(error)
);