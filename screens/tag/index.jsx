import React, { useCallback, useContext, useEffect, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { TagHooks } from '../../hooks/tagHooks.jsx';
import { AddButton } from '../../component/button.jsx'; 

const TagPage = props => {
    const navigate = useNavigate();
    const { GoCreateTag, GoHome } = NavigationHooks(navigate);
    const { GetTagList } = TagHooks(navigate);
    const [decoded, setDecoded] = useState(null)
    const [existingTags, setExistingTags] = useState([])
    const { 
        apiURL,
        token,
    } = useContext(AppContext);

    const dispatchFunctions = {
        navigate
    }

    useEffect(() => {
        if (!token) {
            return () => GoHome();
        }
        setDecoded(JSON.parse(atob(token.split('.')[1])));
        GetTagList(apiURL, setExistingTags)
    }, [token])


    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Tags</h1>
            <div className="[&>*]:inline-block grid [&>*]:my-10 ">
                <AddButton
                    title="Create new tags"
                    dispatchFunction={GoCreateTag}
                />
                <div>
                    
                </div>
            </div>
        </div>)
}

export default TagPage; 