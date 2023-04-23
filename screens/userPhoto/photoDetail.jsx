import { useContext, useState, useEffect, lazy } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    AppContext,
    UserPhotoContext,
} from '../../util/contextItem.jsx';
import { FetchHooks } from '../../hooks/userPhotoHooks.jsx'
const RenderProfilePic = lazy(() => import('../../component/user/profilePicture.jsx'));
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import RenderUserPhotos from '../../component/userPhoto'; 
import RenderImage from '../../component/imageRendering/mainImage.jsx'; 
import CommentPanel from '../../component/commentPanel';

const RenderPhotoDetail = props => {
    const { } = useContext(AppContext)
    return (
        <UserPhotoContext.Provider value = {context}>
            <div>
                <RenderImage /> 
            </div>
        </UserPhotoContext.Provider>
    )
}

export default RenderPhotoDetail 