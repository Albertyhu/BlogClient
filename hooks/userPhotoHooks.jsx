import { Base64Hooks } from './imageHooks.jsx';
import { NavigationHooks } from './navigation.jsx'; 

const {
    toBase64,
    convertArrayToBase64, 
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
            }
            else {
                setMessage(Array.isArray(result.error) ? result.error : [result.error])
            }
            setLoading(false)
        })
            .catch(error => {
                console.log("FetchHooks error: ", error)
                setMessage(Array.isArray(error) ? error : [error])
                setLoading(false)
            })
    }

    const FetchPhotoDetails = async (photoId, dispatchFunctions) => {
        const {
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
                    var image = toBase64(result.photo.image)
                    setImage(image)
                    setDetails(result.photo)
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

    return {
        FetchUserPhotos,
        FetchPhotoDetails,
        BulkUploadPhotos, 
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