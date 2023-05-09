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
        LinkMenuRef,
        closeMobileMenu, 
    } = props; 
    const {
        token,
        decoded,
    } = useContext(AppContext);

    const linkStyle = `actionBarLink hover:bg-[#33333] mb-5`; 

    const {
        author,
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
            {decoded && decoded.id.toString() == author._id.toString() && 
            <>
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={() => {
                        openEditorToUpdate();
                        closeMobileMenu();
                    }}
                >
                    <EditIcon customStyle="mx-1" /> 
                    <span>Edit</span>
                </button>
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={() => {
                        DeleteAction();
                        closeMobileMenu(); 
                    }}
                >
                    <DeleteIcon customStyle="mx-1" />
                    <span>Delete</span>
                </button> 
            </>
            }
            {token &&
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={() => {
                        ShareAction();
                        closeMobileMenu();
                    }}
                >
                    <ShareIcon customStyle="mx-1" />
                    <span>Share</span>
                </button>
            }
        </div>
        )
}

export default MobileMenu; 