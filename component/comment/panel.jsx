import { useContext, useEffect, useState } from 'react';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { PostLikeFeatures } from '../likeComponent.jsx';
import ProfilePic from '../user/profilePicture.jsx';
import RenderImage from '../imageRendering/mainImage.jsx';

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
    } = props; 
    const { RenderLikeButton } = PostLikeFeatures() 
    const [decoded, setDecoded] = useState(null)
    const {
        token, 
    } = useContext(AppContext)

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token));
        }
    }, [token])

    return (
        <div
            className={``}
            id="CommentContainer"
        >
            <div
                className="w-11/12 h-11/12 m-auto"
                id="Wrapper"
            >   
                <div
                    id='Content-Grid'
                    className="grid md:grid-cols-[auto_auto] h-[50px] md:h-full w-full">
                    <div id="AuthorField">
                        <div
                            id="ProfilePicField"
                            className = "inline-flex"
                        >
                            <ProfilePic
                                profile_pic={author.profile_pic ? author.profile_pic : avatar}
                                altText={`${author.username} profile picture`}
                                dimensions = "w-[50px] h-[50px]"
                            />
                            <div className = "md:hidden">
                                <h2 className ="H1Style">{author.username}</h2>
                            </div>
                        </div>
                        <div
                            id="MainContentField"
                            className = "grid"
                        >
                            <h2 className="H1Style hidden md:block">{author.username}</h2>
                            <div
                                id="DateField"
                            >
                                {lastEdited ?
                                    <p>Last Edited: {lastEdited}</p>
                                    :
                                    <p>Date Submitted: {datePublished}</p>
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
                                            altText={`${title} photo ${index}`}
                                        />
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div
                    id="InteractiveField"
                    className = "inline-flex"
                >
                    <RenderLikeButton
                        likes={likes}
                        documentID={post._id}
                        type = "comment"
                    />
                    <button></button>
                
                </div>
            </div>
        </div>
    )
}

export default CommentPanel; 