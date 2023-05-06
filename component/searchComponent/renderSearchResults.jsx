import {  useCallback, useContext } from 'react';
import {
    AppContext,
} from '../../util/contextItem.jsx';

import RenderSearchResultItems from './searchResultItem.jsx'; 
import { useNavigate } from 'react-router-dom'; 

//RenderSearchResults handles which type of data, whether that be post, comments, categories or users, that will be displayed in the search results.
const RenderSearchResults = props => {
    const {
        searchResults,
        selectedSearchType
    } = props; 

    const {
        setMessage, 
    } = useContext(AppContext)
    const navigate = useNavigate(); 
    const {
        RenderPostSearchResultItem,
        RenderCategorySearchResultItem,
        RenderCommentSearchResultItem,
        RenderUserSearchResultItem
    } = RenderSearchResultItems(navigate, setMessage)

    const RenderSearchType = useCallback((item, index) => {
        switch (selectedSearchType) {
            case "post":
                return <RenderPostSearchResultItem {...item} index={index} key={item._id} />
                break;
            case "users":
                return < RenderUserSearchResultItem {...item} index={index} key={item._id} />
                break;
            case "category":
                return <RenderCategorySearchResultItem {...item} index={index} key={item._id} />
                break;
            case "comment":
                return <RenderCommentSearchResultItem {...item} index={index} key={item._id} />
                break;
            default:
                return null;
                break;
        }
    }, [selectedSearchType])

    return searchResults.map((item, index) => RenderSearchType(item, index))
}

export default RenderSearchResults; 