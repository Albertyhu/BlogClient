import React, { useEffect, useState, useContext } from 'react'
import { SearchBarContext } from '../../util/contextItem.jsx';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IconContext } from 'react-icons'; 

const SearchBar = props => {
    const { data } = props;
    const [results, setResults] = useState([]);
    const [diplaySearchResults, setDisplay] = useState(false);

    const {
        query,
        setQuery, 
    } = useContext(SearchBarContext)

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
            className = "flex bg-[#ffffff] rounded-[5px] h-[30px] mx-auto w-full "
        >
            <input
                value={query}
                onChange={handleQuery}
                className= "w-full border-none p-[15px] outline-none rounded-[5px]"
            />
            <IconContext.Provider value={{size: "25px", padding: "15px"}}>
                <BiSearchAlt2 />
            </IconContext.Provider>
        </div>
    )
}

export default SearchBar;

