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
        apiURL,
        setLoading,
        token,
        contextItem, 
    } = useContext(AppContext);

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
        <>
            {decoded.id.toString() == author._id.toString() &&
                <>
                    <button
                    className="actionBarLink hidden md:flex"
                        type='button'
                        onClick={openEditorToUpdate}
                    >
                        <span className="mr-1">Edit</span>
                        <IconContext.Provider value={{ size: "25px" }}>
                            <BiEditAlt style={{ marginLeft: "0.25rem" }} />
                        </IconContext.Provider>
                    </button>
                    <button
                    className="actionBarLink hidden md:flex"
                        type='button'
                        onClick={DeleteAction}
                    >
                        <span className="mr-1">Delete</span>
                        <IconContext.Provider value={{ size: "25px" }}>
                            <RiDeleteBin6Line style={{ marginLeft: "0.25rem" }} />
                        </IconContext.Provider>
                    </button>
                </>
            }
            {token &&
                <button
                    className="actionBarLink hidden md:flex"
                    type='button'
                    onClick={ShareAction}
                >
                    <span className="mr-1">Share</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <BsShare style={{ marginLeft: "0.25rem" }} />
                    </IconContext.Provider>
                </button>
            }
        </>
    )
}

export default MobileMenu; 