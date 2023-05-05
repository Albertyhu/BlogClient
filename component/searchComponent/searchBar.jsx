import React, { useEffect, useState, useContext } from 'react'
import { SearchBarContext } from '../../util/contextItem.jsx';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IconContext } from 'react-icons'; 
import {
    HandleSearchQuery,
} from '../../hooks/searchHook.jsx';
const SearchBar = props => {
    const { data } = props;
    const [results, setResults] = useState([]);

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
        return () => { setResults([]) }
    }, [query])


    return (
        <div
            id="BarContainer"
            className = "flex bg-[#ffffff] rounded-[5px] mx-auto w-full "
        >
            <input
                value={query}
                onChange={handleQuery}
                className= "w-full border-none p-[15px] outline-none rounded-[5px] h-[30px] "
            />
            <IconContext.Provider value={{size: "25px", padding: "15px", margin: "auto"}}>
                <BiSearchAlt2 className = "my-auto" />
            </IconContext.Provider>
        </div>
    )
}

export default SearchBar;

