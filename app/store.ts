import { create, createStore } from 'zustand';
import { getItem, setItem } from 'expo-secure-store';

interface BearState {
  JWT: string | null
  setJWT: (jwt: string) => void
  
}

const JWTStore = create<BearState>()((set) => ({
  JWT: getItem('JWT') || null,
  setJWT: (jwt) => {
    set({ JWT: jwt });
    setItem('JWT', jwt);
  },
}))

export default JWTStore;