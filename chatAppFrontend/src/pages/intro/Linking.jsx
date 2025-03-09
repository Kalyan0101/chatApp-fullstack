import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faGear } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

function Linking() {

  const navigate = useNavigate()

  const clickHandel = () => {
    navigate('/intro/login')
  }

  return (
    <div className='bg-white text-black w-screen h-screen flex flex-col justify-center items-center'>
      {/* qr code */}
      <div className=""></div>
      {/* instruction */}
      <div className="flex flex-col items-start gap-6">
        <p className='text-xl'>To set up WhatsApp on your computer</p>
        <ol className='list-decimal flex flex-col gap-5 ml-4 text-gray-500'>
          <li className='pl-3'>Open WhatsApp on your phonenumber</li>

          <li className='pl-3'>Tap <span className='font-semibold'>Menu <FontAwesomeIcon className='align-middle w-4 border p-0.5 border-gray-300 rounded-sm' icon={faEllipsisVertical} /></span> on Android, or <span className='font-semibold'>Settings <FontAwesomeIcon className='align-middle w-4 border p-0.5 border-gray-300 rounded-sm' icon={faGear} /></span> on iPhone</li>

          <li className='pl-3'>Tap <span className='font-semibold'>Linked devices</span> and then <span className='font-semibold'>Link a device</span></li>

          <li className='pl-3'>Point your phone at this screen to capture the QR code</li>
        </ol>
        <p className='text-green-600'>Link with phone number</p>
        <button onClick={clickHandel}>skip</button>
      </div>
    </div>
  )
}

export default Linking