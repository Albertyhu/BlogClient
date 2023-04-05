import { useRef, useEffect} from 'react'; 
import { ImageHooks } from '../../hooks/imageHooks.jsx';
import RedDelete from '../../assets/icons/cancel-red.png'; 
import WhiteDelete from '../../assets/icons/cancel-white.png'; 

const RenderPreview= props => {
    const {
        altText = "Main photo",
        image,
        deleteImage,
        index, 
    } = props;
    const { isBase64Image } = ImageHooks();
    const imageStyle = `h-full w-full`
    const imageRef = useRef(); 
    const desktopDelete = useRef(); 
    const containerStyle = `object-fit w-full h-full relative select-none bg-no-repeat overflow-hidden cursor-pointer`
    const beforeStyle = `before:w-full before:h-full before:absolute before:left-0 before:top-0 before:right-0 before:bg-black before:opacity-50 before:transition-[display] before:z-[1] before:duration-[500ms]`; 
    const dataURL = `data:${image.contentType};base64,${image.data}`;
    const mobileDelete = `absolute md:hidden w-[25px] h-[25px] top-[5px] right-[5px] left-auto`
    const desktopDeleteStyle=`absolute top-[50%] translate-y-[-50%] right-0 left-[50%] translate-x-[-50%] z-[5] w-[50px] h-[50px]`
    const mouseoverEvent = evt => {
        imageRef.current.classList.remove("before:hidden");
        imageRef.current.classList.add("before:block");
        desktopDelete.current.classList.remove("hidden"); 
        desktopDelete.current.classList.add("block"); 
    }

    const mouseoutEvent = evt => {
        imageRef.current.classList.remove("before:block"); 
        imageRef.current.classList.add("before:hidden");
        desktopDelete.current.classList.remove("block");
        desktopDelete.current.classList.add("hidden"); 
    }

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener("mouseover", mouseoverEvent)
            imageRef.current.addEventListener("mouseout", mouseoutEvent)
        }
        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener("mouseover", mouseoverEvent)
                imageRef.current.removeEventListener("mouseout", mouseoutEvent)
            }

        }
    }, [imageRef.current])
    try {
        return (
            <div
                className={`${containerStyle} ${beforeStyle} before:hidden`}
                ref={imageRef}
                onClick={()=>deleteImage(index)}
            >
                <img
                    src={isBase64Image(image) ? image : dataURL}
                    alt={altText}
                    className={`${imageStyle}`}
                />
                <img
                    id="mobile_delete_icon"
                    src={RedDelete}
                    className={`${mobileDelete}`}
                    alt="mobile delete icon"
                />
                <img
                    id="desktop_delete_icon"
                    src={WhiteDelete}
                    className={`${desktopDeleteStyle} hidden`}
                    ref={desktopDelete}
                    alt="desktop delete icon"
                />
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }
}


export default RenderPreview; 