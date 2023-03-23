import { useState, useRef, useContext, useEffect } from 'react'; 
import { useNavigate } from "react-router-dom"; 
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx"; 
import { EditUserHooks } from '../../hooks/userProfileHooks.jsx'; 
import { RegistrationHooks } from '../../hooks/authFormHooks.jsx'; 
import { NavigationHooks } from "../../hooks/navigation.jsx"; 
import { FormButtons } from '../../component/formElements.jsx'; 
import { AppContext } from '../../util/contextItem.jsx'; 

const EditProfilePic = props => {
    const navigate = useNavigate(); 
    const { GoHome } = NavigationHooks(navigate); 
    const { apiURL } = useContext(AppContext);
    const UserToken = localStorage.getItem("token"); 
    const [User] = useState(JSON.parse(localStorage.getItem("user"))); 
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const { UploadNewProfilePic } = EditUserHooks(navigate) 
    const [image, setImage] = useState(null); 
    const { HandleFileChange } = RegistrationHooks();
    const [uploadURL, setUploadURL] = useState(`${apiURL}/users/${User.id}/uploadnewpicture`)
    const [pictureError, setPictureError] = useState([]) 
    const ImageInputRef = useRef(); 
    const ImageErrorRef = useRef() 
    const FormRef = useRef(); 
    useEffect(() => {
        if (!UserToken) {
            GoHome()
        }
    })

    useEffect(() => {
        if (pictureError.length > 0) {
            for (var child of ImageErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [pictureError])

    useEffect(() => {
        if (User) {
            setUploadURL(`${apiURL}/users/${User.id}/uploadnewpicture`)
        }
    }, [User])

    return (
    <div>
            <h1 className= "HeaderStyle mt-[20px]">Upload a new profile picture</h1>
            <form
                id="RegistrationForm"
                ref={FormRef}
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault(); 
                    const ImageInputElem = ImageInputRef.current; 
                    UploadNewProfilePic(uploadURL, ImageInputElem, setPictureError)
                }}
            >
                <div className= "FormStyle w-11/12 mx-auto grid">
                    <label htmlFor="profile_pic">Profile picture</label>
                    <input
                        name="profile_pic"
                        id="profile_picInput"
                        ref={ImageInputRef}
                        type="file"
                        placeholder="Upload an image htmlFor your your profile picture here"
                        className="text-lg file:rounded-lg file:font-['DecoTech'] file:bg-[#99cbae] file:text-white cursor-pointer border-black border-[1px] rounded"
                        onChange={(evt) => { HandleFileChange(evt, setImage) }}
                    />
                    <FormButtons />
                </div>
                <div
                    id="pictureError"
                    className="ErrorDiv"
                    ref={ImageErrorRef}>
                    {pictureError != null && pictureError.length > 0 && RenderError(pictureError)}
                </div>
        </form>
    </div>)
} 


export default EditProfilePic; 