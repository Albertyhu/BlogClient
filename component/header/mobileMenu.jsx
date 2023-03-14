import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';

const MobileMenu = props => {
    const { Links, CloseMobileMenu } = props;
    const navigate = useNavigate();
    const {
        GoHome,
        GoSignUp,
        GoSignIn
    } = NavigationHooks(); 

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
                    CloseMobileMenu();
                }, [navigate])}>Home</div>
                <div
                    onClick={useCallback(() => {
                        GoSignIn(navigate);
                        CloseMobileMenu();
                    }, [navigate])}
                >Sign In</div>
                <div
                    onClick={useCallback(() => {
                        GoSignUp(navigate);
                        CloseMobileMenu();
                    }, [navigate])}
                >Sign Up</div>
                {typeof Links != "undefined" && Links.map(link => <div>{link}</div>)}
                <div onClick={CloseMobileMenu}>Close</div>
            </div>
        </div>
        )
}

export default MobileMenu; 