import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../util/contextItem.jsx'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx'; 

const RenderImage = props => {
    const {
        altText = "Main photo",
        image,
    } = props;

    const {
        ContainerRef, 
    } = useContext(AppContext); 
    const { toBase64, isBase64Image } = Base64Hooks()

    const [lightbox, setLightbox] = useState(false);
    const lightboxRef = useRef(); 
    const lightboxStyle = `h-auto w-11/12 md:w-6/12 bg-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
                        fixed z-[100]`
    const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] 
                        absolute object-cover cursor-pointer `
    const containerStyle = `w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden 
                        hover:border-4 hover:border-[#333333]`
    
    const dataURL = !isBase64Image(image) ? `data:${image.contentType};base64,${image.data}` : image;
    const clickEvent = evt => {
        if (lightbox && lightboxRef.current != evt.target) {
            setLightbox(false); 
        }
    }
    ContainerRef.current.addEventListener('mousedown', clickEvent)
    useEffect(() => { }, [])

    try {
        return (
            <>
                <div
                    id="MainImage"
                    className={`${containerStyle}`}
                    onClick={() => setLightbox(true)}
                >
                    <img
                        src={isBase64Image(image) ? image : dataURL}
                        alt={altText}
                        className={`${imageStyle}`}
                    />
                </div>
                {lightbox && 
                    <img
                        src={isBase64Image(image) ? image : dataURL}
                        alt={`$altText} lightbox`}
                        className={`${lightboxStyle}`}
                        id="lightbox"
                        ref={lightboxRef}
                    />
                }
            </>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}

export default RenderImage; 