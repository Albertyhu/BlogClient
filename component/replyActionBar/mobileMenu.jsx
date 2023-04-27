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
        LinkMenuRef,
        closeMobileMenu, 
    } = props; 
    const {
        token,
    } = useContext(AppContext);

    const linkStyle = `actionBarLink hover:bg-[#33333] mb-5`; 

    const {
        author,
        decoded,
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
                    onClick={() => {
                        openEditorToUpdate();
                        closeMobileMenu();
                    }}
                >
                    <span>Edit</span>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <BiEditAlt />
                    </IconContext.Provider>
                </button>
                <button
                    className={`${linkStyle}`}
                    type='button'
                    onClick={() => {
                        DeleteAction();
                        closeMobileMenu(); 
                    }}
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
                    onClick={() => {
                        ShareAction();
                        closeMobileMenu();
                    }}
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