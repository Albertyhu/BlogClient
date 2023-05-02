import React, { useContext, useState, lazy, useEffect, Suspense } from 'react';
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import {
    useNavigate,
} from 'react-router-dom';
import { AppContext } from '../../util/contextItem.jsx';
import { UserProfileHooks } from '../../hooks/userProfileHooks.jsx';
import Avatar from '../../assets/images/avatar.jpg'
import { FormatDate } from '../../hooks/timeHooks.jsx'; 

const RenderProfilePic = lazy(() => import('./profilePicture.jsx'));

const ProfilePanel = props => {
    const { userId } = props; 
    const navigate = useNavigate();
    const { VisitUser } = NavigationHooks(navigate);
    const {
        user,
        apiURL,
        ClearUserData,
        ProfilePicture,
        setMessage,
        decoded, 
        setLoading,
        token, 
    } = useContext(AppContext);
    const [profileImage, setProfileImage] = useState(ProfilePicture ? ProfilePicture : Avatar)
    const { DeleteUser } = UserProfileHooks(apiURL, token, setLoading, setMessage);

    const dispatchFunctions = {
        ClearUserData,
        navigate
    }

    return (
        <div
            className="hidden md:block w-full text-center text-lg text-black rounded-lg bg-[#ffffff] py-10 mr-10 box_shadow mb-5"
            id="ProfileContainer" 
        >
            <div
                className="w-11/12 mx-auto"
                id="ProfileWrapper"
            >
                {profileImage &&
                    <Suspense fallback={<div className= "rounded-full w-[100px]  h-[100px] sm:w-[150px] sm:h-[150px] md:w-[270px] md:h-[270px]">Profile image loading</div>}>
                        <RenderProfilePic
                            profile_pic={profileImage}
                            dimensions="w-[100px]  h-[100px] sm:w-[150px] sm:h-[150px] md:w-[270px] md:h-[270px]"
                            clickEvent={()=>VisitUser(decoded.username, decoded.id)}
                            />
                    </Suspense>
                        }
                {token && decoded === userId &&
                    <button
                        type='button'
                        className='btn-delete'
                        onClick={() => { DeleteUser(user.id, dispatchFunctions) }}
                    >Delete Account</button>
                }
                {user && user.username &&
                    <p><span className = "font-bold">Username: </span><span>{user.username}</span></p>
                }
                {user && user.email &&
                    <p><span className="font-bold">Email: </span><span>{user.email}</span></p>
                }
                {user && user.joinedDate &&
                    <p><span className="font-bold">Date joined: </span><span>{FormatDate(user.joinedDate)}</span></p>
                }
                {user && user.description && 
                    <div className = "text-base">{user.description}</div>
                }
            </div>
        </div>
    )
}

export default ProfilePanel; 