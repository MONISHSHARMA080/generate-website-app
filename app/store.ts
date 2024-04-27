import { create, createStore } from 'zustand';
import { getItem, setItem } from 'expo-secure-store';

interface JWTState {
  JWT: string | null;
  setJWT: (jwt: string | null) => void;
}

const JWTStore = create<JWTState>()((set) => ({
  JWT: getItem('JWT') || null,
  // setJWT: (jwt) => {
  //   set({ JWT: jwt });
  //   setItem('JWT', jwt);
  // },
setJWT :(jwt) => set((state) => ({ JWT:  jwt }))
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
}));


export default JWTStore;