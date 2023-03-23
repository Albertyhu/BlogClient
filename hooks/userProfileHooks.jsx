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
    const { GoHome } = NavigationHooks(navigate); 
    const { RenderErrorArray } = ErrorMessageHooks()
    const EditProfilePicFromSubmitEvent = () => {
    
    }

    const UploadNewProfilePic = async (apiURL, ImageInputElem, setPictureError) => {
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
                        RenderErrorArray(result.error, setPictureError);
                    }
                })
        } catch (e) {
            console.log("Error uploading file:", error);
            RenderErrorArray([{ para: "file upload error", msg: `Upload error: ${error}` }], setPictureError);
        }
    }
    return { UploadNewProfilePic }
}

export {UserProfileHooks, EditUserHooks}