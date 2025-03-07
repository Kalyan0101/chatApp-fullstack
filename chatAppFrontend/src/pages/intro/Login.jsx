import React, { useRef } from 'react'
import wh from '@/assets/whatsApp.png'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import Helper from '@/server/helper'
import { useDispatch } from 'react-redux'
import { storeLogin } from '@/store/authSlice'
import { useNavigate } from 'react-router'

function Login() {

    const dispatch = useDispatch(null)
    const navigate = useNavigate()
    const phNo = useRef(null)
    const name = useRef(null)

    const submitHandel = (e) => {
        e.preventDefault()

        const userName = name.current.value;
        const userNumber = phNo.current.value;

        Helper.signup(userNumber, userName)
        .then((res) => {
            localStorage.setItem('token', res.token);
            dispatch(storeLogin({ res }))
            navigate('')
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

  return (
    <div>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
            <img className='w-1/4' src={wh} alt="" />
            <form className='flex flex-col'>
                <Input 
                    ref={phNo}
                    label={'Enter Phone Number: '}
                    />
                <Input 
                    ref={name}
                    label={'Enter Username: '}
                />
                <Button 
                    onClick={submitHandel}
                    type='button'
                >Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default Login