import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider.jsx'
import { Link, NavLink } from 'react-router-dom';

import { FiLogIn, FiRefreshCcw } from "react-icons/fi";
import Logo from './../assets/Logo';
import {
    MdOutlineLightMode,
    MdOutlineDarkMode
} from 'react-icons/md'
import LoadingScreen from './Loading.jsx';

export default function Navbar({ logout }) {
    const Mode = { Dark: 'dark', Light: 'light' }

    // Dark mode
    const [mode, setMode] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setMode(localStorage.getItem('theme'))
        } else {
            setMode(Mode.Dark)
        }
    }, [])
    useEffect(() => {
        if (mode === Mode.Light) {
            localStorage.setItem('theme', Mode.Light)
            document.documentElement.classList.remove(Mode.Dark)
            document.documentElement.classList.remove('bg-slate-900')
            document.documentElement.classList.add('bg-gray-50')
        } else if (mode === Mode.Dark) {
            localStorage.setItem('theme', Mode.Dark)
            document.documentElement.classList.add(Mode.Dark)
            document.documentElement.classList.add('bg-slate-900')
            document.documentElement.classList.remove('bg-gray-50')
        }

    }, [mode])
    // End of dark mode


    const contextValue = useContext(AuthContext);
    const { auth, setAuth } = contextValue || {}

    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        setLoading(true)
        await logout()
        setLoading(false)

    }

    return <>
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto mb-5">
            <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="text-indigo-500 md:order-1">
                    <Logo className='w-10 h-10' />
                </div>
                <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        {auth ?
                            ['Home', 'CPanel', 'Wishlist'].map((ele, idx) =>
                                <li key={idx} className="md:px-4 md:py-2 hover:text-indigo-400">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "text-indigo-500" : ""
                                        }
                                        to={ele === 'Home' ? '/' : ele.toLowerCase()}>{ele}</NavLink>
                                </li>
                            )
                            :
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "text-indigo-500" : ""
                                    }
                                    to='/'>Home</NavLink>
                            </li>
                        }
                        {mode === 'dark' ?
                            <div onClick={() => setMode(Mode.Light)} className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                                <MdOutlineLightMode size={25} />
                            </div> :
                            <div onClick={() => setMode(Mode.Dark)} className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                                <MdOutlineDarkMode size={25} />
                            </div>

                        }

                    </ul>
                </div>
                <div className="order-2 md:order-3 flex space-x-2">
                    {auth ?
                        <div className="flex items-center gap-4 p-4 py-2 bg-gray-800  text-white  rounded-xl shadow-md">
                            <span className="font-semibold text-lg">Hello, {auth.userName}</span>
                            {loading ? <>
                                <LoadingScreen fullScreen={true} />

                                <button
                                    className="cursor-not-allowed bg-gray-600 hover:bg-gray-500  text-gray-100  rounded-full px-4 py-2 text-sm transition-colors duration-300"
                                >
                                    <FiRefreshCcw className="w-6 h-6 ms-2 animate-spin" />
                                </button>
                            </>
                                :
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-600 hover:bg-gray-500  text-gray-100  rounded-full px-4 py-2 text-sm transition-colors duration-300"
                                >
                                    Logout
                                </button>}
                        </div>

                        :
                        <>
                            <Link to='register' className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <span>Sign Up</span>
                                <FiLogIn size={20} />
                            </Link>
                            <Link to='login' className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <span>Login</span>
                            </Link>
                        </>
                    }

                </div>
            </div>
        </nav>
    </>


}
