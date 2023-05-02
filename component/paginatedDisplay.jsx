import { useEffect, useCallback, useRef, useContext, useState, lazy, Suspense } from 'react'; 
import {
    PaginatedDisplayContext, 
} from '../util/contextItem.jsx'; 
import uuid from 'react-uuid';
import PostPanel from './post/post_panel.jsx'; 
//This component creates the functionality of load on scroll affect
//Treat Paginated results like an array. The first element starts at index 0.
//The higher level component must supply this component with their own way of rendering the item list. 
const PaginatedResults = props => {
    const {
        COUNT = 5,
    } = props; 

    const {
        itemList = [], 
        setItemList, 
        fetchAction, 
        RenderPanel,
    } = useContext(PaginatedDisplayContext)

    const [pageNumber, setPageNumber] = useState(0); 
    const [hasMore, setHasMore] = useState(false); 

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
    return (
        <div>
            {itemList.length > 0 &&
                <>
                    {itemList.map((item, index) =>RenderPanel(item._id, item))}
                    {hasMore &&
                        <div
                            className="font-bold text-center text-2xl w-full"
                            id="LastElement"
                            ref={lastElement}
                        >Loading more...</div>}
                </>
            }
        </div>
    )
    //return (
    //    <div>
    //        {itemList.length > 0 &&
    //            <>
    //            {itemList.map((item, index) => <PostPanel {...item} key={item._id} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" />)}
    //                {hasMore &&
    //                    <div
    //                        className="font-bold text-center text-2xl w-full"
    //                        id="LastElement"
    //                        ref={lastElement}
    //                    >Loading more...</div>}
    //            </>
    //        }
    //    </div>
    //)
}

export default PaginatedResults; 