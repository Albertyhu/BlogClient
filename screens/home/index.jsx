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
const RenderProfilePic = lazy(() => import('../../component/user/profilePicture.jsx'));

const Home = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { GoSignIn, GoSignUp } = NavigationHooks(navigate);
    const { user,
            apiURL,
            ClearUserData,
            displayMemberComponents,
            ProfilePicture,
            setMessage, 
    } = useContext(AppContext);
    const { FetchProfilePic } = FetchHooks()
    const FetchImageURL = user ? `${apiURL}/users/${user.id}/profilepicture` : null; 
    const [profileImage, setProfileImage] = useState(null)



    const { DeleteUser } = UserProfileHooks(); 
 
    const dispatchFunctions = {
        ClearUserData,
        navigate
    }

    useEffect(() => {
        user ? console.log("userID: ", user.id) : null;
        if (user) {
            FetchProfilePic(FetchImageURL, setProfileImage, true)
            
        }
    }, [user])

    useEffect(() => {
        if (location.state.message != null) {
            const {
                message
            } = location.state; 
            if(message && message.length > 0)
                setMessage(message)
            console.log(location.state.message)
        }
    }, [location.state])

    return (
        <div
            className = "w-full text-center text-lg text-black" 
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Home</h1>
            {profileImage && <RenderProfilePic profile_pic={profileImage} />}
            <div className= "[&>*]:inline-block grid [&>*]:my-10 ">
            <button
                    type="button"
                    value="Sign In"
                    className="btn-primary"
                    onClick={useCallback(() =>GoSignIn(), [navigate])}
            >Sign In</button>
            <button
                type='button'
                className='btn-secondary'
                value="Sign Up"
                onClick={useCallback(() => GoSignUp(), [navigate])}
                >Sign Up</button>
            {user && displayMemberComponents &&  
                <button
                        type='button'
                        className='btn-delete'
                        value="Sign Up"
                        onClick={() => { DeleteUser(apiURL, user.id, dispatchFunctions)} }
                >Delete Account</button>
            }
            </div>
    </div>)
}

export default Home; 