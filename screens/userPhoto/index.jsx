import { useContext, useState, useEffect, lazy, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppContext,
    UserPhotoContext, 
} from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import {
    DecodeToken,
    GetDecodedToken,
} from '../../hooks/decodeToken.jsx';
import RenderUserPhotos from '../../component/userPhoto'; 
import { AdminButtons } from '../../component/userPhoto/adminButtons.jsx'; 

//This screen renders all the photos the user has posted on his profile
//Prerequisite of rendering this component: must retrieve User's ObjectId
const RenderPhotoScreen = props => {
    const location = useLocation(); 
    var memoizedPhotos = null; 
    const [photos, setPhotos]=useState([])
    const {
        userId,
        username, 
    } = location.state

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
    const { GoBulkUpload } = NavigationHooks(navigate, setMessage)
    const {
        FetchUserPhotos, 
        BulkDeletePhotos, 
    } = FetchHooks(apiURL, token, setLoading, setMessage) 
    //This determines whether or not edit mode is on, which gives the user opportunity to delete photos in bulk.
    const [editmode, setEditMode] = useState(false)
    //The follow variable stores photos that have been clicked and selected 
    const [selected, setSelected] = useState([])

    const removePhotos = () => {
        var arr = photos.filter(photo => !selected.some(ID => ID == photo._id.toString()))
        setPhotos(arr); 
    }

    const DeletePhotos = () => {
        BulkDeletePhotos(selected, userId, decoded);
        removePhotos();
        setSelected([]);
        setEditMode(false);
    }

    const context = {
        userId,
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
        if (userId) {
           FetchUserPhotos(userId, setPhotos)
        }
    }, [userId])

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
                    {decoded && decoded.id == userId &&

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