import uuid from 'react-uuid'

const ErrorMessageHooks = () => {
    //It takes the raw array and separates it into different arrays 
    //Generate DOM elements 
    function RenderErrorArray(errorArray, dispatchFunctions) {
        console.log("errorArray: ", errorArray)
        const {
            setUsernameError,
            setEmailError,
            setProfileError,
            setPasswordError,
            setConfirmError,
            setBiographyError,
            setDisplay,
            setGeneralError,
            setCurrentPasswordError,
            setNewPasswordError,
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
            if (setPasswordError)
                setPasswordError([]);
            if (setConfirmError) {
                setConfirmError([]);
            }
            if (setBiographyError) {
                setBiographyError([]);
            }
            if (setCurrentPasswordError)
                setCurrentPasswordError([])
            if (setNewPasswordError)
                setNewPasswordError([])
            if (setGeneralError)
                setGeneralError([])
            if (setDisplay)
                setDisplay("")
        }

        resetErrorFields();

        errorArray.forEach(error => {
            switch (error.param.toLowerCase()) {
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
                case 'biography':
                    setBiographyError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'current_password':
                    setCurrentPasswordError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'new_password':
                    setNewPasswordError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'server':
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'authorization':
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                default:
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
            }
        })

    }

    //This is for pages with a form. It displays error messages under the input elements. 
    function RenderError(Error) {
        //Dont use any hooks here.  
        return Error.map((err, index) => {
            const ID = `${err.param}-${index}`;
            return <div
                key={uuid()}
                id={ID}
                className={`ErrorMessage`}>{err.msg}</div>
        })
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
    return {
        RenderErrorArray,
        RenderError,
        AnimateErrorMessage,
    } 
}

export {ErrorMessageHooks }