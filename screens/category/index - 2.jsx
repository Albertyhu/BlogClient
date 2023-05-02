import React, { useCallback, useContext, useEffect, useState, lazy, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import {
    AppContext,
    PaginatedDisplayContext, 
} from '../../util/contextItem.jsx';
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx'; 
import uuid from 'react-uuid';
import { wait } from '../../hooks/wait.jsx';
const Panel = lazy(() =>import('../../component/panel.jsx')); 
const AddButton = lazy(() => import('../../component/addButton.jsx'));
import { SubstitutePanel } from '../../component/fallback.jsx';
import PaginatedDisplay from "../../component/paginatedDisplay.jsx"; 

const CategoryPage = props => {
    const navigate = useNavigate();
    const { GoCreateCategory } = NavigationHooks(navigate);

    const {
        user,
        apiURL,
        categoryList,
        setCategoryList,
        token, 
        setLoading, 
    } = useContext(AppContext);

    const {
        RenderError,
        AnimateErrorMessage
    } = ErrorMessageHooks(); 
    const [generalError, setGeneralError] = useState([]); 

    function VisitOneCategory(category, ID) {
        useCallback(navigate(`/category/${category}/${ID}`, {
            state: {
                id: ID,
            }
        }),[navigate])
    }

    const VisitCategory = useCallback((item)=>navigate(`/category/${item.name}/${item._id}`, {
        state: {
            id: item._id,
            name: item.name, 
            description: item.description,
            image: item.image,
        }
    }), [navigate])

    const generalErrorRef = useRef(); 

    useEffect(() => {
        if (generalError != null && generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    const [itemsRendered, setItemsList] = useState([])

    const renderPaginatedItems = (pageNumber, COUNT, setItemList, setHasMore) => {
        const start = pageNumber;  
        const end = pageNumber + COUNT - 1;
        const newItems = categoryList.slice(start, end); 
        setItemList(prev => { return [...new Set([...prev, ...newItems])] })
        setHasMore(newItems.length > 0); 
    }

    const paginatedContext = {
        itemList: itemsRendered,
        setItemList: (val) => setItemsList(val),
        fetchAction: renderPaginatedItems,
        fallback: (item) => <SubstitutePanel
            title={item.name}
            clickEvent={() => VisitCategory(item)}
        />,
        RenderPanel: (keyValue, item) =>
            <Panel
                {...item}
                key={keyValue}
                CustomStyle="rounded-lg w-full mx-auto mb-[20px] bg-[#ffffff] cursor-pointer"
                navigateTo={() => VisitCategory(item)}
            />,
    }


    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            <h1 className="text-center mx-auto mt-[20px] text-5xl">Categories</h1>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            {token &&
                <div className="[&>*]:inline-block grid [&>*]:my-10 ">
                    <Suspense
                        fallback={<button
                            className="btn-standard text-center mx-auto"
                            onClick={GoCreateCategory}
                        >Create a new category</button>}>
                    <AddButton
                        title="Create a new category"
                        dispatchFunction={GoCreateCategory}
                        altText="Add a new category"
                        />
                    </Suspense>
                </div>
            }
            {categoryList &&
                <div
                    key={uuid()}
                    id="CategoryGrid"
                    className="grid mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] w-full">
                    <paginatedContext.Provider value={paginatedContext}>
                        <PaginatedDisplay COUNT={9} />
                    </paginatedContext.Provider>
                </div>
            }
        </div>)
}

export default CategoryPage; 