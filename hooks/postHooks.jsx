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
    const CreatePost = (apiURL, Elements, dispatchFunction) => {
        FetchURL = `${apiURL}/posts/create`
    }

    return {CreatePost}
}

export { FetchHooks }

