import { useEffect, useState } from 'react'
// import './App.css'
import helper from './server/helper'
import { storeLogin, storeLogout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'


function App() {

    // useEffect(() => {
    //   // fetch('http://127.0.0.1:8000/validate/',{
    //   fetch('http://127.0.0.1:8000/login/',{
    //     // method: "GET",
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Authorization': `${token}`,
    //     },
    //     body: JSON.stringify({
    //       phonenumber: '159632516',
    //       username: 'admin',
    //     })
    //   })
    //   .then((res) => {
    //     console.log(res);        
    //     return res.json()
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    // }, [])

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token){
      helper.validate(token)
      .then((data) => {
        dispatch(storeLogin({ data }))
        navigate('landing')
      })
      
      .catch((error) => {
        navigate('intro')
        console.log(error.message);
      })
      .finally(() => setLoading(false))
    }else{
      setLoading(false)
      navigate('intro')
    }
  }, [])
  

  return loading ? 
    <>      
      <div className='w-full p-5 bg-white font-bold text-pink-500 text-center uppercase'>Radha radha</div>
    </>
  :
    <>
      <Outlet />
    </>
}

export default App
