import React from 'react'
import wh from '@/assets/whatsApp.png'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

function WelcomePage() {

  const navigate = useNavigate()

  const clickHandel = () => {
    navigate('linking')
  }
  return (
    <div>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
            <img className='w-1/4' src={wh} alt="" />
            <div className="flex flex-col gap-8 justify-center items-center text-gray-400 text-center">
                <p className='text-2xl text-white'>Welcome to WhatsApp</p>
                <p className='text-sm'>A simple, reliable, and private way to use WhatsApp on your computer.</p>
                <Button 
                  className='w-fit bg-[#1DAA61] text-black px-14 py-1.5 rounded text-sm font-normal'
                  onClick={clickHandel}
                >
                  Get Started
                </Button>
                <p className='text-sm'>Version 2.2509.4.0</p>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage