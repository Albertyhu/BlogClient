import { Base64Hooks } from '../../hooks/imageHooks.jsx'; 
import Avatar from '../../assets/images/avatar.jpg';
//This function checks if the image stored the argument profile_pic utilizes base64 format first.
//If not, the dataURL will convert it to base64 format. 
//The reason that this is necessary is because images retrieved from the server are not in base64 format
const RenderProfilePic = props => {
    const {
        profile_pic,
        altText = "Profile Picture",
        dimensions = "w-[270px] h-[270px]",
        clickEvent,
        customStyle = "", 
    } = props; 
    const ImageStyle = `select-none object-cover rounded-full mx-auto ${dimensions}`;
    const ImageWrapperStyle = `m-auto overflow-hidden relative z-[1] ${customStyle}`; 
    const { isBase64Image } = Base64Hooks()

    const dataURL = profile_pic ? !isBase64Image(profile_pic) ? `data:${profile_pic.contentType};base64,${profile_pic.data}` : profile_pic : Avatar;

    try {
        return (
            <div
                id="Link"
                className={ImageWrapperStyle}
                onClick={clickEvent ? clickEvent : null}
            >
                <img
                    //src={isBase64Image(profile_pic) ? profile_pic : dataURL}
                    src={profile_pic && Object.keys(profile_pic).length > 0 ? dataURL : Avatar}
                    alt={altText}
                    className={`${ImageStyle}`}
                />
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderProfilePic; 