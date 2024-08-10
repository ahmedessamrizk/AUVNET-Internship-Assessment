import React, {  } from 'react';
import Logo from '../assets/Logo';


const SplashScreen = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 text-indigo-500">
            <Logo className='w-40 h-40 animate-fade-loop'/>
        </div>
    );
};

export default SplashScreen;
