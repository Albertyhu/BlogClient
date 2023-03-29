import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { NavigationHooks } from "../../hooks/navigation.jsx";
import { CategoryFormHooks } from '../../hooks/categoryHooks.jsx'; 
import {
    FormButtons,
    BasicTextInput,
    BasicTextAreaInput,
    EditImageInput,
} from '../../component/formElements.jsx';
import { AppContext } from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const CategoryForm = props => {
    const navigate = useNavigate();
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL, token } = useContext(AppContext);
    const { CreateCategory } = CategoryFormHooks(navigate); 
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const [name, setName] = useState("")
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("")

    const [nameError, setNameError] = useState([])
    const [imageError, setImageError] = useState([])
    const [descriptionError, setDescriptionError] = useState([]);

    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setNameError,
        setImageError,
        setDescriptionError,
        setGeneralError, 
    }

    const imageInputRef = useRef();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    const generalErrorRef = useRef();
    const nameErrorRef = useRef();
    const imageErrorRef = useRef();
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
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    const Elements = {
                        name: nameInputRef.current.value, 
                        description: descriptionInputRef.current.value, 
                        imageData: imageInputRef.current.files[0],
                    }
                    CreateCategory(apiURL, token, Elements, dispatchFunctions)
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