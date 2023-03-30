import React, { useCallback, useContext, useEffect, useState, lazy, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { CategoryHooks } from '../../hooks/categoryHooks.jsx';
import PlusIcon from '../../assets/icons/white_plus_icon.png'; 
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx'; 
import uuid from 'react-uuid';
const Panel = lazy(() => import('../../component/panel.jsx')); 
import { AddButton } from '../../component/button.jsx'; 
//const AddButton = lazy(() => import('../../component/addButton.jsx'))

const CategoryPage = props => {
    const navigate = useNavigate();
    const { GoCreateCategory } = NavigationHooks(navigate);
    const { FetchCategories } = CategoryHooks(navigate); 
    const { user,
        apiURL,
        categoryList,
        setCategoryList,
        token, 
    } = useContext(AppContext);
    const {
        RenderError,
        AnimateErrorMessage
    } = ErrorMessageHooks(); 
    const [generalError, setGeneralError] = useState([]); 

    const dispatchFunctions = {
        setCategoryList,
        setGeneralError, 
    }

    function VisitOneCategory(category, ID) {
        useCallback(navigate(`/category/${category}`, {
            state: {
                id: ID,
            }
        }),[navigate])
    }

    const VisitCategory = useCallback((item)=>navigate(`/category/${item.name}`, {
        state: {
            id: item._id,
            name: item.name, 
            description: item.description,
            image: item.image,
            post: item.post
        }
    }), [navigate])

    useEffect(() => {
        FetchCategories(apiURL, dispatchFunctions); 
    },[])

    useEffect(() => {
        if (categoryList != null && categoryList.length > 0) {
            console.log("list: ", categoryList)
        }
    }, [categoryList])

    const generalErrorRef = useRef(); 

    useEffect(() => {
        if (generalError != null && generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {

    }, [token])

    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Categories</h1>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            {token &&
                <div className="[&>*]:inline-block grid [&>*]:my-10 ">
                    <AddButton
                        title="Create a new category"
                        dispatchFunction={GoCreateCategory}
                        altText="Add a new category"
                    />
                </div>
            }
            {categoryList &&
                <div
                    id="CategoryGrid"
                    className="grid mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] w-full">
                    {categoryList.map(item =>
                        <Panel
                            key={uuid()}
                            {...item}
                            navigateTo={()=>VisitCategory(item)}
                        />)}
                </div>
            }
        </div>)
}

export default CategoryPage; 