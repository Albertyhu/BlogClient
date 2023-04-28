import {
    useContext,
    useRef, 
    useEffect, 
} from 'react';
import {
    UserPhotoContext,
    AppContext,
} from '../../util/contextItem.jsx'; 
import AddButton from '../addButton.jsx'; 
import { IconContext } from 'react-icons'; 
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx';
import { BiTrash } from 'react-icons/Bi';

export const AdminButtons = props => {
    const {
        photos,
        editmode,
        selected, 
    } = props; 
    const navigate = useNavigate(); 
    const {
        apiURL,
        token,
        setLoading, 
        setMessage, 
        decoded,
    } = useContext(AppContext); 
    const { GoBulkUpload } = NavigationHooks(navigate, setMessage)
    const {
        userId,
        username, 
        setEditMode,
        setPhotos,
        setSelected, 
    } = useContext(UserPhotoContext); 
    const originalStyle = `lg:absolute lg:left-auto lg:right-[10px] lg:top-[10px] grid lg:flex mx-auto [&>*]:mx-5 w-fit`
    const {
        BulkDeletePhotos,
    } = FetchHooks(apiURL, token, setLoading, setMessage) 

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

    const BackgroundField = useRef(); 
    const scrollEvent = () => {
        var position = window.scrollY;
        if (position >= 42) {
            BackgroundField.current.classList.remove("adminButtonInitial")
            BackgroundField.current.classList.add("adminButtonScrollStyle")
        }
        else {
            BackgroundField.current.classList.remove("adminButtonScrollStyle")
            BackgroundField.current.classList.add("adminButtonInitial")
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollEvent);
        window.addEventListener('load', () => { window.scrollTo(0, 0) });

        return () => {
            window.removeEventListener('scroll', scrollEvent);
            window.removeEventListener('load', () => { window.scrollTo(0, 0) });
        };
    }, []);

    return (
        <div
            id="ButtonField"
            className="lg:justify-end lg:w-full lg:fixed lg:left-auto lg:right-[10px] lg:top-[75px] grid lg:flex mx-auto [&>*]:mx-5 w-fit z-[5]"
        >
            <div
                className="hidden absolute left-0 right-0 w-full lg:before:w-full lg:block h-0 adminButtonInitial lg:before:transition-all lg:before:duration-500 lg:before:top-[0px] lg:before:z-[-1] lg:before:fixed lg:before:w-full box_shadow_bottom !before:p-0 before:translate-x-[-10px]"
                ref={BackgroundField}
            ></div>
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
                    <IconContext.Provider value={{ size: "25px" }}>
                        <button
                            id="DeleteButton"
                            className="btn-delete mb-10 [&>*]:inline-block [&>*]:whitespace-nowrap font-bold"
                            onClick={DeletePhotos}
                        >
                            <span
                                className="mr-5"
                            >Remove selected</span>
                            <BiTrash />
                        </button>
                    </IconContext.Provider>
                    <button
                        id="CancelButton"
                        className="btn-cancel mb-10 font-bold"
                        onClick={() => setEditMode(false)}
                    >Cancel</button>
                </>
            }
        </div>
    )
}
