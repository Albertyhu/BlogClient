import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { } from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    AppContext,
    PostContext
} from '../../util/contextItem.jsx';
import RenderForm from "./postForm.jsx"; 

//Next task: retrieve id and username from token 
const CreatePostForm = props => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { GoHome } = NavigationHooks(navigate);
    const {
        apiURL,
        token,
    } = useContext(AppContext);

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState(''); 
    const [published, setPublished] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState([]);

    const [decoded, setDecoded] = useState(null);

    const imagesInputRef = useRef();
    const titleInputRef = useRef();
    const contentInputRef = useRef();
    const thumbnailInputRef = useRef();
    const abstractInputRef = useRef();
    const categoryInputRef = useRef();
    const publishedInputRef = useRef();
    
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
            <RenderForm
                execute= ""
            /> 
        </PostContext.Provider>
    )
}

export default CreatePostForm; 