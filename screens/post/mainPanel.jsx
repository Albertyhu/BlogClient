import { useEffect, useContext} from 'react'; 
import { PostContext } from '../../util/contextItem.jsx';
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import RenderImage from '../../component/imageRendering/mainImage.jsx';
import CoverPhoto from '../../component/imageRendering/coverPhoto.jsx';
import { PostLikeFeatures } from '../../component/likeComponent.jsx';
import {
    Tag,
    RenderTagField
} from '../../component/tagComponent.jsx'; 
import { Editor } from '@tinymce/tinymce-react';

//Renders the main image for the post 
const MainPanel = props => {
    const { RenderLikeButton } = PostLikeFeatures()
    const {
        title,
        content,
        author, 
        datePublished, 
        likes,
        thumbnail,
        images, 
        postID, 
        tag, 
    } = useContext(PostContext) 

    useEffect(() => {
        window.scrollTo(0, 0); 
    })

    return (
        <div
            className = "w-11/12 box_shadow rounded-lg mx-auto"
        >
            <div
                id="ContentWrapper"
                className = "w-11/12 mx-auto"
            >
                <h1 className="text-3xl font-bold text-center my-5 pt-5 text-black">{title}</h1>
                <p>Posted by <span className="font-bold">{author.username}</span> | <span>{FormatTimeAndDate(datePublished)}</span></p>
                {thumbnail != null &&
                    <RenderImage
                    image={thumbnail}
                    altText={`${title} photo`}
                    />
                }
                {content &&
                    <div
                        id="editor-container"
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></div>
                }
                <div className = "my-5 inline-grid">
                    <RenderLikeButton
                        likes={likes}
                        postID={postID}
                    />
                </div>
                {tag && tag.length > 0 &&
                    <RenderTagField tag = {tag} />
                }
            </div>
        </div>
        )
}

export default MainPanel; 