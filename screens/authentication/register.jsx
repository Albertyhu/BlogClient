import { useCallback } from 'react'; 
import { FormButtons } from '../../component/formElements.jsx';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx';

const RegisterForm = props => {
    const FormStyle = `[&>div>label]:text-black [&>div>label]:uppercase [&>div>label]:font-bold [&>div]:grid [&>div>input]:rounded-lg 
                    [&>div]:w-full [&>div]:my-[10px] [&>div>input]:pl-0 [&>div>input]:bg-[rgba(0,0,0,0)] 
                    [&>div>input]:text-black [&>div>input]:border-white [&>div>input]:border-[1px]
                     rounded-md [&>div>input]:placeholder:text-[#545454] text-2xl
                    [&>div>input]:placeholder:text-base`
    const navigate = useNavigate(); 
    const { GoSignIn, GoHome } = NavigationHooks(); 
    return (
        <>
            <h1 className = "text-center text-3xl mt-[20px] font-bold">Create a new account</h1>
            <form
                action="/register"
                method="POST"
                encType="multipart/form-data"
                id="form"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10`}>
                <div
                    id="Shell"
                    className={`w-11/12 mx-auto ${FormStyle}`}
                    >
                    <div>
                        <label htmlFor = "username">Username</label>
                        <input 
                            name = "username" 
                            id = "nameInput"
                            type = "text"
                            placeholder = "Type your username here" 
                            required
                            className = ""
                            />
                    </div>
                    <div>
                        <label htmlFor = "email">Email</label>
                        <input 
                            name = "email" 
                            id = "emailInput"
                            type = "text"
                            placeholder = "Type your email here" 
                            required
                            className = ""
                            />
                    </div>
                    <div>
                        <label htmlFor = "profile_pic">Profile picture</label>
                        <input 
                            name = "profile_pic" 
                            id = "profile_picInput"
                            type = "file"
                            placeholder = "Upload an image htmlFor your your profile picture here" 
                            className = "file:rounded-lg file:font-['DecoTech'] file:bg-[#99cbae] file:text-white cursor-pointer"
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
                            className = ""
                            />
                    </div>
                    <div>
                        <label htmlFor = "confirm_password">Confirm your password</label>
                        <input 
                            name = "confirm_password" 
                            id = "confirm_passwordInput"
                            type = "password"
                            placeholder = "Re-type your password here to confirm" 
                            required
                            className = ""
                            />
                    </div>
                    <FormButtons />
                    <hr className = "my-[25px] h-[2px] border-[2px]" />
                    <h2 className="my-10 text-center text-lg">Already have an account with us?</h2>
                    <button
                        type="button"
                        className="block rounded-full p-[10px] active:translate-x-[5px] active:translate-y-[5px] cursor-pointer border-white border-2 text-center w-[150px] select-none text-black mx-auto hover:bg-[#d48518] bg-[#e48f1a] text-center"
                        onClick={useCallback(()=>GoHome(navigate), [navigate])}
                    >
                        Home
                    </button>
                    <button 
                        type="button"
                        className="block rounded-full p-[10px] active:translate-x-[5px] active:translate-y-[5px] cursor-pointer border-white border-2 text-center w-[150px] select-none text-black mx-auto hover:bg-[#d48518] bg-[#e48f1a] text-center"
                        onClick={useCallback(()=>GoSignIn(navigate), [navigate])}
                    >Log In</button>
                </div>
            </form>
        </>
        ) 
}

export default RegisterForm; 