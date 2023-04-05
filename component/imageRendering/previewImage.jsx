import { ImageHooks } from '../../hooks/imageHooks.jsx';

const RenderPreview= props => {
    const {
        altText = "Main photo",
        image,
    } = props;
    const { isBase64Image } = ImageHooks();
 //   const imageStyle = `h-full w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] absolute`
    const imageStyle = `h-full w-full`

    const containerStyle = `object-fit w-full h-full md:h-[250px] relative select-none bg-no-repeat overflow-hidden`

    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        //return (
        //    <div
        //        id="MainImage"
        //        className={`${containerStyle}`}
        //    >
        //        <img
        //            src={isBase64Image(image) ? image : dataURL}
        //            alt={altText}
        //            className={`${imageStyle}`}
        //        />
        //    </div>
        //)
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