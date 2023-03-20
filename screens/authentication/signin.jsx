import React, { useCallback, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import Button from '../../component/button.jsx'
import { FormButtons } from '../../component/formElements.jsx';
import { RegistrationHooks } from '../../hooks/authFormHooks.jsx'; 
import { AppContext } from '../../util/contextItem.jsx'; 

const SignIn = () => {
    const navigate = useNavigate(); 
    const { GoHome, GoSignUp } = NavigationHooks(); 
    const { HandleLogin, RenderError } = RegistrationHooks();
    const {
        apiURL,
        setNewToken,
        setNewUser,
        toggleDisplayAccountLink } = useContext(AppContext); 

    const ButtonStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px]
    active:translate-y-[5px] cursor-pointer border-white border-2 
    text-center w-[150px] select-none text-black mx-auto 
    hover:bg-[#d48518] bg-[#e48f1a] text-base block`

    var NameInput = document.querySelector("#nameInput"); 
    var PasswordInput = document.querySelector("#passwordInput"); 
    var SignInForm = document.querySelector("#SignInForm"); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

    const dispatchFunctions = {
        setUsernameError,
        setPasswordError,
        GoHome: useCallback(() => GoHome(navigate), [navigate]), 
        setNewToken, 
        setNewUser, 
        toggleDisplayAccountLink 
    }

    const resetErrorFields = () => {
        setUsernameError([]);
        setPasswordError([]);             
    }

    const LoginURL = `${apiURL}/auth/login`

    useEffect(() => {
        NameInput = document.querySelector("#nameInput");
        PasswordInput = document.querySelector("#passwordInput");
        SignInForm = document.querySelector("#SignInForm")
        var Elements = {
            NameInput,
            PasswordInput,
            SignInForm
        }
        SignInForm?.addEventListener("submit", (evt) => { HandleLogin(evt, Elements, LoginURL, dispatchFunctions, resetErrorFields) })
        return () => { SignInForm?.removeEventListener("submit", (evt) => { HandleLogin(evt, Elements, LoginURL, dispatchFunctions, resetErrorFields) }) }
    }, [])

    return (
        <div className="w-11/12 md: 9/12 mx-auto lg:w-6/12 mt-[20px]">
            <h1 className="text-center text-3xl mt-[20px] font-bold">Sign In</h1>
            <form 
                id = "SignInForm"
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
                    <div id="usernameError" className="ErrorDiv">
                        {usernameError != null && usernameError.length > 0 && RenderError(usernameError)}
                    </div>
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
                    <div id="passwordError" className="ErrorDiv">
                        {passwordError != null && passwordError.length > 0 && RenderError(passwordError)}
                    </div>
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