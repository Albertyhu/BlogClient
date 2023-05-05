import { RenderTagField } from '../tagComponent.jsx'; 
import { PostNavigationHooks, NavigationHooks } from "../../hooks/navigation.jsx"
import { RenderTimePosted } from '../../hooks/timeHooks.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx'; 
import { RenderCommentSymbol } from '../post/commentComponent.jsx'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx'; 
import RenderProfilePicture from '../user/profilePicture.jsx';
import uuid from 'react-uuid';
import RenderThumbnail  from '../imageRendering/thumbnailImage.jsx'
import { alertMessage } from '../../hooks/textHooks.jsx'; 

const SearchResultItems = (navigate, setMessage) => {
    const { DisplayLikes } = PostLikeFeatures();

    const {
        GoToPost,
    } = PostNavigationHooks(navigate)

    const {
        VisitOneCategory,
        VisitUser,
        VisitOnePhoto,
    } = NavigationHooks(navigate)

    const {
        convertObjToBase64, 
    } = Base64Hooks(); 

    const RenderPostSearchResultItem = props => {
        const {
            index,
            _id,
            title,
            content,
            tag,
            abstract,
            datePublished,
            lastEdited,
            author, 
            likes, 
            comments,
        } = props;

        return (
            <div
                id="SearchResultItem"
                className="rounded-[15px] bg-[#ffffff] mx-auto my-10 p-5 cursor-pointer"
                onClick={() => GoToPost(title, _id)}
            >
                <div
                    id="Wrapper"
                    className="w-11/12 mx-auto grid">
                    {title && <h3 className="font-bold text-2xl">{title}</h3>}
                    {author && <p>Posted by <span className="font-bold">{author.username}</span></p>}
                    {lastEdited  && datePublished && lastEdited != datePublished ?
                        <span>
                            <span className="font-bold">Last edited: </span><span>{RenderTimePosted(lastEdited)}</span>
                        </span> 
                        :
                        datePublished && 
                        <span>
                            <span className="font-bold">Date published: </span><span>{RenderTimePosted(datePublished)}</span>
                        </span> 
                        }
                    {abstract &&
                        <div className = "my-5">
                            <h4 className = "font-bold text-base">Abstract</h4>
                            <p
                            dangerouslySetInnerHTML={{ __html: abstract }}
                            ></p>
                        </div>
                    }
                    {content &&
                        <div className= "mb-5 bg-[#dedede] py-5">
                            <p
                            dangerouslySetInnerHTML={{ __html: content }}
                            ></p>
                        </div>
                    }
                    <div className="flex">
                        {likes &&
                            <DisplayLikes likes={likes} />
                        }
                        {comments && comments.length > 0 &&
                            <RenderCommentSymbol number={comments.length} />
                        }
                    </div>
                    {tag && tag.length > 0 &&
                        <RenderTagField tag={tag} />
                    }
                </div>
            </div>
        )
    }

    const RenderCategorySearchResultItem = props => {
        const {
            index,
            _id,
            name,
            description,
            post,
            image
        } = props;
        var formattedImage = image ? convertObjToBase64(image) : null; 
        return (
            <div
                id="SearchResultItem"
                className="rounded-[15px] bg-[#ffffff] mx-auto my-10 p-5 cursor-pointer"
                onClick={() => VisitOneCategory(name, _id)}
            >
                <div
                    id="Wrapper"
                    className={`w-11/12 mx-auto grid ${formattedImage ? "grid-cols-[30%_70%] gap-[10px]": ""} `}>
                    {formattedImage &&
                        <div>
                            <RenderThumbnail image={formattedImage} alt={name} />
                        </div>}
                    <div>
                        {name && <h3 className="font-bold text-2xl">{name}</h3>}
                        {description &&
                            <p
                            >{description}</p>}
                        {post && post.length > 0 &&
                            <div
                                id="post_field"
                                className="">
                                <h4 className="font-bold text-base">Posts</h4>
                                <ul>
                                    {post.map((item, index) => 
                                        <li key={uuid()}
                                            id="post_list-item"
                                            className="">
                                            {index + 1}.) {item.title}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    const RenderCommentSearchResultItem = props => {
        const {
            index,
            _id,
            author, 
            post,
            content, 
            datePublished,
            lastEdited,
            userPhoto, 
            articleType, 
        } = props;
        console.log("post: ", post)
        const clickEvent = () => {
            switch (articleType) {
                case "post":
                    GoToPost(post.title, post._id)
                    break;
                case "userPhoto":
                    VisitOnePhoto(author.username, author._id, userPhoto._id, userPhoto.title);
                    break; 
                default:
                    alertMessage("The article in which the comment was posted was removed by its author.", setMessage)
                    break; 
            }

        } 

        return (
            <div
                id="SearchResultItem"
                className="rounded-[15px] bg-[#ffffff] mx-auto my-10 p-5 cursor-pointer"
                onClick={() =>clickEvent()}
            >
                <div
                    id="Wrapper"
                    className="w-11/12 mx-auto grid">
                    {userPhoto && 
                        <div>
                            <h3>Posted on <span className='font-bold'>{userPhoto.title}</span></h3>
                        </div>
                    }
                    {post &&
                        <h3>Posted on <span className='font-bold'>{post.title}</span></h3>
                    }
                    {lastEdited && datePublished && lastEdited != datePublished ?
                        <span>
                            <span className="font-bold">Last edited: </span><span>{RenderTimePosted(lastEdited)}</span>
                        </span>
                        :
                        datePublished &&
                        <span>
                            <span className="font-bold">Date published: </span><span>{RenderTimePosted(datePublished)}</span>
                        </span>
                    }
                    {author && <p><span>Commenter: </span><span className="font-bold">{author.username}</span></p>}
                    {content &&
                        <div className = "bg-[#dedede] mt-10">
                            <p
                            dangerouslySetInnerHTML={{ __html: content }}
                        ></p>
                            </div>}
                </div>
            </div>
        )
    }

    const RenderUserSearchResultItem = props => {
        const {
            index,
            _id,
            username, 
            email, 
            biography, 
            profile_pic, 
        } = props;
        var formattedProfilePic = profile_pic && Object.keys(profile_pic).length > 0 ? convertObjToBase64(profile_pic) : null; 
        return (
            <div
                id="SearchResultItem"
                className="rounded-[15px] bg-[#ffffff] mx-auto my-10 p-5 cursor-pointer"
                onClick={() => VisitUser(username, _id)}
            >
                <div
                    id="Wrapper"
                    className="w-11/12 mx-auto grid grid-cols-[30%_70%]">
                    <div className="flex flex-col text-center">
                        <RenderProfilePicture
                            profile_pic={formattedProfilePic}
                            dimensions="w-[100px] h-[100px] border-[#dedede] border-2"
                            customStyle = "contents"
                        />
                    </div>
                     <div>
                        {username &&
                            <h3 className="font-bold text-3xl my-auto" >{username}</h3>
                        }
                        {email && <p>Email: <span className="font-bold text-base">{email}</span></p>}
                        {biography &&
                            <>
                        <h4 className = "font-bold text-base">Biography</h4>
                        <p
                        >{biography}</p>
                            </>}
                    </div>
                </div>
            </div>
        )
    }

    return {
        RenderPostSearchResultItem,
        RenderCategorySearchResultItem,
        RenderCommentSearchResultItem, 
        RenderUserSearchResultItem
    }
}

export default SearchResultItems; 