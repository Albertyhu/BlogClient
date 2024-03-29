import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const RenderCover = props => {
    //isPreview determines whether or not the photo will be darkened. If it is a preview, it is not darkened. 
    const {
        altText = "Cover photo",
        image,
        title,
        isPreview = false,
        customContainerStyle = null, 
    } = props; 
    const {
        toBase64,
        isBase64Image } = Base64Hooks()
    const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] absolute 
                        object-cover`
    const containerStyle = `w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden`
    const beforeStyle = ` before:opacity-40 before:w-full before:h-full before:bg-black
        before:z-[1] before:absolute before:top-0 before:left-0 before:right-0 before:bg-center before:bg-cover`
    const titleStyle = `absolute top-[50%] translate-y-[-50%] right-0 left-0 text-white font-bold text-lg z-[1]
        sm:text-2xl md:text-4xl`
    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        return (
            <div
                id="CoverPhoto"
                className={`${customContainerStyle ? customContainerStyle : containerStyle} ${!isPreview ? beforeStyle: ""}`}
            >
                {title &&
                    <div
                        className={titleStyle}
                    >{title}</div>}
                <img
                    src={isBase64Image(image) ? image : dataURL}
                    alt={altText}
                    className={`${imageStyle}`}
                />
            </div>
        )
    } catch (e) {
        console.log("error in rendering cover image: ", e)
    }
}

export default RenderCover; 