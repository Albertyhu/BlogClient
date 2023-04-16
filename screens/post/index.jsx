import { useState, useEffect, useContext, useRef } from 'react'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
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
import { CommentInput } from '../../component/formElements/commentInputs.jsx'
import { AddComment } from '../../hooks/commentHooks.jsx'; 
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';

const RenderPost = props => {
    const location = useLocation(); 
    const { post_title, post_id } = useParams(); 
    const {
        token, 
        apiURL, 
        setLoading, 
    } = useContext(AppContext);
    const navigate = useNavigate(); 
    const { GoEditPost } = PostNavigationHooks(navigate);
    const {
        GoBack,
        GoHome, 
    } = NavigationHooks(navigate); 
    const { FetchPostById } = FetchHooks(); 
    const { DeletePost } = CreateAndUpdatePosts(navigate); 
    const PostContainerStyle = ``;

    const [title, setTitle] = useState(location.state ? location.state.title : null);
    const [content, setContent] = useState(location.state ? location.state.content : null);
    const [datePublished, setDatePublished] = useState(location.state ? location.state.datePublished : null);
    const [lastEdited, setLastEdited] = useState(location.state ? location.state.lastEdited : null);
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

    //this handles whether the text input for adding new comment on the post is displayed or hidden
    const [displayCommentInput, setDisplayCommentInput] = useState(false); 
    const [newComment, setNewComment] = useState('')
    const [newCommentError, setNewCommentError] = useState([]);
    const [commentImages, setCommentImages] = useState([]); 
    const [commmentImageError, setImageError] = useState([])
    const imageInputRef = useRef(); 

    const CloseCommentInput = () => setDisplayCommentInput(false)

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
        setLastEdited,
        setLoading, 
        CloseCommentInput,
        setImageError
    }

    const RenderButtonField = () => {
        return (
            <>
                <button
                    className="btn-standard text-white bg-[#6d6d6d] mx-auto text-center"
                    type="button"
                    onClick={() => GoEditPost(title, post_id, context)}
                >Edit Post</button>
                <button
                    className="btn-secondary my-10"
                    type="button"
                    onClick={() => DeletePost(apiURL, post_id, token, decoded.id, author._id, setMessage, GoHome)}
                >Delete Post</button>
            </>
            )
    }

    const PostContainerRef = useRef();
    const commentEditorRef = useRef(); 

    const SubmitComment = () => {
        const Elements = {
            content: GetContent(commentEditorRef),
            root: post_id, 
            author: decoded.id
        } 
        AddComment(apiURL, "POST", post_id,"add_comment", Elements, dispatchFunctions, token)
    }

    const context = {
        title,
        content,
        datePublished,
        lastEdited,
        thumbnail,
        abstract,
        author,
        mainPanelimages: images,
        category,
        tag,
        comments,
        likes,
        published,
        decoded,
        postID: post_id,
        decoded,
        EditPost: () => { GoEditPost(title, post_id, context) },
        DeletePost: () => { DeletePost(apiURL, post_id, token, decoded.id, author._id, setMessage, GoBack) }, 
        RenderButtonField, 
        PostContainerRef,
        displayCommentInput,
        setDisplayCommentInput, 
        toggleCommentField: () => setDisplayCommentInput(prev => !prev), 

        images: commentImages, 
        setImages: setCommentImages, 
        imagesError: commmentImageError, 
        imageInputRef, 
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
                    ref={PostContainerRef}
                >
                    <MessageComponent
                        message={message}
                        dispatch={setMessage}
                    />
                    <div
                        id="PostWrapper"
                        className="w-11/12 box_shadow rounded-lg mx-auto"
                    >
                        <MainPanel />
                        {displayCommentInput &&
                            <div className="w-11/12 mx-auto pb-10">
                                <CommentInput
                                    root={post_id}
                                    content={newComment}
                                    commentError={newCommentError}
                                    cancelEvent={() => setDisplayCommentInput(false)}
                                    commentEditorRef={commentEditorRef}
                                    submitEvent={SubmitComment}
                                    />
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