import { useContext } from 'react'; 
import { ReplyContext } from '../../util/contextItem.jsx';
import avatar from '../../assets/images/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import ProfilePic from '../user/profilePicture.jsx';

const Header = props => {
    const navigate = useNavigate(); 
    const { VisitUser } = NavigationHooks(navigate); 
    const {
        author,
    } =  props; 
    return (
        <div
            id="ProfilePicField"
            className="inline-flex cursor-pointer"
            onClick={() => VisitUser(author.username, author._id)}
        >
            <ProfilePic
                profile_pic={author.profile_pic ? author.profile_pic : avatar}
                altText={`${author.username} profile picture`}
                dimensions="w-[50px] h-[50px]"
            />
            <div className="w-fit ml-5">
                <h2 className="text-2xl font-bold">{author.username}</h2>
            </div>
        </div>
        )
}

export default Header; 