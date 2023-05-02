import { useContext, useState, useEffect, lazy, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    AppContext,
    UserPhotoContext, 
} from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import RenderUserPhotos from '../../component/userPhoto'; 
import { AdminButtons } from '../../component/userPhoto/adminButtons.jsx'; 

//This screen renders all the photos the user has posted on his profile
//Prerequisite of rendering this component: must retrieve User's ObjectId
const RenderPhotoScreen = props => {
    const location = useLocation(); 
    const [photos, setPhotos]=useState([])
    const { username } = useParams(); 
    const {
        user,
        loading, 
        setLoading,
        setMessage, 
        apiURL,
        token, 
        decoded,
    } = useContext(AppContext)
    const navigate = useNavigate();
    const {
        FetchUserPhotos, 
    } = FetchHooks(apiURL, token, setLoading, setMessage) 
    //This determines whether or not edit mode is on, which gives the user opportunity to delete photos in bulk.
    const [userID, setUserID] = useState(location.state ? location.state.userId : null)

    const [editmode, setEditMode] = useState(false)
    //The follow variable stores photos that have been clicked and selected 
    const [selected, setSelected] = useState([])

    const context = {
        userId: userID,
        username, 
        editmode,
        setEditMode, 
        setSelected,
        setPhotos, 
        addSelected: (val) => { setSelected(prev => [...prev, val]) },
        removeSelected: (val) => {
            var arr = selected.filter(item => item != val)
            setSelected(arr)
        }, 
        toggleSelected: (val) => {
            if (selected.some(item => item == val)) {
                context.removeSelected(val)
            }
            else {
                context.addSelected(val)
            }
        }
    }
    
    useEffect(() => {
        if (username) {
            const dispatchFunctions = {
                setPhotos, 
                setUserID, 
            }
           FetchUserPhotos(username, dispatchFunctions)
        }
    }, [username])

    useEffect(() => {
        return () => { setLoading(false)}
    }, [])

    return (
        <UserPhotoContext.Provider value ={context}>
            <div
                id="PhotoScreenBody"
            >
                <div
                    id="headerSection"
                    className ="relative"
                >
                    <h1
                        className="text-2xl text-center my-10 mx-auto capitalize"
                    >{username}'s Photos</h1>
                    {decoded && userID && decoded.id == userID &&

                        <AdminButtons
                            editmode={editmode}
                            photos={photos}
                            selected={selected}
                        />
                        }
                </div>
                {!loading ?
                    photos && photos.length > 0 ?
                    <RenderUserPhotos
                        images={photos}
                        selected={selected}
                    />
                    :
                    <p className="text-center">The user doesn't have any uploaded photos yet.</p>
                    :
                    <p className="text-center">loading</p>
                }
            </div>
        </UserPhotoContext.Provider>
    )
}

export default RenderPhotoScreen; 