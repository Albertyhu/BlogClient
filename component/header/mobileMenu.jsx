import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { AppContext } from '../../util/contextItem.jsx'; 
import RenderProfilePic from '../user/profilePicture.jsx'; 

const MobileMenu = props => {
    const {
        Links,
        MobileMenuRef, 
    } = props;
    const {CloseMobileMenu} = HeaderFunctions();
    const {
        user, 
        token,
        ProfilePicture, 
        decoded, 
    } = useContext(AppContext)
    const navigate = useNavigate();
    const {
        GoHome,
        GoSignUp,
        GoSignIn,
        VisitUser,
    } = NavigationHooks(navigate); 
    var MobileMenuDiv = document.getElementById('MobileMenuDiv')

    const MobileMenuStyle = `block md:hidden bg-white w-[270px] text-black h-full overflow-y-scroll  
        fixed left-auto right-0 top-0 translate-x-[270px] transition-[transform] z-50`

    return (
        <div
            id="MobileMenuDiv"
            ref={MobileMenuRef}
            className={MobileMenuStyle}
            >
            <div id="LinkWrapper"
                className="w-8/12 mx-auto mt-[20px] [&>*]:mb-10 [&>*]:cursor-pointer"
            >
                {ProfilePicture && 
                    <RenderProfilePic
                    profile_pic={ProfilePicture}
                    altText="ProfilePicture"
                    clickEvent={()=>VisitUser(decoded.username, decoded.id)}
                    />
                }
                <div onClick={useCallback(() => {
                    console.log("Clicked on home.")
                    GoHome(navigate);
                    CloseMobileMenu(MobileMenuDiv);
                }, [navigate])}>Home</div>
                {token ? 
                    <div>
                        Account
                    </div>
                    :
                    <div>
                        <div
                            onClick={() => {
                            GoSignIn();
                            CloseMobileMenu(MobileMenuDiv);
                            }}
                        >Sign In</div>
                        <div
                            onClick={() => {
                            GoSignUp();
                            CloseMobileMenu(MobileMenuDiv);
                            }}
                        >Sign Up</div>
                        </div>
                    }

                {typeof Links != "undefined" && Links.map(link => <div>{link}</div>)}
                <div onClick={()=>CloseMobileMenu(MobileMenuDiv)}>Close</div>
            </div>
        </div>
        )
}

export default MobileMenu; 