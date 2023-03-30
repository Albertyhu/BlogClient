import { ImageHooks } from '../../hooks/imageHooks.jsx';

const RenderThumbnail = props => {
    const {
        altText = "",
        image,
    } = props;
    const { isBase64Image } = ImageHooks();
    const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] absolute`
    const containerStyle = `object-fit w-full max-h-[250px] md:h-[300px] relative select-none bg-no-repeat overflow-hidden`
    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        return (
            <div
                id="PostThumbnail"
                className={`${containerStyle}`}
            >
                <img
                    src={isBase64Image(image) ? image : dataURL}
                    alt={`${altText} photo`}
                    className={`${imageStyle}`}
                />
            </div>
        )
    } catch (e) {
        console.log("error in rendering cover image: ", e)
    }
}

export default RenderThumbnail; 