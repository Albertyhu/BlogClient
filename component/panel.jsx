import { lazy, useRef, useEffect } from 'react'; 
import '../src/index.css'; 
import { ImageHooks } from '../hooks/imageHooks.jsx';

const { isBase64Image } = ImageHooks();

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

    const afterElement = `after:bg-cover after:bg-[url(${isBase64Image(image) ? image : dataURL})] after:absolute
        after:h-full after:w-full after:rounded-lg after:z-[5] after:left-0 after:right-0 after:bg-center 
        after:bg-cover after:bg-no-repat: after:select-none after:transition-[transform] after:duration-[5000ms]`

    const panelRef = useRef(); 
   // const [mouseOverChildren, setMouseOver] = useState(false); 
    
    const hoverEvent = evt => {
        panelRef.current.classList.remove("NormalPosition")
        panelRef.current.classList.add("ZoomIn")
    }
    const mouseOutEvent = evt => {
        panelRef.current.classList.remove("ZoomIn")
        panelRef.current.classList.add("NormalPosition")
    }

    useEffect(() => {
        panelRef.current.addEventListener("mouseover", hoverEvent);
        panelRef.current.addEventListener("mouseout", mouseOutEvent)

    }, [panelRef.currrent])

    return (
        <div
            id="panel"
            ref={panelRef}
            className={`${divStyle} ${afterElement} backgroundTransition NormalPosition`}
            onClick={navigateTo}
        >   
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