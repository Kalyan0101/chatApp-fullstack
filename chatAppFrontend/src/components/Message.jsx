import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, } from '@fortawesome/free-solid-svg-icons'


function Message({
  message,
  time,
  side
}) {
  return (
    <div className={`w-fit my-3 px-2 py-1 rounded-lg text-right ${side == 'left' ? "ml-0 mr-auto dark:bg-[#353535]" : "mr-0 ml-auto dark:bg-[#005C4B]"} text-sm`}>
      <p className='text-start'>🕉Har Har MahaDev; Sambha Sada Shiv</p>
      <span 
      className='text-[.68rem] opacity-75'>
        11:30 AM 
        <FontAwesomeIcon icon={faCheck} />
      </span>
    </div>
  )
}

export default Message