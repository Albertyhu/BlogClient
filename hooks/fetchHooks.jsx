import { Base64Hooks } from './imageHooks.jsx';
import { alertMessage } from './textHooks.jsx';

const FetchHooks = (apiURL, token, setLoading, setMessage) => {
    const { toBase64 } = Base64Hooks()

    const GetAllUsers = async (setUsers) => {
        const FetchURL = `${apiURL}/users`; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET',
        })
            .then(async response => {
                const result = await response.JSON();
                if (response.ok) {
                    setUsers(result.users)
                    setLoading(false)

                }
                else {
                    console.log("GetAllUsers error: ", result.error)
                    setLoading(false)
                    alertMessage("Something went wrong with fetching users from the database", setMessage)
                }
            })
            .catch(error => {
                console.log("GetAllUsers error: ", error)
                setLoading(false)
                alertMessage("Something went wrong with fetching users from the database", setMessage)
            })
    }

    const fetchUserDetails = async (userID, dispatch, dispatchError) => {
        try {
            const FetchURL = `${apiURL}/users/${userID}`
            var response = await fetch(FetchURL, { method: "GET" })
            if (response.ok) {
                var data = await response.json();
                data.profile_pic.data = toBase64(data.profile_pic.data.data)
                dispatch(data);
            }
            else {
                const result = await response.json(); 
                console.log(result.error)
                if (dispatchError) {
                    dispatchError(result.error)
              }
            }

        } catch (err) {
            console.log("Error: ", err)
        }
    }

    const fetchUsernameAndEmails = async (dispatch) => {
            try {
                var response = await fetch('http://localhost:80/users/usernameandemail')
                var data = await response.json();
                dispatch(data); 

            } catch (err) {
                console.log("Error: ", err)
            }
    }

    const FetchProfilePic = async (FetchURL, dispatch, updateLocal) => {
        await fetch(FetchURL,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then(async response => {
                if (response.ok) {
                    await response.json()
                        .then(result => {
                            if (result) {
                                const stringEncoded = toBase64(result.profile_pic.data.data);
                                if (updateLocal) {
                                    localStorage.setItem("ProfilePicture", JSON.stringify({
                                        contentType: result.profile_pic.contentType,
                                        data: stringEncoded,
                                    }))
                                }
                                dispatch({
                                    contentType: result.profile_pic.contentType,
                                    data: stringEncoded,
                                })
                            }
                        })
                }
                else {
                    const result = await response.json();
                    console.log("Error in fetching image: ", result.error)
                }
            })
    }

    const FetchPostsByCategory = async (CategoryID, setPosts) => {
        var FetchURL = `${apiURL}/post/get_posts_by_category/${CategoryID}`; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET',
        })
        .then(async response => {

            const result = await response.json()
            if (response.ok) {
                result.post.forEach(item => {
                    if(item.mainImage)
                        item.mainImage.data = toBase64(item.mainImage.data.data); 
                })
                setPosts(result.post);
            }
            else {
                console.log("There was an error with FetchPostsByCateogy: ", result.error)
            }
        })
        setLoading(false)
    }

    //This function runs when the app starts 
    const GetUsersAndCategeries = async (dispatchFunctions) => {
        const FetchURL = `${apiURL}/users_and_categories`; 
        const {
            setCategoryList, 
            setUsersList, 
        } = dispatchFunctions; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    console.log("users: ", result.Users)
                    console.log("categories: ", result.categories)
                    const list = result.categories;
                    list.forEach(item => {
                        item.image.data = toBase64(item.image.data.data)
                    })
                    setCategoryList(list)
                    setUsersList(result.Users)
                    setLoading(false)
                }
                else {
                    console.log("There was an error with GetUsersAndCategeries: ", result.error)
                    alertMessage("There was a problem with the database", setMessage)
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log("GetUsersAndCategeries  error: ", error)
                setLoading(false)
                alertMessage("Something went wrong with fetching users from the database", setMessage)
            })
    }

    return {
        GetAllUsers, 
        fetchUserDetails,
        fetchUsernameAndEmails,
        FetchProfilePic,
        FetchPostsByCategory,
        GetUsersAndCategeries, 
    }
}

export {FetchHooks}; 