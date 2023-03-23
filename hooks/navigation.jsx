const NavigationHooks = (navigate) => {
    function GoBack() {
        navigate(-1);
    }
    function GoHome() {
        navigate("/", {})
    }


    function GoSignIn() {
        navigate("/signin", {})
    } 

    function GoSignUp() {
        navigate("/signup", {})
    }

    function VisitUser(username, userID) {
        navigate(`/profile/${username}`, {
            state: {
                id: userID
            }
        })
    }    
    function GoEditProfilePicture(username, userID) {
        navigate(`/profile/${username}/editProfilePicture`, {
            state: {
                id: userID
                }
        })
    }

    return {
        GoHome,
        GoSignIn,
        GoSignUp,
        GoBack,
        VisitUser,
        GoEditProfilePicture
    }
}

export { NavigationHooks }; 