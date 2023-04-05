import { useState, useEffect, useContext } from 'react'; 
import { PostContext } from '../../util/contextItem.jsx';
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import RenderImage from '../../component/imageRendering/mainImage.jsx';
import { PostLikeFeatures } from '../../component/likeComponent.jsx';

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
            {thumbnail &&
                <RenderImage
                image="thumbnail"
                altText={`${title} photo`}
                />
            }
            <p>{content}</p>
            <div className = "my-5 inline-grid">
                <RenderLikeButton
                    likes={likes}
                    postID={postID}
                />
                </div>
            </div>
        </div>
        )
}

export default MainPanel; 