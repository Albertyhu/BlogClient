import { useState, useEffect, useContext } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { PostLikeFeatures } from "../../component/likeComponent.jsx" 
import { DecodeToken } from '../../hooks/decodeToken.jsx'; 
import { FetchHooks } from '../../hooks/postHooks.jsx'; 
import { ErrorMessageHooks, PostErrorHooks } from '../../hooks/errorHooks.jsx'; 
import MessageComponent from '../../component/message.jsx'; 
import { PostContext } from '../../util/contextItem.jsx';
import MainPanel from './mainPanel.jsx'; 

const RenderPost = props => {
    const location = useLocation(); 
    const { id } = location.state; 
    const {
        token, 
        apiURL, 
    } = useContext(AppContext); 
    const { RenderLikeButton } = PostLikeFeatures(); 
    const { FetchPostById } = FetchHooks(); 

    const PostContainerStyle = ``;
    const PostWrapper = ``;

    const [title, setTitle] = useState(location.state ? location.state.title : null);
    const [content, setContent] = useState(location.state ? location.state.content : null);
    const [datePublished, setDatePublished] = useState(location.state ? location.state.datePublished : null);
    const [thumbnail, setThumbnail] = useState(location.state ? location.state.thumbnail : null);
    const [abstract, setAbstract] = useState(location.state ? location.state.abstract : null);
    const [author, setAuthor] = useState(null);

    const [images, setImages] = useState(null);
    const [category, setCategory] = useState(null);
    const [tag, setTag] = useState(null);
    const [comments, setComments] = useState( null);
    const [likes, setLikes] = useState(null);
    const [published, setPublished] = useState(false); 

    const [decoded, setDecoded] = useState(null)

    const [message, setMessage] = useState([])

    const dispatchFunctions = {
        setTitle,
        setContent, 
        setDatePublished,
        setThumbnail,
        setAbstract,
        setAuthor,
        setImages,
        setCategory, 
        setTag, 
        setComments,
        setLikes, 
        setPublished, 
    }

    const context = {
        title, 
        content, 
        datePublished, 
        thumbnail,
        abstract,
        author,
        images,
        category,
        tag, 
        comments, 
        likes, 
        published, 
        decoded, 
        postID: id, 
    }

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token));
        }
    }, [token])

    useEffect(() => {
        FetchPostById(apiURL, id, dispatchFunctions)
    }, [id])

    if (published) {
        return (
            <PostContext.Provider value={context}>
                <div
                    id="PostContainer"
                    className={`${PostContainerStyle}`}
                >
                    <MessageComponent message={message} />
                    <div
                        id="PostWrapper"
                        className={`${PostWrapper}`}
                    >
                        <MainPanel />
                    </div>
                </div>
            </PostContext.Provider>
        )
    }
    else {
        <div>
            <h1 className ="text-center text-3xl font-bold my-10">The author has not published this post yet</h1>
        </div>
    }
}

export default RenderPost; 