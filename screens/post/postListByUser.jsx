import { useContext, useState, useEffect, lazy, Suspense } from 'react'; 
import {
    AppContext,
    PaginatedDisplayContext,
} from '../../util/contextItem.jsx'; 
import { useParams } from 'react-router-dom'
import { FetchHooks as PostFetchHooks } from '../../hooks/postHooks.jsx';
const PaginatedDisplay = lazy(() => import('../../component/paginatedDisplay.jsx')); 
import PostPanel from '../../component/post/post_panel.jsx'; 
import { SubstitutePanel } from '../../component/fallback.jsx';
import uuid from 'react-uuid';
import ProfilePanel from '../../component/user/currentUserPanel.jsx'; 
const GuestPanel = lazy(() => import('../../component/generalPanels/guestPanel.jsx')); 
const RenderPromptPanel = lazy(() => import("../../component/generalPanels/buttonPromptPanel.jsx"));
const RenderPolicyPanel = lazy(() => import("../../component/generalPanels/policyPanel.jsx"));
const CreatorPanel = lazy(() => import("../../component/generalPanels/creatorPanel.jsx"));

const PostList = props => {
    const {
        username, 
        userId, 
    } = useParams   

    const {
        apiURL, 
        setLoading,
        setMessage,
        token,
        decoded, 
    } = useContext(AppContext)
    const [postList, setPostList] = useState([])
    const [hasMore, setHasMore] = useState(false); 
    const {
        GetPaginatedPostsByUser, 
    } = PostFetchHooks(apiURL, setLoading, setMessage)
    const PaginatedContext = {
        itemList: postList,
        setItemList: (val) => setPostList(val),
        //need to fix this
        fetchAction: GetPaginatedPostsByUser,
        RenderPanel: (keyValue, item) => <PostPanel {...item} key={keyValue} CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer" />,
    }
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
}

export default PostList; 