import { useContext,useState, useRef, useEffect } from 'react';
import {
    AppContext,
    CommentContext,
    ReplyContext, 
} from '../../util/contextItem.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { useNavigate } from 'react-router-dom';
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx';
import { CommentInput } from '../formElements/commentInputs.jsx';
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';
import RenderComment from '../commentPanel/renderComment.jsx';
import CommentHeader from '../commentPanel/header.jsx'; 

//should give owner of the comment the ability to edit 
//Reply 
const ReplyPanel = props => {
    const {
        content,
        datePublished,
        lastEdited,
        author,
        images,
        likes,
        post,
        _id,
        replies,
        root,
        setReplies,
        repliesArray,
        decoded,
        commentRepliedTo, 
        rootComment, 
        userRepliedTo, 
        index,
    } = props;
    const navigate = useNavigate();
    const {
        VisitUser,
    } = NavigationHooks(navigate);
    const {
        token,
        apiURL,
        setLoading,
        setMessage,
    } = useContext(AppContext)

    const {
        DeleteOneCommentCompletely,
        AddComment,
        EditComment, 
    } = FetchCommentActions(apiURL, setLoading, token)

    //This is an array of all existing replies to the comment being rendered by the Panel component.
    const [replyContent, setReplyContent] = useState("")
    const [displayReplyInput, setDisplayReplyInput] = useState(false);
    const [replyError, setReplyError] = useState([]);
    const [attachedImages, setAttachedImages] = useState(images ? images : []);
    const [imagesError, setImagesError] = useState([]); 

    /**Code for handling editing reply*/
    const [editmode, setEditMode] = useState(false)
    const [updateError, setUpdateError] = useState([])
    const updateRef = useRef(); 
    const updateComment = () => {
        const Elements = {
            index,
            content: GetContent(updateRef),
            authorId: author._id,
            userId: decoded.id,
            commentsArray: repliesArray,
            images: attachedImages,
        }

        EditComment(Elements, _id, { setComments: setReplies, setMessage, setEditMode })
    } 

    const RemoveCommentFromStorage = () => {
        setReplies(prev => prev.filter(val => val._id != _id))
    }

    const dispatchFunctions = {
        CloseCommentInput: () => setDisplayEditor(false),
        setMessage,
        RemoveCommentFromStorage,
        reset: () => {
            setAttachedImages([]);
        },
        updateArray: (array) => setReplies(array),
    }

    const commentContext = {
        content,
        datePublished,
        lastEdited,
        author,
        images: attachedImages,
        setImages: (arr) => setAttachedImages(arr), 
        imagesError, 
        likes,
        post,
        _id,
        replies,
        root,
        setReplies,
        
        decoded,
        toggleReplyEditor: () => setDisplayReplyInput(prev => !prev),
        DeleteAction: () => { DeleteOneCommentCompletely(_id, dispatchFunctions) },
        openEditorToUpdate: () => setEditMode(true), 
    }

    /*code for posting new reples*/
    //This is to store conent of a new reply to the comment
    const [replyImages, setReplyImages] = useState([]);
    const [replyImagesError, setReplyImagesError] = useState([]);
    const replyRef = useRef();
    const replyImageInputRef = useRef(); 

    const submitReply = () => {
        const replyDispatchFunctions = {
            setLoading,
            CloseCommentInput: () => setDisplayReplyInput(false),
            setMessage,
            reset: () => {
                setReplyImages([]);
            },
            updateArray: (array) => setReplies(array),
        }
        const Elements = {
            content: GetContent(replyRef),
            author: decoded.id,
            commentImages: replyImages,
            root: rootComment,
            CommentRepliedTo: _id,
            UserRepliedTo: author.username,
            postId: post,
        }
        AddComment("comment", rootComment, "add_reply", Elements, replyDispatchFunctions)
    }


    const replyContext = {
        content: replyContent,
        images: replyImages,
        setImages: (val) => setReplyImages(val),
        imagesError: replyImagesError,
        replyRef,
        imagesInputRef: replyImageInputRef, 
    } 

    return (
        <CommentContext.Provider value={commentContext}>
            <div
                className={`my-10 mx-auto`}
                id={`CommentPanel-${_id}`}
            >
                <div
                    className="w-11/12 h-11/12 m-auto"
                    id="RenderComment"
                >
                    {!editmode && decoded.id == author._id ?
                        <ReplyContext.Provider value={replyContext}>
                            <RenderComment
                                displayReplyInput={displayReplyInput}
                                replyContent={replyContent}
                                replyError={replyError}
                                submitReply={submitReply}
                                author={author}
                                content={content}
                                datePublished={datePublished}
                                lastEdited={lastEdited}
                                images={images}
                                setDisplayReplyInput={setDisplayReplyInput}
                                replyRef={replyRef}
                                userRepliedTo={userRepliedTo}
                                CommentRepliedTo={commentRepliedTo}
                            />
                        </ReplyContext.Provider>
                        :
                        <div className="border-2 rounded-md p-5 box_shadow">
                            <CommentHeader
                                author={author}
                            />
                            <CommentInput
                                content={content}
                                commentError={updateError}
                                commentEditorRef={updateRef}
                                submitEvent={updateComment}
                                cancelEvent={() => {
                                    setAttachedImages(images);
                                    setEditMode(false);
                                }}
                                contextItem={CommentContext}
                            />
                        </div>
                    }
                </div>
            </div>
        </CommentContext.Provider>
    )
}

export default ReplyPanel; 