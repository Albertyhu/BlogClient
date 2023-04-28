import { useContext } from 'react'; 
import { AiOutlineHome, AiFillEdit } from 'react-icons/Ai';

import { IconContext } from 'react-icons'; 
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { MenuLinksContext } from '../../util/contextItem.jsx'; 

export const HomeButton = props => {
    const {
        CloseMobileMenu, 
    } = HeaderFunctions();
    const {
        clickEvent,
        MobileMenuRef, 
    } = props; 
    return (
        <IconContext.Provider value ={{size: "25px"}}>
            <div
                className="hover:underline flex" onClick={() => {
                    clickEvent(); 
                    CloseMobileMenu(MobileMenuRef)
                }}><AiOutlineHome /><span>Home</span></div>
        </IconContext.Provider>
        )
}

export const Button = props => {
    const {
        title,
        clickEvent,
        icon,
    } = props;

    const {
        closeMenu,
    } = useContext(MenuLinksContext)

    return (
        <IconContext.Provider value={{ size: "25px" }}>
            <div
                id="Link"
                className="hover:underline flex [&>*]:mr-5" onClick={() => {
                    if (clickEvent)
                        clickEvent();
                        closeMenu();
                }}>{icon()}<span>{title}</span></div>
        </IconContext.Provider>
    )
}