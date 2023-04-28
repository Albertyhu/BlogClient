import { useCallback, useEffect, useContext, useState } from 'react'; 
import {
    AppContext,
    PasswordFormContext, 
} from '../util/contextItem.jsx'; 
import { UserProfileHooks } from '../hooks/userProfileHooks.jsx';
import { useNavigate } from 'react-router-dom'
import PlusIcon from '../assets/icons/white_plus_icon.png'; 
import "../src/index.css"; 
import PasswordForm from './user/passwordForm.jsx'; 

//Pre-requisites: react-router-dom
//ButtonStyle: Tailwind CSS properties of the button
//ButtonType: designates type of the button tag whether that is 'submit' or 'button'
//Location: Destination after clicking the button 
//Value: The text displayed on the button
//Data: Data to be passed to the next page using location.state; 
const Button = props => {
    const { ButtonStyle, ButtonType, Location, Value, Data } = props; 
    var DefaultButtonStyle = `rounded-full p-[10px] active:translate-x-[5px] 
    active:translate-y-[5px] cursor-pointer border-black border-2 
    text-center w-fit sm:w-[150px] select-none text-black mx-auto 
    hover:bg-gray-300 bg-[#dbdbdb]`

    var navigate = useNavigate(); 
    const NavigateTo = useCallback(() => navigate(`${Location != "-1" ? Location : -1}`, {state: Data ? Data : null}), [navigate])

    return (
        <button
            type={ButtonType ? ButtonType : "button"}
            className={ButtonStyle ? ButtonStyle : DefaultButtonStyle}
            onClick={Location ? ()=>NavigateTo() : null}
        >{Value}</button>)
}



const AddButton = props => {
    const { title,
        dispatchFunction,
        altText = "Add Button",
        customStyle
    } = props;

    return (
        <button
            className={customStyle ? customStyle : "btn-add"}
            onClick={dispatchFunction}
        >{title}
            <img
                src={PlusIcon}
                alt={altText}
                className="buttonIcons"
            />
        </button>
        )
}

const DeleteAccountButton = () => {
    const {
        apiURL, 
        decoded,
        ClearUserData,
        token,
        setLoading,
        setMessage,
    } = useContext(AppContext)
    const { DeleteUserWithPassword } = UserProfileHooks(apiURL, token, setLoading, setMessage); 
    const navigate = useNavigate(); 
    const dispatchFunctions = { ClearUserData, navigate }; 
    const [currentPassword, setCurrentPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [displayForm, setDisplayForm] = useState(false)
    const context = {
        prompt: "Enter your password to delete your account.",
        currentPassword,
        setCurrentPassword,
        confirmPassword,
        setConfirmPassword, 
        cancel: () =>setDisplayForm(false), 
    } 
    return (
        <PasswordFormContext.Provider value={context}>
            <button
                type='button'
                className='btn-delete'
                onClick={() => { setDisplayForm(true) }}
            >Delete Account</button>
            {displayForm &&
                <div
                    id="DeleteFormWrapper"
                    className = "absolute z-25 top-[5%] left-[0px] sm:left-[50%] sm:translate-x-[-50%]"
                >
                    <PasswordForm
                        submitEvent={()=>DeleteUserWithPassword(decoded.id, currentPassword, confirmPasssword, dispatchFunctions)}
                        />
                </div>
            }
        </PasswordFormContext.Provider >
        )
}


export {
    AddButton,
    Button, 
    DeleteAccountButton
}

