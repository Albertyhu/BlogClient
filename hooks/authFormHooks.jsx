import { useState } from 'react'; 
import { checkEmail } from './checkEmail.jsx'; 
import uuid from 'react-uuid'; 
import "../src/index.css";
import { NavigationHooks } from './navigation.jsx'
import { DecodeToken } from './decodeToken.jsx'; 

const RegistrationHooks = (apiURL, setDecoded, setLoading) => {
    function HandleSignUpSubmit(evt, elements, uploadedFile, dispatchFunctions, resetErrorFields) {
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

    async function SubmitRegistration(data, dispatchFunctions) {
        const FetchURL = `${apiURL}/auth/register`
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

        setLoading(true)
        await fetch(FetchURL, {
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
                            setDecoded(DecodeToken(data.token))
                            toggleDisplayAccountLink(true), 
                            setLoading(false)
                            GoHome();

                        })
                }
                else {
                    const result = await response.json()
                    console.log("Registration failed with status code: ", result.error)
                    setLoading(false)
                    RenderErrorArray(result.error, dispatchFunctions)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log("SubmitRegistration error: ", error)
            })
    } 

    async function HandleLogin(evt, elements, dispatchFunctions, resetErrorFields) {
        const FetchURL = `${apiURL}/auth/login`
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
        setLoading(true)
        await fetch(FetchURL, {
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
                        setDecoded(DecodeToken(result.token))
                        toggleDisplayAccountLink(true) 
                        setLoading(false)
                        GoHome();
                    })
                    .catch(e => {
                        setLoading(false)
                        console.log("Error in receiving user info and token: ", e)
                    })
            }
            else {
                const result = await response.json()
                console.log("Sign in process has failed: ", result.error)
                setLoading(false)
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

    return {
        HandleSignUpSubmit,
        onChangeHandler,
        SubmitRegistration,
        RenderErrorArray,
        RenderError,
        AnimateErrorMessage,
        HandleLogin,
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