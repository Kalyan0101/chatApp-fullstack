import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import wh from '@/assets/whatsApp.png'

function Info() {
  return (
    <div className='dark:bg-[#2C2C2C] h-full flex flex-col justify-center items-center text-[#9E9E9E] text-[.9rem] px-10'>
        <div className="flex flex-col justify-center items-center text-center">
            <img className='w-1/6' src={wh} alt="" />
            <h1 className='text-xl text-white mb-2'>WhatsApp for windows</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
        </div>
        <p className='absolute bottom-12 '><FontAwesomeIcon icon={faLock} /> End-to-end encrypted</p>
    </div>
  )
}

export default Info