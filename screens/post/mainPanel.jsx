import { useEffect, useContext, useState, useRef} from 'react'; 
import { PostContext } from '../../util/contextItem.jsx';
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx'; 
import RenderFullImage from '../../component/imageRendering/fullImage.jsx';
import RenderImage from '../../component/imageRendering/standardImage.jsx';
import { PostLikeFeatures } from '../../component/likeComponent.jsx';
import {
    RenderTagField
} from '../../component/tagComponent.jsx'; 
import uuid from 'react-uuid';
import { HiOutlineDotsHorizontal } from 'react-icons/Hi';
import { BiCommentDetail } from 'react-icons/bi';
import { IconContext } from "react-icons";
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
 
const MainPanel = props => {
    const { RenderLikeButton } = PostLikeFeatures()
    const [mobileAdminBtn, setMobileAdminBtn] = useState(false); 
    const navigate = useNavigate(); 
    const {
        VisitOneCategory, 
        VisitUser,
    } = NavigationHooks(navigate); 
    const mobileAdminRef = useRef(); 
    const DotRef = useRef(); 
    const {
        title,
        content,
        datePublished,
        lastEdited,
        thumbnail,
        abstract,
        author,
        mainPanelImages,
        category,
        tag,
        likes,
        decoded, 
        postID, 
        RenderButtonField, 
        PostContainerRef,
        toggleCommentField, 
    } = useContext(PostContext) 

    const mouseDownEvent = evt => {
        if (mobileAdminRef.current && !mobileAdminRef.current.contains(evt.target) && evt.target != DotRef.current) {
            setMobileAdminBtn(false);
        }
    }

    useEffect(() => {
      //  window.scrollTo(0, 0); 
    },[])

    useEffect(() => {
        PostContainerRef.current.addEventListener("click", mouseDownEvent)
        return () => {
            if(PostContainerRef.current)
                PostContainerRef.current.addEventListener("click", mouseDownEvent)
        }
    }, [mobileAdminRef.current])

    return (
        <div
            id="MainPanel"
            className = "w-11/12 mx-auto"
        >
            <div className = "relative">
                <h1 className="text-3xl font-bold text-center my-5 pt-10 text-black">{title}</h1>
                {decoded && author._id == decoded.id && 
                    <div
                        className="absolute left-auto right-0 top-0 translate-y-[10px]"
                    >
                        <div
                            id="DotButton"
                            ref={DotRef}
                            className="md:hidden cursor-pointer"
                            onClick={() => setMobileAdminBtn(true)}
                        >
                            <IconContext.Provider value={{size:'2em'}}><HiOutlineDotsHorizontal /></IconContext.Provider> 
                        </div>
                        {mobileAdminBtn &&
                            <div
                                id="MobileAdminBtnPanel"
                                className="flex absolute left-auto right-0 top-0 [&>button]:mx-5 border-[1px] rounded-md z-10 bg-[#ffffff]"
                                ref={mobileAdminRef}
                            >
                                <RenderButtonField />
                            </div>
                        }
                        <div
                            className="hidden md:flex absolute left-auto right-0 top-0 [&>button]:mx-5"
                        >
                            <RenderButtonField/>
                        </div>
                    </div>
                }
            </div>
            <p>Posted by <span
                className="font-bold cursor-pointer hover:underline"
                onClick={()=>VisitUser(author.username, author._id)}
            >{author.username}</span> | 
                {lastEdited ?  
                    <span> Last Edited: {FormatTimeAndDate(lastEdited)}</span>
                    :
                    <span> Date Published: {FormatTimeAndDate(datePublished)}</span>
                } 
            </p>
            {category && 
                <span>Category: <span
                            onClick={() => VisitOneCategory(category.name, category._id)}
                            className="font-bold cursor-pointer hover:underline"
                            >{category.name}</span></span>
            }
            {thumbnail != null &&
                <RenderFullImage
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
            {mainPanelImages && mainPanelImages.length > 0 &&
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                    {mainPanelImages.map((img, index) =>
                        <RenderImage
                            image={img}
                            key={uuid()}
                            altText={`${title} photo ${index}`}
                        />
                    )}
                </div>

            }
            {tag && tag.length > 0 &&
                <div className = "mt-10">
                    <RenderTagField tag={tag} />
                </div>
            }
            <div
                className="mt-10 pb-10 [&>*]:mx-10 flex "
                id="interactiveField"
            >
                <RenderLikeButton
                    likes={likes}
                    documentID={postID}
                    type="post"
                />
                <div
                    className="flex m-auto [&>*]:mx-1 cursor-pointer"
                    id="ReplyField"
                    onClick={toggleCommentField}
                >
                    <span>Reply</span>
                    <IconContext.Provider value={{size:"25px"}}>
                        <BiCommentDetail />
                    </IconContext.Provider>
                </div>
            </div>
        </div>
        )
}

export default MainPanel; 