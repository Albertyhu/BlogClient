import { useContext, useState, useRef, useEffect } from 'react'; 
import {
    AppContext,
    CommentContext,
} from '../../util/contextItem.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx';
import { FetchActions  as CommentFetchActions } from '../../hooks/commentHooks.jsx'; 
import {
    BiCommentDetail,
} from 'react-icons/Bi';
import { IconContext } from "react-icons";
import { HiOutlineDotsHorizontal } from 'react-icons/Hi';
import DesktopLinks from './desktopLinks.jsx';
import MobileMenu from './mobileMenu.jsx'; 

//Purpose: This is the UI bar located beneath each comment and reply, renders buttons for features such as like, share, delete and edit
const RenderReplyActionBar = props => {
    const {
        apiURL, 
        setLoading, 
        token, 
        ContainerRef, 
    } = useContext(AppContext)

    const [mobileMenu, setMobileMenu] = useState(false)
    const LinkMenuRef = useRef(); 
    const DotRef = useRef(); 
    const mouseDownEvent = evt => {
        if (LinkMenuRef.current && !LinkMenuRef.current.contains(evt.target) && evt.target != DotRef.current) {
            setMobileMenu(false);
        }
    }
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
        toggleReplyEditor
    } = useContext(CommentContext)


    //After the comment is deleted from the database, comment will be removed from the useState array 'comments'
    const RemoveCommentFromStorage = () => {
        setComments(prev => prev.filter(val => val._id != _id))
    }

    const {
        DeleteOneCommentCompletely, 
    } = CommentFetchActions(apiURL)

    const { RenderLikeButton } = PostLikeFeatures() 

    useEffect(() => {
        ContainerRef.current.addEventListener("click", mouseDownEvent)
        return () => {
            if (ContainerRef.current)
                ContainerRef.current.addEventListener("click", mouseDownEvent)
        }
    }, [LinkMenuRef.current])

    return (
        <div
            id="InteractiveField"
            className="inline-flex mt-5 relative [&>*]:mr-10"
        >
            {token &&
            <>
                <RenderLikeButton
                    likes={likes}
                    documentID={_id}
                    type="comment"
                />
                <button
                    className="actionBarLink"
                    type="button"
                    onClick={toggleReplyEditor}
                    >
                    <span className = "mr-1">Reply</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <BiCommentDetail style={{ marginLeft: "0.25rem"}} />
                    </IconContext.Provider>
                    </button>
            </>
            }
            <DesktopLinks />
            {token &&
                <div
                    id="MobileIcon"
                    className="block md:hidden"
                    onClick={() => setMobileMenu(true)}
                    ref={DotRef}
                >
                    <IconContext.Provider value={{ size: "25px" }}>
                        <HiOutlineDotsHorizontal />
                    </IconContext.Provider>
                </div>
            }
            {mobileMenu &&
                <MobileMenu
                    LinkMenuRef={LinkMenuRef}
                />
            }
        </div> 
        )
}

export default RenderReplyActionBar; 