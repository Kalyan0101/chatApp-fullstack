import React, { forwardRef, useId } from 'react'

function Input({
    label,
    type = 'text',
    className
}, ref) {
    const id = useId();
  return (
    <div className='flex gap-1 justify-between items-center my-3'>
        {label && <>
            <label 
                htmlFor={id}
                className='w-full bg-green-500 text-black py-2 px-2 rounded-l-md text-lg'
            >{label}</label>
        </>}
        <input 
            type={type}
            id={id}
            ref={ref}
            className={`text-black outline-green-500 focus:bg-gray-300 px-3 py-2 rounded-r-md text-xl ${className}`}
        />
    </div>
  )
}
export default forwardRef(Input)