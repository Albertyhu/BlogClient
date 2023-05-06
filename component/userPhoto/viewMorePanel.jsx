import { useContext, useEffect, useRef } from 'react';
import {
    UserPhotoContext,
} from '../../util/contextItem.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/Ai';
import { IconContext } from 'react-icons'; 
const PhotoPanel = props => {
    const {
        delayCount = 6,
    } = props; 
    const {
        userId,
        username,
    } = UserPhotoContext ? useContext(UserPhotoContext) : props; 

    const navigate = useNavigate(); 

    const {  
        GoUserPhotos,
        } =NavigationHooks(navigate)

    const containerStyle = `w-full h-[360px] sm:h-[250px] md:h-[250px] relative select-none bg-no-repeat overflow-hidden
                            transition-[opacity_transform] opacity-0 duration-[1000ms]
                            translate-y-[-20px] bg-black cursor-pointer`;

    const imageRef = useRef(); 

    const FadeIn = () => {
        imageRef.current.classList.remove("opacity-0")
        imageRef.current.classList.remove("translate-y-[-20px]")
        imageRef.current.classList.add("opacity-100")
        imageRef.current.classList.add("translate-y-[0px]")

    }

    useEffect(() => {
        var cancelTO = setTimeout(() => { FadeIn() }, 400 * delayCount)
        return () => { clearTimeout(cancelTO)}
    }, [imageRef.current])

    try {
        return (
            <div
                id="MainImage"
                className={`${containerStyle}`}
                ref={imageRef}
                onClick={() => GoUserPhotos(username, userId, null)}
            >
                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                    <h3 className="text-white font-bold text-center">View more</h3>
                    <IconContext.Provider value={{size: "50px", color: "white"}}>
                        <AiOutlinePlus className= "m-auto"/>
                    </IconContext.Provider>
                </div>
            </div>
        )
    } catch (e) {
        console.log("error in rendering image: ", e)
    }

}

export default PhotoPanel; 