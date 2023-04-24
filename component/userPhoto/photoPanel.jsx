import { useContext, useState, useEffect, useRef } from 'react';
import {
    UserPhotoContext,
} from '../../util/contextItem.jsx'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from 'react-icons/Gi';
import { IconContext } from 'react-icons'; 
const PhotoPanel = props => {
    const {
        image,
        _id,
        title, 
        altText = "photo", 
        index, 
    } = props
    const {
        userId,
        username,
        editmode, 
        toggleSelected, 
    } = UserPhotoContext ? useContext(UserPhotoContext) : props; 

    //selected useState variable is used to determine whether or not the photos are selected 
    const [selected, setSelected] = useState(false)

    //.selectPhoto is a css value to mark selected photos 
    const toggleEvent = () => {
        toggleSelected(_id)
        setSelected(prev => !prev)
        if (imageRef.current.classList.contains("selectedPhoto")) {
            imageRef.current.classList.remove("selectedPhoto")
        }
        else {
            imageRef.current.classList.add("selectedPhoto")
        }
    }
    const navigate = useNavigate(); 
    const { isBase64Image } = Base64Hooks()
    const {  
        VisitOnePhoto, 
        } =NavigationHooks(navigate)
    const imageStyle = `h-full w-full md:w-full md:h-auto bg-bottom bg-cover top-[50%] translate-y-[-50%] 
                        absolute cursor-pointer`;
    const containerStyle = `w-full h-[150px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden
                            transition-[opacity_transform] opacity-0 duration-[1000ms] delay-[${400 * index}ms]
                            translate-y-[-20px] object-fit`;
    const dataURL = !isBase64Image(image) ? `data:${image.contentType};base64,${image.data}` : image;
    const imageRef = useRef(); 

    const FadeIn = () => {
        imageRef.current.classList.remove("opacity-0")
        imageRef.current.classList.remove("translate-y-[-20px]")
        imageRef.current.classList.add("opacity-100")
        imageRef.current.classList.add("translate-y-[0px]")
    }

    const clickEvent = () => {
        //Allows user to toggle the photo
        if (editmode) {
            toggleEvent()
        }
        else {
            VisitOnePhoto(username, userId, _id, image, title)
        }
    }

    useEffect(() => {
        FadeIn()
    }, [imageRef.current])
    
    try {
        return (
            <div
                id="MainImage"
                className={`${containerStyle}`}
                ref={imageRef}
                onClick={clickEvent}
            >
                <img
                    src={isBase64Image(image) ? image : dataURL}
                    alt={altText}
                    className={`${imageStyle}`}
                />
                {editmode && selected && 
                    <div
                        className="absolute left-auto right-[10px] top-[10px] z-[21]"
                    >
                        <IconContext.Provider value={
                            {
                                size: "25px",
                                color: "white",
                                border: "white"
                            }}>
                            <GiCheckMark />
                        </IconContext.Provider>
                    </div>
                }
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }

}

export default PhotoPanel; 