import { useState } from 'react'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const RenderCover = props => {
    //isPreview determines whether or not the photo will be darkened. If it is a preview, it is not darkened. 
    const {
        altText = "Cover photo",
        image,
        title,
        isPreview = true,
        customContainerStyle = null,
    } = props;
    const [scrollPosition, setScrollPosition] = useState(0);

    const {
        toBase64,
        isBase64Image } = Base64Hooks()
    //const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] absolute
    //                    object-cover`
    const imageStyle = `absolute w-full h-full bg-bottom bg-[url(${image})] bg-fixed`
    const containerStyle = `w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden mb-10`
    const beforeStyle = ` before:opacity-40 before:w-full before:h-full before:bg-black
        before:z-[1] before:absolute before:top-0 before:left-0 before:right-0 before:bg-center before:bg-cover`
    const titleStyle = `absolute top-[50%] translate-y-[-50%] right-0 left-0 text-black font-bold text-lg z-[1]
        sm:text-2xl md:text-4xl text-center`
    const dataURL = `data:${image.contentType};base64,${image.data}`;
    try {
        return (
            <div
                id="ParallaxContainer"
                className={`${customContainerStyle ? customContainerStyle : containerStyle} ${!isPreview ? beforeStyle : ""}`}
            >
                {title &&
                    <div
                        className={titleStyle}
                    >{title}</div>}
                <div
                    id="ParallaxImage"
                    className={`${imageStyle}`}
                ></div>
            </div>
        )
    } catch (e) {
        console.log("error in rendering cover image: ", e)
    }
}

export default RenderCover; 