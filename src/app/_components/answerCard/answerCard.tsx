"use client"
import React, { useState } from 'react'
import Textarea from '../textarea/textarea'
import Button from '../button/button'
import { Copy, VolumeHigh } from 'iconsax-react'
import { useQuery } from '@tanstack/react-query'
import Translate from '@/core/translate.services'

const AnswerCard = () => {
  
    
  return (
    <div className='h-96 bg-[#040711] rounded-2xl p-8'>
        <header className='text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold'>
            <li className='list-none text-sm'>English</li>
            <li className='list-none text-sm'>French</li>
            <li className='list-none text-sm'>Spanish</li>
        </header>
        <p className='min-h-[200px] pt-6'>hhhhh</p>
        <div className='w-full flex justify-between mt-10 items-center'>
            <div className='flex gap-x-4'>
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <VolumeHigh size="18" color="#4D5562"/>
                </div>
                <div className='p-1 border border-[#4D5562] flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer'>
                    <Copy size="18" color="#4D5562"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnswerCard;