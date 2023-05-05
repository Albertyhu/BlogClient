import { useState, useEffect, useRef, useCallback, useContext } from 'react'; 
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
    } = useContext(AppContext)

    const { GetSearchData } = SearchRequests(apiURL, setLoading, setData);

    const searchContext = {
        query,
        setQuery,
        selectedSearchType,
        setType,
        setSearchResults,
    } 
    const resetSearch = () => {
        setQuery('')
        setResults([]);
        setDisplay(false)
    }
    useEffect(() => {
        GetSearchData(selectedSearchType)
    }, [selectedSearchType])

    useEffect(() => {
        setDisplayResults(data.length > 0 && searchResults.length > 0)
    }, [searchResults, selectedSearchType])

    const CallbackSearchResults = useCallback(() => 
        <RenderSearchResults
            selectedSearchType={selectedSearchType}
            searchResults={searchResults}
        />, [selectedSearchType])

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
                    <SearchBar data={data} />
                    <RenderSelection searchTypes={SEARCH_TYPES} />
                    {displayResults &&
                        <RenderSearchResults
                            selectedSearchType={selectedSearchType}
                            searchResults={searchResults}
                        />
                    }
                </div>
                <>
                    <ProfilePanel />
                </>
            </div>
        </SearchBarContext.Provider>  
    )
}

export default SearchScreen; 