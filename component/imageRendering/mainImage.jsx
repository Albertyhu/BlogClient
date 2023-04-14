import { Base64Hooks } from '../../hooks/imageHooks.jsx'; 

const RenderImage = props => {
    const {
        altText = "Main photo",
        image,
    } = props;
    const { toBase64, isBase64Image } = Base64Hooks()
    const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] absolute`
    const containerStyle = `object-fit w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden`

    const dataURL = image ? `data:${image.contentType};base64,${image.data}` : null;
    try {
        return (
            <div
                id="MainImage"
                className={`${containerStyle}`}
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

export default RenderImage; 