import {
    useContext,
    useEffect,
} from 'react';
import {
    MenuLinksContext,
    AppContext,
} from '../../util/contextItem.jsx'; 
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AiOutlineHome, AiFillEdit } from 'react-icons/Ai';
import { RxPerson } from 'react-icons/Rx';
import { BiPhotoAlbum, BiLogOut, BiLogIn, BiCategoryAlt } from 'react-icons/bi';
import {
    FaRegWindowClose,
    FaUsers,
} from 'react-icons/Fa';
import { BsFillPersonPlusFill } from 'react-icons/Bs';
import { CiSettings } from 'react-icons/Ci';
import { Button } from './button.jsx'; 

const MenuLinks = props => {
    const {
        checkIfClickedOutside,

        //elemRef is a reference to the popup menu 
        elemRef, 
    } = useContext(MenuLinksContext)
    const { 
        user,
        token,
        ContainerRef, 
    } = useContext(AppContext)
    const navigate = useNavigate();
    const {
        GoHome,
        GoSignUp,
        GoSignIn,
        ViewAllUsers,
        VisitUser,
        GoUserPhotos,
        GoEditProfile,
        GoCategory, 
        GoSettings,
    } = NavigationHooks(navigate); 

    useEffect(() => {
        if (ContainerRef.current) {
            ContainerRef.current.addEventListener("mousedown", checkIfClickedOutside);
        }
        return () => {
            if (ContainerRef.current) {
                ContainerRef.current.removeEventListener("mousedown", checkIfClickedOutside);
            }
        }
    }, [ContainerRef.current])

    return (
        <>
            <Button
                title="Home"
                clickEvent={() => GoHome(null)}
                elemRef={elemRef}
                icon={() => <AiOutlineHome />}
            />
            <Button
                title="Categories"
                clickEvent={() => GoCategory()}
                elemRef={elemRef}
                icon={() => <BiCategoryAlt />}
            />
            {token ?
                <>
                    <Button
                        title="Your profile"
                        clickEvent={() => VisitUser(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <RxPerson />}
                    />
                    <Button
                        title="Your photos"
                        clickEvent={() => GoUserPhotos(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <BiPhotoAlbum />}
                    />
                    <Button
                        title="Edit profile"
                        clickEvent={() => GoEditProfile(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <AiFillEdit />}
                    />
                    <Button
                        title="View members"
                        clickEvent={() => ViewAllUsers(null)}
                        elemRef={elemRef}
                        icon={() => <FaUsers />}
                    />
                    <Button
                        title="Settings"
                        clickEvent={() => GoSettings(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <CiSettings />}
                    />
                    <Button
                        title="Log out"
                        clickEvent={() => localStorage.clear()}
                        elemRef={elemRef}
                        icon={() => <BiLogOut />}
                    />
                </>
                :
                <>
                    <Button
                        title="Sign in"
                        clickEvent={GoSignIn}
                        elemRef={elemRef}
                        icon={() => <BiLogIn />}
                    />
                    <Button
                        title="Create an account"
                        clickEvent={GoSignUp}
                        elemRef={elemRef}
                        icon={() => <BsFillPersonPlusFill />}
                    />
                </>
            }
            <Button
                title="Close"
                clickEvent={null}
                elemRef={elemRef}
                icon={() => <FaRegWindowClose />}
            /> 
        </>
        )
}

export default MenuLinks;