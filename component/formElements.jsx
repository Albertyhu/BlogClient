import { useEffect, lazy, useCallback, useState, Suspense, useRef} from 'react';
import { ErrorMessageHooks } from "../hooks/errorHooks.jsx";
import { RegistrationHooks } from '../hooks/authFormHooks.jsx';
import { useNavigate } from 'react-router-dom'; 
import '../src/index.css'; 
import DeleteIcon from '../assets/icons/cancel.png'; 
import uuid from 'react-uuid';
import { searchTag } from '../hooks/tagHooks.jsx'; 
import { wait } from '../hooks/wait.jsx'
const RenderProfilePic = lazy(() => import('./user/profilePicture.jsx'));
const RenderCoverPhoto = lazy(() => import("./coverPhoto.jsx"));
import PropTypes from 'prop-types';
const AddButton = lazy(() => import('./addButton.jsx'));
import { NavigationHooks } from '../hooks/navigation.jsx';

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
    const {
        image,
        setImage,
        pictureError,
        label,
        name,
        placeholder = "Upload an image here",
        ImageInputRef,
    } = props; 

    const ImageErrorRef = useRef();

    useEffect(() => {
        if (pictureError.length > 0) {
            for (var child of ImageErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [pictureError])

    return (
        <>
            {image &&

                <Suspense fallback={<h2 className = "text-center text-2xl mx-auto my-10 text-black">Loading current image...</h2>}>
                    <RenderCoverPhoto
                        image={image}
                        altText="Preview Image"
                        isPreview={true}
                    />
                </Suspense>
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
        type="text"
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
        ROWS = 5,
        characterLimit, 
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
            setCharacter(userInput.length)
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
                className={BasicLabelStyle}
            >{capitalizeFirstLetter(label)} {characterLimit && <span className = "text-gray-400">(Max {characterLimit} characters)</span>}</label>
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
                <div className = "text-[#b8b8b8] text-lg">{characters}/{characterLimit}</div>}
            <div
                id="dataError"
                className="ErrorDiv"
                ref={errorRef}>
                {dataError != null && dataError.length > 0 && RenderError(dataError)}
            </div>
        </>
    )
} 

export const TagInput = props => {
    const {
        inputError, 
        addedTags, 
        setAddedTags,
        existingTags, 
        setInputError, 
    } = props; 
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const handleChange = evt => {
        var input = evt.target.value; 
        setInput(input)
        if (input != "") {
            setSearchResults(searchTag(input, existingTags))
            setInputError([])
        }
        else {
            setSearchResults([]);
        }
    }
    const addTag = () => {
        console.log("addedTags: ", addedTags);
        console.log("input: ", input)
        if (!addedTags.some(val => val.name.trim() == input.trim())) {
            if (input.trim() != "") {
                setAddedTags(prev => [...prev, { name: input }])
                setInput("")
                setSearchResults([])
            }
            else {
                setInputError([{ msg: "The tag cannot be an empty value." }])
            }
        }
        else {
            setInputError([{ msg: "That tag has already been added."}])
        }
    }

    const addTagThroughLink = (name) => {
        if (!addedTags.some(val => val.name.trim() == name.trim())) {
            setAddedTags(prev => [...prev, { name: name }])
            setInput("")
            setSearchResults([])
        } else {
            setInputError([{ msg: "That tag has already been added." }])
        }
    }

    const deleteTag = item => {
        var arr = addedTags.filter(val => val.name != item); 
        setAddedTags(arr)
    }

    const errorRef = useRef(); 

    useEffect(() => {
        if (inputError.length > 0) {
            for (var child of errorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [inputError])

    return (
        <>
            <div className= "[&>*]:block sm:grid sm:grid-cols-[auto_auto]">
                <input
                    value={input}
                    onChange={handleChange}
                    className = "!border-black border-[1px] w-full" 
                />
                <button
                    type="button"
                    className="btn-primary mt-[10px] sm:mt-[0px] text-sm"
                    onClick={addTag}
                    >Add</button>
            </div>
            <ExistingTagResults
                queryResults={searchResults}
                addTag={addTagThroughLink}
            />
            <div
                id="AddedTags"
                className=""
            >
                {addedTags && addedTags.map(item =>
                    <Tag
                        key={uuid()}
                        name={item.name}
                        deleteTag={deleteTag}
                    />)}
            </div>
            <div
                id="dataError"
                className="ErrorDiv"
                ref={errorRef}>
                {inputError != null && inputError.length > 0 && RenderError(inputError)}
            </div>
        </>
        )
}

export const Tag = props => {
    const {
        name,
        deleteTag
    } = props;
    return deleteTag ? 
     (
        <div
            className="Tag"
            onClick={()=>deleteTag(name)}
        >
            <div>{name}</div>
            <img
                className="MiniDeleteButton ml-5"
                src={DeleteIcon}
            />
        </div>
    )
    :
    (
        <div
            className="Tag"
        >
            <div>{name}</div>
        </div>
        )
}

//queryResults is an array 
const ExistingTagResults = props => {
    const { queryResults, 
        addTag
    } = props; 
    if (queryResults.length > 0) {
        return (
            <div className="bg-white pl-5">
                <h2 className ="underline font-bold">Existing Tags</h2>
                <ul>
                    {queryResults.map(result =>
                        <li
                            key={uuid()}
                            className="my-5 cursor-pointer hover:bg-[#dbdbdb]"
                            onClick={() => addTag(result.name) }
                        >{result.name}</li>)}
                </ul>
            </div>
        )
    }
    return null; 
}

export const PostFormElements = (navigate) => {
    const { GoCreateCategory } = NavigationHooks(navigate); 

    const SelectCategory = props => {
        const {
            categoryList,
            currentOption,
            label = "Select category",
            setData,
            dataError,
        } = props;

        const onChangeHandler = evt => {
            setData(evt.target.value)
        }

        const errorRef = useRef(); 

        useEffect(() => {
            if (dataError.length > 0) {
                for (var child of errorRef.current.children) {
                    AnimateErrorMessage(child)
                }
            }
        }, [dataError])

        return (
            <>
                <label>{label}</label>
                <select
                    name="category"
                    onChange={onChangeHandler}
                >
                    {categoryList && categoryList.map(opt =>
                        <option
                            key={uuid()}
                            value={opt._id}
                            selected={currentOption ? currentOption.toString() == opt._id.toString() ? true : false : false}
                        >{opt.name}</option>
                    )}
                </select>
                <Suspense fallback={<p>Loading...</p>}>
                    <div><AddButton
                        title="Create a new category"
                        dispatchFunction={GoCreateCategory}
                        altText="Add a new category"
                    /></div>
                </Suspense>
                <div
                    id="dataError"
                    className="ErrorDiv"
                    ref={errorRef}>
                    {dataError != null && dataError.length > 0 && RenderError(dataError)}
                </div>
            </>
        )
    }

    SelectCategory.propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
    }
    return { SelectCategory }
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