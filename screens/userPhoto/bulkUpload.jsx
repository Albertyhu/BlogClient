import { useState, useRef, useContext, useEffect, useCallback} from 'react';
import {
    AttachMultipleImages,
} from '../../component/formElements/imageInputs.jsx';
import {
    UserPhotoContext,
    AppContext, 
} from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'
import { useNavigate, useLocation } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { DecodeToken } from '../../hooks/decodeToken.jsx'; 

const BulkUploadForm = props => {
    const [images, setImages] = useState([]); 
    const [imagesError, setImagesError] = useState([]);
    const imagesInputRef = useRef();
    const location = useLocation(); 
    const {
        username,
        userId, 
    } = location.state;
    
    const navigate = useNavigate(); 
    const {
        token,
        setLoading,
        apiURL,
        setMessage,
    } = useContext(AppContext)
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
    const [decoded] = useState(DecodeToken(localStorage.getItem('token')));
    const submitPhotos = evt => {
        const successMessage = "Your photos have been uploaded."
        const dispatchFunctions = {
            navigateToPhotos: () => GoUserPhotos(decoded.username, decoded.id, successMessage), 
        } 
        if(images.length > 0)
            BulkUploadPhotos(decoded.id, images, dispatchFunctions)
        else
            setMessage([{msg: "You haven't uploaded any images yet.", param: "error"}])
    }

    useEffect(() => {
        if (!token || decoded.id != userId) {
            GoHome("You don't have permission to visit that page.")
        }
    }, [token])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <UserPhotoContext.Provider value={context}>
            <h1
                className="text-2xl text-center font-bold my-10"
            >Upload Photos</h1>
            <form
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <AttachMultipleImages
                        label=""
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
                </div>
            </form>
        </UserPhotoContext.Provider>
        )
}

export default BulkUploadForm; 