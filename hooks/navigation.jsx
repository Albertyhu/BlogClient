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
        navigate(`/category/${categoryName}/${ID}`, {
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

    function EditCategory(ID, name, description, image) {
        navigate(`/category/${name}/edit`, {
            state: {
                id: ID, 
                name: name, 
                description: description, 
                image: image,
                mode: "edit"
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
        GoCreateTag,
        
    }
}

const PostNavigationHooks = (navigate) => {
    function GoToPost(postTitle, postID) {
        navigate(`/post/${postTitle}/${postID}`, {
            state: {
                id: postID, 
            }
        })
    }
    function BringDataToPost(data) {
        const {
            title,
            content,
            author,
            published,
            thumbnail,
            images,
            abstract,
            category,
            tag,
            id, 
        } = data; 
        navigate(`/post/${data.title}/${id}`, {
            state: {
                title,
                content,
                author,
                published,
                thumbnail,
                images,
                abstract,
                category,
                tag,
                id, 
            }
        })
    }

    function GoCreatePost() {
        navigate("/post/new")
    }

    function GoCreatePostFromCategory(categoryID) {
        navigate("/post/new", {
            state: {
                category: categoryID, 
            }
        })

    }

    function GoEditPost(name, postID, elements) {
        const {
            author,
            title,
            content,
            published,
            thumbnail,
            images,
            abstract,
            category,
            tag, 
        } = elements; 
        navigate(`/post/${name}/edit`, {
            state: {
                id: postID, 
                author,
                title,
                content,
                published,
                thumbnail,
                images,
                abstract,
                category,
                tag, 
            }
        })
    }

    return {
        GoToPost,
        BringDataToPost,
        GoCreatePost,
        GoEditPost, 
        GoCreatePostFromCategory,
    }
}

export { NavigationHooks, PostNavigationHooks }; 