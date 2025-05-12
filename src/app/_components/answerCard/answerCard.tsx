"use client"
import React, { useState, useEffect } from 'react'
import { Copy, VolumeHigh } from 'iconsax-react'
import useStore from '@/store/useStore'
import { Language } from '../translateCard/card.types'
import toast from 'react-hot-toast'

const languages: Language[] = [
  { id: 1, lang: "English", keyLang: "en" },
  { id: 2, lang: "French", keyLang: "fr" },
  { id: 3, lang: "Spanish", keyLang: "es" }
];

const AnswerCard = () => {
  const { toLanguage, setToLanguage, answer, setAnswer } = useStore((state) => ({
    toLanguage: state.toLanguage,
    setToLanguage: state.setToLanguage,
    answer: state.answer,
    setAnswer: state.setAnswer
  }));

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const handleCopyToClipboard = () => {
    if (answer) {
      navigator.clipboard.writeText(answer)
        .then(() => {
          setCopied(true);
          toast.success("Copied to clipboard!");
          setTimeout(() => setCopied(false), 1500);
        })
        .catch(() => {
          toast.error("Failed to copy text.");
        });
    }
  };
  
  const handleSpeak = () => {
    if (!answer) return;

    const utterance = new SpeechSynthesisUtterance(answer);
    const voice = voices.find(v => v.lang.startsWith(toLanguage));

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = toLanguage;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-96 bg-[#0f1523] rounded-2xl p-8 lg:w-[600px]">
      <ul className="text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold">
        {languages.map(lang => (
          <li
            key={lang.id}
            className={`list-none text-sm cursor-pointer px-2 py-2 rounded-lg transition-all duration-200 ${
              toLanguage === lang.keyLang ? 'bg-[#4c5563] text-white' : ''
            }`}
            onClick={() => setToLanguage(lang.keyLang)}
          >
            {lang.lang}
          </li>
        ))}
      </ul>

      <p className="min-h-[200px] pt-6 text-white">
        {answer || <span className="text-[#4D5562]">Translation will appear here...</span>}
      </p>

      <div className="w-full flex justify-between mt-10 items-center">
        <div className="flex gap-x-2">
          <div
            className="p-1 border-2 border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-xl cursor-pointer"
            onClick={handleSpeak}
          >
            <VolumeHigh size="18" color="#4D5562" variant='Bold'/>
          </div>

          <div
            className={`p-1 border-2 ${copied ? 'border-green-500' : 'border-[#4D5562]'} flex items-center justify-center h-8 w-8 rounded-xl cursor-pointer`}
            onClick={handleCopyToClipboard}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            <Copy size="20" color={copied ? "#22c55e" : "#4D5562"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerCard;