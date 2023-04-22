import { Base64Hooks } from '../../hooks/imageHooks.jsx'; 

//This function checks if the image stored the argument profile_pic utilizes base64 format first.
//If not, the dataURL will convert it to base64 format. 
//The reason that this is necessary is because images retrieved from the server are not in base64 format
const RenderProfilePic = props => {
    const {
        profile_pic,
        altText = "Profile Picture",
        dimensions = "w-[270px] h-[270px]",
        clickEvent,
    } = props;
    const ImageStyle = `select-none object-cover rounded-full mx-auto ${dimensions}`;
    const ImageWrapperStyle = `m-auto overflow-hidden relative z-[1]`; 
    const { isBase64Image } = Base64Hooks()
    const dataURL = !isBase64Image(profile_pic) ? `data:${profile_pic.contentType};base64,${profile_pic.data}` : profile_pic;
   
    try {
        return (
            <div
                id="ImageWrapper"
                className={ImageWrapperStyle}
                onClick={clickEvent}
            >
                <img
                    src={isBase64Image(profile_pic) ? profile_pic : dataURL}
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