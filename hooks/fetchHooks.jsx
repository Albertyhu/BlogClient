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
    return { fetchUsernameAndEmails }
}

export {FetchHooks}; 