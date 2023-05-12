import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import {} from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
} from '../../component/formElements.jsx';
import {
    BasicTextInput,
    BasicTextAreaInput
} from '../../component/formElements/textInputs.jsx';
import { AppContext } from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const PostForm = props => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { GoHome } = NavigationHooks(navigate);
    const { apiURL } = useContext(AppContext);
    const UserToken = localStorage.getItem("token");
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState(""); 
    const [published, setPublished] = useState(false); 
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [category, setCategory] = useState(''); 
    const [tag, setTag] = useState([]); 

    const [titleError, setTitleError] = useState([])
    const [contentError, setContentError] = useState([])
    const [thumbnailError, setThumbnailError] = useState([])
    const [imagesError, setImagesError] = useState([])
    const [abstractError, setAbstractError] = useState([])
    const [categoryError, setCategoryError] = useState([]);

    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setTitleError, 
        setContentError, 
        setThumbnailError, 
        setImagesError,
        setAbstractError,
        setCategoryError, 
        setGeneralError
    }

    const imagesInputRef = useRef();
    const titleInputRef = useRef();
    const contentInputRef = useRef();
    const thumbnailInputRef = useRef();
    const abstractInputRef = useRef();
    const categoryInputRef = useRef();
    const publishedInputRef = useRef();

    const generalErrorRef = useRef();
    const titleErrorRef = useRef();
    const contentErrorRef = useRef();
    const thumbnailErrorRef = useRef();
    const imagesErrorRef = useRef();
    const abstractErrorRef = useRef();
    const categoryErrorRef = useRef();

    const FormRef = useRef();

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
        if (!UserToken) {
            return () => GoHome();
        }
        const decoded = JSON.parse(atob(UserToken.split('.')[1]));
    }, [UserToken])

    return (
        <div>
            <h1 className="HeaderStyle mt-[20px]">Update your password</h1>
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
                        username,
                        id,
                        token: UserToken,
                    }
                    const Elements = {
                    }
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <BasicTextInput
                        data={title}
                        setData={setTitle}
                        dataError={titleError}
                        label="Title"
                        name="title"
                        placeholder="Write your title here."
                        inputRef={titleInputRef}
                        errorRef={titleErrorRef}
                    />
                    <BasicTextInput
                        data={content}
                        setData={setContent}
                        dataError={contentError}
                        label="Main body"
                        name="content"
                        placeholder="Share your thoughts here"
                        inputRef={contentInputRef}
                        errorRef={contentErrorRef}
                    />
                </div>
                <FormButtons />
            </form>
        </div>
    )
}

export default EditPasswordForm; 