import { useContext, useState, useEffect, lazy, useRef, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppContext,
    UserPhotoContext,
} from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import RenderImage from '../../component/imageRendering/fullImage.jsx'; 
import CommentPanel from '../../component/commentPanel';
import { RenderTimePosted } from '../../hooks/timeHooks.jsx'; 
import { PostLikeFeatures } from '../../component/likeComponent.jsx';
import { BiCommentDetail } from 'react-icons/Bi';
import { IconContext } from 'react-icons'; 
import { CommentInput } from '../../component/formElements/commentInputs.jsx';
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx'; 
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';
import RenderPhotoText from '../../component/userPhoto/renderPhotoText.jsx'; 
import EditPhotoTextPanel from '../../component/userPhoto/editPhotoText.jsx'; 

const RenderPhotoDetail = props => {
    const {
        token,
        apiURL, 
        setMessage, 
        setLoading, 
        decoded, 
    } = useContext(AppContext)
    const location = useLocation(); 
    const {
        photoId, 
    } = location.state; 
    const navigate = useNavigate(); 
    const { FetchPhotoDetails  } = FetchHooks(apiURL, token, setLoading, setMessage, navigate)
    const [image, setImage] = useState(location.state.image ? location.state.image : null)
    const [details, setDetails] = useState(null)
    const [title, setTitle] = useState(); 
    const [caption, setCaption] = useState(); 

    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [publishedDate, setPublishedDate] = useState(null);
    const [lastEdited, setLastEdited] = useState(null); 
    const { RenderLikeButton } = PostLikeFeatures()

    const [editmode, setEditMode] = useState(false); 

    //code for reply editor
    const [displayReplyEditor, setDisplayReplyEditor] = useState(false); 
    const [newComment, setNewComment] = useState("");
    const [newCommentError,setNewCommentError] = useState([])
    const [commentImages, setCommentImages] = useState([]);
    const [commentImagesError, setCommentImagesError] = useState([])
    const commentImagesInputRef = useRef(); 
    const PhotoContext = {
        details, 
        setDetails, 
        images: commentImages, 
        setImages: setCommentImages, 
        imagesError: commentImagesError, 
        iamgesInputRef: commentImagesInputRef, 
        fullActionBar: false, 
        title, 
        setTitle, 
        caption,
        publishedDate,
        lastEdited, 
        setCaption, 
        setPublishedDate, 
        setLastEdited, 
    }

    const commentEditorRef = useRef();
    const {
        AddComment,
    } = FetchCommentActions(apiURL, setLoading, token)

    const dispatchFunctions = {
        setImage,
        setDetails,
        setLikes,
        setComments,
        setMessage,
        setCaption,
        setTitle,
        setPublishedDate,
        setLastEdited, 
        CloseCommentInput: () => {
            setDisplayReplyEditor(false)
        },
        reset: () => {
            setNewComment([]);
        },
        updateArray: (array) => setComments(array),
    }; 
    const submitReply = () => {
        const Elements = {
            content: GetContent(commentEditorRef),
            root: photoId,
            author: decoded.id,
            commentImages,
        }
        AddComment("user_photo", photoId, "add_comment", Elements, dispatchFunctions)
    }


    useEffect(() => {
        if (photoId) {
            console.log("photoId: ", photoId)
            FetchPhotoDetails(photoId, dispatchFunctions)
        }
    }, [photoId])

    useEffect(() => {
        if (details) {
            console.log("details: ", details)
        }
    }, [details]
    )
    return (
        <UserPhotoContext.Provider value = {PhotoContext}>
            <div
                className="w-11/12 box_shadow rounded-lg mx-auto pb-10 grow h-fit mt-10"
                id = "UserPhotoDetailContainer"
            >
                <div
                    id="ContentWrapper"
                    className="w-11/12 mx-auto grid md:grid-cols-2 md:gap-[5px]"
                >
                    {details && details.title != null &&
                        <h1 className = "block md:hidden text-center font-bold text-2xl py-10">{details.title}</h1>
                    }
                    <RenderImage
                        image={image}
                        altText={location.state ? location.state.title : details ? details.title ? details.title : "photo" : "photo"}
                        customStyle='md:pt-10'
                    />
                    <div
                        id="TextSection"
                        className = "w-11/12 mx-auto"
                    >
                        {!editmode ? 
                            <RenderPhotoText
                                details={details}
                            />
                            :
                            <EditPhotoTextPanel
                                contextItem={contextItem}
                                closeEdit={()=>setEditMode(false)}
                            />
                        }
                        <div
                            className="mt-10 pb-10 [&>*]:mx-10 flex "
                            id="interactiveField"
                        >
                            {token && 
                                <>
                                    <RenderLikeButton
                                        likes={likes}
                                        documentID={photoId}
                                        type="user_photo"
                                    />
                                    <div
                                        className="flex m-auto [&>*]:mx-1 cursor-pointer"
                                        id="ReplyField"
                                        onClick={()=>setDisplayReplyEditor(prev => !prev)}
                                    >
                                        <span>Reply</span>
                                        <IconContext.Provider value={{ size: "25px" }}>
                                            <BiCommentDetail />
                                        </IconContext.Provider>
                                    </div>
                                </>
                            }
                        </div>
                    {displayReplyEditor &&
                        <div className="w-11/12 mx-auto pb-10 border-[1px] rounded-md box_shadow">
                            <div className="w-11/12 mx-auto py-5">
                                <CommentInput
                                        root={photoId}
                                        content={newComment}
                                        commentError={newCommentError}
                                        cancelEvent={() => setDisplayReplyEditor(false)}
                                        commentEditorRef={commentEditorRef}
                                        submitEvent={submitReply}
                                        contextItem={UserPhotoContext}
                                />
                            </div>
                        </div>
                    }
                    {comments && comments.length > 0 &&
                        <>
                            <hr className="w-11/12 mx-auto border-2" />
                            <h2 className="font-bold text-center text-2xl mt-10">Comments</h2>
                            <div
                                className = "md:overflow-y-scroll md:overflow-x-hidden w-full md:max-h-[500px]"
                            >
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
                                        fullActionBar={false}
                                    />
                                )
                            })
                            }
                            </div>
                        </>
                    }
                    </div>
                </div>
            </div>
        </UserPhotoContext.Provider>
    )
}

export default RenderPhotoDetail 