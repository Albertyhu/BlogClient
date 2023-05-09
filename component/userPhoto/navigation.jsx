import { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { NavigationHooks  } from '../../hooks/navigation.jsx'; 
import LeftArrow from '../../assets/icons/left-white.png';
import RightArrow from '../../assets/icons/right-white.png'; 
import { UserPhotoContext, } from '../../util/contextItem.jsx'; 
import { GetNeighboringPhotos } from '../../hooks/userPhotoHooks.jsx'; 

//This component
export const ArrowButton = props => {
    const {
        left, 
        photoId,
    } = props;  

    const {
        owner,
    } = useContext(UserPhotoContext)

    const navigate = useNavigate(); 
    const { VisitOnePhoto } = NavigationHooks(navigate)
    return (
        <div
            id="Arrow Button"
            onClick={() => VisitOnePhoto(owner.username, owner._id, photoId, null)}
            className={`w-fit h-fit cursor-pointer rounded-full p-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)] absolute ${left ? "left-[5px] right-auto" : "left-auto right-[5px]"}`}
        >
            {left ? 
                <img
                    src={LeftArrow}
                    alt="left arrow"
                    className="w-[50px] h-[50px] opacity-30"

                />
                :
                <img
                    src={RightArrow}
                    alt="right arrow"
                    className="w-[50px] h-[50px] opacity-30"

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
    //console.log("photoIdArray", photoIdArray)
    const neighbors = GetNeighboringPhotos(currentPhotoId, photoIdArray)
    return (
        <div
            id="ArrowField"
            className = "w-full h-fit absolute top-[50%] translate-y-[-50%]"
        >
            {neighbors && neighbors.left &&
                <ArrowButton
               // username={username}
              //  userId={userId}
                photoId={neighbors.left}
                left={true}
                />
            }
            {neighbors && neighbors.right &&
                <ArrowButton
                //    username={username}
               //     userId={userId}
                    photoId={neighbors.right}
                    left={false}
                />
            }
        </div>
        )
}