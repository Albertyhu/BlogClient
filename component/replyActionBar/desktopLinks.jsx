import { useContext } from 'react';
import {
    AppContext,
    CommentContext, 
} from '../../util/contextItem.jsx';
import {
    ShareIcon,
    EditIcon,
    DeleteIcon,
} from '../iconComponents.jsx'; 

const MobileMenu = props => {
    const {
        token,
    } = useContext(AppContext);

    const {
        author,
        decoded,
        DeleteAction,
        ShareAction,
        openEditorToUpdate, 
        shareButtonRef,
    } = useContext(CommentContext)

    return (
        <>
            {decoded && decoded.id.toString() == author._id.toString() &&
                <>
                    <button
                    className="actionBarLink hidden md:flex"
                        type='button'
                        onClick={openEditorToUpdate}
                    >
                        <EditIcon customStyle = "mx-1"/> 
                        <span className="mr-1">Edit</span>
                    </button>
                    <button
                        className="actionBarLink hidden md:flex"
                        type='button'
                        onClick={DeleteAction}
                    >
                        <DeleteIcon customStyle = "mx-1" />
                        <span className="mr-1">Delete</span>
                    </button>
                </>
            }
            {token &&
                <button
                    className="actionBarLink hidden md:flex"
                    type='button'
                    onClick={ShareAction}
                    ref={shareButtonRef}
                >
                    <ShareIcon customStyle = "mx-1"/>
                    <span className="mr-1">Share</span>
                </button>
            }
        </>
    )
}

export default MobileMenu; 