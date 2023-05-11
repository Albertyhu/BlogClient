import { useState, useRef, useContext, useEffect } from 'react';
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import {
    BasicTextInput,
} from '../../component/formElements/textInputs.jsx';
import {
    PasswordFormContext, 
} from '../../util/contextItem.jsx';

const PasswordForm = props => {
    const {
        submitEvent, 
    } = props; 
    const {
        prompt, 
        currentPassword,
        setCurrentPassword, 
        confirmPassword,
        setConfirmPassword, 
        cancel, 
    } = useContext(PasswordFormContext); 
    const { AnimateErrorMessage } = ErrorMessageHooks();

    const [currentPasswordError, setCurrentPasswordError] = useState([])
    const [confirmPasswordError, setConfirmError] = useState([])
    const [generalError, setGeneralError] = useState([])

    const currentPasswordInputRef = useRef();
    const currentPasswordErrorRef = useRef();
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

    return (
        <form
            id="RegistrationForm"
            ref={FormRef}
            className={`bg-[#f2e798] w-11/12 sm:w-[640px] mx-auto py-10 rounded box_shadow`}
        >
            <div className="FormStyle w-11/12 mx-auto grid">
                <label
                    className="font-bold text-2xl mb-5"
                >{prompt}</label>
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
            <div className ="flex">
                <button
                    type="button"
                    className="btn-delete"
                    onClick={submitEvent}
                >Delete Account</button>
                <button
                    type="button"
                    className="btn-cancel"
                    onClick={cancel}
                >Cancel</button>
            </div>
        </form>

    )
}

export default PasswordForm; 