import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import Button from '../../component/button.jsx'
import { FormButtons } from '../../component/formElements.jsx'; 
const SignIn = () => {
    const navigate = useNavigate(); 
    const { GoHome, GoSignUp } = NavigationHooks(); 
    const ButtonStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px]
    active:translate-y-[5px] cursor-pointer border-white border-2 
    text-center w-[150px] select-none text-black mx-auto 
    hover:bg-[#d48518] bg-[#e48f1a] text-base block`

    return (
        <div className="w-11/12 md: 9/12 mx-auto lg:w-6/12 mt-[20px]">
            <h1 className="text-center text-3xl mt-[20px] font-bold">Sign In</h1>
            <form action="" method="POST"
                className="[&>div>label]:text-black [&>div>label]:uppercase [&>div>label]:font-bold [&>div]:grid [&>div>input]:rounded-lg 
                        [&>div]:w-full [&>div]:my-[10px] [&>div>input]:bg-[rgba(0,0,0,0)] 
                        [&>div>input]:text-black [&>div>input]:border-white [&>div>input]:px-1 [&>div>input]:border-[1px]
                        bg-[#f2e798] rounded-md p-10 [&>div>input]:placeholder:text-[#545454] text-base
                        [&>div>input]:placeholder:text-base" 
            >
                <div>
                <label htmlFor = "username">Username</label>
                <input 
                    name = "username" 
                    id = "nameInput"
                    type = "text"
                    placeholder = "Type your username here" 
                    required
                    />
                </div>
                <div>
                <label htmlFor = "password">password</label>
                <input 
                    name = "password" 
                    id = "passwordInput"
                    type = "password"
                    placeholder = "Type your password here" 
                    required
                    />
                </div>
                <div>

                </div>
                <FormButtons />
                <hr className = "my-[25px] h-[2px] border-[2px] border-black" />
                <h2 className = "my-10 text-center text-lg">Don't have an account with us?</h2>
                <button 
                    type="button"
                    className={ButtonStyle}
                    onClick={useCallback(() => GoSignUp(navigate), [navigate])}
                >Create Account</button>
            </form>
        </div>
        )
}


export default SignIn; 