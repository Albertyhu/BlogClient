const NavigationHooks = () => {
    function GoBack(navigate) {
        navigate(-1);
    }
    function GoHome(navigate) {
        navigate("/", {})
    }


    function GoSignIn(navigate) {
        navigate("/signin", {})
    } 

    function GoSignUp(navigate) {
        navigate("/signup", {})
    }
    
    return { GoHome, GoSignIn, GoSignUp, GoBack }
}

export { NavigationHooks }; 