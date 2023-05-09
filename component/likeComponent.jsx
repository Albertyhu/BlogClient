import { useContext, useEffect, useState } from 'react'; 
import { AppContext } from '../util/contextItem.jsx';
import { DecodeToken } from '../hooks/decodeToken.jsx'; 
import {
    checkIfLiked,
    updateLikesInServer
} from '../hooks/likeHooks.jsx'; 
import {
    LikeIcon,
    BlueLikeIcon, 
} from './iconComponents'; 

const PostLikeFeatures = () => {
    const RenderLikeButton = props => {
        const { 
            //likes is the array of ObjectId's of users who clicked like on a post or comment
            likes,

            //documentID is the id of the document that is being updated; this will later be utilized to construct the fetch endpoint
            documentID,

            //'type' is the type of document, whether that will be a post or comment; this will later be utilized to construct the fetch endpoint
            type, 
            customStyle = '',
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
            var action = ''
            if (isLiked) {
                result = likes.filter(like => like != decoded.id)
                setLike(false)
                setNumber(prev => prev - 1)
                action = 'remove';
            }
            else {
                result = [...likes, decoded.id]
                setLike(true)
                setNumber(prev => prev + 1)
                action = 'add';
            }
            updateLikesInServer(apiURL, type, documentID, decoded.id, token, action)
        }

        useEffect(() => {
            if (token) {
                setDecoded(DecodeToken(token));
            }
        }, [token])

        useEffect(() => {
            if (decoded) {
                if (likes) {
                    setLike(likes.includes(decoded.id.toString()))
                }
            }
        }, [decoded])

        return (
            <div
                className={`whitespace-nowrap flex text-lg cursor-pointer my-auto ${customStyle}`}
                onClick={toggleLike}
                disabled={token ? false : true}
            >
                {isLiked ?
                    <BlueLikeIcon />
                    :
                    <LikeIcon />
                }
                <span
                    className={`select-none ml-1 ${isLiked ? 'font-bold' : ''}`}
                >Like</span>
                <span className="ml-1">{number}</span>
            </div>
        )
    }

    const DisplayLikes = props => {
        const {
            likes,
        } = props;

        const {
            token,
        } = useContext(AppContext);

        const [isLiked, setLike] = useState(false);
        const [decoded, setDecoded] = useState(null)

        useEffect(() => {
            if (token) {
                setDecoded(DecodeToken(token));
            }
        }, [token])

        useEffect(() => {
            if (decoded)
                setLike(checkIfLiked(likes, decoded.id));
        }, [decoded])

        return (
            <div className={`[&>*]:inline-block whitespace-nowrap relative mr-10 w-[60px] ${isLiked ? 'font-bold' : ''}`}>
                <div
                    className="absolute top-[50%] translate-y-[-50%] left-0 right-auto"
                >
                    <div
                    >Likes</div>
                </div>
                <span className="absolute top-[50%] right-0 left-auto translate-y-[-50%] text-lg ml-1 my-auto">{likes ? likes.length : 0}</span>
            </div>
        )
    }

    return { RenderLikeButton, DisplayLikes }
}

export { PostLikeFeatures }
