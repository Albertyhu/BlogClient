import { useContext, useEffect, useState } from 'react'; 
import { AppContext } from '../util/contextItem.jsx';
import { DecodeToken } from '../hooks/decodeToken.jsx'; 
import {
    checkIfLiked,
    updateLikesInServer
} from '../hooks/likeHooks.jsx'; 
import { IconContext } from 'react-icons';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/Ai';

const PostLikeFeatures = () => {
    const RenderLikeButton = props => {
        //likes is the array of ObjectId's of users who clicked like on a post or comment
        //documentID is the id of the document that is being updated 
        //'type' is the type of document, whether that will be a post or comment 
        const {
            likes,
            documentID,
            type, 
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
            console.log("likes: ", likes)
            if (decoded) {
                setLike(likes.includes(decoded.id.toString()))
            }
        }, [decoded])

        return (
            <IconContext.Provider value={{ size: '25px' }}>
                <div className="[&>*]:inline-block block whitespace-nowrap relative mx-10 w-[100px] h-[100px]">
                    <div
                        className="absolute top-[50%] translate-y-[-50%] cursor-pointer"
                    >
                        <div
                            className="relative"
                            onClick={toggleLike}
                        >
                            <div
                                className={`absolute top-[50%] translate-y-[-50%] right-auto left-0 select-none ${isLiked ? 'font-bold' : ''}`}
                            >Like</div>
                            <div
                                disabled={token ? false : true}
                                className="absolute top-[50%] translate-y-[-50%] right-0 left-auto"
                            >
                                {isLiked ?
                                    <AiTwotoneLike />
                                    :
                                    <AiOutlineLike style={{ color: "blue" }} />
                                }
                            </div>
                        </div>
                    </div>
                    <span className="absolute top-[50%] right-0 left-auto translate-y-[-50%] text-lg ml-1 my-auto">{number}</span>
                </div>
            </IconContext.Provider>
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
            <IconContext.Provider value={{ size: '25px' }}>
                <div className={`[&>*]:inline-block whitespace-nowrap relative mr-10 w-[60px] ${isLiked ? 'font-bold' : ''}`}>
                    <div
                        className="absolute top-[50%] translate-y-[-50%] left-0 right-auto"
                    >
                        <div
                        >Likes</div>
                    </div>
                    <span className="absolute top-[50%] right-0 left-auto translate-y-[-50%] text-lg ml-1 my-auto">{likes ? likes.length : 0}</span>
                </div>
            </IconContext.Provider>
        )
    }

    return { RenderLikeButton, DisplayLikes }
}

export { PostLikeFeatures }
