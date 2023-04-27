import {
    useContext,
    useEffect,
} from 'react';
import { UserPhotoContext } from '../../util/contextItem.jsx'; 
import { RenderTimePosted } from '../../hooks/timeHooks.jsx';
const RenderPhotoText = props => {
    const {
        lastEdited, 
        title, 
        caption,
    } = props; 

    const {
        publishedDate, 
    } = useContext(UserPhotoContext)

    useEffect(() => {
        console.log("lastEdited", lastEdited)
    }, [lastEdited])

    return (
        <>
            {title &&
                <h1 className="hidden md:block text-center font-bold text-2xl py-10">{title}</h1>
            }
            {lastEdited && lastEdited != publishedDate ?
                <div><span>Edited {RenderTimePosted(lastEdited)}</span></div>
                :
                publishedDate && <div>Published {RenderTimePosted(publishedDate)}</div>
            }
            {caption &&
                <div
                    dangerouslySetInnerHTML={{ __html: caption }}
                >
                </div>
            }
        </>
        )
}
export default RenderPhotoText; 