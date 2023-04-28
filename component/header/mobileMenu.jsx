import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import {
    AppContext,
    MenuLinksContext, 
} from '../../util/contextItem.jsx'; 
import RenderProfilePic from '../user/profilePicture.jsx'; 
import MenuLinks from './menuLinks.jsx'; 

const MobileMenu = props => {
    const {
        MobileMenuRef, 
        MobileIconRef,
    } = props;
    const {
        CloseMobileMenu,
    } = HeaderFunctions();
    const {
        ProfilePicture, 
        decoded, 
    } = useContext(AppContext)
    const navigate = useNavigate();
    const {
        VisitUser,
    } = NavigationHooks(navigate); 

    const MobileMenuStyle = `block md:hidden bg-white w-[270px] text-black h-full overflow-y-scroll  
        fixed left-auto right-0 top-0 translate-x-[270px] transition-[transform] z-50`

    const checkIfClickedOutside = evt => {
        if (MobileMenuRef.current &&
            MobileMenuRef.current.classList.contains("translate-x-[0px]") &&
            MobileIconRef.current != evt.target &&
            !MobileMenuRef.current.contains(evt.target)) {
            CloseMobileMenu(MobileMenuRef)
        }
    }

    const LinkContext = {
        //elemRef is a reference to the popup menu 
        elemRef: MobileMenuRef,

        //parentRef is a reference to element that toggles the menu 
/*        parentRef: MobileIconRef, */
        checkIfClickedOutside,
        closeMenu: () =>CloseMobileMenu(MobileMenuRef), 

    }

    return (
        <MenuLinksContext.Provider value={LinkContext}>
            <div
                id="MobileMenuDiv"
                ref={MobileMenuRef}
                className={MobileMenuStyle}
                >
                <div id="LinkWrapper"
                    className="w-8/12 mx-auto mt-[20px] [&>*]:mb-10 [&>*]:cursor-pointer"
                >
                    {decoded && 
                        <p className = "font-bold text-center">Hello, {decoded.username}.</p>
                    }
                    {ProfilePicture && 
                        <RenderProfilePic
                        profile_pic={ProfilePicture}
                        altText="ProfilePicture"
                        clickEvent={() => VisitUser(decoded.username, decoded.id)}
                        dimensions="w-[170px] h-[170px]"
                        />
                    }
                    <MenuLinks />
                </div>
            </div>
        </MenuLinksContext.Provider>
        )
}

export default MobileMenu; 