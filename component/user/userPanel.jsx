import React, { lazy,  Suspense } from 'react';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import {
    Link, 
    useNavigate,
} from 'react-router-dom';

import Avatar from '../../assets/images/avatar.jpg'
const RenderProfilePic = lazy(() => import('./profilePicture.jsx'));

const ProfilePanel = props => {
    const {
        _id,
        username,
        profile_pic, 
    } = props;
    const navigate = useNavigate();
    const {
        VisitUser,
        GoEditProfileAsAdmin, 
    } = NavigationHooks(navigate);
    return (
        <div
            className="w-full text-center text-lg text-black rounded-lg bg-[#ffffff] py-10 mr-10 box_shadow mb-5 cursor-pointer"
            id="ProfileContainer"
         //   onClick={() => VisitUser(username, _id) }
        >
            <div
                className="w-11/12 mx-auto"
                id="ProfileWrapper"
            >
                {profile_pic &&
                    <Suspense fallback={<div className="rounded-full w-[100px]  h-[100px] sm:w-[150px] sm:h-[150px] md:w-[270px] md:h-[270px]">Profile image loading</div>}>
                        <RenderProfilePic
                            profile_pic={profile_pic ? profile_pic : Avatar}
                            dimensions="w-[100px]  h-[100px] sm:w-[150px] sm:h-[150px] md:w-[270px] md:h-[270px]"
                        />
                    </Suspense>
                }
                {username &&
                    <p><span className="font-bold">{username}</span></p>
                }
                <Link
                    to={`/profile/${_id}/editProfileAsAdmin`}
                    state={{
                        id: _id,
                    }}
                >
                    <button
                       
                    type="button"
                    className="btn-primary"
                    onClick={()=>GoEditProfileAsAdmin(_id)}
                    >Edit Profile
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProfilePanel; 