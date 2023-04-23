import { useContext, useState, useEffect, useRef } from 'react';
import {
    AppContext,
    UserPhotoContext,
} from '../../util/contextItem.jsx'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 

const PhotoPanel = props => {
    const {
        image,
        _id,
        publishedDate, 
        lastEdited, 
        owner, 
        altText = "photo", 
        selectMode, 
        index, 
        panelRef, 
    } = props
    const {
        userId,
        username,
    } = UserPhotoContext ? useContext(UserPhotoContext) : props; 

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

    useEffect(() => {
        if (imageRef.current) {
            FadeIn()
        }
    }, [imageRef.current])

    try {
        return (
            <div
                id="MainImage"
                className={`${containerStyle} ${selectMode ? "border-2" : ""}`}
                ref={imageRef}
                onClick={()=>VisitOnePhoto(username, userId, _id)}
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

export default PhotoPanel; 