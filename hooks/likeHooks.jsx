/** These are hooks that build the like features of the social media site*/

const checkIfLiked = (likeList, userID) => {
    if (likeList) {
        var isLiked = false
        likeList.forEach(like => {
            if (like.toString() == userID.toString()) {
                isLiked = true;
            }
        })
        return isLiked;
    }
    return false; 
} 

const updateLikesInServer = async (apiURL, type, documentID, userID, token, action) => {
    var actionType = ''
    switch (action) {
        case "add":
            actionType = "add_like";
            break; 
        case "remove":
            actionType = "remove_like"
            break; 
        default:
            console.log("Invalid input in action"); 
            break; 
    }
    var FetchURL = `${apiURL}/${type}/${documentID}/${actionType}`; 
    var formData = new FormData; 
    formData.append("userID", userID);

    await fetch(FetchURL, {
        method: "PUT",
        body: formData, 
        headers: {
            "Authorization": `Bearer ${token}`, 
        },
    })
        .then(() => {
        console.log("Like has been updated. ")
        })
        .catch(e => {
            console.log("There is a problem with updating likes: ", e)
        })
}
    

export {
    checkIfLiked,
    updateLikesInServer,
}