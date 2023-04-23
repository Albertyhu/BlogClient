import { useContext, useState, useEffect, lazy } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    AppContext,
    UserPhotoContext, 
} from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'
const RenderProfilePic = lazy(() => import('../../component/user/profilePicture.jsx'));
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import RenderUserPhotos from '../../component/userPhoto'; 
import AddButton from '../../component/addButton.jsx'; 

//This screen renders all the photos the user has posted on his profile
//Prerequisite of rendering this component: must retrieve User's ObjectId
const RenderPhotoScreen = props => {
    const location = useLocation();  
    const [photos, setPhotos]=useState([])
    const {
        userId,
        username, 
    } = location.state

    const {
        user,
        token,
        setLoading,
        setMessage, 
        apiURL,
    } = useContext(AppContext)
    const navigate = useNavigate();
    const { GoBulkUpload } = NavigationHooks(navigate, setMessage)
    const {
        FetchUserPhotos, 
    } = FetchHooks(apiURL, token, setLoading, setMessage)

    const context = {
        userId,
        username, 
    }

    useEffect(() => {
        if (userId) {
            FetchUserPhotos(userId, setPhotos)
        }
    }, [userId])
    return (
        <UserPhotoContext.Provider value ={context }>
            <div
                id="PhotoScreenBody"
            >
                <h1
                    className="text-2xl text-center my-10 mx-auto capitalize"
                >{username}'s Photos</h1>
                <AddButton
                    title="Upload more photos"
                    dispatchFunction={() => GoBulkUpload(userId, username)}
                    buttonStyle = "btn-add mx-auto block mb-10"
                />
                {photos && photos.length > 0 ? 
                    <RenderUserPhotos
                        images={photos}
                    />
                    :
                    <p className= "text-center">The user doesn't have any uploaded photos yet.</p>
                }
            </div>
        </UserPhotoContext.Provider>
    )
}

export default RenderPhotoScreen; 