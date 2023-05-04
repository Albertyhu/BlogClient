import {lazy, Suspense } from 'react';
import { useNavigation } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import Avatar from '../../assets/images/avatar.jpg'; 
const ProfilePicture = lazy(() => import("../user/profilePicture.jsx")); 

const ConnectionPanel = props => {
    const {
        username, 
        _id, 
        profile_pic, 
    } = props; 
    const navigate = useNavigation(); 
    const { VisitUser } = NavigationHooks(navigate); 
    return (
        <div
            className="w-fit cursor-pointer"
            clickEvent={() => { VisitUser(username, _id) }}
        >
            <Suspense>
                <ProfilePicture
                dimensions="w-[100px] h-[100px]"
                profile_pic={profile_pic ? profile_pic : Avatar}
                altText={`${username} profile picture`}
                />
            </Suspense>
            <h2 className="text-center font-bold text-base">{username}</h2>
        </div>
        )
} 

export default ConnectionPanel; 