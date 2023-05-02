import { useCallback, useRef } from 'react'; 

const observer = useRef(); 

const lastElementRef = useCallback(node => {
    if (loading) return;

    //why is this line positioned here?
    if (observer.current) observer.current.disconnect(); 

    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prev => prev + 1)
        }
    })

    if(node) observer.current.observe(node)
}, [loading, hasMore])