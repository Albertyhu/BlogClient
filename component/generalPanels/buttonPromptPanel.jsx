import { useNavigate } from 'react-router-dom';
import { NavigationHooks, PostNavigationHooks } from '../../hooks/navigation.jsx';
import AddButton from '../../component/AddButton.jsx';;
import { useContext } from 'react'
import { AppContext } from '../../util/contextItem.jsx'; 
import { alertMessage } from '../../hooks/textHooks.jsx'; 
import { AiOutlineCamera } from 'react-icons/ai'
import { IconContext } from 'react-icons'; 

const RenderPanel = props => {
    const navigate = useNavigate();
    const {
        GoBulkUpload, 
    } = NavigationHooks(navigate); 

    const {
        GoCreatePost,
    } = PostNavigationHooks(navigate); 
    const {
        token,
        setMessage, 
        decoded, 
    } = useContext(AppContext)

    const postClickEvent = () => {
        if (token) {
            GoCreatePost()
        }
        else {
            alertMessage("You must be a member in order to do that.", setMessage)
        }
    }

    const photoClickEvent = () => {
        if (token) {
            GoBulkUpload(decoded.username, decoded.id)
        }
        else {
            alertMessage("You must be a member in order to do that.", setMessage)
        }
    }

    return (
        <div
            id="PromptPanel"
            className="hidden md:block bg-[#ffffff] rounded-[15px] py-10 mx-auto box_shadow mb-5 w-full"
        >
            <div
                className="w-8/12 mx-auto justify-center [&>*]:mb-5"
            >
                <AddButton
                    title="Create a new post"
                    altText="Create a new post button"
                    dispatchFunction={postClickEvent}
                />
                <IconContext.Provider value={{size: "25px"}}>
                    <button
                        type="button"
                        className="btn-primary w-full"
                        onClick={photoClickEvent}
                    >
                        <span>Upload photos <AiOutlineCamera className ="my-auto ml-5" /></span>
                    </button>
                </IconContext.Provider>
            </div>
        </div>

        )
}

export default RenderPanel; 