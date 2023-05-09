import { NavigationHooks } from './navigation.jsx'; 
import { ErrorMessageHooks  } from './errorHooks.jsx';
import { Base64Hooks } from './imageHooks.jsx'; 

const { convertObjToBase64 } = Base64Hooks()

const UserProfileHooks = (apiURL, token, setLoading, setMessage) => {
    const DeleteUser = async (userID, dispatchFunctions) => {
        const DeleteURL = `${apiURL}/users/${userID}/delete`; 
        const { ClearUserData, navigate } = dispatchFunctions; 
        console.log("DeleteURL: ", DeleteURL)
        const options = {
            method: "DELETE",
        } 
        const { GoHome } = NavigationHooks(navigate);
        setLoading(true)
        await fetch(DeleteURL, options)
            .then(async res => {
                const data = await res.json(); 
                if (!res.ok) {
                    const error = (data && data.message || response.status)
                    console.log("Internal service error: ", error)
                }
                localStorage.clear();
                ClearUserData();
                setLoading(false)
                GoHome("Account has been deleted"); 
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
    }

    const DeleteUserWithPassword = async (userID, currentPassword, confirmPasssword, dispatchFunctions) => {
        const DeleteURL = `${apiURL}/users/${userID}/delete_with_password`;
        const { ClearUserData, navigate } = dispatchFunctions;
        console.log("DeleteURL: ", DeleteURL)

        const { GoHome } = NavigationHooks(navigate);
        const formData = new FormData();
        formData.append("currentPassword", currentPassword)
        formData.append("confirmPassword", confirmPassword)
        const options = {
            method: "DELETE",
            body: formData, 
            headers: {
                    "Authorization": `Bearer ${token}`
                }
        }
        setLoading(true)
        await fetch(DeleteURL, options)
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data.error || response.status)
                    console.log("Internal service error: ", error)
                    setLoading(false)
                    alertMessage(`Error: ${error}`, setMessage)
                }
                localStorage.clear();
                ClearUserData();
                setLoading(false)
                GoHome("Account has been deleted");
            })
            .catch(err => {
                console.error(err)
                alertMessage(`Error: ${error}`, setMessage)
                setLoading(false)
            })
    }
    return {
        DeleteUser,
        DeleteUserWithPassword

    }
}

const EditUserHooks = (navigate) => {
    const { GoHome, VisitUser } = NavigationHooks(navigate);
    const { RenderErrorArray } = ErrorMessageHooks()

    const UpdateUserProfile = async (apiURL, UserDetails, Elements, dispatchFunctions) => {
        const {
            imageData,
            username,
            email,
            biography,
            coverPhoto,
            keepProfilePic, 
            keepCoverPhoto, 
        } = Elements; 
        const {
            id, 
            token 
        } = UserDetails; 
        
        const {
            setNewUser,
            setNewProfileImage,
            setNewCoverPhoto, 
        } = dispatchFunctions;
        const FetchURL = `${apiURL}/users/${id}/update_user_profile`; 
        const formData = new FormData;
  
        formData.append("username", username);
        formData.append("email", email);
        formData.append("biography", biography);
        formData.append("profile_pic", imageData);
        formData.append("keepProfilePic", keepProfilePic)
        formData.append("coverPhoto", coverPhoto);
        formData.append("keepCoverPhoto", keepCoverPhoto)

        try {
            await fetch(FetchURL,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
                .then(async response => {
                    const result = await response.json();

                    if (response.ok) {
                        localStorage.setItem('user', JSON.stringify(result.user))
                        if (result.ProfilePicture) {
                            result.ProfilePicture = convertObjToBase64(result.ProfilePicture);
                            localStorage.setItem('ProfilePicture', JSON.stringify(result.ProfilePicture))
                            setNewProfileImage(result.ProfilePicture)
                        }
                        else {
                            localStorage.removeItem("ProfilePicture")
                            setNewProfileImage(null)
                        }
                        if (result.coverPhoto && Object.keys(result.coverPhoto).length > 0) {
                            result.coverPhoto = convertObjToBase64(result.coverPhoto);
                            localStorage.setItem('coverPhoto', JSON.stringify(result.coverPhoto))
                            console.log("cover photo: ", result.coverPhoto)
                            setNewCoverPhoto(result.coverPhoto)
                        }
                        else {
                            localStorage.removeItem("coverPhoto")
                            setNewCoverPhoto(null)
                        }
                        //update information in the token 
                        localStorage.setItem("token", result.token)
                        setNewUser(result.user)
                        VisitUser(username, id);
                    }
                    else {
                        console.log("Upload failed: ", result.error)
                        RenderErrorArray(result.error, dispatchFunctions);
                    }
                })
        } catch (e) {
            console.log("Error uploading file:", e);
            const error = {error: [{ param: "file upload error", msg: `Upload error: ${e}` }] }
            RenderErrorArray(error, dispatchFunctions);
        }
    }

    const EditUserProfileAsAdmin = async (apiURL, UserDetails, Elements, dispatchFunctions) => {
        const {
            imageData,
            username,
            email,
            biography,
            coverPhoto,
            keepProfilePic,
            keepCoverPhoto, 
        } = Elements;
        const {
            id,
        } = UserDetails;

        const FetchURL = `${apiURL}/users/${id}/edit_user_profile_as_admin`;
        const formData = new FormData;
        formData.append("username", username);
        formData.append("email", email);
        formData.append("biography", biography);
        formData.append("profile_pic", imageData);
        formData.append("coverPhoto", coverPhoto);
        formData.append("keepProfilePic", keepProfilePic)
        formData.append("keepCoverPhoto", keepCoverPhoto)
        try {
            await fetch(FetchURL,
                {
                    method: "PUT",
                    body: formData,
                }
            )
                .then(async response => {
                    const result = await response.json();

                    if (response.ok) {
                        console.log(result.message);
                        VisitUser(username, id);
                    }
                    else {
                        console.log("Upload failed: ", result.error)
                        RenderErrorArray(result.error, dispatchFunctions);
                    }
                })
        } catch (e) {
            console.log("Error uploading file:", e);
            const error = { error: [{ param: "file upload error", msg: `Upload error: ${e}` }] }
            RenderErrorArray(error, dispatchFunctions);
        }
    }

    const UploadNewProfilePic = async (apiURL, ImageInputElem, dispatchFunctions, userDetail) => {
        const formData = new FormData; 
        formData.append("profile_pic", ImageInputElem.files[0])
        const { token } = userDetail; 
        try {
            await fetch(apiURL,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
                .then(async response => {
                    const result = await response.json();

                    if (response.ok) {
                        console.log("Uploaded image successfully: ", result.message)
                        GoHome();
                    }
                    else {
                        console.log("Upload failed: ", result.error)
                        RenderErrorArray(result.error, dispatchFunctions);
                    }
                })
        } catch (e) {
            console.log("Error uploading file:", error);
            RenderErrorArray([{ para: "file upload error", msg: `Upload error: ${error}` }], dispatchFunctions);
        }
    }

    const ChangePassword = async (apiURL, UserDetails, Elements, dispatchFunctions) => {
        const {
            id,
            username,
            token
        } = UserDetails; 
        const FetchURL = `${apiURL}/users/${id}/editpassword`;
        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = Elements;
        const formData = new FormData;
        formData.append("current_password", currentPassword);
        formData.append("new_password", newPassword);
        formData.append("confirm_password", confirmPassword);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        try {
            const response = await fetch(FetchURL, {
                method: "PUT",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (response.ok) {
                VisitUser(username, id);
            }
            else {
                console.log("response: ", response)
                console.log("result", result)
                console.log("error: ", result.error)
                RenderErrorArray(result.error, dispatchFunctions)
            }
        } catch (e) {
            console.log("error: ", e)
        }
    }

    return {
        UploadNewProfilePic,
        UpdateUserProfile,
        ChangePassword,
        EditUserProfileAsAdmin 
    }
}

export {UserProfileHooks, EditUserHooks}