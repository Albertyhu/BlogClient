import { useEffect } from 'react'; 
import RenderThumbnail from './renderThumbnail.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx';
import { RenderCommentSymbol } from './commentComponent.jsx'; 
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import { PostNavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
import { RenderTagField } from '../tagComponent.jsx'; 

const RenderPostPanel = props => {
    const { title,
        content,
        datePublished,
        lastEdited,
        author,
        mainImage,
        abstract,
        category,
        tag,
        likes,
        comments,
        _id,
        CustomStyle = "PostPanel",
        published, 
        images,
    } = props; 
    const { DisplayLikes } = PostLikeFeatures();
    const navigate = useNavigate(); 
    const {
        BringDataToPost,
        GoEditPost
    } = PostNavigationHooks(navigate); 

    const data = {
        title,
        content,
        datePublished,
        lastEdited,
        mainImage,
        abstract,
        id: _id
    }

    return (
        <div
            className={`${CustomStyle} box_shadow`}
            onClick={()=>BringDataToPost(data)}
        >
            <div
                id="ContentWrapper"
                className="ContentWrapper">
                <h2 className="font-bold text-2xl pt-5">{title}</h2>
                {!published && <h3 className= "text-lg text-[#FF0000]">[Unpublished draft]</h3>}
                {author && <h3>Written by <span className="font-bold">{author.username}</span></h3>}
                {category && <p>Posted on {category.name}</p> }
                {lastEdited ?
                    <span> Last Edited: {FormatTimeAndDate(lastEdited)}</span>
                    :
                    <span> Date Published: {FormatTimeAndDate(datePublished)}</span>
                } 
                {mainImage && <RenderThumbnail image={mainImage} altText={title} />}
                {abstract &&
                    <div

                    ><h3 className ="font-bold">Abstract:</h3>
                        <span
                            dangerouslySetInnerHTML={{ __html: abstract }}
                            className="italic"
                        ></span>
                    </div>}
                <div className="flex my-5 pb-5">
                    <DisplayLikes
                        likes={likes}
                        postID={_id}
                    />
                    <RenderCommentSymbol number={comments.length} />
                </div>
                {tag && tag.length > 0 &&
                    <RenderTagField tag={tag} />
                }
            </div>

        </div>
        )
}  

export default RenderPostPanel;