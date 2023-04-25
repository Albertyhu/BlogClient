import React, { useEffect, useState } from 'react'
import { MyContext } from '../../util/contextItem.js';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IconContext } from 'react-icons'; 

const SearchBar = props => {
    const { data } = props;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [diplaySearchResults, setDisplay] = useState(false);

    const searchByCriteria = (obj, criteria) => {
        switch (criteria) {
            case "name": {
                return obj.name.toLowerCase().search(query.trim().toLowerCase())
            }
            default:
                return -1
        }
    }

    const filterData = () => {
        if (data) {
            let newArray = data.filter(val => searchByCriteria(val, "name") > -1
            )

            setResults(newArray)
        }
    }

    const handleQuery = event => {
        setQuery(event.target.value)
    }

    const resetSearch = () => {
        setQuery('')
        setResults([]);
        setDisplay(false)
    }

    useEffect(() => {
        filterData();
        if (results.length > 0 && query.trim().length > 0) {
            setDisplay(true)
        }
        else {
            setDisplay(false)
            return () => { setResults([]) }

        }
    }, [query])


    return (
        <div
            id="BarContainer"
            className = "flex, bg-[#ffffff] rounded-[5px] h-[30px] m-auto, w-[60%]"
        >
            <input
                value={query}
                onChange={handleQuery}
                className = "w-full border-none outline-none p-[15px] rounded-[5px]"
            />
            <IconContext.Provider value={{size: "25px", padding: "5px"}}>
            <BiSearchAlt2 style={iconStyle} />
            {diplaySearchResults ? <RenderSearchResults
                searchResult={results}
                reset={resetSearch}
                diplaySearchResults={diplaySearchResults}
                />
                   
                :
                null
                }
            </IconContext.Provider>
        </div>
    )
}

export default SearchBar;

