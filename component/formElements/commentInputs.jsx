import { useContext } from 'react'; 
import { AppContext, PostContext } from '../../util/contextItem.jsx'; 
import { TinyMCEInput } from './textInputs.jsx'; 
import { AttachMultipleImages } from './imageInputs.jsx';

export const CommentInput = props => { 
    const {
        //rootParent is the ObjectId of the Post or Comment that tracks all the replies to be rendered. 
        content,
        commentError,
        commentEditorRef,
        submitEvent,
        cancelEvent,
        contextItem
    } = props; 
    const { token } = useContext(AppContext); 
    return (
        <form>
            <TinyMCEInput
                data={content}
                dataError={commentError}
                editorRef={commentEditorRef}
            />
            <AttachMultipleImages
                contextItem={PostContext}
            />
            <div
                className="flex flex-col md:flex-row mx-auto md:justify-space md:w-5/12 [&>button]:mb-5"
                id = "CommentButtons"
            >
                <button
                    className="btn-primary"
                    id="CommentSubmitButton"
                    onClick={submitEvent} 
                    type="button"
                >Submit</button>
                <button
                    id="CancelButton"
                    className="btn-cancel"
                    onClick={cancelEvent}
                >Cancel</button>
            </div>
        </form>
    )

}