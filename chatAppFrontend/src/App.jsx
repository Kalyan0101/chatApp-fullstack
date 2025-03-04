import { useEffect, useState } from 'react'
// import './App.css'
import Drawer from './components/Drawer'
import HeroSection from './components/HeroSection'


function App() {

  {
    useEffect(() => {

      const token = "14a3669adf537dbc3e2578b4409a387b15bb5bc4"

      fetch('http://127.0.0.1:8000/validate/',{
      // fetch('http://127.0.0.1:8000/login/',{
        method: "GET",
        // method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `${token}`,
        },
        // body: JSON.stringify({
        //   phonenumber: '159632510',
        //   username: 'admin',
        // })
      })
      .then((res) => {
        // NOTE: status came in heder so it need to handel first then data message

        console.log(res);        
        return res.json()
      })
      .then((data) => {
        console.log(data);
        
        // console.log(data.message);
      })
    }, [])
  }


  return (
    <>
      {/* <div className="">
        <Drawer />
        <HeroSection />
      </div> */}
    </>
  )
}

export default App
