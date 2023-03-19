import { useEffect ,useRef } from 'react'; 
import { AuthenticationHooks } from '../../hooks/authenticationHooks.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { useNavigate } from 'react-router-dom'; 

const AccountMenu = props => {
    const { AccountMenuRef } = props; 
    const { LogOut } = AuthenticationHooks(); 
    const { closeAccountMenu } = HeaderFunctions(); 
    const navigate = useNavigate(); 
    var AccountMenuElem = document.querySelector("#AccountMenu"); 
    var AccountLink = document.querySelector("#AccountLink"); 
    var AccountMenuStyle = `grid absolute top-[40px] [&>div]:my-5 
            [&>div]:whitespace-nowrap bg-[#f2e796] [&>div]:text-black
            [&>div]:mx-[10px] translate-x-[-215px]`;

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

        if (!AccountMenuElem.classList.contains("hidden")
            && evt.target != AccountLink
            && !ConfirmChild(evt.target, childAnchors)
            && evt.target != AccountMenuElem
        ) {
            console.log("fired")
            closeAccountMenu(); 
        }
    }

    useEffect(() => {
        AccountMenuElem = document.querySelector("#AccountMenu"); 
        console.log("Adding event listener");
        window.addEventListener("mousedown", checkIfClickedOutside); 
        return () => {
            console.log("Removing event listener");
            window.removeEventListener("mousdown", checkIfClickedOutside);
        }
    }, [])

    return (
        <div
            id="AccountMenu"
            className={`${AccountMenuStyle} !hidden`}
            ref={AccountMenuRef}
        >
            <div
                className="hover:underline" onClick={() => { console.log("This works") }}>Your profile</div>
            <div className="hover:underline" onClick={() => { console.log("This works") }}>Edit profile</div>
            <div className="hover:underline" onClick={() => { console.log("This works") }}>Change password</div>
            <div
                className="hover:underline"
                onClick={()=>LogOut(navigate)}
            >Log Out</div>
        </div>
        )
}

export default AccountMenu; 