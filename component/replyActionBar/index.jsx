import { useContext, useState, useRef, useEffect } from 'react'; 
import {
    AppContext,
    CommentContext,
    ReplyActionBarContext, 
    IconContext
} from '../../util/contextItem.jsx'; 
import { PostLikeFeatures } from '../likeComponent.jsx';
import {
    CommentIcon,  
} from '../iconComponents.jsx'; 
import Dots from '../../assets/icons/dot_icon.png'; 
import DesktopLinks from './desktopLinks.jsx';
import MobileMenu from './mobileMenu.jsx'; 

//Purpose: This is the UI bar located beneath each comment and reply, renders buttons for features such as like, share, delete and edit
//This is mainly for the comment component
const RenderReplyActionBar = props => {
    const {
        customStyle = null, 
    } = props; 
    const {
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
        likes,
        _id,
        toggleReplyEditor,
        type,
        //fullActionBar is a boolean value that determines whether to show the desktop or mobile verion of the action bar; 
        //Since the fullActionBar component is being used in other components, this gives more controll on how the bar should be displayed.
        fullActionBar = true,
    } = useContext(CommentContext)

    //const {
    //    likes,
    //    _id,
    //    toggleReplyEditor,
    //    type,
    //    //fullActionBar is a boolean value that determines whether to show the desktop or mobile verion of the action bar; 
    //    //Since the fullActionBar component is being used in other components, this gives more controll on how the bar should be displayed.
    //    fullActionBar = true,
    //} = useContext(ReplyActionBarContext)

    const { RenderLikeButton } = PostLikeFeatures() 

    useEffect(() => {
        ContainerRef.current.addEventListener("click", mouseDownEvent)
        return () => {
            if (ContainerRef.current)
                ContainerRef.current.addEventListener("click", mouseDownEvent)
        }
    }, [LinkMenuRef.current])

    const iconContext = {
    }

    return (
        <IconContext.Provider value = {iconContext}>
        <div
            id="InteractiveField"
            className={customStyle ? customStyle : `inline-flex mt-5 relative [&>*]:mx-[8px] [&>*]:md:mr-10`}
        >
            {token &&
            <>
                <RenderLikeButton
                    likes={likes}
                    documentID={_id}
                    type={type}
                />
                <button
                    className="actionBarLink"
                    type="button"
                    onClick={toggleReplyEditor}
                >
                    <CommentIcon contextItem={IconContext} customStyle="mx-1" />
                    <span className = "mr-1">Reply</span>
                    </button>
            </>
            }
            {fullActionBar &&
                <DesktopLinks
                />
            }
            {token &&
                <div
                    id="MobileIcon"
                    className={`cursor-pointer ${!fullActionBar ? "block" : "block md:hidden"}`}
                    onClick={() => setMobileMenu(true)}
                    ref={DotRef}
                >
                    <img
                        src={Dots}
                        alt="mobile icon"
                        className="w-[25px] h-[25px]"
                    />
                </div>
            }
            {mobileMenu &&
                <MobileMenu
                LinkMenuRef={LinkMenuRef}
                closeMobileMenu={() => setMobileMenu(false)}
                />
            }
            </div> 
        </IconContext.Provider>
        )
}

export default RenderReplyActionBar; 