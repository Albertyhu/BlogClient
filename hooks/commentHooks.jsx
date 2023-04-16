
//This function can be used for either adding a comment to a post or adding a reply to a comment/reply 
export const AddComment = async (apiURL, type, documentID, action, Elements, dispatchFunctions, token) => {
    const FetchURL = `apiURL/${type}/${documentID}/${action}`; 
    const {
        content, 
        root, 
        author,
    } = Elements; 
    const {
        setLoading, 
        CloseCommentInput, 
    } = dispatchFunctions; 
    const formData = new FormData; 
    formData.append("content", content)
    formData.append("root", root)
    formData.apppend("author", author)
    if (Elements.CommentRepliedTo) {
        formData.append("commentRepliedTo", CommentRepliedTo)
    } 
    if (Elements.UserRepliedTo) {
        formData.append("userRepliedTo", UserRepliedTo)
    }
    try {
        setLoading(true)
        await fetch(FetchURL, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        }).then(async response => {
            const result = await response(); 
            if (response.ok) {

            }
            else {
                console.log("AddComment error: ", result.error)
            }
            CloseCommentInput()
            setLoading(false)
        })
    } catch (e) {
        console.log("AddComment error: ", e)
        CloseCommentInput(); 
        setLoading(false)
    }
}