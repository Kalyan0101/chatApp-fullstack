import { useEffect, useState } from 'react'
// import './App.css'
import Drawer from './components/Drawer'
import HeroSection from './components/HeroSection'
import helper from './server/helper'
import { storeLogin, storeLogout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import WelcomePage from './pages/intro/WelcomePage'
import Linking from './pages/intro/Linking'
import Login from './pages/intro/Login'
import { useNavigate } from 'react-router'


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
      })
      
      .catch((error) => {
        navigate('/intro/')
        console.log(error.message);        
      })
      .finally(() => setLoading(false))
    }
  }, [])
  

  return (
    <>
      {/* <div className="">
        <Drawer />
        <HeroSection />
      </div> */}
      <div className='w-full p-5 bg-white font-bold text-pink-500 text-center uppercase'>Radha</div>
      {/* <Login /> */}
    </>
  )
}

export default App
