import React, { useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button.jsx';
import MobileIcon from '../../assets/icons/hamburger_menu_white.png'
import PlaceHolder from '../../assets/images/PlaceholderLogo.png';
import MobileMenu from './mobileMenu.jsx';
import { useNavigate } from 'react-router-dom'; 
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import "../../src/index.css"; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { AuthenticationHooks } from '../../hooks/authenticationHooks.jsx'; 
import AccountMenuComponent from './AccountMenu.jsx'; 

const Header = props => {
    const navigate = useNavigate(); 
    const {
        GoHome,
        GoSignUp,
        GoSignIn
    } = NavigationHooks(); 
    const { user, token } = useContext(AppContext)
    const { ConfirmChild, CloseMobileMenu, OpenMobileMenu, toggleAccountMenu } = HeaderFunctions();  
    const { LogOut } = AuthenticationHooks(); 

    const HeaderBackgroundColor = "bg-black";
    const TextColor = "text-white"; 
    const HeaderStyle = `w-full fixed top-0 left-0 right-0 bg-[#333333] text-2xl ${HeaderBackgroundColor} ${TextColor}`;
    const LogoStyle = `h-auto cursor-pointer select-none`
    const DesktopStyle = `hidden md:block md:[&>*]:inline-block w-full min-h-[50px]`;
    const MobileStyle = `flex md:hidden w-full h-[50px] [&>*]:inline-block justify-between`;
    const DesktopMenuLinks = `left-auto right-[10px] top-0 bottom-0 absolute h-auto translate-y-[20%] [&>div]:inline-block
            [&>div]:mx-[10px] [&>div]:cursor-pointer active:[&>div]:translate-x-[5px] active:[&>div]:translate-y-[5px]`;
    var AccountMenuStyle = `grid absolute top-[40px] [&>div]:my-5 
            [&>div]:whitespace-nowrap bg-[#f2e796] [&>div]:text-black
            [&>div]:mx-[10px] translate-x-[-215px]`;
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
                        <div onClick={useCallback(() => GoHome(navigate), [navigate])}>Home</div>
                        {token ?
                            <>
                                <div
                                    id="AccountLink"
                                    onClick={useCallback(() => toggleAccountMenu(),[])}
                                >User</div>
                                <AccountMenuComponent AccountMenuRef={AccountMenuRef } />
                            </>
                            :
                            <div onClick={useCallback(() => GoSignIn(navigate), [navigate])}>Sign In</div>
                        }
                       
                    </div>
                </div>
                <div
                    id="MobileHeader"
                    className={MobileStyle}>
                    <img
                        src={PlaceHolder}
                        className={LogoStyle}
                        onClick={useCallback(() => { GoHome(navigate); }, [navigate])}
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