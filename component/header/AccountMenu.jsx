import { useEffect,useContext } from 'react'; 
import { AuthenticationHooks } from '../../hooks/authFormHooks.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { useNavigate } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import "../../src/index.css";

const AccountMenu = props => {
    const { toggleDisplayAccountLink} = useContext(AppContext)
    const {
        AccountMenuRef,
        setAccountMenuOpened
    } = props; 
    const { LogOut } = AuthenticationHooks(); 
    const { closeAccountMenu } = HeaderFunctions(); 
    const navigate = useNavigate(); 
    var AccountMenuElem = document.querySelector("#AccountMenu"); 
    var AccountLink = document.querySelector("#AccountLink"); 
    //For some reason, when the Account Menu is clicked on, the tailwind property top-[40px] and
    //...translate-x-[-60px] no longer applies. I have make them !important in order for the 
    //...Accout Menu to stay in position. It's a bandaid solution. 
    var AccountMenuStyle = `absolute left-auto right-[0px] top-[60px] [&>div]:!my-5 
            [&>div]:whitespace-nowrap bg-[#f2e796] [&>div]:text-black [&>div]:cursor-pointer
            [&>div]:mx-[10px] [&>div]:select-none`;
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
                className="hover:underline" onClick={() => { console.log("This works") }}>Your profile</div>
            <div className="hover:underline" onClick={() => { console.log("This works") }}>Edit profile</div>
            <div className="hover:underline" onClick={() => { console.log("This works") }}>Change password</div>
            <div
                className="hover:underline"
                onClick={() => {
                    closeAccountMenu(setAccountMenuOpened)
                    toggleDisplayAccountLink(false)
                    LogOut(navigate);
                }}
            >Log Out</div>
        </div>
        )
}

export default AccountMenu; 