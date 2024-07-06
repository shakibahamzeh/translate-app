interface StoreState {
    language: string;
    setLanguage: (lang: string) => void;
    toLanguage: string;
    setToLanguage:(lang : string) => void;
    text : string;
    setText : (text : string) => void;
    answer : string;
    setAnswer :  (answer : string) => void;
  }

  export type {StoreState}