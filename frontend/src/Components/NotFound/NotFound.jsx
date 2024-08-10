import React from "react";
import useChangeTitle from "../../hooks/useChangeTitle.jsx";

export default function NotFound() {
    useChangeTitle('404 Not Found')    
    return (
        <div className="text-[2rem] text-center font-black">
            <h1 className="text-[2rem]">404 Page not found</h1>
        </div>
    );
}
