import uuid from 'react-uuid'

const ErrorMessageHooks = () => {
    //It takes the raw array and separates it into different arrays 
    //Generate DOM elements 
    function RenderErrorArray(errorArray, dispatchFunctions) {
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
            setNameError,
            setDescriptionError,
            setImageError, 


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
            if (setNameError)
                setNameError([])
            if (setDescriptionError)
                setDescriptionError([])
            if (setImageError)
                setImageError([])
            if (setDisplay)
                setDisplay("")

        }

        resetErrorFields();

        errorArray.forEach(error => {
            switch (error.param.toLowerCase()) {
                case 'username':
                    setUsernameError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'name':
                    setNameError(prev => [...prev, { param: error.param, msg: error.msg }]);
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
                case 'description':
                    setDescriptionError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'image':
                    setImageError(prev => [...prev, { param: error.param, msg: error.msg }]);
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

const PostErrorHooks = () => {
    function RenderErrorArray(errorArray, dispatchFunctions) {
        const {
            setGeneralError,
            setTitleError,
            setContentError,
            setThumbnailError,
            setImagesError,
            setAbstractError,
            setCategoryError,
            setTagError,
            setMessage,
        } = dispatchFunctions;

        const resetErrorFields = () => {
            if (setGeneralError)
                setGeneralError([])

            if (setTitleError)
                setTitleError([]);

            if (setContentError)
                setContentError([]);

            if (setThumbnailError)
                setThumbnailError([]);

            if (setImagesError)
                setImagesError([]);

            if (setAbstractError)
                setAbstractError([]);

            if (setCategoryError)
                setCategoryError([]);

            if (setTagError)
                setTagError([]);

            if (setMessage)
                setMessage([]);

        }

        resetErrorFields();

        errorArray.forEach(error => {
            switch (error.param.toLowerCase()) {
                case 'title':
                    setTitleError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'content':
                    setContentError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'thumbnail':
                    setThumbnailError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'images':
                    setImagesError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'abstract':
                    setAbstractError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'category':
                    setCategoryError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'tag':
                    setTagError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'message':
                    setMessage(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'post':
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
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

    const RenderCommentErrorArray = (errorArray, dispatchFunctions) => {

    }

    return {
        RenderErrorArray,
        RenderCommentErrorArray 
    }
}

const UserPhotoErrorHooks = () => {
    const RenderErrorArray = (errorArray, dispatchFunctions) => {
        const {
            setCaptionError,
            setTitleError, 
        } = dispatchFunctions; 
        function resetErrorFields() {
            if (setCaptionError) {
                setCaptionError([])
            }
            if (setTitleError) {
                setTitleError([])
            }
        }
        resetErrorFields(); 
        errorArray.forEach(error => {
            switch (error.param.toLowerCase()) {
                case 'title':
                    setTitleError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                case 'caption':
                    setCaptionError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
                default:
                    setGeneralError(prev => [...prev, { param: error.param, msg: error.msg }]);
                    break;
            }
        })

    }

    return {
        RenderErrorArray, 
    }
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

export {
    ErrorMessageHooks,
    PostErrorHooks,
    UserPhotoErrorHooks, 
    AnimateErrorMessage,
    RenderError
}