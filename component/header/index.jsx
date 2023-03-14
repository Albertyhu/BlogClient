import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button.jsx';
import MobileIcon from '../../assets/icons/hamburger_menu_white.png'
import PlaceHolder from '../../assets/images/PlaceholderLogo.png';
import MobileMenu from './mobileMenu.jsx';
import { useNavigate } from 'react-router-dom'; 
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 

const Header = props => {
    const navigate = useNavigate(); 
    const {
        GoHome,
        GoSignUp,
        GoSignIn
    } = NavigationHooks(); 

    const { ConfirmChild } = HeaderFunctions();  

    const HeaderBackgroundColor = "bg-black";
    const TextColor = "text-white"; 
    const HeaderStyle = `w-full fixed top-0 left-0 right-0 bg-[#333333] text-2xl ${HeaderBackgroundColor} ${TextColor}`;
    const LogoStyle = `h-auto cursor-pointer select-none`
    const DesktopStyle = `hidden md:block md:[&>*]:inline-block w-full min-h-[50px]`;
    const MobileStyle = `flex md:hidden w-full h-[50px] [&>*]:inline-block justify-between`;
    const DesktopMenuLinks = `left-auto right-[10px] top-0 bottom-0 absolute h-auto translate-y-[20%] [&>div]:inline-block
            [&>div]:mx-[10px] [&>div]:cursor-pointer active:[&>div]:translate-x-[5px] active:[&>div]:translate-y-[5px]`;

    const MobileIconRef = useRef(); 

    var MobileMenuDiv = document.getElementById('MobileMenuDiv')

    const ToggleMobileMenu = () => {
        MobileMenuDiv = document.getElementById('MobileMenuDiv'); 
        if (MobileMenuDiv.classList.contains("translate-x-[270px]")) {
            MobileMenuDiv.classList.remove("translate-x-[270px]");
            MobileMenuDiv.classList.add("translate-x-[0px]");
        }
        else {
            MobileMenuDiv.classList.remove("translate-x-[0px]");
            MobileMenuDiv.classList.add("translate-x-[270px]"); 
        }
    }
    const CloseMobileMenu = () => {
        MobileMenuDiv = document.getElementById('MobileMenuDiv'); 
        MobileMenuDiv.classList.remove("translate-x-[0px]");
        MobileMenuDiv.classList.add("translate-x-[270px]"); 
    }
    const OpenMobileMenu = () => {
        MobileMenuDiv = document.getElementById('MobileMenuDiv'); 
        MobileMenuDiv.classList.remove("translate-x-[270px]");
        MobileMenuDiv.classList.add("translate-x-[0px]");
    } 

    const CheckIfClickedOutside = evt => {
        MobileMenuDiv = document.getElementById('MobileMenuDiv');
        const childAnchors = MobileMenuDiv.querySelectorAll('div');
        MobileIconButton = document.getElementById('MobileIconButton');
        if (evt.target != MobileIconButton &&
            MobileMenuDiv?.classList.contains("translate-x-[0px]") &&
            evt.target != MobileMenuDiv &&
            !ConfirmChild(evt.target, childAnchors)) {
            CloseMobileMenu(); 
        }
    }

    var MobileIconButton = document.getElementById('MobileIconButton')

    useEffect(() => {
        if (MobileIconRef.current) {
            MobileIconButton = document.getElementById('MobileIconButton')
            MobileIconButton?.addEventListener('mousedown', OpenMobileMenu)
            window.addEventListener("mousedown", CheckIfClickedOutside)
        }
    }, [MobileIconRef.current])

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
                        <div onClick={useCallback(()=>GoHome(navigate), [navigate])}>Home</div>
                        <div onClick={useCallback(()=>GoSignIn(navigate), [navigate])}>Sign In</div>
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
            <MobileMenu CloseMobileMenu={CloseMobileMenu} />
        </>
    )
}

export default Header;  