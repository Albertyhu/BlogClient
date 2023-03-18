import { useState } from 'react'; 
import { checkEmail } from './checkEmail.jsx'; 
import uuid from 'react-uuid'; 
import "../src/index.css";

const RegistrationHooks = props => {

    function HandleSignUpSubmit(evt, elements, existingUsers, apiURL, dispatchFunctions, resetErrorFields) {
        evt.preventDefault();
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
            resetErrorFields();
            SubmitRegistration(data, apiURL, dispatchFunctions);

        }
        else
            console.log(errMessage)
    }

    async function SubmitRegistration(data, apiURL, dispatchFunctions) {
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
                   // dispatchError(result.error)
                    RenderErrorArray(result.error, dispatchFunctions)
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
            setDisplay
        } = dispatchFunctions; 

        const resetErrorFields = () => {
            setUsernameError([]);
            setEmailError([]);
            setProfileError([]);
            setPasswordError([]);
            setConfirmError([]);
            setDisplay("")
        }

        resetErrorFields(); 

        errorArray.forEach(error => {
            switch (error.param) {
                case 'username':
                    setUsernameError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break; 
                case 'email':
                    setEmailError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break; 
                case 'password':
                    setPasswordError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'confirm_password':
                    setConfirmError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break; 
                default:
                    break; 
            }
        })
       
    }

    function RenderError(Error) {
       //Dont use any hooks here.  
        return Error.map((err, index) => {
            const ID = `${err.param}-${index}`;
            return <div
                    key={uuid()}
                    id={ID}
                className={`ErrorMessage`}>{err.msg}</div>
            }
        )
    }

    function AnimateErrorMessage(DivElem) {
        setTimeout(() => {
            DivElem?.classList.remove("ErrorMessageFadeOut");
            DivElem?.classList.add("ErrorMessageFadeIn");
        }, [1])

        setTimeout(() => {
            DivElem?.classList.remove("ErrorMessageFadeIn")
            DivElem?.classList.add("ErrorMessageFadeOut");
        }, [10000])
    }

    function onChangeHandler(evt, dispatch, resetErrorFields) {
        resetErrorFields()
        dispatch(evt.target.value)
    }

    return { HandleSignUpSubmit, onChangeHandler, SubmitRegistration, RenderErrorArray, RenderError, AnimateErrorMessage } 
}

export { RegistrationHooks }; 