import React from 'react';
import Button from '../../component/button.jsx'

const SignIn = () => {
    return (
        <form action="" method="POST"
            className="[&>div>label]:text-black [&>div>label]:uppercase [&>div>label]:font-bold [&>div]:grid [&>div>input]:rounded-lg 
                    [&>div]:w-full [&>div]:my-[10px] [&>div>input]:pl-3 [&>div>input]:bg-[rgba(0,0,0,0)] 
                    [&>div>input]:text-black [&>div>input]:border-white [&>div>input]:border-[1px]
                    bg-[#f2e798] rounded-md p-10 [&>div>input]:placeholder:text-[#545454] text-2xl
                    [&>div>input]:placeholder:text-base" 
        >
            <div>
            <label for = "username">Username</label>
            <input 
                name = "username" 
                id = "nameInput"
                type = "text"
                placeholder = "Type your username here" 
                required = "true"
                />
            </div>
            <div>
            <label for = "password">password</label>
            <input 
                name = "password" 
                id = "passwordInput"
                type = "password"
                placeholder = "Type your password here" 
                required = "true"
                />
            </div>
            <hr className = "my-[25px] h-[2px] border-[2px]" />
            <h2 className = "my-10 text-center text-lg">Don't have an account with us?</h2>
            <button 
                type = "button"
                className = "rounded-full p-[10px] active:translate-x-[5px] active:translate-y-[5px] cursor-pointer border-white border-2 text-center w-[150px] select-none text-black mx-auto hover:bg-[#d48518] bg-[#e48f1a]"
            >Create Account</button>
        </form>
        )
}


export default SignIn; 