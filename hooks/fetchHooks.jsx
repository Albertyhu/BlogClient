const FetchHooks = () => {
    const fetchUserDetails = async (apiURL, userID, dispatch, dispatchError) => {
        try {
            const FetchURL = `${apiURL}/users/${userID}`
            var response = await fetch(FetchURL, { method: "GET" })
            if (response.ok) {
                var data = await response.json();
                //this is wrong
                //if (data.profile_pic) {
                //    // decode the base64 encoded profile_pic data
                //    const decodedImage = atob(data.profile_pic.data);
                //    // create a Blob object from the decoded profile_pic data
                //    const blob = new Blob([decodedImage], { type: data.profile_pic.contentType });
                //    // create an object URL for the blob
                //    const imageUrl = URL.createObjectURL(blob);
                //    // add the profile_pic URL to the user data object
                //    data.imageUrl = imageUrl;
                //}
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

    const FetchProfilePic = async (apiURL, userID, dispatch) => {
        await fetch(apiURL,
            {
                method: "GET",
            }
        )
            .then(async response => {
                if (response.ok) {
                    await response.json()
                        .then(result => {
                            localStorage.setItem("ProfilePicture", JSON.stringify(result.profile_pic))
                            dispatch(result.profile_pic)
                        })
                }
                else {
                    const result = await response.json();
                    console.log("Error in fetching image: ", result.error)
                }
            })
    }

    return { fetchUserDetails, fetchUsernameAndEmails, FetchProfilePic }
}

export {FetchHooks}; 