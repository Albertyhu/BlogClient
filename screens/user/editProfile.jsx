import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { EditUserHooks } from '../../hooks/userProfileHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    EditImageInput,
    BasicTextInput,
    BasicTextAreaInput
} from '../../component/formElements.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/fetchHooks.jsx';

const EditProfilePic = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { id } = location.state; 
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL, setNewUser } = useContext(AppContext);
    const UserToken = localStorage.getItem("token");
    const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const { fetchUserDetails } = FetchHooks();
    const { UpdateUserProfile } = EditUserHooks(navigate);

    const [image, setImage] = useState(null);
    const [username, setUsername] = useState(User.username); 
    const [email, setEmail] = useState(User.email);
    const [biography, setBiography] = useState(User.biography);

    const [pictureError, setPictureError] = useState([])
    const [usernameError, setUsernameError] = useState([])
    const [emailError, setEmailError] = useState([]);
    const [biographyError, setBiographyError] = useState([]);
    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setUsernameError,
        setEmailError,
        setBiographyError,
        setGeneralError,
        setPictureError,
        setNewUser
    }

    const imageInputRef = useRef();
    const imageErrorRef = useRef();

    const usernameInputRef = useRef();
    const usernameErrorRef = useRef();

    const emailInputRef = useRef();
    const emailErrorRef = useRef();

    const biographyInputRef = useRef();
    const biographyErrorRef = useRef();

    const generalErrorRef = useRef();

    const FormRef = useRef();

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
        if (User) {
            setImage(User.profile_pic);
            setUsername(User.username);
            setEmail(User.email);
            setBiography(User.biography);
        }
    }, [User])

    useEffect(() => {
        if (!id || !UserToken) {
            return ()=>GoHome();
        }
        fetchUserDetails(apiURL, id, setUser, setGeneralError)
    }, [id, UserToken])

    return (
        <div>
            <h1 className="HeaderStyle mt-[20px]">Edit your profile</h1>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            <form
                id="RegistrationForm"
                ref={FormRef}
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();

                    const Elements = {
                        imageData: imageInputRef.current.files[0],
                        username,
                        email,
                        biography,
                    }
                    UpdateUserProfile(apiURL, id, Elements, dispatchFunctions)
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <EditImageInput
                        image={image}
                        setImage={setImage}
                        pictureError={pictureError}
                        label="Update your profile picture"
                        name="profile_pic"
                        placeholder="Browse your device to change your profile picture"
                        ImageInputRef={imageInputRef}
                        ImageErrorRef={imageErrorRef}
                    />
                    <BasicTextInput
                        data={username}
                        setData={setUsername}
                        dataError={usernameError}
                        label="username"
                        name="username"
                        placeholder="Update your username"
                        inputRef={usernameInputRef}
                        errorRef={usernameErrorRef}
                    />
                    <BasicTextInput
                        data={email}
                        setData={setEmail}
                        dataError={emailError}
                        label="email"
                        name="email"
                        placeholder="Update your email"
                        inputRef={emailInputRef}
                        errorRef={emailErrorRef}
                    />
                    <BasicTextAreaInput
                        data={biography}
                        setData={setBiography}
                        dataError={biographyError}
                        label="biography"
                        name="biography"
                        placeholder="Update your biography"
                        inputRef={biographyInputRef}
                        errorRef={biographyErrorRef}
                    />
                </div>
                <FormButtons />
            </form>
        </div>)
}


export default EditProfilePic; 