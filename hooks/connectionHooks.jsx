import { alertMessage } from './textHooks.jsx'; 

const ConnectionHooks = (apiURL, token, setLoading, setMessage) => {
    const SendConnectionRequest = async (message, receiverId, senderId, dispatchFunction ) => {
        const FetchURL = `${apiURL}/users/${receiverId}/send_connection_request`;
        const formData = new FormData();
        formData("senderId", senderId); 
        formData("message", message); 
        await fetch(FetchURL, {
            method: "PUT",
            body: formData, 
        })
            .then(async response => {
                if (response.ok) {
                    alertMessage("Your connection request has been sent.", setMessage)
                }
                else {
                    const result = await response.json(); 
                    console.log(`SendConnectionRequest Error ${result.error}`)
                    alertMessage(`Error: ${result.error}`, setMessage)
                }
            })
            .catch(error => {
                console.log(`SendConnectionRequest Error ${error}`)
                alertMessage(`Error: ${error}`, setMessage)
            })
    }
    const RemoveConnection = async () => { }
    const GetAllConnections = async () => { }
    const RespondToRequest = async () => { }

    return {
        SendConnectionRequest,
    }
}