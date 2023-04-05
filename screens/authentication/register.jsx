import { useCallback, useEffect, useState, useContext, useRef} from 'react'; 
import { FormButtons } from '../../component/formElements.jsx';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { RegistrationHooks } from '../../hooks/authFormHooks.jsx'; 
import { AppContext } from '../../util/contextItem.jsx';
import { HandleFileChange } from '../../hooks/imageHooks.jsx'; 

const RegisterForm = props => {
    const FormStyle = `[&>div>label]:text-black [&>div>label]:uppercase [&>div>label]:font-bold [&>div]:grid [&>div>input]:rounded-lg 
                    [&>div]:w-full [&>div]:my-[10px] [&>div>input]:pl-0 [&>div>input]:bg-[rgba(0,0,0,0)] 
                    [&>div>input]:text-black [&>div>input]:border-white [&>div>input]:border-[1px]
                     rounded-md [&>div>input]:placeholder:text-[#545454] text-2xl
                    [&>div>input]:placeholder:text-base`
    const navigate = useNavigate();
    const { GoSignIn, GoHome } = NavigationHooks(navigate);
    const { HandleSignUpSubmit,
        onChangeHandler,
        RenderError,
        AnimateErrorMessage,
    } = RegistrationHooks();
    const {
        apiURL,
        toggleDisplayAccountLink,
        setNewUser, 
        setNewProfileImage,
    } = useContext(AppContext);
    const registerURL = `${apiURL}/auth/register`

    const [name, setName] = useState('TomHacker');
    const [email, setEmail] = useState('TH@gmail.com');
    const [password, setPassword] = useState('password');
    const [confirmPass, setConfirmPass] = useState('password');

    //Error arrays store the error messages sent from the server
    const [errorArray, setErrorArray] = useState(null);
    const [usernameError, setUsernameError] = useState([])
    const [emailError, setEmailError] = useState([]);
    const [profileError, setProfileError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [confirmError, setConfirmError] = useState([]); 
    const [profileImage, setImage] = useState({ preview: '', data: '' }); 
    const [Display, setDisplay] = useState("")
    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setUsernameError,
        setEmailError,
        setProfileError,
        setPasswordError,
        setConfirmError,
        setGeneralError,
        setDisplay,
        GoHome: useCallback(() => GoHome(navigate), [navigate]),
        toggleDisplayAccountLink,
        setNewUser,
        setNewProfileImage
    }

    const resetErrorFields = () => {
        setUsernameError([]);
        setEmailError([]);
        setProfileError([]);
        setPasswordError([]);
        setConfirmError([]);
        setDisplay("")
        setErrorArray([]); 
        setGeneralError([]);
    }

    var RegistrationForm = document.getElementById('RegistrationForm');
    var NameInput = document.querySelector('#nameInput')
    var EmailInput = document.querySelector('#emailInput')
    var PasswordInput = document.querySelector('#passwordInput')
    var ConfirmInput = document.querySelector('#confirm_passwordInput')
    var ProfileInput = useRef(); 

    useEffect(() => {
        RegistrationForm = document.getElementById('RegistrationForm');
        NameInput = document.querySelector('#nameInput')
        EmailInput = document.querySelector('#emailInput')
        PasswordInput = document.querySelector('#passwordInput')
        ConfirmInput = document.querySelector('#confirm_passwordInput')
        var FormElements = {
            RegistrationForm,
            NameInput,
            EmailInput,
            PasswordInput,
            ConfirmInput,
            ProfileInput,
            profileImage
        }
    }, [])

    let usernameElem = document.querySelector('#usernameError');
    let emailElem = document.querySelector('#emailError');
    let passwordElem = document.querySelector('#passwordError');
    let confirmElem = document.querySelector('#confirmError');


    useEffect(() => {
        usernameElem = document.getElementById('usernameError');
        for (var child of usernameElem.children) {
            AnimateErrorMessage(child)
        }
    }, [usernameError])

    useEffect(() => {
        emailElem = document.getElementById('emailError');
        for (var child of emailElem.children) {
            AnimateErrorMessage(child)
        }
    }, [emailError])

    useEffect(() => {
        passwordElem = document.getElementById('passwordError');
        for (var child of passwordElem.children) {
            AnimateErrorMessage(child)
        }
    }, [passwordError])

    useEffect(() => {
        confirmElem = document.getElementById('confirmError');
        for (var child of confirmElem.children) {
            AnimateErrorMessage(child)
        }
    }, [confirmError])

    const GeneralErrorRef = useRef(); 

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of GeneralErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])


    return (
        <>
            <h1 className="text-center text-3xl mt-[20px] font-bold">Create a new account</h1>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={GeneralErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            <form
                onSubmit={(evt) => {
                    RegistrationForm = document.getElementById('RegistrationForm');
                    NameInput = document.querySelector('#nameInput')
                    EmailInput = document.querySelector('#emailInput')
                    PasswordInput = document.querySelector('#passwordInput')
                    ConfirmInput = document.querySelector('#confirm_passwordInput')
                    var FormElements = {
                        RegistrationForm,
                        NameInput,
                        EmailInput,
                        PasswordInput,
                        ConfirmInput,
                        ProfileInput,
                    }
                    HandleSignUpSubmit(evt, FormElements, profileImage, registerURL, dispatchFunctions, resetErrorFields)
                }}
                id="RegistrationForm"
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10`}>
                <div
                    id="Shell"
                    className={`w-11/12 mx-auto ${FormStyle}`}
                    >
                    <div>
                        <label htmlFor = "username">Username</label>
                        <input 
                            name="username"
                            id="nameInput"
                            type="text"
                            placeholder="Type your username here"
                            required
                            className=""
                            value={name}
                            onChange={(evt) => onChangeHandler(evt, setName, resetErrorFields)}
                        />
                        <div id="usernameError" className="ErrorDiv">
                            {usernameError != null && usernameError.length > 0 && RenderError(usernameError)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor = "email">Email</label>
                        <input
                            name="email"
                            id="emailInput"
                            type="text"
                            placeholder="Type your email here"
                            required
                            className=""
                            value={email}
                            onChange={(evt) => onChangeHandler(evt, setEmail, resetErrorFields)}
                        />
                        <div id="emailError" className="ErrorDiv">
                            {emailError != null && emailError.length > 0 && RenderError(emailError)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor = "profile_pic">Profile picture</label>
                        <input 
                            name="profile_pic"
                            id="profile_picInput"
                            ref={ProfileInput}
                            type="file"
                            placeholder="Upload an image htmlFor your your profile picture here"
                            className="file:rounded-lg file:font-['DecoTech'] file:bg-[#99cbae] file:text-white cursor-pointer"
                            onChange={(evt) => { HandleFileChange(evt, setImage) }}
                        />
                    </div>
                    <div>
                        <label htmlFor = "password">password</label>
                        <input 
                            name="password"
                            id="passwordInput"
                            type="password"
                            placeholder="Type your password here"
                            required
                            className=""
                            value={password}
                            onChange={(evt) => onChangeHandler(evt, setPassword, resetErrorFields)}
                        />
                        <div id="passwordError" className="ErrorDiv">
                            {passwordError != null && passwordError.length > 0 && RenderError(passwordError)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor = "confirm_password">Confirm your password</label>
                        <input
                            name="confirm_password"
                            id="confirm_passwordInput"
                            type="password"
                            placeholder="Re-type your password here to confirm"
                            required
                            className=""
                            value={confirmPass}
                            onChange={(evt) => onChangeHandler(evt, setConfirmPass, resetErrorFields)}
                        />
                        <div
                            id="confirmError"
                            className="ErrorDiv">
                            {confirmError != null && confirmError.length > 0 && RenderError(confirmError)}

                        </div>
                    </div>
                    <FormButtons />
                    <hr className = "my-[25px] h-[2px] border-[2px]" />
                    <h2 className="my-10 text-center text-lg">Already have an account with us?</h2>
                    <button 
                        type="button"
                        className="block rounded-full p-[10px] active:translate-x-[5px] active:translate-y-[5px] cursor-pointer border-white border-2 text-center w-[150px] select-none text-black mx-auto hover:bg-[#d48518] bg-[#e48f1a] text-center"
                        onClick={useCallback(()=>GoSignIn(), [navigate])}
                    >Log In</button>
                </div>
            </form>
        </>
        ) 
}

export default RegisterForm; 