import { useContext } from 'react'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { TinyMCEInput } from './textInputs.jsx'; 
export const CommentInput = props => { 
    const { } = useContext(AppContext); 
    return (
        <form>
            <TinyMCEInput
            
            />
            <div
                className="grid md:inline-flex mx-auto"
                id = "CommentButtons"
            >
                <button
                    id="CommentSubmitButton"

                    onClick = "" 
                >Submit</button>
            </div>
        </form>
    )

}