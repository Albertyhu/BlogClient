import {cleanString} from './textHooks.jsx'; 

const NavigationHooks = (navigate) => {
    function GoBack() {
        navigate(-1);
    }
    function GoHome(message) {
        navigate("/", {
            state: {
                message: message ? [{ param: "general", msg: message }] : null, 
            }
        })
    }

    function GoSignIn() {
        navigate("/signin", {
            message: message ? [{ param: "general", msg: "You are now logged in." }] : null, 
        })
    } 

    function GoSignUp() {
        navigate("/signup", {
            message: message ? [{ param: "general", msg: "Your account has been created." }] : null, 
        })
    }

    function GoEditProfile(username, userID) {
        navigate(`/profile/${cleanString(username)}/editProfile`, {
            state: {
                id: userID,
                username, 
            }
        })
    }

    function ViewAllUsers(message) {
        navigate("/users", {
            state: {
                message: message ? message : null,
            }
        })
    }

    function VisitUser(username, userID) {
        navigate(`/profile/${cleanString(username)}`, {
            state: {
                id: userID,
                username, 
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
                categoryName,
            }
        })
    }
    //This navigates the user to a single category page and it passes relevant data
    function VisitOneCategoryAndPopulate(categoryName, ID, image, description) {
        navigate(`/category/${cleanString(categoryName)}`, {
            state: {
                id: ID,
                name: categoryName, 
                image, 
                description,
            }
        })
    }

    function EditCategory(ID, name, description, image) {
        navigate(`/category/${cleanString(name)}/edit`, {
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
        navigate(`/profile/${cleanString(username)}/editProfilePicture`, {
            state: {
                id: userID
                }
        })
    }
    function GoEditPassword(username, userID) {
        navigate(`/profile/${cleanString(username)}/editpassword`, {
            state: {
                id: userID
            }
        })
    }

    //User photo navigation 
    function GoUserPhotos(username, userId, message) {
        navigate(`/profile/${cleanString(username)}/user_photos`, {
            state: {
                username, 
                userId, 
                message, 
            }
        })
    }
    function VisitOnePhoto(username, userId, photoId, title) {
        navigate(`/profile/${cleanString(username)}/user_photos/${photoId}`, {
            state: {
                username,
                userId, 
                photoId, 
                title
            }
        })
    }
    function GoBulkUpload(username, userId) {
        navigate(`/profile/${cleanString(username)}/user_photos/bulk_upload`, {
            state: {
                username,
                userId, 
            }
        })
    }

    function GoSettings(username, userId) {
        navigate(`/profile/${cleanString(username)}/settings`, {
            state: {
                username,
                userId,
            }
        })
    }

    function GoSearchScreen() {
        navigate(`/search`)
    }

    function GoEditProfileAsAdmin(ID) {
        navigate(`/profile/${ID}/editProfileAsAdmin`, {
            state: {
                id: ID, 
            }
        })
    }

    function GoPrivacyPolicy() {
        navigate("/privacy_policy")
    }

    function GoTermsAndConditions() {
        navigate("/terms&conditions")
    }

    return {
        GoHome,
        GoSignIn,
        GoSignUp,
        GoBack,
        ViewAllUsers,
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
        GoUserPhotos, 
        VisitOnePhoto, 
        GoBulkUpload,
        GoSettings,
        GoSearchScreen,
        GoEditProfileAsAdmin, 
        GoPrivacyPolicy,
        GoTermsAndConditions, 
    }
}

const PostNavigationHooks = (navigate) => {
    function GoToPost(postTitle, postID) {
        navigate(`/post/${postTitle}/${postID}`, {
            state: {
                id: postID, 
                title: postTitle
            }
        })
    }
    function BringDataToPost(data) {
        const {
            title,
            content,
            author,
            published,
            lastEdited, 
            datePublished, 
            thumbnail,
            images,
            abstract,
            category,
            tag,
            id, 
        } = data; 
        navigate(`/post/${cleanString(data.title)}/${id}`, {
            state: {
                title,
                content,
                author,
                published,
                datePublished, 
                lastEdited, 
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
    //There is a problem with this. 
    function GoEditPost(postTitle, postID, elements) {
        const {
            author,
            title,
            content,
            published,
            thumbnail,
            mainPanelImages, 
            images,
            abstract,
            category,
            tag, 
        } = elements; 
        navigate(`/post/${cleanString(postTitle)}/edit`, {
            state: {
                id: postID, 
                author,
                title,
                content,
                published,
                thumbnail,
                images: mainPanelImages,
                abstract,
                category,
                tag, 
            }
        })
    }

    function DisplayUserPosts(username, userId) {
        navigate(`/profile/${username}/${userId}/posts`, {
            state: {
                username,
                userId,
            }
        })
    }

    return {
        GoToPost,
        BringDataToPost,
        GoCreatePost,
        GoEditPost, 
        GoCreatePostFromCategory,
        DisplayUserPosts, 
    }
}

export { NavigationHooks, PostNavigationHooks }; 