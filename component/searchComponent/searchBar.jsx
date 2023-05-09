import React, { useEffect, useContext } from 'react'
import { SearchBarContext } from '../../util/contextItem.jsx';
import {
    HandleSearchQuery,
} from '../../hooks/searchHook.jsx';
const SearchBar = props => {
    const {
        data,
        selectedSearchType
    } = props;

    const {
        query,
        setQuery, 
        setSearchResults,
    } = useContext(SearchBarContext)

    const handleQuery = event => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if (query && query.trim().length > 0) {
            setSearchResults(HandleSearchQuery(query, data))
        }
        else {
            setSearchResults([])
        }
    }, [query, selectedSearchType])

    return (
        <div
            id="BarContainer"
            className = "flex bg-[#ffffff] rounded-[5px] mx-auto w-full "
        >
            <input
                value={query}
                onChange={handleQuery}
                place-holder = "Search..."
                className= "w-full border-none p-[15px] outline-none rounded-[5px] h-[30px] "
            />
        </div>
    )
}

export default SearchBar;

