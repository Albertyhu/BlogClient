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

    function GoEditProfile(username, userID) {
        navigate(`/profile/${username}/editProfile`, {
            state: {
                id: userID
            }
        })
    }

    function VisitUser(username, userID) {
        navigate(`/profile/${username}`, {
            state: {
                id: userID
            }
        })
    }  

    function GoCategory() {
        navigate("/category")
    }

    function GoCreateCategory() {
        navigate("/category/create")
    }


    function VisitOneCategory(category, ID) {
        navigate(`/category/${category}`, {
            state: {
                id: ID, 
            }
        })
    }

    function EditCategory(ID, name) {
        navigate(`/category/${name}/edit`, {
            state: {
                id:ID, 
            }
        })
    }

    function GoTagPage(message) {
        navigate("/tags", {
            state: {
                message: message ? message : "", 
            }
        })
    }

    function GoCreateTag() {
        navigate("/tags/create")
    }

    function GoEditProfilePicture(username, userID) {
        navigate(`/profile/${username}/editProfilePicture`, {
            state: {
                id: userID
                }
        })
    }
    function GoEditPassword(username, userID) {
        navigate(`/profile/${username}/editpassword`, {
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
        GoEditProfile,
        GoEditProfilePicture,
        GoEditPassword,
        GoCategory,
        GoCreateCategory,
        VisitOneCategory,
        EditCategory,
        GoTagPage,
        GoCreateTag
    }
}

export { NavigationHooks }; 