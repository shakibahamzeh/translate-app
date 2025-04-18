"use client"
import React from 'react'
import Textarea from '../textarea/textarea'
import Button from '../button/button'
import { Copy, VolumeHigh } from 'iconsax-react'
import { useMutation } from '@tanstack/react-query'
import Translate from '@/core/translate.services'
import { Language } from "./card.types"
import useStore from '@/store/useStore'

const Card: React.FC = () => {
  const languages: Language[] = [
    { id: 0, lang: "Detect Language", keyLang: "autodetect"},
    { id: 1, lang: "English", keyLang: "en" },
    { id: 2, lang: "French", keyLang: "fr" },
    { id: 3, lang: "Spanish", keyLang: "es" }
  ];

  const {
    language, setLanguage,
    toLanguage, setToLanguage,
    text, setText,
    answer, setAnswer
  } = useStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
    toLanguage: state.toLanguage,
    setToLanguage: state.setToLanguage,
    text: state.text,
    setText: state.setText,
    answer: state.answer,
    setAnswer: state.setAnswer
  }));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (text.length < 500) {
      setText(e.target.value);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await new Translate().getTranslate({
        params: { q: text, langpair: `${language}|${toLanguage}` }
      });
      return res?.data?.responseData?.translatedText;
    },
    onSuccess: (translatedText: string) => {
      setAnswer(translatedText || "");
    },
    onError: (err: any) => {
      console.error("Translation failed:", err);
    }
  });

  const handleSpeak = () => {
    if (!text) return;
  
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language));
  
    if (voice) utterance.voice = voice;
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <div className='h-96 bg-[#040711] rounded-2xl p-8 lg:w-[500px]'>
      <header className='text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold'>
        {languages.map(lang => (
          <li
            key={lang.id}
            className={`list-none text-sm cursor-pointer px-2 py-1 rounded-md transition-all duration-200
                ${language === lang.keyLang ? 'bg-red-500 text-white' : ''}`}
            onClick={() => setLanguage(lang.keyLang)}
          >
            {lang.lang}
          </li>
        ))}
      </header>

      <Textarea
        value={text}
        onChange={handleChange}
        className='w-full pt-6 text-sm resize-none min-h-[200px] bg-transparent text-white placeholder:text-[white] outline-none'
        maxLength={500}
        length={text.length}
      />

      <div className='w-full flex justify-between mt-4 items-center'>
        <div className='flex gap-x-4'>
          <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'     onClick={handleSpeak}>
            <VolumeHigh size="18" color="#4D5562" />
          </div>
          <div
            className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'
            onClick={() => {
             navigator.clipboard.writeText(text);
            }}
          >
            <Copy size="18" color="#4D5562" />
          </div>
        </div>
        <Button onClick={() => mutate()} variant="primary">
          {isPending ? "Translating..." : "Translate"}
        </Button>
      </div>
    </div>
  )
}

export default Card;