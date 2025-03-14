import { useEffect, useState } from 'react'
// import './App.css'
import helper from './server/authHelper'
import { storeLogin, storeLogout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token){
      helper.validate(token)
      .then((data) => {
        dispatch(storeLogin( data ))
        navigate('/landing')
      })
      
      .catch((error) => {
        navigate('/intro')
        console.log(error.message);
      })
      .finally(() => setLoading(false))

    }else{
      setLoading(false)
      navigate('/intro')
    }
  }, [navigate, localStorage])
  

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
