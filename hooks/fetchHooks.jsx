const FetchHooks = () => {

    function toBase64(arr) {
        return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }

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
                                console.log("FetchProfilePic result: ", result)
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

    return { fetchUserDetails, fetchUsernameAndEmails, FetchProfilePic }
}

export {FetchHooks}; 