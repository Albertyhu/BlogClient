import React, { useContext, useEffect, useState, lazy, Suspense} from 'react'; 
import {
    useLocation, 
} from 'react-router-dom'; 
import {
    AppContext,
    PaginatedDisplayContext,
} from '../../util/contextItem.jsx'; 
import { FetchHooks as PostFetchHooks } from '../../hooks/postHooks.jsx'; 
import ProfilePanel from '../../component/user/profilePanel.jsx'; 
//import PaginatedDisplay from '../../component/paginatedDisplay.jsx';
const PaginatedDisplay = lazy(() => import('../../component/paginatedDisplay.jsx')); 
import uuid from 'react-uuid'; 
import PostPanel from '../../component/post/post_panel.jsx'; 
//const PostPanel = lazy(() => import('../../component/post/post_panel.jsx'))

const Home = props => {
    const location = useLocation(); 
    const {
        apiURL,
        setMessage,
        setLoading, 
        decoded, 
    } = useContext(AppContext);
    const [postList, setPostList] = useState([])
    const { FetchNewestPost } = PostFetchHooks(apiURL, setLoading, setMessage) 

    const PaginatedContext = {
        itemList: postList, 
        setItemList: (val) => setPostList(val), 
        fetchAction: FetchNewestPost, 
        //RenderPanel: (keyValue, item) => (
        //    <Suspense key={uuid()} fallback={<div className="text-center font-bold">Loading...</div>}>
        //        <PostPanel {...item} key={keyValue} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" /> 
        //    </Suspense>),
        RenderPanel: (keyValue, item) => <PostPanel {...item} key={keyValue} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" />,
    }

    useEffect(() => {
        if (location.state != null) {
            const {
                message
            } = location.state; 
            if(message && message.length > 0)
                setMessage(message)
        }
    }, [location.state])

    useEffect(() => {
        return () => { setLoading(false) }
    }, [])

    return (
        <div
            className="w-full" 
            id="Container"
        >
            <h1 className="text-center mx-auto my-[20px] text-2xl">Home</h1>
            <div
                className= "grid w-11/12 mx-auto md:grid-cols-[75%_25%] md:gap-[20px]"
            >
                <PaginatedDisplayContext.Provider value={PaginatedContext}>
                    <Suspense
                        fallback={<div className="text-center font-bold text-2xl">Loading content...</div>}
                    >
                        <PaginatedDisplay />
                    </Suspense>
                </PaginatedDisplayContext.Provider>
                <ProfilePanel userId={decoded.id} />
            </div>
        </div>
    )
}

export default Home; 