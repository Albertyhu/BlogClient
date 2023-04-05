import { useEffect, lazy, useCallback, useState, Suspense, useRef } from 'react';
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import '../../src/index.css';

import uuid from 'react-uuid';
import { wait } from '../../hooks/wait.jsx'
import PropTypes from 'prop-types';


const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
const BasicInputStyle = `px-1 text-lg border-black border-[1px] rounded bg-transparent`;
const BasicTextAreaStyle = `resize-none rounded-lg w-full p-1 bg-[rgba(0,0,0,0)] border-[1px] 
                            border-white placeholder:text-[#545454] text-lg`

//Generic building block for a form 
export const BasicTextInput = props => {
    const {
        data,
        setData,
        dataError,
        label,
        name,
        placeholder = "Write something",
        inputRef,
        type = "text",
        labelStyle = "text-xl",
    } = props;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const errorRef = useRef();

    const handleUserInput = evt => {
        setData(evt.target.value)
    }

    useEffect(() => {
        if (dataError.length > 0) {
            for (var child of errorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [dataError])

    return (
        <>
            <label
                htmlFor={label}
                className={labelStyle}
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

BasicTextInput.propTypes = {
    data: PropTypes.string, 
    setData: PropTypes.func, 
    label: PropTypes.string,
    name: PropTypes.string, 
    placeholder: PropTypes.string, 
    type: PropTypes.string, 
    labelStyle: PropTypes.string, 
}

export const BasicTextAreaInput = props => {
    const { data,
        setData,
        dataError,
        label,
        name,
        placeholder = "Write something",
        inputRef,
        ROWS = 5,
        characterLimit,
        labelStyle = "text-xl",
    } = props;

    const [characters, setCharacter] = useState(characterLimit ? characterLimit : null)

    const errorRef = useRef();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleUserInput = evt => {
        var userInput = evt.target.value;
        if (characters != null) {
            if (userInput.length <= characterLimit) {
                setData(userInput)
                setCharacter(userInput.length)
            }
        }
        else {
            setData(userInput)
        }

    }

    useEffect(() => {
        if (dataError.length > 0) {
            for (var child of errorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [dataError])

    return (
        <>
            <label
                htmlFor={label}
                className={labelStyle}
            >{capitalizeFirstLetter(label)} {characterLimit && <span className="text-gray-400">(Max {characterLimit} characters)</span>}</label>
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
            {characterLimit != null &&
                <div className="text-[#b8b8b8] text-lg">{characters}/{characterLimit}</div>}
            <div
                id="dataError"
                className="ErrorDiv"
                ref={errorRef}>
                {dataError != null && dataError.length > 0 && RenderError(dataError)}
            </div>
        </>
    )
}

BasicTextAreaInput.propTypes = {
    data: PropTypes.string,
    setData: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    labelStyle: PropTypes.string,
    ROWS: PropTypes.number, 
    charaterLimit: PropTypes.number, 
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