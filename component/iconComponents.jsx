import HomePng from '../assets/icons/home.png';
import categoryPng from '../assets/icons/category.png';
import magnifierPng from '../assets/icons/magnifier.png';
import userPng from '../assets/icons/user.png';
import galleryPng from '../assets/icons/gallery.png';
import postPng from '../assets/icons/post.png';
import filePng from '../assets/icons/file.png';
import groupPng from '../assets/icons/group.png';
import settingsPng from '../assets/icons/settings.png';
import logoutPng from '../assets/icons/logout.png';
import logInPng from '../assets/icons/log-in.png';
import contractPng from '../assets/icons/contract.png';
import signupPng from '../assets/icons/signup.png';
import closePng from '../assets/icons/close.png';
import editPng from '../assets/icons/editing.png'; 
import like_blue from '../assets/icons/like-blue.png';
import like_outline from '../assets/icons/like-outline.png';
import commentPng from '../assets/icons/comment.png'; 
import deletePng from '../assets/icons/delete.png'; 
import whiteDeletePng from '../assets/icons/delete-white.png'
import sharePng from '../assets/icons/share.png'; 
import { useContext } from 'react'; 

import { IconContext } from '../util/contextItem.jsx'; 

 const IconComp = props => {
    const {
        image,
        altText = "icon",
        contextItem, 
    } = props; 

    const {
        size = "25",
        customStyle = ''
    } = contextItem ? useContext(contextItem) : props; 

    return (
        <img
            src={image}
            alt={altText}
            className={`w-[${size}px] h-[${size}px] ${customStyle}`}
        />
        )
}

 const HomeIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props; 
    return <IconComp
        image={HomePng}
        size={size}
        customStyle={customStyle }
        />
}

 const EditIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={editPng}
        size={size}
        customStyle={customStyle}
    />
}

 const CategoryIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={categoryPng}
        size={size}
        customStyle={customStyle}
    />
}

 const MagnifierIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={magnifierPng}
        size={size}
        customStyle={customStyle}
    />
}


 const UserIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={userPng}
        size={size}
        customStyle={customStyle}
    />
}


 const GalleryIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={galleryPng}
        size={size}
        customStyle={customStyle}
    />
}

 const PostIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={postPng}
        size={size}
        customStyle={customStyle}
    />
}


 const FileIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={filePng}
        size={size}
        customStyle={customStyle}
    />
}


 const GroupIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={groupPng}
        size={size}
        customStyle={customStyle}
    />
}


 const SettingsIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={settingsPng}
        size={size}
        customStyle={customStyle}
    />
}

 const LogoutIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={logoutPng}
        size={size}
        customStyle={customStyle}
    />
}


 const LogInIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={logInPng}
        size={size}
        customStyle={customStyle}
    />
}

 const ContractIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={contractPng}
        size={size}
        customStyle={customStyle}
    />
}

 const SignupIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={signupPng}
        size={size}
        customStyle={customStyle}
    />
}


 const CloseIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={closePng}
        size={size}
        customStyle={customStyle}
    />
}

 const LikeIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={like_outline}
        size={size}
        customStyle={customStyle}
    />
}

 const BlueLikeIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={like_blue}
        size={size}
        customStyle={customStyle}
    />
}

 const CommentIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={commentPng}
        size={size}
        customStyle={customStyle}
    />
}

const DeleteIcon = props => {
    const {
        size = "25",
        customStyle = '',
        white = false, 
    } = props;
    return <IconComp
        image={white ? whiteDeletePng : deletePng}
        size={size}
        customStyle={customStyle}
    />
}

const ShareIcon = props => {
    const {
        size = "25",
        customStyle = ''
    } = props;
    return <IconComp
        image={sharePng}
        size={size}
        customStyle={customStyle}
    />
}

export {
    HomeIcon,
    CategoryIcon,
    EditIcon,
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
    CloseIcon,
    LikeIcon,
    BlueLikeIcon,
    CommentIcon,
    DeleteIcon, 
    ShareIcon
};