import { useState, useEffect, useContext, useRef } from 'react'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import {
    AppContext,
    PostContext,
    ShareContext, 
} from '../../util/contextItem.jsx'; 
import { DecodeToken } from '../../hooks/decodeToken.jsx'; 
import {
    FetchHooks,
    CreateAndUpdatePosts,
} from '../../hooks/postHooks.jsx'; 
import MainPanel from './mainPanel.jsx'; 
import { PostNavigationHooks, NavigationHooks } from '../../hooks/navigation.jsx'; 
import { CommentInput } from '../../component/formElements/commentInputs.jsx'
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx'; 
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';
import CommentPanel from '../../component/commentPanel'; 
import {
    alertMessage,
    cleanString,
} from '../../hooks/textHooks.jsx';
import { ShareIcon } from '../../component/iconComponents.jsx'; 

const RenderPost = props => {
    const location = useLocation(); 
    const {
        post_title,
        post_id
    } = useParams(); 
    const {
        token, 
        apiURL, 
        setLoading, 
        setMessage, 
        siteURL, 
        decoded, 
    } = useContext(AppContext);

    const {
        AddComment, 
    } = FetchCommentActions(apiURL, setLoading, token)
    const navigate = useNavigate(); 
    const { GoEditPost } = PostNavigationHooks(navigate);
    const {
        GoBack,
        GoHome, 
    } = NavigationHooks(navigate); 
    const { FetchPostById } = FetchHooks(apiURL, setLoading, setMessage); 
    const { DeletePost } = CreateAndUpdatePosts(navigate, apiURL, setLoading, setMessage, token); 
    const PostContainerStyle = ``;

    const [title, setTitle] = useState(location.state ? location.state.title : post_title ? post_title : null);
    const [content, setContent] = useState(location.state ? location.state.content : null);
    const [datePublished, setDatePublished] = useState(location.state ? location.state.datePublished : null);
    const [lastEdited, setLastEdited] = useState(location.state ? location.state.lastEdited : null);
    const [thumbnail, setThumbnail] = useState(location.state ? location.state.thumbnail : null);
    const [abstract, setAbstract] = useState(location.state ? location.state.abstract : null);
    const [author, setAuthor] = useState(null);

    const [images, setImages] = useState(location.state ? location.state.images : []);
    const [category, setCategory] = useState(location.state ? location.state.category : "");
    const [tag, setTag] = useState(location.state ? location.state.tag : []);
    const [likes, setLikes] = useState(null);
    const [published, setPublished] = useState(location.state ? location.state.published : true); 

    const [comments, setComments] = useState([])

    //this handles whether the text input for adding new comment on the post is displayed or hidden
    const [displayCommentInput, setDisplayCommentInput] = useState(false); 
    const [newComment, setNewComment] = useState('')
    const [newCommentError, setNewCommentError] = useState([]);
    const [commentImages, setCommentImages] = useState([]); 
    const [commmentImageError, setImageError] = useState([])
    const imageInputRef = useRef(); 

    const CloseCommentInput = () => setDisplayCommentInput(false)
        //This allows the app to reset the commentImages array

    const reset = () => {
        setCommentImages([])
    }

    const dispatchFunctions = {
        setTitle,
        setContent, 
        setDatePublished,
        setThumbnail,
        setAbstract,
        setAuthor,
        setImages,
        setCategory,
        setComments,
        setTag, 
        setLikes, 
        setPublished,
        setLastEdited,
        setLoading, 
        CloseCommentInput,
        setImageError,
        setMessage, 
        reset, 
        updateArray: (array)=>setComments(array), 
    }


    //Share feature
    const [displaySharePanel, setDisplayShare] = useState(false)
    const toggleDisplayShare = () => {
        setDisplayShare(prev => !prev);
    }
    const shareButtonRef = useRef(); 

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
                    onClick={() => DeletePost(post_id, decoded.id, author._id, GoHome)}
                >Delete Post</button>
            </>
            )
    }

    const PostContainerRef = useRef();
    const commentEditorRef = useRef(); 

    const SubmitComment = () => {
        if (token) {
            const Elements = {
                content: GetContent(commentEditorRef),
                root: post_id,
                author: decoded.id,
                commentImages,
            }
            AddComment("post", post_id, "add_comment", Elements, dispatchFunctions, token)
        }
        else {
            alertMessage("You must be a member to make a comment.", setMessage)
        }
    }

    const context = {
        title,
        content,
        datePublished,
        lastEdited,
        thumbnail,
        abstract,
        author,
        mainPanelImages: images,
        category,
        tag,
        comments,
        setComments, 
        likes,
        published,
        decoded,
        postID: post_id,
        EditPost: () => { GoEditPost(title, post_id, context) },
        DeletePost: () => { DeletePost(post_id, decoded.id, author._id, GoBack) }, 
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

    const shareContext = {
        title,
        URL: `${siteURL}/post/${cleanString(title).replace(/ /g, '%20')}/${post_id}`,
        displaySharePanel,
        setDisplayShare, 
        toggleDisplayShare,
        shareButtonRef, 
    }

    useEffect(() => {
        FetchPostById(post_id, dispatchFunctions)

    }, [post_id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (decoded) {
            console.log("decoded: ", decoded)
        }
    }, [decoded])
    if (author) {
        console.log("author: ", author)
    }
    useEffect(() => {
    }, [])


    if (published || decoded && author && decoded.id == author._id) {
        return (
            <PostContext.Provider value={context}>
                <div
                    id="PostContainer"
                    className={`${PostContainerStyle}`}
                    ref={PostContainerRef}
                >
                    <div
                        id="PostWrapper"
                        className="w-11/12 box_shadow rounded-lg mx-auto pb-10 grow h-fit bg-[#ffffff]"
                    >
                        <ShareContext.Provider value={shareContext}>
                            <MainPanel />
                        </ShareContext.Provider>
                        {displayCommentInput &&
                            <div className="w-11/12 mx-auto pb-10 border-[1px] rounded-md box_shadow">
                                <div className= "w-11/12 mx-auto py-5">
                                    <CommentInput
                                        root={post_id}
                                        content={newComment}
                                        commentError={newCommentError}
                                        cancelEvent={() => setDisplayCommentInput(false)}
                                        commentEditorRef={commentEditorRef}
                                        submitEvent={SubmitComment}
                                        contextItem={PostContext}
                                        />
                                </div>
                            </div>
                        }
                        {comments && comments.length > 0 &&
                            <ShareContext.Provider value={shareContext}>
                            <hr className = "w-11/12 mx-auto border-2" />
                            <h2 className="font-bold text-center text-2xl mt-10">Comments</h2>
                            {comments.map((comment, ind) => {
                                return (
                                    <CommentPanel
                                        key={comment._id.toString()}
                                        {...comment}
                                        setComments={setComments}
                                        setMessage={setMessage}
                                        root={comment._id}
                                        decoded={decoded}
                                        index={ind}
                                        commentsArray={comments}
                                    />
                                )
                                })
                                }
                            </ShareContext.Provider>
                        }
                    </div>
                </div>
            </PostContext.Provider>
        )
    }
    else {
        return (
            <div>
                <h1 className ="text-center text-3xl font-bold my-50">The author has not published this post yet</h1>
            </div>
        )
    }
}

export default RenderPost; 