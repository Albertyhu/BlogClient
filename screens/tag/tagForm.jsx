import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { TagHooks } from '../../hooks/tagHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    TagInput,
} from '../../component/formElements.jsx';
import { AppContext } from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const CategoryForm = props => {
    const navigate = useNavigate();
    const { GetTagList, SaveTags } = TagHooks(navigate);
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL, token } = useContext(AppContext);
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const [existingTags, setExistingTags] = useState(null);

    //This useState variable will store that tags that the user wants to save. 
    const [tags, setTags] = useState([]);
    const [tagError, setTagError] = useState([]);

    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setTagError,
        setGeneralError,
    }

    const generalErrorRef = useRef();
    const tagErrorRef = useRef();

    const FormRef = useRef();

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
        if (!token) {
            return () => GoHome();
        }
        GetTagList(apiURL, setExistingTags)
    }, [token])

    return (
        <div>
            <h1 className="HeaderStyle mt-[20px]">Create new tags</h1>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            <form
                id="RegistrationForm"
                ref={FormRef}
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    SaveTags(apiURL, token, tags, dispatchFunctions)
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <TagInput
                        existingTags={existingTags}
                        addedTags={tags}
                        setAddedTags={setTags}
                        inputError={tagError}
                        setInputError={setTagError}
                        errorRef={tagErrorRef}
                    />

                </div>
                <FormButtons />
            </form>
        </div>
    )
}

export default CategoryForm; 