import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';


interface JWTState {
  JWT: string | null;
  setJWT: (jwt: string | null) => void;
  openDrawer: boolean ;
  setOpenDrawer: (openDrawer: boolean) => void;
  User_Name_from_Req: string | null;
  setUser_Name_from_Req: (User_Name_from_Req: string | null) => void;
  sitePromptStoredInState: string | null;
  setSitePromptStoredInState: (prompt: string | null) => void;
  sitePromptArray: string[]|null;  
  setSitePromptArray: (sitePrompts: string[]) => void; 
}

let array = SecureStore.getItem('allProjectsByUserInString')
let User_Name_from_Req = SecureStore.getItem('User_Name_from_Req')

const JWTStore = create<JWTState>((set) => ({
  JWT: SecureStore.getItem('JWT') || null,
  setJWT: (jwt) => set((state) => ({ JWT: jwt })),
  openDrawer: false,
  setOpenDrawer: (opendrawer) => set( (state) => ({ openDrawer: opendrawer }) ),
  User_Name_from_Req: User_Name_from_Req?User_Name_from_Req:null,
  setUser_Name_from_Req: (User_Name)=>set((state)=>({User_Name_from_Req:User_Name})), 
  sitePromptStoredInState: null,
  setSitePromptStoredInState: (prompt) => set((state) => ({ sitePromptStoredInState: prompt })),
  sitePromptArray: array?(array.split(',')):(['']),
  setSitePromptArray: (sitePrompts) => set((state) => ({ sitePromptArray: sitePrompts })), 
}));

export default JWTStore;