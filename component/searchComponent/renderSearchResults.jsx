import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import {
    SearchBarContext,
    AppContext,
} from '../../util/contextItem.jsx';
import uuid from 'react-uuid';
import RenderPostItems from "../post/searchResultItem.jsx"; 

const RenderSearchResults = props => {
    const {
        searchResults,
        selectedSearchType
    } = props; 


    const RenderSearchType = (item, index) => {
        switch (selectedSearchType) {
            case "post":
                return <RenderPostItems {...item} index={index} key={item._id} />
                break; 
            case "users":
                return <RenderPostItems {...item} index={index} key={item._id} />
                break; 
            case "category":
                return <RenderPostItems {...item} index={index} key={item._id} />
                break; 
            case "comment":
                return <RenderPostItems {...item} index={index} key={item._id} />
                break; 
            default:
                return null;
                break; 
        }
    }

    useEffect(() => {
        if (searchResults.length > 0) {
            console.log("searchResults: ", searchResults)
        }

    }, [searchResults])

    return searchResults.map((item, index) => RenderSearchType(item, index))
}

export default RenderSearchResults; 