const FetchHooks = () => {
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
                method: "GET"
            }
        )
            .then(async response => {
                if (response.ok) {
                    await response.json()
                        .then(result => {
                            localStorage.setItem("ProfilePicture", JSON.stringify(result.profile_pic))
                        })
                }
                else {
                    const result = await response.json();
                    console.log("FetchProfilePic result: ", result.message)
                }
            })
    }

    return { fetchUsernameAndEmails, FetchProfilePic }
}

export {FetchHooks}; 