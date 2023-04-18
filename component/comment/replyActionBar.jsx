import { useContext } from 'react'; 
import { CommentContext, AppContext } from '../../util/contextItem.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx';
import { FetchActions  as CommentFetchActions } from '../../hooks/commentHooks.jsx'; 

//This is the UI bar located beneath each comment and reply, renders buttons for features such as like, share, delete and edit
const RenderReplyActionBar = props => {
    const {
        apiURL, 
        setLoading, 
        token, 
    } = useContext(AppContext)
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
        decoded, 
        setComments, 
        setMessage, 
    } = useContext(CommentContext)

    //After the comment is deleted from the database, comment will be removed from the useState array 'comments'
    const RemoveCommentFromStorage = () => {
        setComments(prev => prev.filter(val => val._id != _id))
    }

    const {
        DeleteOneCommentCompletely, 
    } = CommentFetchActions(apiURL)

    const { RenderLikeButton } = PostLikeFeatures() 
    return (
        <div
            id="InteractiveField"
            className="inline-flex mt-5"
        >
            {decoded.id.toString() == author._id.toString() &&
                <>
                    <RenderLikeButton
                        likes={likes}
                        documentID={_id}
                        type="comment"
                    />
                    <button
                        className="actionBarLink"
                        type = "button"
                    >Reply</button>
                    <button
                    className="actionBarLink"
                    type='button'
                    onClick={() => { DeleteOneCommentCompletely(_id, token, { setLoading, RemoveCommentFromStorage, setMessage })} }
                    >Delete</button>
                </>
            }
        </div> 
        )
}

export default RenderReplyActionBar; 