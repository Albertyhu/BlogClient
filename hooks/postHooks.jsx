import { PostErrorHooks } from './errorHooks.jsx'; 
import {
    PostNavigationHooks,
    NavigationHooks, 
} from './navigation.jsx'; 
import { countInitialCharacters } from './tinyMCEhooks.jsx'; 

const { RenderErrorArray } = PostErrorHooks()

const FetchHooks = () => {
    const FetchPostsByCateogry = async (apiURL, categoryID, dispatch) => {
        const FetchURL = `${apiURL}/post/get_posts_by_category/${categoryID}`;
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
        try {
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
        } catch (e) {
            console.log("FetchPostById error: ", e)
        }
    }

    return { FetchPostsByCateogry, FetchPostById } 
}

const CreateAndUpdatePosts = (navigate) => {
    const {
        BringDataToPost, 
    } = PostNavigationHooks(navigate)
    const {
        GoBack, 
        GoCategory, 
        VisitOneCategory
    } = NavigationHooks(navigate);

    //SubmitPost can be used for POST or PUT actions 
    const SubmitPost = async (apiURL, Elements, dispatchFunction, METHOD, postID, token) => {
        var FetchURL = '';
        switch (METHOD) {
            case "POST":
                FetchURL = `${apiURL}/post/create`;
                break;
            case 'PUT':
                FetchURL = `${apiURL}/post/${postID}/edit`;
                break; 
            default:
                FetchURL = `${apiURL}/post/create`;
                break;
        }
        const { setMessage } = dispatchFunction; 
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
            abstract_char_limit,
            priorTagList,
        } = Elements; 
        const formData = new FormData; 
        formData.append("title", title);
        formData.append("content", content);
        formData.append("published", published);
        formData.append("author", author); 
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        if (images) {
            formData.append("images", JSON.stringify(images));
        }
        formData.append("abstract", abstract);
        formData.append("category", category); 
        formData.append("tag", JSON.stringify(tag)); 

        if (abstract_char_limit && abstract) {
            console.log("executed")
            let count = countInitialCharacters(abstract)
            if (count > abstract_char_limit) {
                formData.append("abstract_char_limit", abstract_char_limit)
                formData.append("abstractExceedLimit", true)
            }
        }

        if (Elements.priorTagList) {
            formData.append("priorTagList", JSON.stringify(priorTagList))
        }
        const boundary = formData._boundary;
        console.log(Elements)
        await fetch(FetchURL, {
            method: METHOD, 
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
             //   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`, 
            }
        }).then(async response => {
            if (response.ok) {
                if (published) {
                    const result = await response.json()
                    console.log(result.message)
                    console.log("result: ", result.post)
                    const data = {
                        title: result.post.title,
                        content: result.post.content,
                        author: result.post.author,
                        published: result.post.published,
                        thumbnail: result.post.thumbnail,
                        images: result.post.images,
                        abstract: result.post.abstract,
                        category: result.post.category,
                        tag: result.post.tag,
                        id: result.post._id, 
                    }
                    console.log("data: ", data)
                    BringDataToPost(data); 
                }
                else {
                    //stay on the post form
                    //or go to the editing screen
                    window.scrollTo(0, 0); 
                    setMessage("Your draft has been saved."); 
                }
            }
            else {
                const result = await response.json();
                console.log("Error in submitting post: ", result.error); 
                RenderErrorArray(result.error, dispatchFunction)
            }
        })
    }

    const DeletePost = async (apiURL, postID, token, userID, authorID, setMessage, navigateTo) => {
        //Only authors can delete their own posts 
        if (userID.toString() === authorID.toString()) {
            const FetchURL = `${apiURL}/post/${postID}/delete`
            await fetch(FetchURL, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then(async response => {
                if (response.ok) {
                    console.log("Post is successfully deleted")
                    //Because the function can be used for the post main page or an index of posts, app has the option to either
                    //stay on the same page or navigate away from the page once the post is deleted.
                    if (navigateTo != null) {
                        navigateTo();
                    }
                }
                else {
                    const result = await response.json(); 
                    console.log("error: ", result.error)
                    //setMessage(result.error)
                }
            })
        }
        else {
            setMessage("You are not the author of this post.") 
        }
    }

    return {
        SubmitPost,
        DeletePost, 
    }
}


export { FetchHooks, CreateAndUpdatePosts }

