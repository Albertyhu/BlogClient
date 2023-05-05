import {  useCallback, useContext, useMemo } from 'react';
import {
    SearchBarContext,
    AppContext,
} from '../../util/contextItem.jsx';
import uuid from 'react-uuid';
import RenderSearchResultItems from './searchResultItem.jsx'; 
import { useNavigate } from 'react-router-dom'; 

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

    const RenderSearchType = (item, index) => {
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
    }
    return searchResults.map((item, index) => RenderSearchType(item, index))
}

export default RenderSearchResults; 