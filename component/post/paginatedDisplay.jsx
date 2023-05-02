import { useEffect, useCallback, useRef, useContext, useState, lazy, Suspense } from 'react'; 
import { FetchHooks } from '../../hooks/postHooks.jsx';
import { AppContext } from '../../util/contextItem.jsx'; 
import PostPanel from './post_panel.jsx'; 

//Treat Paginated results like an array. The first element starts at index 0.
const COUNT = 5; 

const PaginatedResults = props => {
    const {
        apiURL, 
        setMessage,
        setLoading,
        loading, 
    } = useContext(AppContext)
    const [pageNumber, setPageNumber] = useState(0); 
    const [postList, setPostList] = useState([]); 
    const [existingSize, setExistingSize] = useState(null); 
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

    const {
        FetchNewestPost, 
    } = FetchHooks(apiURL, setLoading, setMessage); 
    useEffect(() => {
        FetchNewestPost(pageNumber, COUNT, { setPostList, setExistingSize, setHasMore})
    }, [pageNumber])
    return (
        <div>
            {postList.length > 0 && 
                <Suspense fallback={<div className="text-center font-bold">Loading...</div>}>
                {postList.map((post, index) =>
                    <PostPanel
                        CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer"
                        key={post._id}
                        {...post}
                    />
                    )}

                {hasMore &&
                    <span
                        className="font-bold"
                        id="LastElement"
                        ref={lastElement}
                        >Loading...</span>}
                </Suspense>
            }
        </div>
    )
}

export default PaginatedResults; 