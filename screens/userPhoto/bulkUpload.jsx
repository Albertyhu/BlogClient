import { useState, useRef, useContext, useEffect, lazy, Suspense, useCallback} from 'react';
import {
    AttachMultipleImages,
} from '../../component/formElements/imageInputs.jsx';
import {
    UserPhotoContext,
    AppContext, 
} from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { DecodeToken } from '../../hooks/decodeToken.jsx'; 

const BulkUploadForm = props => {
    const [images, setImages] = useState([]); 
    const [imagesError, setImagesError] = useState([]);
    const imagesInputRef = useRef();
    const navigate = useNavigate(); 
    const {
        token,
        setLoading,
        apiURL,
        setMessage, 
    } = useState(AppContext)
    const [decoded, setDecoded] = useState(DecodeToken(localStorage.getItem('token')))
    const {
        GoHome, 
        GoUserPhotos
    } = NavigationHooks(navigate)

    const context = {
        images,
        setImages,
        imagesError,
        imagesInputRef
    }
    const {
        BulkUploadPhotos
    } = FetchHooks(apiURL, token, setLoading, setMessage)
    const submitPhotos = evt => {
        evt.preventDefault(); 
        const dispatchFunctions = {
            navigateToPhotos: () => GoUserPhotos(decoded.username, decoded.id), 
        } 
        BulkUploadPhotos(decoded.id, images, dispatchFunctions)
    }

    //useEffect(() => {
    //    if (token) {
    //        setDecoded(DecodeToken(token))
    //    }
    //}, [token])

    useEffect(() => {
        if (decoded) {
            GoHome("You don't have permission to visit that page.")
        }
        console.log("decoded: ", decoded)
    }, [decoded])

    return (
        <UserPhotoContext.Provider value = {context}>
            <form>
                <AttachMultipleImages
                    label="Upload photos."
                    name="images"
                    placeholder="Browse your device to upload images."
                    contextItem={UserPhotoContext}
                />
                <div
                    className="w-full md:w-9/12 mx-auto [&>button]:block [&>button]:mx-auto md:[&>button]:inline-block md:[&>button]:mx-10 justify-between flex"
                >
                    <button
                        className="btn-primary"
                        onClick={submitPhotos}
                        type="button"
                    >Upload</button>
                    <button
                        type="button"
                        className="btn-standard bg-[#000000] text-white"
                        value="Cancel"
                        onClick={useCallback(() => navigate(-1))}
                    >Cancel</button>
                </div>
            </form>
        </UserPhotoContext.Provider>
        )
}

export default BulkUploadForm; 