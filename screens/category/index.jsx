import React, { useCallback, useContext, useEffect, useState, lazy, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx'; 
import uuid from 'react-uuid';
const Panel = lazy(() =>import('../../component/generalPanels/panel.jsx')); 
const AddButton = lazy(() => import('../../component/addButton.jsx'));
import { SubstitutePanel } from '../../component/fallback.jsx';

const CategoryPage = props => {
    const navigate = useNavigate();
    const { GoCreateCategory } = NavigationHooks(navigate);

    const {
        categoryList,
        token, 
        setLoading, 
    } = useContext(AppContext);

    const {
        RenderError,
        AnimateErrorMessage
    } = ErrorMessageHooks(); 
    const [generalError, setGeneralError] = useState([]); 

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

    useEffect(() => {
        window.scrollTo(0,0)
        return () => { setLoading(false) }
    }, [])


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
                            fallback={<SubstitutePanel
                                title={item.name}
                                clickEvent={()=>VisitCategory(item)}
                            />}
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