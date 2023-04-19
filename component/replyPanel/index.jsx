import { useContext, useEffect, useState, useRef } from 'react';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import {
    AppContext,
    ReplyContext,
    CommentPanelContext,
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

    const {
        DeleteOneCommentCompletely,
        AddComment
    } = FetchCommentActions(apiURL)

    //This is an array of all existing replies to the comment being rendered by the Panel component. 

    const { RenderLikeButton } = PostLikeFeatures()
    const [replyContent, setReplyContent] = useState("")
    const [displayEditor, setDisplayEditor] = useState(false);
    const [replyError, setReplyError] = useState([]);
    const [attachedImages, setAttachedImages] = useState([]);
    const replyRef = useRef();

    const dispatchFunctions = {
        setLoading,
        CloseCommentInput: () => setDisplayEditor(false),
        setMessage,
        reset: () => {
            setAttachedImages([]);
        },
        updateArray: (array) => setReplies(array),
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
    const commentContext = {
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
        setMessage,
        decoded,
        toggleDisplayEditor: () => setDisplayEditor(prev => !prev),
    }

    return (
        <ReplyContext.Provider value={commentContext}>
            <div
                className={`my-10 mx-auto`}
                id="ReplyPanel"
            >
                <div
                    className="w-11/12 h-11/12 m-auto"
                    id="Wrapper"
                >
                    <div
                        id='Content-Grid'
                        className="grid md:h-full w-full">
                        <div id="AuthorField">
                            <div
                                id="ProfilePicField"
                                className="inline-flex cursor-pointer"
                                onClick={() => VisitUser(author.username, author._id)}
                            >
                                <ProfilePic
                                    profile_pic={author.profile_pic ? author.profile_pic : avatar}
                                    altText={`${author.username} profile picture`}
                                    dimensions="w-[50px] h-[50px]"
                                />
                                <div className="w-fit ml-5">
                                    <h2 className="text-2xl font-bold">{author.username}</h2>
                                </div>
                            </div>
                            <div
                                id="MainContentField"
                                className="grid"
                            >
                                <div
                                    id="DateField"
                                    className="italic"
                                >
                                    {lastEdited ?
                                        <p>Last Edited: {FormatTimeAndDate(lastEdited)}</p>
                                        :
                                        <p>Date Submitted: {FormatTimeAndDate(datePublished)}</p>
                                    }
                                </div>
                                {content &&
                                    <div
                                        id="editor-container"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    ></div>
                                }
                                {images && images.length > 0 &&
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                                        {images.map((img, index) =>
                                            <RenderImage
                                                image={img}
                                                key={uuid()}
                                                altText={`photo ${index}`}
                                            />
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <RenderReplyActionbar />
                    {displayEditor &&
                        <CommentInput
                            content={replyContent}
                            commentError={replyError}
                            commentEditorRef={replyRef}
                            submitEvent={submitReply}
                            cancelEvent={() => setDisplayEditor(false)}
                        />
                    }
                </div>
            </div>
        </ReplyContext.Provider>
    )
}

export default ReplyPanel; 