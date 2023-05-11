import { useContext, useState, useEffect, lazy, Suspense } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'; 
import {
    AppContext,
    UserPhotoContext,
} from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'
const RenderProfilePic = lazy(()=>import('../../component/user/profilePicture.jsx')); 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
const RenderCoverPhoto = lazy(() => import('../../component/imageRendering/coverPhoto.jsx'));  
import { SubstituteCoverPhoto, SubstitutePanel } from '../../component/fallback.jsx';
import RenderUserPhotos from '../../component/userPhoto'; 
const PostPanel = lazy(()=>import("../../component/post/post_panel.jsx"))
//This component displays information of a single user. 
const ProfilePage = props => {
    const location = useLocation(); 
    const { username } = useParams(); 
    const {
        user,
        token,
        setLoading, 
        setMessage, 
        apiURL,
        decoded, 
    } = useContext(AppContext)
    const {
        fetchUserByName, 
    } = FetchHooks(apiURL, token, setLoading, setMessage); 
    const [profileId, setProfileId] = useState(location.state ? location.state.id? location.state.id : null : null)
    const [profileDetails, setProfileDetails] = useState(null)
    const [error, setError] = useState("")
    const navigate = useNavigate(); 
    const { GoEditProfile } = NavigationHooks(navigate); 
    const [posts, setPosts] = useState([]); 
    const [userPhotos, setUserPhotos] = useState([])

    const userPhotoContext = {
        userId: profileId, 
        username: username, 
        editmode: null, 
        toggleSelected: null, 
    } 

    var viewAllPosts = decoded ? decoded.username == username ? true : false : false; 

    useEffect(() => {
        if (username) {
            var dispatchFunctions = {
                setProfileDetails,
                setProfileId,
                setPosts,
                setUserPhotos, 
            }
            fetchUserByName(username, viewAllPosts, dispatchFunctions)
        }
    }, [username])

    useEffect(() => {
        if (posts && posts.length > 0) {
         //   console.log("posts: ", posts)
        }
    }, [posts])

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
            <Suspense fallback={<div>loading...</div>}>
                <RenderProfilePic
                    profile_pic={profileDetails && profileDetails.profile_pic ? profileDetails.profile_pic : null}
                    dimensions="border-[5px] border-white w-[270px] h-[270px]"
                    />
            </Suspense>
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
            {profileDetails && profileDetails.biography != "" &&
                <div className="mt-5 text-2xl text-black mx-auto w-11/12 md:w-10/12" id = "biography">&#09;{profileDetails.biography}</div>
            }
            {userPhotos && userPhotos.length > 0 &&
                <UserPhotoContext.Provider value={userPhotoContext}>
                    <div className="my-10">
                        <h2 className = "font-bold text-2xl mb-5" >Uploaded photos</h2>
                        <RenderUserPhotos
                            images={userPhotos}
                            selected={null}
                            displayViewMorePanel={true}
                            />
                    </div>
                </UserPhotoContext.Provider>

            }
            {posts && posts.length > 0 &&
                <div className = "w-11/12 md:w-10/12 mx-auto">
                    <h2 className="font-bold text-2xl my-5">Posts</h2>
                    {posts.map(entry => 
                        <Suspense fallback={<SubstitutePanel key={entry._id} />}>
                            <PostPanel
                                key={entry._id}
                                {...entry}
                            />
                    </Suspense> )}
                </div>
            }
        </div>
    )
}

export default ProfilePage; 