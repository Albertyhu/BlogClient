import { useContext, useState, useEffect, lazy, Suspense } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'
const RenderProfilePic = lazy(()=>import('../../component/user/profilePicture.jsx')); 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
const RenderCoverPhoto = lazy(() => import('../../component/imageRendering/coverPhoto.jsx'));  
import { SubstituteCoverPhoto } from '../../component/fallback.jsx';

//This component displays information of a single user. 
const ProfilePage = props => {
    const location = useLocation(); 
    const { username } = useParams(); 
    const {
        user,
        token,
        setLoading, 
        setMessage, 
        apiURL } = useContext(AppContext)
    const {
        fetchUserDetails,
        fetchUserByName, 
    } = FetchHooks(apiURL, token, setLoading, setMessage); 
    const [profileId, setProfileId] = useState(location.state ? location.state.id? location.state.id : null : null)
    const [profileDetails, setProfileDetails] = useState(null)
    const [error, setError] = useState("")
    const navigate = useNavigate(); 
    const { GoEditProfile } = NavigationHooks(navigate); 
    const [decoded, setDecoded] = useState(null)

    useEffect(() => {
        if (username) {
            var dispatchFunctions = {
                setProfileDetails,
                setProfileId
            }
            fetchUserByName(username, dispatchFunctions)
        }
    }, [username])

    useEffect(() => {
        if (token) {
            setDecoded(DecodeToken(token))
        }
    }, [token])

    useEffect(() => {
        window.addEventListener("load", () => scrollTo(0, 0))
        return () => {
            window.removeEventListener("load", () => scrollTo(0, 0))
        }
    }, [])

    return (
        <div className = 'text-center mt-[20px]'>
            {error != "" &&
                <div className="text-lg">{error}</div>
            }
            {profileDetails && profileDetails.coverPhoto && Object.keys(profileDetails.coverPhoto).length > 0 &&
                <Suspense fallback={<SubstituteCoverPhoto title={null} />}>
                <RenderCoverPhoto
                        image={profileDetails.coverPhoto}
                        altText={`${profileDetails.username} cover photo`}
                        title={null}
                        isPreview={true}
                        customContainerStyle= "w-full h-[150px] md:h-[250px] absolute top-[50px] md:top-0 left-0 right-0 select-none bg-no-repeat overflow-hidden"
                />
            </Suspense>
            }
            {profileDetails && profileDetails.profile_pic &&
                <RenderProfilePic
                    profile_pic={profileDetails.profile_pic}
                    dimensions="border-[5px] border-white w-[270px] h-[270px]"
            />
            }
            <h1 className="font-bold text-2xl">{username}'s profile</h1>

            {profileDetails && profileDetails.email &&
                <div className="text-2xl text-black">{profileDetails.email}</div>
            }
            {decoded && profileDetails && decoded.id.toString() == profileDetails._id.toString() &&
                <button
                    className="btn-secondary whitespace-nowrap mt-[20px]"
                    onClick={() => { GoEditProfile(profileDetails.username, profileDetails._id) }}
                >Edit Profile</button>
            }
            {profileDetails && profileDetails.biography.trim() != "" &&
                <div className="mt-5 text-2xl text-black mx-auto w-11/12 md:w-8/12" id = "biography">&#09;{profileDetails.biography}</div>
            }
        </div>
    )
}

export default ProfilePage; 