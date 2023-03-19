import { NavigationHooks } from './navigation.jsx'

const AuthenticationHooks = () => {
    const { GoHome } = NavigationHooks(); 
    const LogOut = (navigate) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token"); 
        GoHome(navigate); 
    }

    const SignIn = (navigate) => {

    }

    return { LogOut, SignIn }; 
}

export {AuthenticationHooks }