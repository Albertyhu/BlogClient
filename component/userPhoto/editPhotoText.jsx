import { useState, useContext, useRef, useEffect } from 'react'; 
import {
    UserPhotoContext,
    AppContext, 
} from '../../util/contextItem.jsx'; 
import {
    BasicTextInput,
    TinyMCEInput,
} from '../formElements/textInputs.jsx'; 
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'; 

const EditPhotoTextPanel = props => {
    const {
        contextItem, 
        closeEdit, 
    } = props;
    const {
        apiURL,
        token,
        setLoading, 
        setMessage, 
    } = useContext(AppContext)
    const {
        photoId, 
        title,
        setTitle,
        caption,
        setCaption,
        setLastEdited, 
        owner, 
    } = contextItem ? useContext(contextItem) : props; 
    const originalTitle = title;
    const originalCaption = caption; 
    const [titleError, setTitleError] = useState([])
    const titleInputRef = useRef(); 
    const [captionError, setCaptionError] = useState([])
    const captionInputRef = useRef(); 
    const { UpdateDetails } = FetchHooks(apiURL, token, setLoading, setMessage, null)
    const Elements = {
        title, 
        captionInputRef, 
        photoId, 
        owner, 

    } 
    const dispatchFunctions = {
        setCaption, 
        setLastEdited,
        setCaptionError,
        setTitleError,
    }
    const reset = () => {
        setTitle(originalTitle)
        setCaption(originalCaption)
    }

    return (
        <form
            id="EditPhotoTextForm"
            className="grid mt-10" 
        >
            <BasicTextInput
                data={title}
                setData={setTitle}
                dataError={titleError}
                label = "Title"
                name="title"
                placeholder="Update title here."
                inputRef={titleInputRef}
            />
            <TinyMCEInput
                data={caption}
                setData={setCaption}
                dataError={captionError}
                label="Main body"
                name="caption"
                placeholder="Share your thoughts here"
                editorRef={captionInputRef}
                HEIGHT={500}
            />
            <div className= "flex md:flex mx-auto [&>*]:mx-5 [&>*]:md:mx-10 [&>*]:mb-5">
                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                        UpdateDetails(Elements, dispatchFunctions); 
                        closeEdit(); 
                    }}
                >Save</button>
                <button
                    type='button'
                    className="btn-cancel"
                    onClick={() => {
                        reset(); 
                        closeEdit(); 
                    }}
                >Cancel</button>
            </div>
        </form>
    )
}
export default EditPhotoTextPanel; 