import uuid from 'react-uuid'

const ErrorMessageHooks = () => {
    //It takes the raw array and separates it into different arrays 
    //Generate DOM elements 
    function RenderErrorArray(errorArray, dispatchFunction) {
        //reset error array to original value 
        dispatchFunction([])
        errorArray.forEach(error => {
            dispatchFunction(prev => [...prev, { param: error.param, msg: error.msg }]);
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