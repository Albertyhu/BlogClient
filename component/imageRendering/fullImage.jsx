import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const RenderImage = props => {
    const {
        altText = "Main photo",
        image,
        customStyle = ""
    } = props;
    const { isBase64Image } = Base64Hooks()
    const imageStyle = `h-auto w-full md:w-full md:h-auto object-cover ${customStyle}`

    const dataURL = !isBase64Image(image) ? `data:${image.contentType};base64,${image.data}` : null;
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

export default RenderImage; 