import { useState } from 'react'; 
import { checkEmail } from './checkEmail.jsx'; 
import uuid from 'react-uuid'; 
import "../src/index.css";
import { NavigationHooks } from './navigation.jsx'

const RegistrationHooks = props => {
    function HandleSignUpSubmit(evt, elements, uploadedFile, apiURL, dispatchFunctions, resetErrorFields) {
        evt.preventDefault();
        const {
            RegistrationForm,
            NameInput,
            EmailInput,
            PasswordInput,
            ConfirmInput,
            ProfileInput, 
        } = elements; 
        var isValid = true; 
        var errMessage = "Error: ";
        if (isValid) {
            const data = {
                username: NameInput.value, 
                email: EmailInput.value,
                password: PasswordInput.value,
                profile_pic: ProfileInput.current.files[0], 
                confirm_password: ConfirmInput.value
            }
            resetErrorFields();
            SubmitRegistration(data, apiURL, dispatchFunctions);

        }
        else
            console.log("RegistrationHooks Error: ", errMessage)
    }

    async function SubmitRegistration(data, apiURL, dispatchFunctions) {
        console.log("Registrating user")
        console.log("apiURL: ", apiURL)
        const {
            username, 
            email,
            password, 
            confirm_password,
            profile_pic,
        } = data; 
        const formData = new FormData; 
        formData.append("username", username); 
        formData.append("email", email);
        formData.append("password", password); 
        formData.append("confirm_password", confirm_password);
        formData.append("profile_pic", profile_pic);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        const {
            GoHome,
            toggleDisplayAccountLink,
            setNewUser,
            setNewProfileImage,
        } = dispatchFunctions; 

        await fetch(apiURL, {
            method: "POST",
            body: formData
        })
            .then(async response => {
                if (response.ok) {
                    console.log("Registration is successful.")
                    await response.json()
                        .then(data => {
                            localStorage.setItem("user", JSON.stringify(data.user))
                            localStorage.setItem('token', data.token)
                            if (data.profile_pic) {
                                localStorage.setItem("ProfilePicture", JSON.stringify(data.profile_pic))
                                setNewProfileImage(data.profile_pic)
                            }
                            //setNewUser and toggleDisplayAccoutLink updates the header bar to contain
                            //data about the logged in user
                            setNewUser(data.user)
                            toggleDisplayAccountLink(true), 
                            GoHome();

                        })
                }
                else {
                    const result = await response.json()
                    console.log("Registration failed with status code: ", result.error)
                    RenderErrorArray(result.error, dispatchFunctions)
                }
            })
            .catch(error => {
                console.log("SubmitRegistration error: ", error)
            })
    } 

    async function HandleLogin(evt, elements, apiURL, dispatchFunctions, resetErrorFields) {
        evt.preventDefault(); 
        const {
            NameInput,
            PasswordInput,
            SignInForm
        } = elements; 
        resetErrorFields(); 

        const { GoHome,
            setNewToken,
            setNewUser,
            toggleDisplayAccountLink, 
            setNewProfileImage
        } = dispatchFunctions; 

        const data = {
            username: NameInput.value,
            password: PasswordInput.value, 
        }

        await fetch(apiURL, {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(data)
        }).then(async response => {
            if (response.ok) {
                console.log("User has successfully signed in")
                await response.json()
                    .then(result => {
                        localStorage.setItem("token", result.token);
                        localStorage.setItem("user", JSON.stringify(result.user));
                        if (result.profile_pic) {
                            localStorage.setItem("ProfilePicture", JSON.stringify(result.profile_pic))
                            setNewProfileImage(result.profile_pic)
                        }
                        //setNewUser and toggleDisplayAccoutLink updates the header bar to contain
                        //data about the logged in user
                        setNewUser(result.user)
                        toggleDisplayAccountLink(true) 
                        GoHome();
                    })
                    .catch(e => {
                        console.log("Error in receiving user info and token: ", e)
                    })
            }
            else {
                const result = await response.json()
                console.log("result: ", result)
                console.log("Sign in process has failed: ", result.error)
                RenderErrorArray(result.error, dispatchFunctions)
            }
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
            setDisplay, 
            setGeneralError
        } = dispatchFunctions; 

        const resetErrorFields = () => {
            if (setUsernameError)
                setUsernameError([]);
            if (setEmailError) {
                setEmailError([]);
            }
            if (setProfileError) {
                setProfileError([]);
            }
            if(setPasswordError)
                setPasswordError([]);
            if (setConfirmError) {
                setConfirmError([]);
            }
            if(setGeneralError != undefined)
                setGeneralError([])
            if(setDisplay != undefined)
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
                case 'server':
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
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

    function HandleFileChange(evt, setImage) {
        const file = evt.target.files[0]; 
        const reader = new FileReader(); 
        reader.readAsDataURL(file); 
        reader.onload = () => {
            setImage(reader.result);
        }
    }

    return {
        HandleSignUpSubmit,
        onChangeHandler,
        SubmitRegistration,
        RenderErrorArray,
        RenderError,
        AnimateErrorMessage,
        HandleLogin,
        HandleFileChange
    } 
}

const AuthenticationHooks = (navigate) => {
    const { GoHome } = NavigationHooks(navigate);
    const LogOut = async () => {
        localStorage.clear();
        GoHome();
    }

    return { LogOut }; 

}

export { RegistrationHooks, AuthenticationHooks }; 