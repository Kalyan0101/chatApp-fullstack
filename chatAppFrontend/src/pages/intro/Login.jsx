import React, { useRef } from 'react'
import wh from '@/assets/whatsApp.png'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import AuthHelper from '@/server/authHelper'
import { useDispatch } from 'react-redux'
import { storeLogin } from '@/store/authSlice'
import { useNavigate, NavLink } from 'react-router'

function Login() {

    const dispatch = useDispatch(null)
    const navigate = useNavigate()
    const phNo = useRef(null)

    const submitHandel = (e) => {
        e.preventDefault()

        const userNumber = phNo.current.value;

        AuthHelper.login(userNumber)
        .then((res) => {
            localStorage.setItem('token', res.token);
            dispatch(storeLogin( res ))
            navigate('/landing')
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

  return (
    <div>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
            <img className='w-1/4' src={wh} alt="" />
            <h1 className='text-xl'>
                <NavLink  
                    to={'/intro/signup'}
                    className={`px-3 py-1`}
                >Signup</NavLink >
                /
                <NavLink  
                    to={'/intro/login'}
                    className={({ isActive }) => `${isActive ? "px-3 py-1 rounded-md text-green-400 font-semibold" : ""}`}
                >Login
                </NavLink >
            </h1>            
            <form className='flex flex-col'>
                <Input 
                    ref={phNo}
                    label={'Enter Phone Number: '}
                    />
                <Button 
                    onClick={submitHandel}
                    type='button'
                >Login</Button>
            </form>
        </div>
    </div>
  )
}

export default Login