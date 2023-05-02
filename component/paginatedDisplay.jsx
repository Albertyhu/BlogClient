import { useEffect, useCallback, useRef, useContext, useState, lazy, Suspense } from 'react'; 
import {
    AppContext,
    PaginatedDisplayContext, 
} from '../util/contextItem.jsx'; 
import PostPanel from './post/post_panel.jsx'; 

//This component creates the functionality of load on scroll affect
//Treat Paginated results like an array. The first element starts at index 0.
const PaginatedResults = props => {
    const {
        COUNT = 5,
    } = props; 

    const {
        apiURL, 
        setMessage,
        setLoading,
    } = useContext(AppContext)

    const {
        itemList = [], 
        setItemList, 
        fetchAction, 
        RenderPanel,
    } = useContext(PaginatedDisplayContext)

    const [pageNumber, setPageNumber] = useState(0); 
    const [hasMore, setHasMore] = useState(false); 
    //const [cancel, setCancelToken] = useState(null)
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
                <Suspense fallback={<div className="text-center font-bold">Loading...</div>}>
                    {itemList.map((item, index) => RenderPanel(item._id, item))}
                {hasMore &&
                    <div
                        className="font-bold text-center text-2xl w-full"
                        id="LastElement"
                        ref={lastElement}
                        >Loading more...</div>}
                </Suspense>
            }
        </div>
    )
}

export default PaginatedResults; 