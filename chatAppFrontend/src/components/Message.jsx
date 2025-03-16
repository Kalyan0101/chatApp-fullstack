import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'


function Message({
  message,
  number,
  time
}) {

    const loginNumber = useSelector(state => state.userData.phonenumber)

  return (
    <div className={`w-fit my-3 px-2 py-1 rounded-lg text-right text-sm ${ loginNumber === number ? "mr-0 ml-auto dark:bg-[#005C4B]" : "ml-0 mr-auto dark:bg-[#353535]"}`}>
      <p className='text-start'>{message}</p>
      <span
        className='text-[.68rem] opacity-75'>
        {time}
        <FontAwesomeIcon icon={faCheck} />
      </span>
    </div>
  )
}

export default Message