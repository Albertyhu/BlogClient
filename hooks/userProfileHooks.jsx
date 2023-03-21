import { NavigationHooks } from './navigation.jsx'; 

const UserProfileHooks = () => {
    const { GoHome } = NavigationHooks();
    const DeleteUser = async (apiURL, userID, dispatchFunctions) => {
        const DeleteURL = `${apiURL}/users/${userID}/delete`; 
        const { ClearToken, navigate } = dispatchFunctions; 
        console.log("DeleteURL: ", DeleteURL)
        const options = {
            method: "DELETE",
        } 
        await fetch(DeleteURL, options)
            .then(async res => {
                const data = await res.json(); 
                if (!res.ok) {
                    const error = (data && data.message || response.status)
                    console.log("Internal service error: ", error)
                }
                localStorage.removeItem("user")
                localStorage.removeItem("token")
                ClearToken();
                GoHome(navigate)
            })
            .catch(err => {
                console.error(err)
            })
    }
    return {DeleteUser}
}

export {UserProfileHooks}