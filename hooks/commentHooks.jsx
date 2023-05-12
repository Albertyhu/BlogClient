import {
    Base64Hooks,
    convertImageToFile,
} from './imageHooks.jsx'; 

const {
    convertObjToBase64, 
    isBase64Image, 
    convertArrayToBase64,
} = Base64Hooks(); 

//This function can be used for either adding a comment to a post or adding a reply to a comment/reply 
//For the process of adding a comment as a reply to the post, postID will be passed through req.params.id 
export const FetchActions = (apiURL, setLoading, token) => {
    const AddComment = async (type, documentID, action, Elements, dispatchFunctions) => {
        const FetchURL = `${apiURL}/${type}/${documentID}/${action}`;
        const {
            content,
            author,
        } = Elements;
        const {
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
            for (let i = 0; i < Elements.commentImages.length; i++) {
                formData.append("images", Elements.commentImages[i].file);
            }
        }
        if (Elements.postId) {
            formData.append("postId", Elements.postId)
        }

        if (Elements.userPhotoId) {
            formData.append("userPhotoId", Elements.userPhotoId)
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
                        userPhoto: result.comment.userPhoto,
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

    const DeleteOneCommentCompletely = async (commentID, dispatchFunction) => {
        const {
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

    const DeleteOneReplyCompletely = async (commentID) => {
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

    const EditComment = async (Elements, documentId, dispatchFunctions) => {
        var FetchURL = `${apiURL}/comment/${documentId}/edit`; 
        const {
            index, 
            content,
            authorId, 
            userId, 
            commentsArray,
        } = Elements; 
        const {
            setComments,
            setMessage,
            setEditMode
        } = dispatchFunctions; 
        var formData = new FormData; 
        formData.append("content", content); 
        formData.append("authorId", authorId);
        formData.append("userId", userId); 
        if (Elements.images) {
            for (let i = 0; i < Elements.images.length; i++) {
                if (!Elements.images[i].file) {
                    var formattedImages = convertImageToFile(Elements.images[i])
                    formData.append("images", formattedImages)
                }
                else {
                    formData.append("images", Elements.images[i].file);
                }
            }
        }
        setLoading(true)
        try {
            await fetch(FetchURL, {
                method: "PUT",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(async response => {
                    const result = await response.json();
                    if (response.ok) {
                        var newComment = result.comment;
                        newComment.author.profile_pic = convertObjToBase64(result.comment.author.profile_pic)
                        if (result.comment.replies && result.comment.replies.length > 0) {
                            newComment.replies = formatAllImagesInReplies(result.comment.replies); 
                        }
                        newComment.images = convertArrayToBase64(result.comment.images)
                        var arr = commentsArray
                        arr.splice(index, 1, newComment);
                        setComments(arr); 
                        setEditMode(false)

                    }
                    else {
                        console.log("EditComment error 1: ", result.error)
                        setMessage(result.error)
                    }
                })
                .catch(e => {
                    console.log("EditComment error 2: ", e)
                })
        } catch (e) {
            console.log("EditComment error 3: ", e)
        }
        setEditMode(false)
        setLoading(false); 
    }

    return {
        AddComment,
        DeleteOneCommentCompletely,
        DeleteOneReplyCompletely, 
        EditComment, 
    } 
}

export const FormatAllImagesInComments = (commentArray) => {
    try {
        if (commentArray && commentArray.length > 0) {
            return commentArray.map(comment => {
                //Format array of images attached to the current comment
                if (comment.images && comment.images.length > 0) {
                    comment.images = formatImageArray(comment.images)
                }
                //format the profile picture of the author's of the comments
                if (comment.author.profile_pic) {
                    comment.author.profile_pic = convertObjToBase64(comment.author.profile_pic)
                }
                //This does the same for all replies to the current commment
                formatProfilePicsInReplies(comment.replies)
                return comment; 
            })
        }
        return commentArray; 
    } catch (e) {
    console.log("FormatAllProfilePicsInComments error: ", e)
    }
}

const formatProfilePicsInReplies = (replyArray) => {
    try {
        if (replyArray && replyArray.length > 0) {
            return replyArray.map(reply => {
                //format the profile pic of the author of the reply 
                if (reply.author.profile_pic) {
                    reply.author.profile_pic = convertObjToBase64(reply.author.profile_pic);
                }
                //format the array of images attached to the reply 
                if (reply.images) {
                    reply.images = formatImageArray(reply.images)
                }
                return reply;
            })
        }
        return replyArray
    } catch (e) {
        console.log("formatProfilePicsInReplies  error: ", e)

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

const formatAllImagesInReplies = (replies) => {
    try {
        return replies.map(reply => {
            reply.author.profile_pic = convertObjToBase64(reply.author.profile_pic); 
            reply.images = formatImageArray(reply.images)
            return reply
        })
    } catch (e) {
        console.log("formatAllImagesInReplieserror: ", e)
    }
}

export const ScrollToElement = elementId => {
    document.querySelector(`#CommentPanel-${elementId}`).scrollIntoView({ behavior: 'smooth' })
}