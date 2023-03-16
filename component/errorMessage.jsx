import { useEffect } from 'react';

const ErrorMessageElem = props => {
    const { message, display } = props;
    var ErrorMessageStyle = `hidden fixed top-[10px] left-[50%] translate-x-[-50%] max-w-[300px]
        bg-white text-center text-black text-lg`;
    var ErrorDiv = document.querySelector("#ErrorMessage");

    const DisplayError = () => {
        ErrorDiv = document.querySelector("#ErrorMessage");
        ErrorDiv.classList.remove("hidden")
        ErrorDiv.classList.add("block")
    }

    const HideError = () => {
        ErrorDiv = document.querySelector("#ErrorMessage");
        ErrorDiv.classList.remove("block")
        ErrorDiv.classList.add("hidden")
    }

    const DisplayErrorTemporarily = () => {
        DisplayError();
        setTimeout(() => { HideError() }, [10000])
    }

    useEffect(() => {

        ErrorDiv = document.querySelector("#ErrorMessage");
        if (display) {
        }
        else {
            HideError();
        }
    }, [display])
    return (
        <div
            id="ErrorMessage"
            className={ErrorMessageStyle}
        >{message}</div>
    )
}

export default ErrorMessageElem; 