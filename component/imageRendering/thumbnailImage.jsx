import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const RenderThumbnail = props => {
    const {
        altText = "Main photo",
        image,
        customWrapperStyle = null,
    } = props;
    const { toBase64, isBase64Image } = Base64Hooks()
    const imageStyle = `h-full w-full object-cover`

    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        return (
            <div
                id="ThumbnailWrapper"
                className={`${customWrapperStyle ? customWrapperStyle : "w-full h-full overflow-hidden"}`}
            >
            <img
                src={isBase64Image(image) ? image : dataURL}
                alt={altText}
                className={`${imageStyle}`}
                />
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderThumbnail; 