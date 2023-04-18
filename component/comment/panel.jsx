import { useContext, useEffect, useState } from 'react';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { PostLikeFeatures } from '../likeComponent.jsx';
import ProfilePic from '../user/profilePicture.jsx';
import RenderImage from '../imageRendering/mainImage.jsx';
import avatar from '../../assets/images/avatar.jpg'; 
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx'; 
import RenderReplyActionbar from './replyActionBar.jsx'; 
import uuid from 'react-uuid'; 

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
    } = props; 
    const navigate = useNavigate(); 
    const {
        VisitUser, 
    } = NavigationHooks(navigate)
    const { RenderLikeButton } = PostLikeFeatures() 
    const [decoded, setDecoded] = useState(null)
    const {
        token, 
        apiURL,
    } = useContext(AppContext)

    const {
        DeleteOneCommentCompletely
    } = FetchCommentActions(AppContext)

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token));
        }
    }, [token])

    return (
        <div
            className={`my-10 mx-auto`}
            id="CommentContainer"
        >
            <div
                className="w-11/12 h-11/12 m-auto"
                id="Wrapper"
            >   
                <div
                    id='Content-Grid'
                    className="grid h-[50px] md:h-full w-full">
                    <div id="AuthorField">
                        <div
                            id="ProfilePicField"
                            className="inline-flex cursor-pointer"
                            onClick={()=>VisitUser(author.username, author._id)}
                        >
                            <ProfilePic
                                profile_pic={author.profile_pic ? author.profile_pic : avatar}
                                altText={`${author.username} profile picture`}
                                dimensions = "w-[50px] h-[50px]"
                            />
                            <div className = "w-fit ml-5">
                                <h2 className="text-2xl font-bold">{author.username}</h2>
                            </div>
                        </div>
                        <div
                            id="MainContentField"
                            className = "grid"
                        >
                            <div
                                id="DateField"
                                className= "italic"
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
            </div>
        </div>
    )
}

export default CommentPanel; 