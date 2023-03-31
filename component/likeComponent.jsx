import { useContext, useEffect, useState } from 'react'; 
import { FcLikePlaceholder, FcLike } from 'react-icons/Fc';
import { AppContext } from '../util/contextItem.jsx';
import { DecodeToken } from '../hooks/decodeToken.jsx'; 
import { checkIfLiked, updateLikesInServer } from '../hooks/likeHooks.jsx'; 
import { IconContext } from 'react-icons';

const RenderLikes = props => {
    const {
        likes,
        postID
    } = props; 

    const {
        token,
        apiURL, 
    } = useContext(AppContext); 
    const [isLiked, setLike] = useState(false); 
    const [number, setNumber] = useState(likes ? likes.length : 0)
    const [decoded, setDecoded] = useState(null)

    const toggleLike = () => {
        var result = []
        if (isLiked && decoded) {
            result = likes.filter(like => like != decoded.id)
            setNumber(prev => prev - 1)
        }
        else {
            result = [...likes, decoded.id]
            setNumber(prev => prev + 1)
        }
        updateLikesInServer(apiURL, result, postID, token)
    } 

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token)); 
        }
    }, [token])

    useEffect(() => {
        if(decoded)
            setLike(checkIfLiked(likes, decoded.id)); 
    }, [decoded])

    return (
        <IconContext.Provider value={{size: '25px'}}>
            <div className="[&>*]:inline-block whitespace-nowrap bg-300-gray rounded-lg p-5">
                <div
                    onClick={toggleLike}
                    disabled={ token ? false : true }
                >
                {isLiked ? 
                        <FcLike/>
                    :
                        <FcLikePlaceholder style={{ color: "blue" }} />
                    }
                </div>
                <span className = "text-lg mx-10">{number}</span>
            </div>
        </IconContext.Provider>
        )
}

export { RenderLikes }