"use client"
import React, { useState } from 'react'
import Textarea from '../textarea/textarea'
import Button from '../button/button'
import { Copy, VolumeHigh } from 'iconsax-react'
import { useQuery } from '@tanstack/react-query'
import Translate from '@/core/translate.services';
import {Language} from "./card.types"
import useStore from '@/store/useStore'
import { StoreState } from '@/types/store.types'
import { useRouter, useSearchParams } from 'next/navigation'

const Card: React.FC = () => {

    const languages: Language[] = [
        {id : 1 , lang : "English" , keyLang : "en"},
        {id : 2 , lang : "French" , keyLang : "fr"},
        {id : 3 , lang : "Spanish" , keyLang : "es"}
    ]
    const { language, setLanguage, text , setText,toLanguage,setToLanguage,answer, setAnswer} = useStore((state) => ({
        language: state.language,
        setLanguage: state.setLanguage,
        toLanguage: state.toLanguage,
        setToLanguage: state.setToLanguage,
        text : state.text,
        setText : state.setText,
        answer : state.answer,
        setAnswer : state.setAnswer
      }));

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if(text.length < 500){
                setText(e.target.value);
            }
        };
        console.log(text);
        

        const { data , refetch} = useQuery({ queryKey: ['getTranslate',text], queryFn: async () => await new Translate().getTranslate({params : { q : text, langpair: `${language}|${toLanguage}`}})});
        const router = useRouter();
        console.log(router);
        
        const handleSubmit = () => {
            try {
                refetch();
                setAnswer(data?.data?.responseData?.translatedText);
                // router.push(`/?q=${text}!&langpair=${language}|${toLanguage}?ans=${answer}`)
            } catch(err){
                    console.error("Translation failed: ", err);
            }
           
        }

        
  return (
    <div className='h-96 bg-[#040711] rounded-2xl p-8'>
        <header className='text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold'>
            <li className='list-none text-sm'>Detect Language</li>
            {
                languages.map(lang => <li key={lang.id} className='list-none text-sm cursor-pointer' onClick={()=>setLanguage(lang.keyLang)}>{lang.lang}</li>)
            }
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
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <VolumeHigh size="18" color="#4D5562"/>
                </div>
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <Copy size="18" color="#4D5562" />
                </div>
                
            </div>
            <Button onClick={handleSubmit} variant="primary">Translate</Button>
        </div>
    </div>
  )
}

export default Card