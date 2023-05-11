import { Base64Hooks } from '../../hooks/imageHooks.jsx';
import { ArrowField } from '../userPhoto/navigation.jsx';

const RenderImage = props => {
    const {
        altText = "Main photo",
        image,
        customStyle = "",
        photoIdArray = [],
        currentPhotoId, 
    } = props;
    const { isBase64Image } = Base64Hooks()
    const imageStyle = `h-auto w-full md:w-full md:h-auto object-cover ${customStyle}`

    const dataURL = !isBase64Image(image) ? `data:${image.contentType};base64,${image.data}` : null;
    try {
        return photoIdArray.length > 0 && currentPhotoId ?
            <div
                id="PhotoDetailWrapper"
                className= "relative object-fit h-fit w-full md:w-full md:fit "
            >
                <ArrowField
                    currentPhotoId={currentPhotoId}
                    photoIdArray={photoIdArray}
                />
                <img
                    src={isBase64Image(image) ? image : dataURL}
                    alt={altText}
                    className={`${imageStyle}`}
                />
            </div>
            :
            <img
                src={isBase64Image(image) ? image : dataURL}
                alt={altText}
                className={`${imageStyle}`}
            />
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderImage; 