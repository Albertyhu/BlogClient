import { PostErrorHooks } from './errorHooks.jsx'; 
import {
    PostNavigationHooks,
    NavigationHooks, 
} from './navigation.jsx'; 
import { countInitialCharacters } from './tinyMCEhooks.jsx'; 
import {
    Base64Hooks,
} from './imageHooks.jsx'; 
import {
    FormatAllImagesInComments, 
} from './commentHooks.jsx'; 
import axios from 'axios'; 
import { alertMessage } from './textHooks.jsx'; 

const { RenderErrorArray } = PostErrorHooks()
const { toBase64,
    convertArrayToBase64,
    convertObjToBase64
} = Base64Hooks()

const FetchHooks = (apiURL, setLoading, setMessage) => {
    const FetchPostsByCategory = async (apiURL, categoryID, dispatch) => {
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

    const FetchPostById = async (postID, dispatchFunctions) => {
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
            setLoading(true)
            await fetch(FetchURL, {
                method: 'GET',
            })
                .then(async response => {
                    const result = await response.json();
                    if (response.ok) {
                        let thumbnail = null;
                        if (result.payload.mainImage) {
                            thumbnail = {};
                            thumbnail.data = toBase64(result.payload.mainImage.data.data);
                            thumbnail.contentType = result.payload.mainImage.contentType;
                        }
                        if (result.payload.images) {
                            result.payload.images = convertArrayToBase64(result.payload.images) 
                        }

                        if (result.payload.comments && result.payload.comments.length > 0) {
                            result.payload.comments = FormatAllImagesInComments(result.payload.comments); 
                        }

                        setTitle(result.payload.title);
                        setContent(result.payload.content);
                        setPublished(result.payload.published);
                        setDatePublished(result.payload.datePublished);
                        setAuthor(result.payload.author);
                        setThumbnail(thumbnail);
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
                setLoading(false)
        } catch (e) {
            console.log("FetchPostById error: ", e)
        }
    }

    const FetchNewestPost = async (pagination, count, setItemList, setHasMore) => {
        const FetchURL = `${apiURL}/post/get_newest_posts/${pagination}/${count}`;
        setLoading(true)
        await axios.get(FetchURL)
            .then(async response => {
                const result = await response.data;
                if (response.status === 200) {
                    result.paginatedResult = FormatImagesInPostAndAuthors(result.paginatedResult);
                    setItemList(prev => { return [...new Set([...prev, ...result.paginatedResult])] });
                    setHasMore(result.paginatedResult.length > 0)
                }
                else {
                    console.log("FetchNewestPost error: ", result.error);
                    alertMessage(`Error: ${result.error}`, setMessage);
                }
            }).catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                console.log("FetchNewestPost error: ", error);
                setLoading(false)
                alertMessage(`Error: ${error}`, setMessage);
            })
        setLoading(false)
    }

    return {
        FetchPostsByCategory,
        FetchPostById, 
        FetchNewestPost, 
    } 
}

const CreateAndUpdatePosts = (navigate, apiURL, setLoading, setMessage, token) => {
    const {
        BringDataToPost, 
    } = PostNavigationHooks(navigate)
    const {
        GoBack, 
        GoCategory, 
        VisitOneCategory
    } = NavigationHooks(navigate);

    //SubmitPost can be used for POST or PUT actions 
    const SubmitPost = async (Elements, dispatchFunction, METHOD, postID) => {
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
        const {
            setMessage,
            setLoading,
        } = dispatchFunction; 
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
            formData.append("mainImage", thumbnail);
        }

        //Strategy with updating images:
        //Store ObjectId's of images that user wants to keep in the "keepImages" arrray
        //Any new images uploaded with the input tag will be sent as files that will go through the Multer middleware in the server
        if (images) {
            var keepImages = []
            for (let i = 0; i < images.length; i++) {
                if (!images[i].file) {
                    keepImages.push(images[i]._id); 
                }
                formData.append("images", images[i].file);
            }
            if (keepImages.length > 0) {
                formData.append("keepImages",JSON.stringify(keepImages))

            }
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

        console.log(Elements)
        setLoading(true)
        await fetch(FetchURL, {
            method: METHOD, 
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
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
                        thumbnail: result.post.thumbnail ? convertObjToBase64(result.post.thumbnail) : null,
                        images: convertArrayToBase64(result.post.images),
                        abstract: result.post.abstract,
                        category: result.post.category,
                        tag: result.post.tag,
                        id: result.post._id, 
                    }
                    console.log("data: ", data)
                    setLoading(false)
                    BringDataToPost(data); 
                }
                else {
                    //stay on the post form
                    //or go to the editing screen
                    window.scrollTo(0, 0); 
                    setLoading(false)
                    setMessage("Your draft has been saved."); 
                }
            }
            else {
                const result = await response.json();
                console.log("Error in submitting post: ", result.error); 
                setLoading(false)
                RenderErrorArray(result.error, dispatchFunction)
            }
            setLoading(false)
        })
    }

    const DeletePost = async (postID, userID, authorID, navigateTo) => {
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
                    alertMessage("Your post has been deleted.", setMessage)
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

const FormatImagesInPostAndAuthors = (postList) => {
    var formatted = postList.map(post => {
        if (post.mainImage) { post.mainImage = convertObjToBase64(post.mainImage); }
        if (post.images && post.images.length > 0) { post.images = convertArrayToBase64(post.images); }
        if (post.author.profile_pic) {
            post.author.profile_pic.data = toBase64(post.author.profile_pic.data.data);
        }
        return post; 
    })
    return formatted; 
}


export { FetchHooks, CreateAndUpdatePosts }

