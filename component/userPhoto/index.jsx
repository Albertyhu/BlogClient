import { useContext, useState, useEffect, useRef } from 'react'; 
import {
    AppContext,
    UserPhotoContext,
} from '../../util/contextItem.jsx'; 
import PhotoPanel from './photoPanel.jsx'; 


//This is a screen for rendering all the photos that the user has uploaded
const RenderUserPhotos = props => {
    const {
        images,
        username, 
        userID, 
        selected, 
    } = props; 
    const {
        apiURL,
        token, 
        setLoading, 
    } = useContext(AppContext)

    const photoContext = {}

    const panelRef = useRef([])

    return (
        <div
            id="UserPhotoContainer" 
            className = "w-full"
        >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 w-11/12 md:w-10/12 mx-auto gap-[5px]">
                {images && images.length > 0 && 
                    images.map((img, index) => {
                        return (
                            <PhotoPanel
                                {...img}
                                key={img._id}
                                index={index}
                                panelRef={panelRef}
                                selected={selected}
                            />
                            )
                    })}
            </div>
        </div>
        )
}

export default RenderUserPhotos; 