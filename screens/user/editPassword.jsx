import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { EditUserHooks } from '../../hooks/userProfileHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    BasicTextInput,
} from '../../component/formElements.jsx';
import { AppContext } from '../../util/contextItem.jsx';

const EditPasswordForm = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const { username } = useParams(); 
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL } = useContext(AppContext);
    const UserToken = localStorage.getItem("token");
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const { ChangePassword } = EditUserHooks(navigate);

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [currentPasswordError, setCurrentPasswordError] = useState([])
    const [newPasswordError, setNewPasswordError] = useState([])
    const [confirmPasswordError, setConfirmError] = useState([])
    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setCurrentPasswordError, 
        setNewPasswordError,
        setConfirmError,
        setGeneralError
    }

    const currentPasswordInputRef = useRef();
    const currentPasswordErrorRef = useRef();
    const newPasswordInputRef = useRef();
    const newPasswordErrorRef = useRef();
    const confirmPasswordInputRef = useRef();
    const confirmPasswordErrorRef = useRef();

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
        console.log("username: ", username)
        if (!id || !UserToken) {
            return () => GoHome();
        }
    }, [id, UserToken])

    return (
        <div>
            <h1 className="HeaderStyle mt-[20px]">Update your password</h1>
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
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    const UserDetails = {
                        username,
                        id, 
                    }
                    const Elements = {
                        currentPassword: currentPasswordInputRef.current.value,
                        newPassword: newPasswordInputRef.current.value,
                        confirmPassword: confirmPasswordInputRef.current.value,
                    }
                    ChangePassword(apiURL, UserDetails, Elements, dispatchFunctions)
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <BasicTextInput
                        data={currentPassword}
                        setData={setCurrentPassword}
                        dataError={currentPasswordError}
                        label="Current password"
                        name="current_password"
                        placeholder="Write your current password here."
                        inputRef={currentPasswordInputRef}
                        errorRef={currentPasswordErrorRef}
                    />
                    <BasicTextInput
                        data={newPassword}
                        setData={setNewPassword}
                        dataError={newPasswordError}
                        label="New password"
                        name="new_password"
                        placeholder="Write your new password here."
                        inputRef={newPasswordInputRef}
                        errorRef={newPasswordErrorRef}
                    />
                    <BasicTextInput
                        data={confirmPassword}
                        setData={setConfirmPassword}
                        dataError={confirmPasswordError}
                        label="Confirm your password"
                        name="confirm_password"
                        placeholder="Write your new password here again."
                        inputRef={confirmPasswordInputRef}
                        errorRef={confirmPasswordErrorRef}
                    />
                </div>
                <FormButtons />
            </form>
        </div>
        )
}

export default EditPasswordForm; 