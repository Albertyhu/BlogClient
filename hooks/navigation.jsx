import { useCallback } from 'react'; 

const NavigationHooks = () => {
    function GoHome(navigate) {
        navigate("/", {})
    }


    function GoSignIn(navigate) {
        navigate("/signin", {})
    } 

    function GoSignUp(navigate) {
        navigate("/signup", {})
    }
    
    return { GoHome, GoSignIn, GoSignUp }
}

export { NavigationHooks }; 