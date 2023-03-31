import React, { useCallback, useContext, useEffect, useState, lazy, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { CategoryHooks } from '../../hooks/categoryHooks.jsx';
import PlusIcon from '../../assets/icons/white_plus_icon.png'; 
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx'; 
import uuid from 'react-uuid';
import { wait } from '../../hooks/wait.jsx';
//const Panel = lazy(() => import('../../component/panel.jsx')); 
const Panel = lazy(() =>import('../../component/panel.jsx')); 
//import { AddButton } from '../../component/button.jsx'; 
const AddButton = lazy(() => import('../../component/addButton.jsx'));
import { SubstitutePanel } from '../../component/fallback.jsx';

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
                    {categoryList.map(item => 
                        <Suspense
                            key={uuid()}
                            fallback={<SubstitutePanel title={item.name} />}
                        >
                            <Panel
                                key={uuid()}
                                {...item}
                                navigateTo={()=>VisitCategory(item)}
                                />
                        </Suspense>
                    )}
                </div>
            }
        </div>)
}

export default CategoryPage; 