import { useEffect, lazy, useCallback } from 'react';
import { ErrorMessageHooks } from "../hooks/errorHooks.jsx";
import { RegistrationHooks } from '../hooks/authFormHooks.jsx';
import { useNavigate } from 'react-router-dom'; 
import '../src/index.css'; 

const RenderProfilePic = lazy(() => import('./user/profilePicture.jsx'));
const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
const { HandleFileChange } = RegistrationHooks();
const BasicInputStyle = `px-1 text-lg border-black border-[1px] rounded bg-transparent`;
const BasicLabelStyle = `text-lg`;
const BasicTextAreaStyle = `resize-none rounded-lg w-full p-1 bg-[rgba(0,0,0,0)] border-[1px] 
                            border-white placeholder:text-[#545454] text-lg`

export const FormButtons = props => {
    const navigate = useNavigate(); 
    const UniversalStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px] text-base
    active:translate-y-[5px] select-none  cursor-pointer sm:w-[150px] text-center w-fit my-5`

    const SubmitStyle = `!active:bg-[#C6C6C6] border-[#dbdbdb] border-2 
    text-black mx-auto hover:bg-gray-300 !bg-[#dbdbdb] ${UniversalStyle}`;

    const CancelStyle = `!active:bg-[#4B4B4B] border-white border-2 
    text-white mx-auto hover:bg-gray-300 !bg-[#333333] ${UniversalStyle}`; 

    return (
        <div id="ButtonWrapper"
            className = "flex"
        >
            <button
                type="submit"
                className={SubmitStyle}
                value="Submit"
            >Submit</button>
            <button
                type="button"
                className={CancelStyle}
                value="Cancel"
                onClick={useCallback(()=>navigate(-1))}
            >Cancel</button>
        </div>
        )
}


export const EditImageInput = props => {
    const { image,
        setImage,
        pictureError,
        label,
        name,
        placeholder = "Upload an image here",
        ImageInputRef,
        ImageErrorRef
    } = props; 

    useEffect(() => {
        if (pictureError.length > 0) {
            for (var child of ImageErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [pictureError])
    return (
        <>
            {image && <RenderProfilePic
                profile_pic={image}
                altText="Preview Image" />
            }
            <label
                htmlFor={label}
                className={BasicLabelStyle}
            >{label}</label>
            <input
                name={name}
                id={`${name}Input`}
                ref={ImageInputRef}
                type="file"
                placeholder={placeholder}
                className="text-lg file:rounded-lg file:font-['DecoTech'] file:bg-[#99cbae] file:text-white cursor-pointer border-black border-[1px] rounded"
                onChange={(evt) => { HandleFileChange(evt, setImage) }}
            />
            <div
                id="pictureError"
                className="ErrorDiv"
                ref={ImageErrorRef}>
                {pictureError != null && pictureError.length > 0 && RenderError(pictureError)}
            </div>
        </>
        )
} 

//Generic building block for a form 
export const BasicTextInput = props => {
    const { data,
        setData,
        dataError,
        label,
        name,
        placeholder = "Write something",
        inputRef,
        errorRef
    } = props;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleUserInput = evt => { 
        setData(evt.target.value)
    }

    useEffect(() => {
        if (dataError.length > 0) {
            for (var child of inputRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [dataError])

    return (
        <>
            <label
                htmlFor={label}
                className={BasicLabelStyle}
            >{capitalizeFirstLetter(label)}</label>
            <input
                name={name}
                id={`${name}Input`}
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className={BasicInputStyle}
                onChange={handleUserInput}
                value={data}
            />
            <div
                id="dataError"
                className="ErrorDiv"
                ref={errorRef}>
                {dataError != null && dataError.length > 0 && RenderError(dataError)}
            </div>
        </>
    )
} 

export const BasicTextAreaInput = props => {
    const { data,
        setData,
        dataError,
        label,
        name,
        placeholder = "Write something",
        inputRef,
        errorRef,
        ROWS = 5,
    } = props;
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleUserInput = evt => {
        setData(evt.target.value)
    }

    useEffect(() => {
        if (dataError.length > 0) {
            for (var child of inputRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [dataError])

    return (
        <>
            <label
                htmlFor={label}
                className={BasicLabelStyle}
            >{capitalizeFirstLetter(label)}</label>
            <textarea
                name={name}
                id={`${name}Input`}
                rows={ROWS}
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className={BasicTextAreaStyle}
                onChange={handleUserInput}
                value={data}
            ></textarea>
            <div
                id="dataError"
                className="ErrorDiv"
                ref={errorRef}>
                {dataError != null && dataError.length > 0 && RenderError(dataError)}
            </div>
        </>
    )
} 

/*
 template
<BasicFormInput
    setData={}
    dataError={}
    label=""
    name=""
    placeholder=""
    inputRef={}
    errorRef={}
/>
 */