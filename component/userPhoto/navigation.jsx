import { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { NavigationHooks  } from '../../hooks/navigation.jsx'; 
import LeftArrow from '../../assets/icons/left-white.png';
import RightArrow from '../../assets/icons/right-white.png'; 
import { UserPhotoContext, } from '../../util/contextItem.jsx'; 
import { GetNeighboringPhotos } from '../../hooks/userPhotoHooks.jsx'; 

//This component renders the arrow buttons for navigating between the user's photos
export const ArrowButton = props => {
    const {
        left, 
        photoId,
    } = props;  

    const {
        owner,
    } = useContext(UserPhotoContext)

    const ArrowFieldStyle = `w-fit h-fit cursor-pointer rounded-full p-1 bg-[rgba(255,255,255,0.4)] md:bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)] absolute 
            top-[50%] translate-y-[-%50%] ${left ? "left-[5px] right-auto" : "left-auto right-[5px]"}`
    const ArrowStyle = `w-[25px] h-[25px]  md:w-[50px] md:h-[50px] opacity-100 md:opacity-30`
    const navigate = useNavigate(); 
    const { VisitOnePhoto } = NavigationHooks(navigate)
    return (
        <div
            id="Arrow Button"
            onClick={() => VisitOnePhoto(owner.username, owner._id, photoId, null)}
            className={`${ArrowFieldStyle}`}
        >
            {left ? 
                <img
                    src={LeftArrow}
                    alt="left arrow"
                    className={`${ArrowStyle}`}

                />
                :
                <img
                    src={RightArrow}
                    alt="right arrow"
                    className={`${ArrowStyle}`}

                />
                }
        </div>
        )
}

export const ArrowField = props => {
    const {
        currentPhotoId, 
        photoIdArray, 
    } = props; 
    const neighbors = GetNeighboringPhotos(currentPhotoId, photoIdArray)
    return (
        <div
            id="ArrowField"
            className = "w-full h-fit absolute top-[50%] translate-y-[-50%]"
        >
            {neighbors && neighbors.left &&
                <ArrowButton
                photoId={neighbors.left}
                left={true}
                />
            }
            {neighbors && neighbors.right &&
                <ArrowButton
                    photoId={neighbors.right}
                    left={false}
                />
            }
        </div>
        )
}