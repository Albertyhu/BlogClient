import RenderThumbnail from './renderThumbnail.jsx'; 
import { RenderLikes } from '../likeComponent.jsx'; 
import { RenderCommentSymbol } from './commentComponent.jsx'; 
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 

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

    return (
        <div className="PostPanel box-shadow">
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
                    <RenderLikes
                        likes={likes}
                        postID={_id}
                    />
                    <RenderCommentSymbol number={comments.length} />
                </div>
            </div>

        </div>
        )
}  

export default RenderPostPanel;