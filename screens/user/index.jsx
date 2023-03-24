import {useContext, useState, useEffect, lazy } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'
const RenderProfilePic = lazy(()=>import('../../component/user/profilePicture.jsx')); 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
const ProfilePage = props => {
    const location = useLocation(); 
    const { id } = location.state; 
    const { username } = useParams(); 
    const { } = props; 
    const { user, token, apiURL } = useContext(AppContext)
    const { fetchUserDetails } = FetchHooks(); 
    const [profileDetails, setProfileDetails] = useState(null)
    const [error, setError] = useState("")
    const navigate = useNavigate(); 
    const { GoEditProfilePicture } = NavigationHooks(navigate); 
    useEffect(() => {
        fetchUserDetails(apiURL, id, setProfileDetails, setError)
    }, [id])

    //useEffect(() => {
    //    console.log("profileDetails: ", profileDetails)
    //}, [profileDetails])
    return (
        <div className = 'text-center mt-[20px]'>
            <h1 className="font-bold text-2xl">{username}'s profile</h1>
            {error != "" && 
                <div className="text-lg">{error}</div>
            }
            {profileDetails && profileDetails.email && 
                <div className = "text-2xl text-black">{profileDetails.email}</div>
            }
            {profileDetails && profileDetails.profile_pic &&
                <RenderProfilePic profile_pic={profileDetails.profile_pic} />
            }
            {profileDetails && profileDetails.biography.trim() != "" &&
                <div className="text-2xl text-black" id = "biography">&#09;{profileDetails.biography}</div>
            }
            <button
                className="btn-secondary whitespace-nowrap mt-[20px]"
                onClick={() => { GoEditProfilePicture(username, id)} }
            >Edit Profile Picture</button>
        </div>
    )
}

export default ProfilePage; 