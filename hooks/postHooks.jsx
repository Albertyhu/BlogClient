import { ErrorMessageHooks } from './errorHooks.jsx'; 
import { PostNavigationHooks } from './navigation.jsx'; 
const { RenderErrorArray } = ErrorMessageHooks()

const FetchHooks = () => {
    const FetchPostsByCateogry = async (apiURL, categoryID, dispatch) => {
        const FetchURL = `${apiURL}/post/get_posts_by_category/${categoryID}`;
        const formData = new FormData; 
        await fetch(FetchURL, {
            method: "GET",
        })
            .then(async response => {
                const result = await response.json(); 
                if (response.ok) {
                    dispatch(result.post)
                }
                else {
                    console.log(result.error)
                }
            })
    }

    const FetchPostById = async (apiURL, postID, dispatchFunctions) => {
        const FetchURL = `${apiURL}/post/${postID}`;
        const {
            setTitle,
            setContent,
            setDatePublished,
            setThumbnail,
            setAbstract,
            setAuthor,
            setImages,
            setCategory,
            setTag,
            setComments,
            setLikes,
            setPublished,
        } = dispatchFunctions; 
        await fetch(FetchURL, {
            method: 'GET',
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    setTitle(result.payload.title);
                    setContent(result.payload.content);
                    setPublished(result.payload.published);
                    setDatePublished(result.payload.datePublished);
                    setAuthor(result.payload.author);
                    setThumbnail(result.payload.thumbnail);
                    setImages(result.payload.images);
                    setAbstract(result.payload.abstract);
                    setCategory(result.payload.category);
                    setTag(result.payload.tag);
                    setComments(result.payload.comments);
                    setLikes(result.payload.likes);
                }
                else {
                    console.log("There was a problem retrieving this post.")
                }
            })
            .catch(e => {
                console.log("There was an error trying to retrieve a post: ", e)
            })
    }

    return { FetchPostsByCateogry, FetchPostById } 
}

const CreateAndUpdatePosts = (navigate) => {
    const {
        BringDataToPost, 
    } = PostNavigationHooks(navigate)

    //SubmitPost can be used for POST or PUT actions 
    const SubmitPost = (apiURL, Elements, dispatchFunction, METHOD, postID, token) => {
        var FetchURL = '';
        switch (METHOD) {
            case "POST":
                FetchURL = `${apiURL}/posts/create`;
                break;
            case 'PUT':
                FetchURL = `${apiURL} /posts/${postID}/edit`
        }

        const {
            title,
            content,
            author,
            published,
            thumbnail,
            images,
            abstract,
            category,
            tag,
            abstract_char_limit
        } = Elements; 
        const formData = new FormData; 
        formData.append("title", title);
        formData.append("content", content);
        formData.append("published", published);
        formData.append("author", author); 
        formData.append("thumbnail", thumbnail);
        formData.append("images", images); 
        formData.append("abstract", abstract);
        formData.append("category", category); 
        formData.append("tag", tag); 
        formData.append("abstract_char_limit", abstract_char_limit)
        console.log(Elements)
    //    fetch(FetchURL, {
    //        method: METHOD, 
    //        'Authorization': `Bearer ${token}`
    //    }).then(response => {
    //        const result = response.json;
    //        if (response.ok) {
    //            if (result.post.published) {
    //                //Go to the post
    //            }
    //            else {
    //                //stay on the post form
    //                //or go to the editing screen 
    //            }
    //        }
    //        else {
    //            console.log("Error in submitting post: ", result.error); 
    //            console.log("Method: ", METHOD); 
    //            RenderErrorArray(result.error, dispatchFunction)
    //        }
    //    })
    }

    return {
        SubmitPost,
    }
}


export { FetchHooks, CreateAndUpdatePosts }

