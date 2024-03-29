import {  useRef, useEffect } from 'react'; 
import { Base64Hooks } from '../../hooks/imageHooks.jsx';

const { isBase64Image } = Base64Hooks()

//Used to render panels of each categories
const RenderPanel = props => {
    const {
        name,
        description,
        image,
        _id, 
        navigateTo
    } = props;
    const dataURL = `data:${image.contentType};base64,${image.data}`;

    const divStyle = `relative w-11/12 mx-auto h-[350px] box-shadow bg-cover bg-center
        before:opacity-40 before:w-full before:h-full before:bg-black rounded-lg before:rounded-lg
        before:z-10 before:absolute before:top-0 before:left-0 before:right-0 before:bg-center before:bg-cover 
        cursor-pointer select-none bg-no-repeat overflow-hidden mb-[20px]`; 

    const afterElement = `bg-cover absolute
        h-full w-full rounded-lg z-[5] left-0 right-0 bg-center 
        bg-cover bg-no-repat: select-none transition-[transform] duration-[5000ms]`

    const afterStyle = {
        backgroundImage: `url(${isBase64Image(image) ? image : dataURL})`,
    };
    
    const panelRef = useRef(); 
    const afterElementRef = useRef(); 

    const hoverEvent = evt => {
        console.log('fired')
        afterElementRef.current.classList.remove("NormalPosition")
        afterElementRef.current.classList.add("ZoomIn")
    }
    const mouseOutEvent = evt => {
        afterElementRef.current.classList.remove("ZoomIn")
        afterElementRef.current.classList.add("NormalPosition")
    }

    useEffect(() => {
        panelRef.current.addEventListener("mouseover", hoverEvent);
        panelRef.current.addEventListener("mouseout", mouseOutEvent)
    }, [panelRef.currrent])


    return (
        <div
            id="panel"
            className={`${divStyle}`}
            ref={panelRef}
            onClick={navigateTo}
        >   
            <div
                ref={afterElementRef}
                id="afterElement"
                className={`${afterElement} backgroundTransition NormalPosition`}
                style={afterStyle}
            ></div>
            <div
                id="contentWrapper"
                className="absolute left-0 right-0 top-[50%] z-[10] translate-y-[-50%] text-white"
            >
               <h2 className="mx-auto text-3xl md:text-5xl font-bold capitalize mb-5 w-fit wrapperChild">{name}</h2>
               <p className="text-[15px] md:text-2xl text-white mx-10 wrapperChild">{description}</p>
            </div>
        </div>
    )
}

export default RenderPanel; 