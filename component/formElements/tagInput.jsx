import { lazy, Suspense, useState, useEffect, useRef } from 'react'; 
import { searchTag } from '../../hooks/tagHooks.jsx';
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import uuid from 'react-uuid'; 
const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
import DeleteIcon from '../../assets/icons/cancel.png'; 

 const TagInput = props => {
    const {
        inputError,
        addedTags,
        setAddedTags,
        existingTags,
        setInputError,
        labelStyle = "text-xl",
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
        if (!addedTags.some(val => val.name.trim() == input.trim())) {
            if (input.trim() != "") {
                setAddedTags(prev => [...prev, { name: input }])
                setInput("")
                setSearchResults([])
            }
            else {
                setInputError([{param: "tag", msg: "The tag cannot be an empty value." }])
            }
        }
        else {
            setSearchResults([])
            setInputError([{ param: "tag", msg: "That tag has already been added." }])
        }
    }

    const addTagThroughLink = (name) => {
        if (!addedTags.some(val => val.name.trim() == name.trim())) {
            setAddedTags(prev => [...prev, { name: name }])
            setInput("")
            setSearchResults([])
        } else {
            setSearchResults([])
            setInputError([{ param: "tag", msg: "That tag has already been added." }])
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
            <label className={labelStyle}>Tags</label>
            <div className="[&>*]:block sm:grid sm:grid-cols-[auto_auto]">
                <input
                    value={input}
                    onChange={handleChange}
                    className="!border-black border-[1px] w-full"
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
                    />
                )}
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

const Tag = props => {
    const {
        name,
        deleteTag
    } = props;
    return deleteTag ?
        (
            <div
                className="Tag"
                onClick={() => deleteTag(name)}
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
                <h2 className="underline font-bold">Existing Tags</h2>
                <ul>
                    {queryResults.map(result =>
                        <li
                            key={uuid()}
                            className="my-5 cursor-pointer hover:bg-[#dbdbdb]"
                            onClick={() => addTag(result.name)}
                        >{result.name}</li>)}
                </ul>
            </div>
        )
    }
    return null;
}

export default TagInput; 