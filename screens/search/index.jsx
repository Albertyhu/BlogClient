import { useState, useEffect, useRef, useCallback, useContext, lazy, Suspense } from 'react'; 
import SearchBar from '../../component/searchComponent/searchBar.jsx';
import {
    SearchBarContext,
    AppContext,
} from '../../util/contextItem.jsx';
import RenderSearchResults from '../../component/searchComponent/renderSearchResults.jsx';
import RenderSelection from '../../component/searchComponent/selectType.jsx'; 
import ProfilePanel from '../../component/user/currentUserPanel.jsx';
import {
    SearchRequests,
} from '../../hooks/searchHook.jsx'; 
const RenderPromptPanel = lazy(() => import("../../component/generalPanels/buttonPromptPanel.jsx")); 
import { SubstitutePanel } from '../../component/fallback.jsx';
const GuestPanel = lazy(() => import('../../component/generalPanels/guestPanel.jsx'));
const RenderPolicyPanel = lazy(() => import("../../component/generalPanels/policyPanel.jsx"));
const CreatorPanel = lazy(() => import("../../component/generalPanels/creatorPanel.jsx"));

const SearchScreen = props => {
    const SEARCH_TYPES = [
        "post",
        "users",
        "category",
        "comment"
    ]

    //Search type indicates what the user wants to search on the site, whether that be posts, categories, or comments 
    const [selectedSearchType, setType] = useState(SEARCH_TYPES[0]); 
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]) 
    const [searchResults, setSearchResults] = useState([])

    //displayResults controls whether or not the search results are displayed 
    const [displayResults, setDisplayResults] = useState(false);

    const {
        apiURL, 
        setLoading, 
        decoded, 
    } = useContext(AppContext)

    const { GetSearchData } = SearchRequests(apiURL, setLoading, setData);

    const searchContext = {
        query,
        setQuery,
        selectedSearchType,
        setType,
        setSearchResults,
        GetSearchData
    } 

    useEffect(() => {
        GetSearchData(selectedSearchType)
    }, [selectedSearchType])

    useEffect(() => {
        setDisplayResults(data.length > 0 && searchResults.length > 0)
    }, [searchResults])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <SearchBarContext.Provider value={searchContext}>
            <div
                id="Container"
                className="block md:grid md:grid-cols-[75%_25%] md:gap-[20px] w-11/12 my-10 mx-auto"
            >
                <div
                    id="SearchWrapper"
                    className = "w-11/12 mx-auto mt-5"
                >
                    <SearchBar
                        data={data}
                        selectedSearchType={selectedSearchType}
                    />
                    <RenderSelection searchTypes={SEARCH_TYPES} />
                    {displayResults &&
                        <RenderSearchResults
                            selectedSearchType={selectedSearchType}
                            searchResults={searchResults}
                        />
                    }
                </div>
                <div>
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
        </SearchBarContext.Provider>  
    )
}

export default SearchScreen; 