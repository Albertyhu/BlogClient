import {
    useContext,
    useEffect,
} from 'react';
import {
    MenuLinksContext,
    AppContext,
} from '../../util/contextItem.jsx'; 
import { useNavigate } from 'react-router-dom';
import {
    NavigationHooks,
    PostNavigationHooks, 
} from '../../hooks/navigation.jsx';
import { Button } from './button.jsx'; 
import {
    HomeIcon,
    EditIcon, 
    CategoryIcon,
    MagnifierIcon,
    UserIcon,
    GalleryIcon,
    PostIcon,
    FileIcon,
    GroupIcon,
    SettingsIcon,
    LogoutIcon,
    LogInIcon,
    ContractIcon,
    SignupIcon,
    CloseIcon
} from '../iconComponents.jsx';

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
        GoBulkUpload,
        GoSearchScreen
    } = NavigationHooks(navigate); 

    const {
        GoCreatePost, 
    } = PostNavigationHooks(navigate)

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
                icon={()=><HomeIcon />}
            />
            <Button
                title="Categories"
                clickEvent={() => GoCategory()}
                elemRef={elemRef}
                icon={() => <CategoryIcon />}
            />
            <Button
                title="Search site"
                clickEvent={() => GoSearchScreen()}
                elemRef={elemRef}
                icon={() => <MagnifierIcon />}
            />
            {token ?
                <>
                    <Button
                        title="Your profile"
                        clickEvent={() => VisitUser(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <UserIcon />}
                    />
                    <Button
                        title="Your photos"
                        clickEvent={() => GoUserPhotos(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <GalleryIcon />}
                    />
                    <Button
                        title="Create new post"
                        clickEvent={() => GoCreatePost()}
                        elemRef={elemRef}
                        icon={() => <PostIcon />}
                    />
                    <Button
                        title="Upload photos"
                        clickEvent={() => GoBulkUpload(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <FileIcon />}
                    />
                    <Button
                        title="Edit profile"
                        clickEvent={() => GoEditProfile(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <EditIcon />}
                    />
                    <Button
                        title="View members"
                        clickEvent={() => ViewAllUsers(null)}
                        elemRef={elemRef}
                        icon={()=><GroupIcon />}
                    />
                    <Button
                        title="Settings"
                        clickEvent={() => GoSettings(user.username, user.id)}
                        elemRef={elemRef}
                        icon={() => <SettingsIcon />}
                    />
                    <Button
                        title="Log out"
                        clickEvent={() => localStorage.clear()}
                        elemRef={elemRef}
                        icon={() => <LogoutIcon />}
                    />
                </>
                :
                <>
                    <Button
                        title="Sign in"
                        clickEvent={GoSignIn}
                        elemRef={elemRef}
                        icon={() => <LogInIcon />}
                    />
                    <Button
                        title="Create an account"
                        clickEvent={GoSignUp}
                        elemRef={elemRef}
                        icon={() => <SignupIcon />}
                    />
                </>
            }
            <Button
                title="Close"
                clickEvent={null}
                elemRef={elemRef}
                icon={() => <CloseIcon />}
            /> 
        </>
        )
}

export default MenuLinks;