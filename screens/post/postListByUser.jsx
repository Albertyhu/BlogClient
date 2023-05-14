import { useContext, useState, useEffect, lazy, Suspense } from 'react'; 
import {
    AppContext,
    PaginatedDisplayContext,
} from '../../util/contextItem.jsx'; 
import { useParams } from 'react-router-dom'
import { FetchHooks as PostFetchHooks } from '../../hooks/postHooks.jsx';
import PostPanel from '../../component/post/post_panel.jsx'; 
import { SubstitutePanel } from '../../component/fallback.jsx';
import uuid from 'react-uuid';
import ProfilePanel from '../../component/user/currentUserPanel.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigate } from 'react-router-dom'; 
const GuestPanel = lazy(() => import('../../component/generalPanels/guestPanel.jsx'));
const RenderPromptPanel = lazy(() => import("../../component/generalPanels/buttonPromptPanel.jsx"));
const RenderPolicyPanel = lazy(() => import("../../component/generalPanels/policyPanel.jsx"));
const CreatorPanel = lazy(() => import("../../component/generalPanels/creatorPanel.jsx"));
const PaginatedDisplay = lazy(() => import('../../component/paginatedDisplay.jsx'));

const PostList = props => {
    const {
        username, 
        userId, 
    } = useParams() 
    const navigate = useNavigate(); 
    const {
        apiURL, 
        setLoading,
        setMessage,
        decoded, 
    } = useContext(AppContext)

    const { GoHome } = NavigationHooks(navigate); 

    //paginated features
    const [postList, setPostList] = useState([])
    const [hasMore, setHasMore] = useState(false); 
    const {
        GetPaginatedPostsByUser, 
    } = PostFetchHooks(apiURL, setLoading, setMessage)
    const DisplayOnlyPublished = decoded ? decoded.id.toString() === userId.toString() ? false : true : true; 
    const PaginatedContext = {
        itemList: postList,
        //need to fix this
        fetchAction: (pageNumber, COUNT) => GetPaginatedPostsByUser(pageNumber, COUNT, userId, DisplayOnlyPublished, { setPostList, setHasMore }),
        RenderPanel: (keyValue, item) =>
            <PostPanel
                {...item}
                key={keyValue}
                CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer"
            />,
        hasMore,
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!username || !userId) {
            GoHome("Profile not found.")
        }
    }, [])

    return (
        <div
            className="w-full"
            id="Container"
        >
            <h1 className="text-center mx-auto my-[20px] text-2xl">{username}'s post</h1>
            <div
                className="grid w-11/12 mx-auto md:grid-cols-[75%_25%] md:gap-[20px]"
            >
                <div
                    id="LeftDesktopColumn"
                    className=""
                >
                    <PaginatedDisplayContext.Provider value={PaginatedContext}>
                        <Suspense
                            fallback={<div key={uuid()} className="text-center font-bold text-2xl">Loading content...</div>}
                        >
                            <PaginatedDisplay />
                        </Suspense>
                    </PaginatedDisplayContext.Provider>
                </div>
                <div
                    id="RightDesktopColumn"
                    className="flex flex-col"
                >
                    {decoded ?
                        <ProfilePanel />
                        :
                        <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                            <GuestPanel />
                        </Suspense>
                    }
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        <RenderPromptPanel />
                    </Suspense>
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        <RenderPolicyPanel />
                    </Suspense>
                    <Suspense fallback={<SubstitutePanel title="Loading..." />}>
                        <CreatorPanel />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default PostList; 