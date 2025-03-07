import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { Linking, Login, WelcomePage } from './pages'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path='/' >
                <Route path='' element={<WelcomePage />}/>
                <Route path='linking' element={<Linking />}/>
                <Route path='login' element={<Login />}/>
            </Route>
            <Route path='landing' element={<App />} />
        </Route>
    )
)


createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <RouterProvider router={router}/>
    </Provider>
)
