import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CreateAndUpdatePosts } from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    AppContext,
    PostContext
} from '../../util/contextItem.jsx';
import RenderForm from "./postForm.jsx"; 
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';

const CreatePostForm = props => {
    const {
        abstract_char_limit = 150,
    } = props; 
    const navigate = useNavigate();
    const { GoHome } = NavigationHooks(navigate);
    const {
        apiURL,
        token,
        setLoading, 
    } = useContext(AppContext);
    const location = useLocation(); 
    
    const { SubmitPost } = CreateAndUpdatePosts(navigate)

    const [title, setTitle] = useState("How to pet a dog")
    const [content, setContent] = useState("<p>Most dogs are comfortable being petted on the chest, the shoulders, and the base of the neck.</p>");
    const [author, setAuthor] = useState(''); 
    const [published, setPublished] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [category, setCategory] = useState(location.state ? location.state.category ? location.state.category : '' : '');
    const [tag, setTag] = useState([]);

    const [message, setMessage] = useState(''); 

    const [decoded, setDecoded] = useState(null);

    const imagesInputRef = useRef();
    const titleInputRef = useRef();
    const contentInputRef = useRef(null);
    const thumbnailInputRef = useRef();
    const abstractInputRef = useRef(null);
    const categoryInputRef = useRef();
    const publishedInputRef = useRef();

    const [titleError, setTitleError] = useState([])
    const [contentError, setContentError] = useState([])
    const [thumbnailError, setThumbnailError] = useState([])
    const [imagesError, setImagesError] = useState([])
    const [abstractError, setAbstractError] = useState([])
    const [categoryError, setCategoryError] = useState([]);
    const [tagError, setTagError] = useState([])
    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setTitleError,
        setContentError,
        setThumbnailError,
        setImagesError,
        setAbstractError,
        setCategoryError,
        setGeneralError,
        setTagError,
        setMessage,
        setLoading
    }

    const context = {
        author, 
        title,
        content, 
        published, 
        thumbnail,
        images, 
        abstract,
        category, 
        tag, 

        setTitle, 
        setContent, 
        setPublished, 
        setThumbnail,
        setImages, 
        setAbstract,
        setCategory,
        setTag, 

        imagesInputRef,
        titleInputRef,
        contentInputRef,
        thumbnailInputRef,
        abstractInputRef,
        categoryInputRef,
        publishedInputRef,

        titleError,
        contentError,
        thumbnailError,
        imagesError,
        abstractError,
        categoryError,
        tagError,
        generalError,

        setTagError,

        abstract_char_limit, 
        navigate, 
        primaryLabel: "Publish",
        secondaryLabel: "Save as draft",
        publishFunc: () => handleSubmit(true),
        draftFunc: () => handleSubmit(false),
        message, 
        setMessage, 
    } 

    const handleSubmit = (published) => {
        const Elements = {
            title,
            content: GetContent(contentInputRef),
            author,
            published: published,
            thumbnail: thumbnailInputRef.current.files[0],
            images,
            abstract: GetContent(abstractInputRef),
            category: categoryInputRef.current.value,
            tag,
            abstract_char_limit: abstract_char_limit,
        };
        SubmitPost(apiURL, Elements, dispatchFunctions, "POST", null, token)
    }

    useEffect(() => {
        if (!token) {
            return () => GoHome();
        }
        setDecoded(JSON.parse(atob(token.split('.')[1])));
    }, [token])

    useEffect(() => {
        if (decoded != null) {
            setAuthor(decoded.id)
        }
    }, [decoded])



    return (
        <PostContext.Provider value={context}>
            <h1 className="HeaderStyle mt-[40px] text-center font-bold text-2xl">Create a new post</h1>
            <RenderForm /> 
        </PostContext.Provider>
    )
}

export default CreatePostForm; 