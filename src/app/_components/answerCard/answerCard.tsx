"use client"
import React, { useState } from 'react'
import Textarea from '../textarea/textarea'
import Button from '../button/button'
import { Copy, VolumeHigh } from 'iconsax-react'
import { useQuery } from '@tanstack/react-query'
import Translate from '@/core/translate.services'
import { Language } from '../translateCard/card.types'
import useStore from '@/store/useStore'

const AnswerCard = () => {
  
    const languages: Language[] = [
        {id : 1 , lang : "English" , keyLang : "en"},
        {id : 2 , lang : "French" , keyLang : "fr"},
        {id : 3 , lang : "Spanish" , keyLang : "es"}
    ]

    const { toLanguage, setToLanguage , answer, setAnswer} = useStore((state) => ({
        toLanguage: state.toLanguage,
        setToLanguage: state.setToLanguage,
        answer : state.answer,
        setAnswer : state.setAnswer
      }));

      const handleCopyToClipboard = () => {
        if (answer) {
          navigator.clipboard.writeText(answer)
            .then(() => {
              console.log("Copied to clipboard successfully!");
              // Optionally, you could show a notification or some feedback to the user here
            })
            .catch((err) => {
              console.error("Failed to copy: ", err);
            });
        }
      };
  return (
    <div className='h-96 bg-[#040711] rounded-2xl p-8'>
        <header className='text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold'>
             {
                languages.map(lang => <li key={lang.id} className='list-none text-sm cursor-pointer' onClick={()=>setToLanguage(lang.keyLang)}>{lang.lang}</li>)
             }
        </header>
        <p className='min-h-[200px] pt-6 text-white'>{answer}</p>
        <div className='w-full flex justify-between mt-10 items-center'>
            <div className='flex gap-x-4'>
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <VolumeHigh size="18" color="#4D5562"/>
                </div>
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <Copy size="18" color="#4D5562" onClick={handleCopyToClipboard}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnswerCard;