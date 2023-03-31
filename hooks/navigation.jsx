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


    function VisitOneCategory(categoryName, ID) {
        navigate(`/category/${categoryName}`, {
            state: {
                id: ID, 
            }
        })
    }
    //This navigates the user to a single category page and it passes relevant data
    function VisitOneCategoryAndPopulate(categoryName, ID, image, description) {
        navigate(`/category/${categoryName}`, {
            state: {
                id: ID,
                name: categoryName, 
                image, 
                description,
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
        VisitOneCategoryAndPopulate,
        EditCategory,
        GoTagPage,
        GoCreateTag
    }
}

export { NavigationHooks }; 