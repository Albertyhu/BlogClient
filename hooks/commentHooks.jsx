import { Base64Hooks } from './imageHooks.jsx'; 

const {
    convertObjToBase64, 
    isBase64Image, 
    convertArrayToBase64,
} = Base64Hooks(); 

//This function can be used for either adding a comment to a post or adding a reply to a comment/reply 
//For the process of adding a comment as a reply to the post, postID will be passed through req.params.id 
export const FetchActions = apiURL => {
    const AddComment = async (type, documentID, action, Elements, dispatchFunctions, token) => {
        const FetchURL = `${apiURL}/${type}/${documentID}/${action}`;
        const {
            content,
            author,
        } = Elements;
        const {
            setLoading,
            CloseCommentInput,
            setMessage,
            reset,
            updateArray, 
        } = dispatchFunctions;


        const formData = new FormData;
        formData.append("content", content)

        //If the fetch request is adding a reply to a reply, storing the ObjectID of the root of the comment tree is important
        if (Elements.root) {
            formData.append("root", Elements.root)
        }

        //ObjectId of current user
        formData.append("author", author)
        if (Elements.CommentRepliedTo) {
            formData.append("commentRepliedTo", Elements.CommentRepliedTo)
        }
        if (Elements.UserRepliedTo) {
            formData.append("userRepliedTo", Elements.UserRepliedTo)
        }
        if (Elements.commentImages) {
            console.log("Elements.images: ", Elements.commentImages)
            for (let i = 0; i < Elements.commentImages.length; i++) {
                formData.append("images", Elements.commentImages[i].file);
            }
        }

        if (Elements.postId) {
            formData.append("postId", Elements.postId)
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
                const result = await response.json();
                if (response.ok) {
                    setMessage([{ param: "Message Submitted", msg: "Your message has been posted." }]);
                    if (result.author.profile_pic) {
                        result.author.profile_pic = convertObjToBase64(result.author.profile_pic)
                    }

                    var newComment = {
                        author: result.author,
                        content: result.comment.content,
                        datePublished: result.comment.datePublished,
                        images: convertArrayToBase64(result.comment.images),
                        lastEdited: result.comment.lastEdited,
                        likes: [],
                        replies: [],
                        post: result.comment.post,
                        _id: result.comment._id,
                    }
                    if (result.comment.commentRepliedTo) {
                        newComment.commentRepliedTo = result.comment.commentRepliedTo;
                    }
                    if (result.comment.userRepliedTo) {
                        newComment.userRepliedTo = result.comment.userRepliedTo;
                    }
                    if (result.comment.rootComment) {
                        newComment.rootComment = result.comment.rootComment;
                    }

                    console.log("newComment: ", newComment)
                    updateArray(prev => [newComment, ...prev])
                }
                else {
                    console.log("AddComment error: ", result.error)
                    setMessage([{ param: "error", msg: `There was an error with adding comments: ${result.error}`}])
                }
                reset()
                CloseCommentInput()
                setLoading(false)
            })
        } catch (e) {
            console.log("AddComment error: ", e)
            CloseCommentInput();
            setLoading(false)
        }
    }

    const DeleteOneCommentCompletely = async (commentID, token, dispatchFunction) => {
        const {
            setLoading,
            RemoveCommentFromStorage,
            setMessage
        } = dispatchFunction; 
        try {
            var FetchURL = `${apiURL}/comment/${commentID}/delete_completely`;

            setLoading(true)
            await fetch(FetchURL, {
                method: "DELETE",
                headers: {
                    "Authorization": `bearer ${token}`
                }
            })
                .then(async response => {
                    const result = await response.json();
                    if (response.ok) {
                        RemoveCommentFromStorage(); 
                        console.log("Comment is successfully deleted.")
                        setMessage(result.message)
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                    }
                    else {
                        console.log("DeleteOneCommentCompletely error: ", result.error)
                        setMessage(result.error)
                    }
                    setLoading(false)
                })
        }
        catch (e) {
            setLoading(false)
            console.log("DeleteOneCommentCompletely error: ", e); 
        }
    }

    const DeleteOneReplyCompletely = async (commentID, token) => {
        try {
            var FetchURL = `${apiURL}/comment/${commentID}/delete_reply_completely`;
            await fetch(FetchURL, {
                method: "DELETE",
                headers: {
                    "Authorization": `bearer ${token}`
                }
            })
                .then(async response => {
                    if (response.ok) {
                        console.log("Comment is successfully deleted.")
                    }
                    else {
                        const result = await response.json();
                        console.log("DeleteOneCommentCompletely error: ", result.error)
                    }

                })
        }
        catch (e) {
            console.log("DeleteOneCommentCompletely error: ", e)

        }
    }
    return {
        AddComment,
        DeleteOneCommentCompletely,
        DeleteOneReplyCompletely, 
    } 
}

export const FormatAllImagesInComments = (commentArray) => {
    try {
        if (commentArray && commentArray.length > 0) {
            return commentArray.map(comment => {
                if (comment.images && comment.images.length > 0) {
                    comment.images = formatImageArray(comment.images)
                }
                //format the profile picture of the author's of the comments
                if (comment.author.profile_pic) {
                    comment.author.profile_pic = convertObjToBase64(comment.author.profile_pic)
                }
                formatProfilePicsInReplies(comment.replies)
                return comment; 
            })
        }
        return commentArray; 
    } catch (e) {
    console.log("FormatAllProfilePicsInComments error: ", e)
    }
}

const formatImageArray = (imagesArray) => {
    try {
        return imagesArray.map(image => {
            image = convertObjToBase64(image);
            return image;
        })
    } catch (e) {
        console.log("formatImageArray error: ", e)
    }

}

const formatProfilePicsInReplies = (replyArray) => {
    try {
        if (replyArray && replyArray.length > 0) {
            return replyArray.map(reply => {
                if (reply.author.profile_pic) {
                    reply.author.profile_pic = convertObjToBase64(reply.author.profile_pic);
                }
                return reply;
            })
        }
        return replyArray
    } catch (e) {
        console.log("formatProfilePicsInReplies  error: ", e)

    }
}

