import { useContext } from 'react'; 
import {
    AppContext,
    CommentContext, 
} from '../../util/contextItem.jsx';
import {
    BiEditAlt,
} from 'react-icons/Bi';
import {
    BsShare
} from 'react-icons/Bs';
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from 'react-icons/Ri';

const MobileMenu = props => {

    const {
        contextItem,
        LinkMenuRef,
    } = props; 
    const {
        apiURL,
        setLoading,
        token,
    } = useContext(AppContext);

    const linkStyle = `actionBarLink hover:bg-[#33333] mb-5`; 

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
        DeleteAction, 
        ShareAction, 
        openEditorToUpdate, 
    } = useContext(CommentContext)

    return (
        <div
            id="desktopLinks"
            className="grid md:hidden border-[1px] absolute left-auto right-0 bg-[#ffffff] p-5 z-20"
            ref={LinkMenuRef}
        >
            {decoded.id.toString() == author._id.toString() && 
            <>
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={openEditorToUpdate}
                >
                    <span>Edit</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <BiEditAlt />
                    </IconContext.Provider>
                </button>
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={DeleteAction}
                >
                    <span>Delete</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <RiDeleteBin6Line />
                    </IconContext.Provider>
                </button> 
            </>
            }
            {token &&
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={ShareAction}
                >
                    <span>Share</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <BsShare />
                    </IconContext.Provider>
                </button>
            }
        </div>
        )
}

export default MobileMenu; 