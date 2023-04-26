import { useContext, useEffect, useState, useRef } from 'react';
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
import ReplyPanel from '../replyPanel';
import RenderComment from './renderComment.jsx'; 
import CommentHeader from './header.jsx'; 

//should give owner of the comment the ability to edit 
//Reply 
const CommentPanel = props => {
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
        commentsArray, 
        setComments, 
        decoded,
        //index of the comment in the comment array
        index, 
        fullActionBar = true, 
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

        //After the comment is deleted from the database, comment will be removed from the useState array 'comments'
    const RemoveCommentFromStorage = () => {
        setComments(prev => prev.filter(val => val._id != _id))
    }

    const {
        DeleteOneCommentCompletely,
        AddComment,
        EditComment, 
    } = FetchCommentActions(apiURL, setLoading, token)

    //This is an array of all existing replies to the comment being rendered by the Panel component. 
    const [repliesArray, setReplies] = useState(replies ? replies : []);


    /*code for handling editing process*/ 
    //If the user wants to update the current comment being rendered, editmode would be switched to true 
    const [editmode, setEditMode] = useState(false)
    const [displayReplyInput, setDisplayReplyInput] = useState(false);
    const [imagesError, setImagesError] = useState([])

    //For throwing errors when a user makes reply to the comment being rendered by this component
    const [replyError, setReplyError] = useState([]);

    //This stores any of the images in the comment 
    const [attachedImages, setAttachedImages] = useState(images ? images : []); 

    const dispatchFunctions = {
        CloseCommentInput: () =>setDisplayReplyInput(false),
        setMessage,
        RemoveCommentFromStorage, 
        reset: () => {
            setAttachedImages([]); 
        },
        updateArray: (array)=>setComments(array), 
    } 

    const updateRef = useRef(); 
    const [updateError, setUpdateError ] = useState([])
    const updateComment = () => {
        const Elements = {
            index,
            content: GetContent(updateRef), 
            authorId: author._id, 
            userId: decoded.id, 
            commentsArray, 
            images: attachedImages,
        } 
        EditComment(Elements, _id, { setComments, setMessage, setEditMode })
    }

    const commentContext = {
        content,
        author,
        datePublished,
        lastEdited,
        images: attachedImages,
        setImages: (arr) => setAttachedImages(arr),
        imagesError, 
        likes,
        post,
        _id,
        replies,
        root,
        setComments,
        setMessage,
        decoded,
        setReplies,
        toggleReplyEditor: () => setDisplayReplyInput(prev => !prev),
        DeleteAction: () => { DeleteOneCommentCompletely(_id, dispatchFunctions) },
        openEditorToUpdate: () => setEditMode(true), 
        fullActionBar, 
    } 

    /*code for posting new reples*/
    //This is to store conent of a new reply to the comment
    const [replyContent, setReplyContent] = useState("");
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
            root: root,
            CommentRepliedTo: _id,
            UserRepliedTo: author.username,
            postId: post, 
        }
        AddComment("comment", _id, "add_reply", Elements, replyDispatchFunctions)
    }

    const replyContext = {
        content: replyContent, 
        images: replyImages, 
        setImages: (val)=>setReplyImages(val), 
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
                        <ReplyContext.Provider value ={replyContext}>
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
                                />
                        </ReplyContext.Provider>
                        :
                        <div className = "border-2 rounded-md p-5 box_shadow">
                            <CommentHeader
                                author={author}
                            />
                            <CommentInput
                                content={content}
                                commentError={updateError}
                                commentEditorRef={updateRef}
                                submitEvent={updateComment}
                                cancelEvent={() => {
                                    setAttachedImages(images)
                                    setEditMode(false); 
                                }}
                                contextItem={CommentContext}
                                    />
                        </div>
                }
                </div>
            </div>
            {repliesArray && 
                <div className = "w-11/12 mx-auto bg-[#dbdbdb]">
                    {repliesArray.map((reply, index) =>
                        <ReplyPanel
                            {...reply}
                            key={reply._id}
                            setReplies={setReplies}
                            decoded={decoded}
                            setMessage={setMessage}
                            index={index}
                            repliesArray={repliesArray}
                        />)}
                </div>
            }
        </CommentContext.Provider>
    )
}

export default CommentPanel; 