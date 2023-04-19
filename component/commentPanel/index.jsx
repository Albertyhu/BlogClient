import { useContext, useEffect, useState, useRef } from 'react';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import {
    AppContext,
    ReplyContext,
} from '../../util/contextItem.jsx';
import { PostLikeFeatures } from '../likeComponent.jsx';
import ProfilePic from '../user/profilePicture.jsx';
import RenderImage from '../imageRendering/standardImage.jsx';
import avatar from '../../assets/images/avatar.jpg'; 
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx'; 
import RenderReplyActionbar from '../replyActionBar'; 
import uuid from 'react-uuid'; 
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
        setComments, 
        setMessage,
        decoded,
    } = props;
    const navigate = useNavigate();
    const {
        VisitUser,
    } = NavigationHooks(navigate);
    const {
        token,
        apiURL,
        setLoading, 
    } = useContext(AppContext)

        //After the comment is deleted from the database, comment will be removed from the useState array 'comments'
    const RemoveCommentFromStorage = () => {
        setComments(prev => prev.filter(val => val._id != _id))
    }

    const {
        DeleteOneCommentCompletely,
        AddComment
    } = FetchCommentActions(apiURL)

    //This is an array of all existing replies to the comment being rendered by the Panel component. 
    const [repliesArray, setReplies] = useState(replies ? replies : []);

    const [replyContent, setReplyContent] = useState(""); 

    //If the user wants to update the current comment being rendered, editmode would be switched to true 
    const [editmode, setEditMode] = useState(false)
    const [displayEditor, setDisplayEditor] = useState(false);

    //For throwing errors when a user makes reply to the comment being rendered by this component
    const [replyError, setReplyError] = useState([]);

    const [attachedImages, setAttachedImages] = useState(images ? images : []); 
    const [imagesError, setImagesError ] = useState([])
    const replyRef = useRef();

    const dispatchFunctions = {
        setLoading,
        CloseCommentInput: () =>setDisplayEditor(false),
        setMessage,
        RemoveCommentFromStorage, 
        reset: () => {
            setAttachedImages([]); 
        },
        updateArray: (array)=>setReplies(array), 
    } 
    const submitReply = () => {
        const Elements = {
            content: GetContent(replyRef),
            author: decoded.id,
            commentImages: attachedImages, 
            root: root, 
            CommentRepliedTo: _id, 
            UserRepliedTo: author.username, 
        }
        AddComment("comment", _id, "add_reply", Elements, dispatchFunctions, token)
    }

    const updateRef = useRef(); 
    const [updateError, setUpdateError ] = useState([])
    const updateComment = () => { }

    const commentContext = {
        content,
        author,
        datePublished,
        lastEdited,
        images,
        imagesError, 
        likes,
        post,
        _id,
        replies,
        root,
        setComments,
        setMessage,
        decoded,
        replyRef, 
        toggleDisplayEditor: () => setDisplayEditor(prev => !prev),
        DeleteAction: () => { DeleteOneCommentCompletely(_id, token, dispatchFunctions) },
        openEditorToUpdate:()=>setEditMode(true), 
    } 

    return (
        <ReplyContext.Provider value={commentContext}>
            <div
                className={`my-10 mx-auto`}
                id="CommentPanel"
            >
                <div
                    className="w-11/12 h-11/12 m-auto"
                    id="RenderComment"
                >
                {!editmode && decoded.id == author._id ?
                        <RenderComment
                            displayEditor={displayEditor}
                            replyContent={replyContent}
                            replyError={replyError}
                            submitReply={submitReply}
                            author={author}
                            content={content}
                            datePublished={datePublished}
                            lastEdited={lastEdited}
                            images={images}
                            setDisplayEditor={setDisplayEditor}
                            replyRef={replyRef}
                        />
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
                                cancelEvent={() => setEditMode(false)}
                                contextItem={ReplyContext}
                                    />
                        </div>
                }
                </div>
            </div>
            {repliesArray && 
                <div>
                    {repliesArray.map(reply =>
                        <ReplyPanel
                            {...reply}
                            setReplies={setReplies}
                            decoded={decoded}
                            setMessage={setMessage}
                        />)}
                </div>
            }
        </ReplyContext.Provider>
    )
}

export default CommentPanel; 