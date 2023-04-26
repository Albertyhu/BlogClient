import { useContext } from 'react';
import { UserPhotoContext } from '../../util/contextItem.jsx'; 
import { RenderTimePosted } from '../../hooks/timeHooks.jsx';
const RenderPhotoText = props => {
    const {
        title, 
        caption,
        publishedDate, 
        lastEdited, 
    } = useContext(UserPhotoContext)
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
                <div>
                    {caption}
                </div>
            }
        </>
        )
}
export default RenderPhotoText; 