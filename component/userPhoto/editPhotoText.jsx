import { useState, useContext, useRef } from 'react'; 
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
        cancel, 
        photoId,
        userId, 
        owner, 
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
        title,
        setTitle,
        caption,
        setCaption,
        setLastEdited, 
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
        setLastEdited, 
    } 
    const reset = () => {
        setTitle(originalTitle)
        setCaption(originalCaption)
    }
    return (
        <form
            id="EditPhotoTextForm"
            className="grid" 
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
            <div className = "grid md:flex mx-auto">
                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                        UpdateDetails(Elements); 
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