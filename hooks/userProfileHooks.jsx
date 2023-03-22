import { NavigationHooks } from './navigation.jsx'; 

const UserProfileHooks = () => {
    const { GoHome } = NavigationHooks();
    const DeleteUser = async (apiURL, userID, dispatchFunctions) => {
        const DeleteURL = `${apiURL}/users/${userID}/delete`; 
        const { ClearUserData, navigate } = dispatchFunctions; 
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

export {UserProfileHooks}