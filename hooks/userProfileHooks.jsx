import { NavigationHooks } from './navigation.jsx'; 
import { ErrorMessageHooks  } from './errorHooks.jsx';

const UserProfileHooks = () => {
    const DeleteUser = async (apiURL, userID, dispatchFunctions) => {
        const DeleteURL = `${apiURL}/users/${userID}/delete`; 
        const { ClearUserData, navigate } = dispatchFunctions; 
        console.log("DeleteURL: ", DeleteURL)
        const options = {
            method: "DELETE",
        } 
        const { GoHome } = NavigationHooks(navigate);
        await fetch(DeleteURL, options)
            .then(async res => {
                const data = await res.json(); 
                if (!res.ok) {
                    const error = (data && data.message || response.status)
                    console.log("Internal service error: ", error)
                }
                localStorage.clear();
                ClearUserData();
                GoHome(navigate)
            })
            .catch(err => {
                console.error(err)
            })
    }
    return {DeleteUser}
}

const EditUserHooks = (navigate) => {
    const { GoHome, VisitUser } = NavigationHooks(navigate);
    const { RenderErrorArray } = ErrorMessageHooks()

    const UpdateUserProfile = async (apiURL, userID, Elements, dispatchFunctions) => {
        const {
            imageData,
            username,
            email,
            biography,
        } = Elements; 
        const { setNewUser } = dispatchFunctions; 
        const FetchURL = `${apiURL}/users/${userID}/update_user_profile`; 
        const formData = new FormData;
        formData.append("username", username);
        formData.append("email", email);
        formData.append("biography", biography);
        formData.append("profile_pic", imageData);
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
                        setNewUser(result.user)
                        VisitUser(username, userID);
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

    const UploadNewProfilePic = async (apiURL, ImageInputElem, dispatchFunctions) => {
        const formData = new FormData; 
        formData.append("profile_pic", ImageInputElem.files[0])
        try {
            await fetch(apiURL,
                {
                    method: "PUT",
                    body: formData,
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
            username
        } = UserDetails; 
        const FetchURL = `${apiURL}/users/${id}/editpassword`;
        console.log("FetchURL: ", FetchURL)
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

    return { UploadNewProfilePic, UpdateUserProfile, ChangePassword }
}

export {UserProfileHooks, EditUserHooks}