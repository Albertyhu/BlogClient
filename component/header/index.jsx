import React, { useEffect, useRef, useCallback, useContext, useState } from 'react';
import MobileIcon from '../../assets/icons/hamburger_menu_white.png'
import PlaceHolder from '../../assets/images/PlaceholderLogo.png';
import MobileMenu from './mobileMenu.jsx';
import { useNavigate} from 'react-router-dom'; 
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import "../../src/index.css"; 
import AccountMenuComponent from './AccountMenu.jsx'; 
import { AppContext } from '../../util/contextItem.jsx';
import DownIcon from '../downIcon.jsx'; 
import { AiOutlineLogin } from 'react-icons/Ai';
const Header = props => {
    const navigate = useNavigate(); 
    const {
        GoHome,
        GoSignUp,
        GoSignIn
    } = NavigationHooks(navigate); 

    const {
        user,
        displayMemberComponents
    } = useContext(AppContext)

    const { ConfirmChild,
        CloseMobileMenu,
        OpenMobileMenu,
        toggleAccountMenu
    } = HeaderFunctions();  

    const HeaderBackgroundColor = "bg-black";
    const TextColor = "text-white"; 
    const HeaderStyle = `w-full fixed top-0 left-0 right-0 bg-[#333333] text-2xl z-10 ${HeaderBackgroundColor} ${TextColor}`;
    const LogoStyle = `h-auto cursor-pointer select-none inline-block`
    const DesktopStyle = `hidden md:block w-full min-h-[50px]`;
    const MobileStyle = `flex md:hidden w-full h-[50px] [&>*]:inline-block justify-between`;
    const DesktopMenuLinks = `left-auto right-[10px] top-0 bottom-0 absolute h-auto translate-y-[20%] inline-block
            [&>div]:mx-[10px] [&>div]:cursor-pointer active:[&>div]:translate-x-[5px] active:[&>div]:translate-y-[5px]`;


    const MobileIconRef = useRef(); 

    var MobileMenuDiv = document.getElementById('MobileMenuDiv')

    const CheckIfClickedOutside = evt => {
        MobileMenuDiv = document.getElementById('MobileMenuDiv');
        const childAnchors = MobileMenuDiv.querySelectorAll('div');
        MobileIconButton = document.getElementById('MobileIconButton');
        if (evt.target != MobileIconButton &&
            MobileMenuDiv?.classList.contains("translate-x-[0px]") &&
            evt.target != MobileMenuDiv &&
            !ConfirmChild(evt.target, childAnchors)) {
            CloseMobileMenu(MobileMenuDiv); 
        }
    }

    var MobileIconButton = document.getElementById('MobileIconButton')

    useEffect(() => {
        if (MobileIconRef.current) {
            MobileIconButton = document.getElementById('MobileIconButton')
            MobileIconButton?.addEventListener('mousedown', ()=>OpenMobileMenu(MobileMenuDiv))
            window.addEventListener("mousedown", CheckIfClickedOutside)
        }
    }, [MobileIconRef.current])

    const AccountMenuRef = useRef();
    const [AccountMenuOpened, setAccountMenuOpened] = useState(AccountMenuRef.current ? AccountMenuRef.current.classList.contains("grid") ? true: false : false)

    const SignInIcon = () => {
        return (
            <span className= "w-[20px] h-[20px] my-auto ml-[5px] inline-block select-none"><AiOutlineLogin /></span>
            )
    }
 
    return (
        <>
            <div
                id = "HeaderWrapper"
                className={HeaderStyle}>
                <div
                    id="DesktopHeader"
                    className={DesktopStyle}>
                    <img
                        src={PlaceHolder}
                        className={LogoStyle}
                        onClick={useCallback(() => GoHome(navigate), [navigate])}
                    />
                    <div
                        id="DesktopMenuLinks"
                        className={DesktopMenuLinks}
                    >
                        <div className= "inline-block select-none" onClick={useCallback(() => GoHome(navigate), [navigate])}>Home</div>
                        {user && displayMemberComponents ?
                            <>
                                <div
                                    id="AccountLink"
                                    className= "inline-block select-none"
                                    onClick={() => toggleAccountMenu(setAccountMenuOpened)}
                                >{user.username}<DownIcon downwardsDirection={!AccountMenuOpened} /></div>
                            </>
                            :
                            <div
                                className="inline-block"
                                onClick={() => GoSignIn()}>Sign In <SignInIcon /></div>
                        }
                       
                    </div>
                    <AccountMenuComponent
                        AccountMenuRef={AccountMenuRef}
                        setAccountMenuOpened={setAccountMenuOpened }
                    />
                </div>
                <div
                    id="MobileHeader"
                    className={MobileStyle}>
                    <img
                        src={PlaceHolder}
                        className={LogoStyle}
                        onClick={useCallback(() => { GoHome(navigate) }, [navigate])}
                    />
                    <img
                        id="MobileIconButton"
                        src={MobileIcon}
                        className="mr-[10px] my-auto h-[35px] w-[35px] cursor-pointer select-none"
                        alt="MobileIcon"
                        ref={MobileIconRef}
                    />
                </div>
            </div>
            <MobileMenu  />
        </>
    )
}

export default Header;  