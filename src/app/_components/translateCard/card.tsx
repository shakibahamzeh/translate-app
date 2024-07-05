"use client"
import React, { useState } from 'react'
import Textarea from '../textarea/textarea'
import Button from '../button/button'
import { Copy, VolumeHigh } from 'iconsax-react'

const Card = () => {
    const [text , setText] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(text.length < 500){
     setText(e.target.value);
    }
    console.log(text);
    };
    const handleClick = () => {
    alert('Button clicked!');
    };
  return (
    <div className='h-96 bg-[#040711] rounded-2xl p-8'>
        <header className='text-[#4D5562] flex pb-4 border-b border-[#4D5562] gap-x-4 font-semibold'>
            <li className='list-none text-sm'>Detect Language</li>
            <li className='list-none text-sm'>English</li>
            <li className='list-none text-sm'>French</li>
            <li className='list-none text-sm'>Spanish</li>
        </header>
        <Textarea  
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here..."
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
                    <Copy size="18" color="#4D5562"/>
                </div>
                
            </div>
            <Button onClick={handleClick} variant="primary">Translate</Button>
        </div>
    </div>
  )
}

export default Card