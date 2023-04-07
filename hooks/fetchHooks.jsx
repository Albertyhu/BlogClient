import { toBase64 } from '../util/processImage.jsx';

const FetchHooks = () => {
    const fetchUserDetails = async (apiURL, userID, dispatch, dispatchError) => {
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

    const FetchProfilePic = async (apiURL, dispatch, updateLocal) => {
        await fetch(apiURL,
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

    const FetchPostsByCategory = async (apiURL, CategoryID, setPosts) => {
        var FetchURL = `${apiURL}/post/get_posts_by_category/${CategoryID}`; 
        await fetch(FetchURL, {
            method: 'GET',
        })
        .then(async response => {
            const result = await response.json()
            if (response.ok) {
                console.log("Posts are successfully retrieved: ", result.post)
                setPosts(result.post);
            }
            else {
                console.log("There was an error with FetchPostsByCateogy: ", result.error)
            }
        })
    }

    return {
        fetchUserDetails,
        fetchUsernameAndEmails,
        FetchProfilePic,
        FetchPostsByCategory,
    }
}

export {FetchHooks}; 