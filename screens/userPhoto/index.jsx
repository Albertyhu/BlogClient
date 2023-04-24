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
import { BiTrash } from 'react-icons/Bi';
import { IconContext } from "react-icons";

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

    //This determines whether or not edit mode is on, which gives the user opportunity to delete photos in bulk.
    const [editmode, setEditMode] = useState(false)
    //The follow variable stores photos that have been clicked and selected 
    const [selected, setSelected] = useState([])

    const context = {
        userId,
        username, 
        editmode,
        setEditMode, 
        setSelected,
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
                        <div
                            id="ButtonField"
                            className="md:absolute md:left-auto md:right-[10px] md:top-[10px] grid md:flex mx-auto [&>*]:mx-5 w-fit"
                        >
                        {!editmode ? 
                            <>
                                <AddButton
                                    title="Upload more photos"
                                    dispatchFunction={() => GoBulkUpload(userId, username)}
                                    buttonStyle="btn-add mx-auto block mb-10"
                                />
                                <button
                                    id="DeleteButton"
                                    className="btn-cancel mb-10"
                                    onClick={() => setEditMode(true)}
                                >Select and remove</button>
                            </>
                            :
                            <>
                                <IconContext.Provider value={{size:"25px"}}>
                                    <button
                                        id="DeleteButton"
                                        className="btn-delete mb-10 [&>*]:inline-block [&>*]:whitespace-nowrap font-bold"
                                        onClick={() => setEditMode(true)}
                                    >
                                        <span
                                            className="mr-5"
                                        >Remove selected</span>
                                        <BiTrash />
                                    </button>
                                </IconContext.Provider>
                                <button
                                    id="DeleteButton"
                                    className="btn-cancel mb-10 font-bold"
                                    onClick={() => setEditMode(false)}
                                >Cancel</button>
                            </>
                            }
                        </div>
                </div>
                {photos && photos.length > 0 ? 
                    <RenderUserPhotos
                        images={photos}
                        selected={selected}
                    />
                    :
                    <p className= "text-center">The user doesn't have any uploaded photos yet.</p>
                }
            </div>
        </UserPhotoContext.Provider>
    )
}

export default RenderPhotoScreen; 