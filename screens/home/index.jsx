import React, { useContext, useEffect, useState, lazy, Suspense} from 'react'; 
import {
    useLocation, 
} from 'react-router-dom'; 
import {
    AppContext,
    PaginatedDisplayContext,
} from '../../util/contextItem.jsx'; 
import { FetchHooks as PostFetchHooks } from '../../hooks/postHooks.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'; 
import ProfilePanel from '../../component/user/currentUserPanel.jsx'; 
const PaginatedDisplay = lazy(() => import('../../component/paginatedDisplay.jsx')); 
import PostPanel from '../../component/post/post_panel.jsx'; 
const GuestPanel = lazy(() => import('../../component/generalPanels/guestPanel.jsx')); 
import { SubstitutePanel } from '../../component/fallback.jsx'; 
const RenderPopularPanel = lazy(() => import('../../component/generalPanels/popularPanel.jsx'));
import RenderPopularPostListItem from '../../component/post/PopularPostItem.jsx'; 
import RenderPopularCategoryListItem from '../../component/categoryComponent/PopularCategoryItem.jsx';

const Home = props => {
    const location = useLocation(); 
    const {
        token,
        apiURL,
        setMessage,
        setLoading, 
        decoded, 
    } = useContext(AppContext);
    const [postList, setPostList] = useState([])
    const {
        FetchNewestPost,
    } = PostFetchHooks(apiURL, setLoading, setMessage) 
    const { GetPopularCategoriesAndPosts } = FetchHooks(apiURL, token, setLoading, setMessage)
    const PaginatedContext = {
        itemList: postList, 
        setItemList: (val) => setPostList(val), 
        fetchAction: FetchNewestPost, 
        RenderPanel: (keyValue, item) => <PostPanel {...item} key={keyValue} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" />,
    }

    const [TopCategories, setTopCategories] = useState([])
    const [TopPosts, setTopPosts] = useState([])

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
        GetPopularCategoriesAndPosts(5, {
            setTopCategories,
            setTopPosts,
        })
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
                <div
                    id="LeftDesktopColumn"
                    className =""
                >
                <PaginatedDisplayContext.Provider value={PaginatedContext}>
                    <Suspense
                        fallback={<div className="text-center font-bold text-2xl">Loading content...</div>}
                    >
                            <PaginatedDisplay
                            itemList={postList}
                            setItemList={(val) => setPostList(val)}
                            fetchAction={FetchNewestPost}
                            RenderPanel={(keyValue, item) => <PostPanel {...item} key={keyValue} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" />}
                            />
                    </Suspense>
                    </PaginatedDisplayContext.Provider>
                </div>
                <div
                    id="RightDesktopColumn"
                    className = "flex flex-col"
                >
                {token ?
                    <ProfilePanel />
                    :
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        <GuestPanel />
                    </Suspense>
                    }
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        {TopPosts && TopPosts.length > 0 &&
                            <RenderPopularPanel
                                title="Popular Posts"
                                itemList={TopPosts}
                                RenderListItem={(item, key, index) =>
                                    <RenderPopularPostListItem
                                        {...item}
                                        keyValue={key}
                                        index={index}
                                    />}
                            />
                        }
                    </Suspense>
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        {TopCategories && TopCategories.length > 0 &&
                            <RenderPopularPanel
                                title="Most Active Categories"
                                itemList={TopCategories}
                                RenderListItem={(item, key, index) =>
                                    <RenderPopularCategoryListItem
                                        {...item}
                                        keyValue={key}
                                        index={index}
                                    />}
                            />
                        }
                    </Suspense>
                </div>
            </div>
        </div>
    )

}

export default Home; 