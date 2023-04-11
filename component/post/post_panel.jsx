import RenderThumbnail from './renderThumbnail.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx';
//import { RenderLikeButton, DisplayLikes } from '../likeComponent.jsx'; 
import { RenderCommentSymbol } from './commentComponent.jsx'; 
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import { PostNavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
import { RenderTagField } from '../tagComponent.jsx'; 

const RenderPostPanel = props => {
    const { title,
        content, 
        datePublished, 
        author,
        thumbnail,
        abstract, 
        category,
        tag,
        likes, 
        comments, 
        _id
    } = props; 
    const { RenderLikeButton, DisplayLikes } = PostLikeFeatures();
    const navigate = useNavigate(); 
    const { BringDataToPost } = PostNavigationHooks(navigate); 

    const data = {
        title,
        content,
        datePublished,
        thumbnail,
        abstract,
        id: _id
    }
    return (
        <div
            className="PostPanel box_shadow"
            onClick={() =>BringDataToPost(data)}
        >
            <div
                id="ContentWrapper"
                className="ContentWrapper">
                <h2 className="font-bold text-2xl">{title}</h2>
                {author && <h3>created by <span className = "font-bold">{author.username}</span></h3>}
                <span>{FormatTimeAndDate(datePublished)}</span>
                {thumbnail && <RenderThumbnail image={thumbnail} altText={title} />}
                <h3></h3>
                {abstract &&
                    <p>Abstract: <span className="italic">{abstract}</span></p>}
                <div className="flex">
                    <DisplayLikes
                        likes={likes}
                        postID={_id}
                    />
                    <RenderCommentSymbol number={comments.length} />
                </div>
                {tag != null && tag.length > 0 &&
                    <RenderTagField tag={tag} />
                }
            </div>

        </div>
        )
}  

export default RenderPostPanel;