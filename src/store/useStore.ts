// src/store/useStore.js

import { StoreState } from '@/types/store.types';
import {create} from 'zustand';

// Define your store
const useStore = create<StoreState>((set) => ({

  language: 'en',
  setLanguage: (lang : string) => set({ language: lang }),
  toLanguage:'fr',
  setToLanguage:(lang : string) => set({toLanguage : lang}),
  text : "",
  setText: (text : string) => set({text : text}),
  answer :"",
  setAnswer:(answer : string) => set({answer : answer})
}));

export default useStore;
