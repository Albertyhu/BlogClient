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

const updateLikesInServer = async (apiURL, newLikeList, postID, token) => {
    const FetchURL = `${apiURL}/post/${postID}/update_likes`;
    const formData = new FormData; 
    const stringifiedLikes = JSON.stringify(newLikeList)
    formData.append("updatedLikes", stringifiedLikes)
    await fetch(FetchURL, {
        method: "PUT",
        body: formData, 
        headers: {
            "Authorization" : `Bearer ${token}`,
        },
    })
        .then(async response => {
            if (!response.ok) {
                const result = await response.json(); 
                console.log("There was an error with the like features: ", result.error)   
            }
        })
}

export { checkIfLiked, updateLikesInServer }