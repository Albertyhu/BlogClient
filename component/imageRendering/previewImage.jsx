import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const RenderPreview= props => {
    const {
        altText = "Main photo",
        image,
    } = props;
    const { toBase64, isBase64Image } = Base64Hooks()
    const imageStyle = `h-full w-full`

    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        return (
            <img
                src={isBase64Image(image) ? image : dataURL}
                alt={altText}
                className={`${imageStyle}`}
            />
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderPreview; 