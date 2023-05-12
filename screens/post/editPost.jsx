import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CreateAndUpdatePosts } from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    AppContext,
    PostContext
} from '../../util/contextItem.jsx';
import RenderForm from "./postForm.jsx";
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';

//Next task: retrieve id and username from token 
const CreatePostForm = props => {
    const {
        abstract_char_limit = 150,
    } = props;
    const navigate = useNavigate();
    const { username } = useParams();
    const { GoHome } = NavigationHooks(navigate);
    const location = useLocation();

    const {
        apiURL,
        token,
        setLoading,
        setMessage, 
        message, 
    } = useContext(AppContext);
    const { SubmitPost } = CreateAndUpdatePosts(navigate, apiURL, setLoading, setMessage, token)
    const { id } = location.state;
    const [title, setTitle] = useState(location.state ? location.state.title : "")
    const [content, setContent] = useState(location.state ? location.state.content : "");
    const [author, setAuthor] = useState(location.state ? location.state.author._id : null);
    const [published, setPublished] = useState(location.state ? location.state.published : false);
    const [thumbnail, setThumbnail] = useState(location.state ? location.state.thumbnail : null);
    const [images, setImages] = useState(location.state ? location.state.images : []);

    const [abstract, setAbstract] = useState(location.state ? location.state.abstract : "");
    const [category, setCategory] = useState(location.state ? location.state.category : null);
    const [tag, setTag] = useState(location.state ? location.state.tag : []);
    //This helps to keep track of any tags that the user decides to delete
    const [priorTagList, setPrior] = useState(location.state ? location.state.tag : [])

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
        setLoading,
    }

    const context = {
        author,
        title,
        content,
        published,
        thumbnail,
        images,
        abstract,
        category: category._id,
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
        primaryLabel: published ? "Save edits" : "Publish",
        secondaryLabel: published ? "Convert to draft" : "Save draft",
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
            priorTagList
        };
        SubmitPost(Elements, dispatchFunctions, "PUT", id)
    }

    useEffect(() => {
        if (!token) {
            console.log("Token is not present.")
            GoHome();
        }
        setDecoded(JSON.parse(atob(token.split('.')[1])));
    }, [token])

    useEffect(() => {
        if (decoded != null) {
            if (decoded.id != author) {
                console.log("User's id does not match the author id of post")
                GoHome();
            }
        }
    }, [decoded, author])

    return (
        <PostContext.Provider value={context}>
            <h1 className="HeaderStyle mt-[40px] text-center font-bold text-2xl">Edit post</h1>
            <RenderForm />
        </PostContext.Provider>
    )
}

export default CreatePostForm; 