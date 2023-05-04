import { useEffect, useCallback, useRef, useContext, useState, lazy, Suspense } from 'react'; 
import {
    PaginatedDisplayContext, 
} from '../util/contextItem.jsx'; 
import uuid from 'react-uuid';
import PostPanel from './post/post_panel.jsx'; 
//This component creates the functionality of load on scroll affect and has the option to load the content onto a grid in desktop view 
//Treat Paginated results like an array. The first element starts at index 0.
//The higher level component must supply this component with their own way of rendering the item list. 
const PaginatedResults = props => {
    const {
        COUNT = 5,
        grid = false, 
        customGrid = null, 
    } = props; 

    const [pageNumber, setPageNumber] = useState(0); 
    const [hasMore, setHasMore] = useState(false); 

    const {
        itemList = [],
        setItemList,
        fetchAction,
        RenderPanel,
    } = useContext(PaginatedDisplayContext)

    const observerRef = useRef(); 
    const lastElement = useCallback(node => {
        if (observerRef.current) observerRef.current.disconnect(); 
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1)
            }
        })
        if (node) observerRef.current.observe(node)
    }, [hasMore])

    useEffect(() => {
        fetchAction(pageNumber, COUNT, setItemList, setHasMore)
    }, [pageNumber])

    return itemList.length > 0 &&
        <>
        {grid ?
            <div
                id="Grid"
                className={`${customGrid ? customGrid : "w-11/12 mx-auto grid md:grid-cols-3 gap-[10px]"}`}
            >
                {itemList.map((item, index) => RenderPanel(item._id, item))}
            </div>
            : 
            itemList.map((item, index) => RenderPanel(item._id, item)) 
            }
            {hasMore &&
                <div
                    className="font-bold text-center text-2xl w-full"
                    id="LastElement"
                    ref={lastElement}
                >Loading more...</div>}
        </>



}

export default PaginatedResults; 