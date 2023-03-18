import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { HeaderFunctions } from '../../hooks/headerFunctions.jsx';
import { AppContext } from '../../util/contextItem.jsx'; 

const MobileMenu = props => {
    const { Links } = props;
    const { ConfirmChild, CloseMobileMenu, OpenMobileMenu } = HeaderFunctions();
    const { user, token } = useContext(AppContext)
    const navigate = useNavigate();
    const {
        GoHome,
        GoSignUp,
        GoSignIn
    } = NavigationHooks(); 
    var MobileMenuDiv = document.getElementById('MobileMenuDiv')

    const MobileMenuStyle = `block md:hidden bg-white w-[270px] text-black h-full overflow-y-scroll  
        fixed left-auto right-0 top-0 translate-x-[270px] transition-[transform] z-10`
    
    return (
        <div
            id="MobileMenuDiv"
            className={MobileMenuStyle}
            >
            <div id="LinkWrapper"
                className="w-8/12 mx-auto mt-[20px] [&>*]:mb-10 [&>*]:cursor-pointer"
            >
                <div onClick={useCallback(() => {
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
                            onClick={useCallback(() => {
                            GoSignIn(navigate);
                            CloseMobileMenu(MobileMenuDiv);
                            }, [navigate])}
                        >Sign In</div>
                        <div
                            onClick={useCallback(() => {
                            GoSignUp(navigate);
                            CloseMobileMenu(MobileMenuDiv);
                            }, [navigate])}
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