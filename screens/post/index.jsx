import { useState, useEffect, useContext } from 'react'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { PostLikeFeatures } from "../../component/likeComponent.jsx" 
import { DecodeToken } from '../../hooks/decodeToken.jsx'; 
import {
    FetchHooks,
    CreateAndUpdatePosts,
} from '../../hooks/postHooks.jsx'; 
import { ErrorMessageHooks, PostErrorHooks } from '../../hooks/errorHooks.jsx'; 
import MessageComponent from '../../component/message.jsx'; 
import { PostContext } from '../../util/contextItem.jsx';
import MainPanel from './mainPanel.jsx'; 
import { PostNavigationHooks, NavigationHooks } from '../../hooks/navigation.jsx'; 

const RenderPost = props => {
    const location = useLocation(); 
    const { post_title, post_id } = useParams(); 
    const {
        token, 
        apiURL, 
        categoryList, 
    } = useContext(AppContext); 
    const { RenderLikeButton } = PostLikeFeatures(); 
    const navigate = useNavigate(); 
    const { GoEditPost } = PostNavigationHooks(navigate);
    const {
        GoBack,
        VisitOneCategory,
    } = NavigationHooks(navigate); 
    const { FetchPostById } = FetchHooks(); 
    const { DeletePost } = CreateAndUpdatePosts(navigate); 
    const PostContainerStyle = ``;
    const PostWrapper = ``;

    const [title, setTitle] = useState(location.state ? location.state.title : null);
    const [content, setContent] = useState(location.state ? location.state.content : null);
    const [datePublished, setDatePublished] = useState(location.state ? location.state.datePublished : null);
    const [thumbnail, setThumbnail] = useState(location.state ? location.state.thumbnail : null);
    const [abstract, setAbstract] = useState(location.state ? location.state.abstract : null);
    const [author, setAuthor] = useState(location.state ? location.state.author : "");

    const [images, setImages] = useState(location.state ? location.state.images : []);
    const [category, setCategory] = useState(location.state ? location.state.category : "");
    const [tag, setTag] = useState(location.state ? location.state.tag : []);
    const [comments, setComments] = useState(null);
    const [likes, setLikes] = useState(null);
    const [published, setPublished] = useState(location.state ? location.state.published : true); 

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
        postID: post_id, 
    }
    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token));
        }
    }, [token])

    useEffect(() => {
        FetchPostById(apiURL, post_id, dispatchFunctions)
    }, [post_id])

    if (published) {
        return (
            <PostContext.Provider value={context}>
                <div
                    id="PostContainer"
                    className={`${PostContainerStyle}`}
                >
                    <MessageComponent
                        message={message}
                        dispatch={setMessage}
                    />
                    <div
                        id="PostWrapper"
                        className={`${PostWrapper}`}
                    >
                        <MainPanel />
                        {decoded && author._id == decoded.id && 
                            <div className="my-10">
                                <button
                                    className= "btn-standard text-white bg-[#6d6d6d] mx-auto text-center"
                                    type="button"
                                    onClick={()=>GoEditPost(title, post_id, context)}
                                >Edit Post</button>
                                <button
                                    className="btn-secondary my-10"
                                    type="button"
                                    onClick={() => DeletePost(apiURL, post_id, token, decoded.id, author._id, setMessage, GoBack)}
                                >Delete Post</button>
                            </div>
                        }
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