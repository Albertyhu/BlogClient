import {useContext, useState, useEffect, lazy } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'
const RenderProfilePic = lazy(()=>import('../../component/user/profilePicture.jsx')); 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';

const ProfilePage = props => {
    const location = useLocation(); 
    const { id } = location.state; 
    const { username } = useParams(); 
    const {
        user,
        token,
        setLoading, 
        apiURL } = useContext(AppContext)
    const { fetchUserDetails } = FetchHooks(apiURL, setLoading); 
    const [profileDetails, setProfileDetails] = useState(null)
    const [error, setError] = useState("")
    const navigate = useNavigate(); 
    const { GoEditProfilePicture } = NavigationHooks(navigate); 
    const [decoded, setDecoded] = useState(null)
    useEffect(() => {
        fetchUserDetails(id, setProfileDetails, setError)
        window.scrollTo(0,0)
    }, [id])

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token))
        }
    }, [token])

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
            {decoded && decoded.id.toString() == id.toString() &&
                <button
                    className="btn-secondary whitespace-nowrap mt-[20px]"
                    onClick={() => { GoEditProfilePicture(username, id) }}
                >Edit Profile Picture</button>
            }
            {profileDetails && profileDetails.biography.trim() != "" &&
                <div className="mt-5 text-2xl text-black" id = "biography">&#09;{profileDetails.biography}</div>
            }
        </div>
    )
}

export default ProfilePage; 