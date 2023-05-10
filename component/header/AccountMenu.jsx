import { useContext } from 'react'; 
import { AuthenticationHooks } from '../../hooks/authFormHooks.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { useNavigate } from 'react-router-dom'; 
import {
    AppContext,
    MenuLinksContext, 
} from '../../util/contextItem.jsx'; 
import { NavigationHooks  } from '../../hooks/navigation.jsx';
import "../../src/index.css";
import MenuLinks from './menuLinks.jsx'; 

const AccountMenu = props => {
    const {
        AccountMenuRef,
        setAccountMenuOpened
    } = props; 
    const navigate = useNavigate();
    const { 
    } = NavigationHooks(navigate); 
    const { LogOut } = AuthenticationHooks(navigate); 
    const { closeAccountMenu } = HeaderFunctions(); 
    var AccountMenuElem = document.querySelector("#AccountMenu"); 
    var AccountLink = document.querySelector("#AccountLink"); 
    //For some reason, when the Account Menu is clicked on, the tailwind property top-[40px] and
    //...translate-x-[-60px] no longer applies. I have make them !important in order for the 
    //...Accout Menu to stay in position. It's a bandaid solution. 
    var AccountMenuStyle = `absolute left-auto right-[0px] top-[50px] [&>div]:!my-5 overflow-y-scroll max-h-[100vh]
            [&>div]:whitespace-nowrap bg-[#f2e796] [&>div]:text-black [&>div]:cursor-pointer
            [&>div]:mx-[10px] [&>div]:select-none z-[100]`;
    function ConfirmChild(target, NodeList) {
        var confirmed = false;
        NodeList.forEach(node => {
            if (node == target) {
                confirmed = true;
            }
        })
        return confirmed;
    }

    const checkIfClickedOutside = (evt) => {
        AccountMenuElem = document.querySelector("#AccountMenu");
        AccountLink = document.querySelector("#AccountLink"); 

        const childAnchors = AccountMenuElem.querySelectorAll('div');

        if (AccountMenuElem.classList.contains("grid")
            && evt.target != AccountLink
            && !ConfirmChild(evt.target, childAnchors)
            && evt.target != AccountMenuElem
            && !AccountMenuElem.contains(evt.target)
        ) {
            closeAccountMenu(setAccountMenuOpened, AccountMenuRef); 
        }
    }

    const LinkContext = {
        checkIfClickedOutside, 
        elemRef: AccountMenuRef, 
        closeMenu: () => closeAccountMenu(setAccountMenuOpened, AccountMenuRef), 
    }

    return (
        <div
            id="AccountMenu"
            className={`${AccountMenuStyle} hidden `}
            ref={AccountMenuRef}
        >
            <MenuLinksContext.Provider value={LinkContext}>
                <MenuLinks />
            </MenuLinksContext.Provider>
        </div>
        )
}

export default AccountMenu; 