import {
    useContext,
    useEffect,
} from 'react';
import { UserPhotoContext } from '../../util/contextItem.jsx'; 
import { RenderTimePosted } from '../../hooks/timeHooks.jsx';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 

const RenderPhotoText = props => {
    const {
        lastEdited, 
        title, 
        caption,
    } = props; 
    const navigate = useNavigate(); 
    const {
        GoUserPhotos,
        VisitUser
    } = NavigationHooks(navigate);
    const {
        publishedDate, 
        owner,
    } = useContext(UserPhotoContext)

    return (
        <>
            {title &&
                <h1 className="hidden md:block text-center font-bold text-2xl py-10">{title}</h1>
            }
            {owner && 
                <div
                    className = "mt-5 [&>*]:mb-5"
                >
                    <p
                        onClick={() => VisitUser(owner.username, owner._id) }
                    >Owner: &nbsp; 
                        <span
                            className="underline cursor-pointer font-bold"
                        >{owner.username}</span></p>
                    <p
                        onClick={() => GoUserPhotos(owner.username, owner._id, null)}
                        className = "underline cursor-pointer"
                    >Go back to photos</p>
                </div>
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