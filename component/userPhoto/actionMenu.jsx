import { useContext } from 'react';
import {
    AppContext,
    CommentContext,
} from '../../util/contextItem.jsx';

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
        //fullActionBar is a boolean value that determines whether to show the desktop or mobile verion of the action bar;
        //Since the fullActionBar component is being used in other components, this gives more controll on how the bar should be displayed.
        fullActionBar = true,
    } = useContext(CommentContext)

    return (
        <div
            id="MobileMenuLinks"
            className={`grid border-[1px] absolute left-auto right-0 bg-[#ffffff] p-5 z-20 ${fullActionBar ? "md:hidden" : ""}`}
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
                    </button>
                    <button
                        className={`${linkStyle}`}
                        type='button'
                        onClick={DeleteAction}
                    >
                        <span>Delete</span>
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
                </button>
            }
        </div>
    )
}

export default MobileMenu; 