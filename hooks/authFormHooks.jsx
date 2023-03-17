import { useState, useRef } from 'react'; 
import { checkEmail } from './checkEmail.jsx'; 
import uuid from 'react-uuid'; 

const RegistrationHooks = props => {

    function HandleSignUpSubmit(evt, elements, existingUsers, apiURL, dispatchError, resetErrorFields) {
        evt.preventDefault();
        console.log('fired')
        const {
            RegistrationForm,
            NameInput,
            EmailInput,
            PasswordInput,
            ConfirmInput } = elements; 
        var isValid = true; 
        var errMessage = "Error: ";
        if (isValid) {
            const data = {
                username: NameInput.value, 
                email: EmailInput.value,
                password: PasswordInput.value,
                confirm_password: ConfirmInput.value
            }
            //console.log("apiURL: ", apiURL)
            //RegistrationForm.submit();
            resetErrorFields();
            SubmitRegistration(data, apiURL, dispatchError);
        }
        else
            console.log(errMessage)
    }

    async function SubmitRegistration(data, apiURL, dispatchError) {
        const {
            username, 
            email,
            password, 
            confirm_password,
            profilepicture, 
        } = data; 
        await fetch(apiURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async response => {
                console.log("status: ", response)
                if (response.ok) {
                    console.log("Registration is successful.")
                }
                else {
                    const result = await response.json()
                    console.log("Registration failed with status code: ", result.error)
                    dispatchError(result.error)
                }
            })
            .catch(error => {
                console.log("error: ", error)
            })
    } 

    //It takes the raw array and separates it into different arrays 
    //Generate DOM elements 
    function RenderErrorArray(errorArray, dispatchFunctions) {
        const {
            setUsernameError,
            setEmailError,
            setProfileError,
            setPasswordError,
            setConfirmError,
        } = dispatchFunctions; 

        errorArray.forEach(error => {
            switch (error.param) {
                case 'username':
                    setUsernameError(prev => [...prev, error.msg]);
                    break; 
                case 'email':
                    setEmailError(prev => [...prev, error.msg]);
                    break; 
                case 'password':
                    setPasswordError(prev => [...prev, error.msg]);
                    break;
                case 'confirm_password':
                    setConfirmError(prev => [...prev, error.msg]);
                    break; 
                default:
                    break; 
            }
        })
    }

    function RenderError(Error, Display) {
        //Dont use any hooks here.  
        return Error.map(err =>
            <div
                key={uuid()}
                id="ErrorMessage"
                className={`ErrorMessage ${Display}`}>{err}</div>
        )
    }

    function onChangeHandler(evt, dispatch) {
        dispatch(evt.target.value)
    }

    return { HandleSignUpSubmit, onChangeHandler, SubmitRegistration, RenderErrorArray, RenderError } 
}

export { RegistrationHooks }; 