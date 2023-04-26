import { Base64Hooks } from './imageHooks.jsx';
import { NavigationHooks } from './navigation.jsx'; 
import { alertMessage } from './textHooks.jsx'; 
import {
    FormatAllImagesInComments,
} from './commentHooks.jsx';
import { GetContent } from './tinyMCEhooks.jsx'; 
import { DecodeToken } from './decodeToken.jsx'; 
import { UserPhotoErrorHooks } from './errorHooks.jsx'


const { RenderErrorArray } = UserPhotoErrorHooks(); 

const {
    toBase64,
    convertArrayToBase64, 
    convertObjToBase64, 
} = Base64Hooks()

const FetchHooks = (apiURL, token, setLoading, setMessage, navigate) => {
    const FetchUserPhotos = async (userId, setPhotos) => {
        const FetchURL = `${apiURL}/users/${userId}/user_photos`;
        setLoading(true)
        await fetch(FetchURL, {
            method: "GET",
        })
        .then(async response => {
            const result = await response.json(); 
            if (response.ok) {
                var photos = FormatUserPhotos(result.photos) 
                setPhotos(photos)
               // return photos
                setLoading(false)
            }
            else {
                setMessage(Array.isArray(result.error) ? result.error : [result.error])
                setLoading(false)
            }
            
        })
            .catch(error => {
                console.log("FetchHooks error: ", error)
                setMessage(Array.isArray(error) ? error : [error])
                setLoading(false)
            })
    }

    const FetchPhotoDetails = async (photoId, dispatchFunctions) => {
        const {
            setTitle, 
            setCaption, 
            setPublishedDate, 
            setLastEdited, 
            setImage, 
            setDetails, 
            setLikes, 
            setComments, 
        } = dispatchFunctions;  
        const FetchURL = `${apiURL}/user_photo/${photoId}`;
        setLoading(true)
        await fetch(FetchURL, {
            method:"GET"
        })
            .then(async response => {
                const result = await response.json(); 
                if (response.ok) {
                    var image = convertObjToBase64(result.photo.image)
                    if (result.photo.comments) {
                        result.photo.comments = FormatAllImagesInComments(result.photo.comments)
                    }
                    setImage(image)
                    setDetails(result.photo)
                    setTitle(result.photo.title)
                    setCaption(result.photo.caption); 
                    setPublishedDate(result.photo.publishedDate); 
                    setLastEdited(result.photo.lastEdited); 
                    setLikes(result.photo.likes)
                    setComments(result.photo.comments)
                }
                else {
                    console.log("FetchPhotoDetails error: ", error)
                    setMessage(Array.isArray(result.error) ? result.error : [result.error])
                }
                setLoading(false)
            })
            .catch(error => {
                console.log("FetchPhotoDetails error: ", error)
                setMessage(Array.isArray(error) ? error : [error])
                setLoading(false)
            })
    }

    const BulkUploadPhotos = async (userId, images, dispatchFunctions) => {
        const FetchURL = `${apiURL}/users/${userId}/upload_photos`
        const formData = new FormData; 
        const {
            navigateToPhotos,
        } = dispatchFunctions; 
        images.forEach(img => {
            formData.append("images", img.file); 
        })
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        setLoading(true)
        await fetch(FetchURL, {
            method: "PUT", 
            body: formData, 
            headers: {
                "Authorization" : `Bearer ${token}`, 
            }

        })
            .then(async response => {
                if (response.ok) {
                    setLoading(false)
                    navigateToPhotos()
                }
                else {
                    const result = await response.json(); 
                    setLoading(false)
                    console.log("BulkUploadPhotos error: ", result.error)
                    setMessage(Array.isArray(result?.error) ? result.error : [result.error])
                }

            })
            .catch(error => {
                console.log("BulkUploadPhotos error: ", error)
                setMessage(Array.isArray(error) ? error : [error])
                setLoading(false)
            })

    }

    const BulkDeletePhotos = async (imgIdArray, userId, decoded) => {
        if (decoded.id != userId) {
            setMessage([{ msg: "You are not permitted to do that", param: "general"}])
            return; 
        }
        const FetchURL = `${apiURL}/users/${userId}/delete_photos`; 
        setLoading(true)

        console.log("imgIdArray: ", imgIdArray)
        const formData = new FormData(); 
        formData.append("images", JSON.stringify(imgIdArray))
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        await fetch(FetchURL, {
            method: "PUT", 
            body: formData, 
            headers: {
                "Authorization" : `Bearer ${token}`,
            }
        })
            .then(async response => {
                if (response.ok) {
                    setLoading(false)
                    alertMessage("Your photos are successfully deleled.", setMessage)
                }
                else {
                    const result = await response.json();
                    console.log("BulkDeletePhotos error: ", result.error)
                    setLoading(false)
                    setMessage(result.error)
                }
            })
            .catch(error => {
                console.log("BulkDeletePhotos error: ", error)
                setLoading(false)
                setMessage(error)
            })
        setLoading(false); 
    }

    const UpdateDetails = async ({
        title,
        captionInputRef,
        photoId,
        owner, 
        setLastEdited ,
    }) => {
        const decoded = DecodeToken(token);
        if (decoded.id != owner) {
            alertMessage("You don't permission to do that.", setMessage)
            return; 
        }
        const formData = new FormData(); 
        const caption = GetContent(captionInputRef); 
        const FetchURL = `${apiURL}/user_photo/${photoId}/edit`
        formData.append("caption", caption)
        formaData.append("title", title)
        setLoading(true)
        await fetch(FetchURL, {
            method: "PUT", 
            body: formData, 
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async response => {
            const result = await response.JSON(); 
            if (response.ok) {
                //dispatch(result.updatedPhoto);
                setLastEdited(result.lastEdited)
                setLoading(false)
                alertMessage("Your photo has been updated.", setMessage)
            }
            else {
                setLoading(false)
                RenderErrorArray(result.error)
            }
        })
            .catch(error => {
                setLoading(false)
                alertMessage(`Something went wrong: ${error}`, setMessage)
            })
    }

    return {
        FetchUserPhotos,
        FetchPhotoDetails,
        BulkUploadPhotos, 
        BulkDeletePhotos, 
        UpdateDetails, 
    }
}

const FormatUserPhotos = (data) => {
    return data.map(item => {
        return {
            ...item, 
            image: {
                data: toBase64(item.image.data.data),
                contentType: item.contentType,
            }
        }
    })
}

export {FetchHooks}