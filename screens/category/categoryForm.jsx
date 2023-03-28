import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { TagHooks } from '../../hooks/tagHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    BasicTextInput,
    BasicTextAreaInput,
    TagInput,
    EditImageInput,
} from '../../component/formElements.jsx';
import { AppContext } from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const CategoryForm = props => {
    const navigate = useNavigate();
    const { GetTagList } = TagHooks(navigate); 
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL, token  } = useContext(AppContext);
    const UserToken = localStorage.getItem("token");
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const [existingTags, setExistingTags] = useState(null); 
    const [name, setName] = useState("")
    const [image, setImage] = useState(null);
    const [tag, setTag] = useState([]);
    const [description, setDescription] = useState("")
    const [decoded, setDecoded] = useState(null); 

    const [nameError, setNameError] = useState([])
    const [imageError, setImageError] = useState([])
    const [tagError, setTagError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);

    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setNameError,
        setImageError,
        setTagError,
        setDescriptionError,
        setGeneralError, 
    }

    const imageInputRef = useRef();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    const generalErrorRef = useRef();
    const nameErrorRef = useRef();
    const imageErrorRef = useRef();
    const tagErrorRef = useRef();
    const descriptionErrorRef = useRef();

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
        setDecoded(JSON.parse(atob(token.split('.')[1])));
        GetTagList(apiURL, setExistingTags)
    }, [token])

    return (
        <div>
            <h1 className="HeaderStyle mt-[20px]">Create a new category</h1>
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
                    const UserDetails = {
                        id: decoded.id,
                        token: UserToken,
                    }
                    const Elements = {
                    }
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <BasicTextInput
                        data={name}
                        setData={setName}
                        dataError={nameError}
                        label="name"
                        name="name"
                        placeholder="Write the name of the category here."
                        inputRef={nameInputRef}
                        errorRef={nameErrorRef}
                    />
                    <BasicTextAreaInput
                        data={description}
                        setData={setDescription}
                        dataError={descriptionError}
                        label="Description"
                        name="description"
                        placeholder="Write the description of the category here"
                        inputRef={descriptionInputRef}
                        errorRef={descriptionErrorRef}
                    />
                    <TagInput
                        existingTags={existingTags}
                        addedTags={tag}
                        setAddedTags={setTag}
                        inputError={tagError}
                        errorRef={tagErrorRef}
                    />
                    <EditImageInput
                        image={image}
                        setImage={setImage}
                        pictureError={imageError}
                        label="Update your profile picture"
                        name="profile_pic"
                        placeholder="Browse your device to change your profile picture"
                        ImageInputRef={imageInputRef}
                        ImageErrorRef={imageErrorRef}
                    />
                </div>
                <FormButtons />
            </form>
        </div>
    )
}

export default CategoryForm; 