import { useEffect,useContext } from 'react'; 
import { AuthenticationHooks } from '../../hooks/authFormHooks.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { useNavigate } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { NavigationHooks  } from '../../hooks/navigation.jsx';
import "../../src/index.css";

const AccountMenu = props => {
    const { toggleDisplayAccountLink, user} = useContext(AppContext)
    const {
        AccountMenuRef,
        setAccountMenuOpened
    } = props; 
    const navigate = useNavigate();
    const { VisitUser, GoEditProfile, GoEditPassword } = NavigationHooks(navigate); 
    const { LogOut } = AuthenticationHooks(navigate); 
    const { closeAccountMenu } = HeaderFunctions(); 
    var AccountMenuElem = document.querySelector("#AccountMenu"); 
    var AccountLink = document.querySelector("#AccountLink"); 
    //For some reason, when the Account Menu is clicked on, the tailwind property top-[40px] and
    //...translate-x-[-60px] no longer applies. I have make them !important in order for the 
    //...Accout Menu to stay in position. It's a bandaid solution. 
    var AccountMenuStyle = `absolute left-auto right-[0px] top-[60px] [&>div]:!my-5 
            [&>div]:whitespace-nowrap bg-[#f2e796] [&>div]:text-black [&>div]:cursor-pointer
            [&>div]:mx-[10px] [&>div]:select-none z-[50]`;
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
            closeAccountMenu(setAccountMenuOpened); 
        }
    }

    useEffect(() => {
        AccountMenuElem = document.querySelector("#AccountMenu"); 
        window.addEventListener("mousedown", checkIfClickedOutside); 
        return () => {
            window.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [])

    return (
        <div
            id="AccountMenu"
            className={`${AccountMenuStyle} hidden`}
            ref={AccountMenuRef}
        >
            <div
                className="hover:underline" onClick={() => { VisitUser(user.username, user.id) }}>Your profile</div>
            <div className="hover:underline" onClick={() => { GoEditProfile(user.username, user.id)}}>Edit profile</div>
            <div className="hover:underline" onClick={() => {GoEditPassword(user.username, user.id)}}>Change password</div>
            <div
                className="hover:underline"
                onClick={() => {
                    closeAccountMenu(setAccountMenuOpened)
                    toggleDisplayAccountLink(false)
                    LogOut();
                }}
            >Log Out</div>
        </div>
        )
}

export default AccountMenu; 