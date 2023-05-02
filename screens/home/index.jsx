import React, { useCallback, useContext, useEffect, useState, lazy} from 'react'; 
import { Button } from '../../component/button.jsx';
import {
    useNavigate,
    useLocation, 
} from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { UserProfileHooks } from '../../hooks/userProfileHooks.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'; 
import ProfilePanel from '../../component/user/profilePanel.jsx'; 
import PaginatedDisplay from '../../component/post/paginatedDisplay.jsx'; 

const RenderProfilePic = lazy(() => import('../../component/user/profilePicture.jsx'));

const Home = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { GoSignIn, GoSignUp } = NavigationHooks(navigate);
    const {
        user,
        apiURL,
        ClearUserData,
        displayMemberComponents,
        ProfilePicture,
        setMessage,
        token,
        setLoading, 
        decoded, 
    } = useContext(AppContext);
    const { FetchProfilePic } = FetchHooks(apiURL, token, setLoading, setMessage)
    const FetchImageURL = user ? `${apiURL}/users/${user.id}/profilepicture` : null; 
    const [profileImage, setProfileImage] = useState(null)


    const { DeleteUser } = UserProfileHooks(apiURL, token, setLoading, setMessage); 
 
    const dispatchFunctions = {
        ClearUserData,
        navigate
    }

    useEffect(() => {
        if (user) {
            FetchProfilePic(FetchImageURL, setProfileImage, true)
        }
    }, [user])

    useEffect(() => {
        if (location.state != null) {
            const {
                message
            } = location.state; 
            if(message && message.length > 0)
                setMessage(message)
        }
    }, [location.state])

    return (
        <div
            className="w-full" 
            id="Container"
        >
            <h1 className="text-center mx-auto my-[20px] text-2xl">Home</h1>
            <div
                className= "grid w-11/12 mx-auto md:grid-cols-[75%_25%] md:gap-[20px]"
            >
                <div>
                    <PaginatedDisplay />
                </div>
                <ProfilePanel userId={decoded.id} />
            </div>
        </div>
    )
}

export default Home; 