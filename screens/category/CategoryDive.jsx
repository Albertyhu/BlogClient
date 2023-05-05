import React, {  useContext, useEffect, useState, lazy, useRef, Suspense, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import {
    AppContext,
} from '../../util/contextItem.jsx';
import {
    CategoryHooks,
    CheckIfAdministrator,
} from '../../hooks/categoryHooks.jsx';
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx';
import uuid from 'react-uuid';
import { SubstituteCoverPhoto } from '../../component/fallback.jsx';
//import { FetchHooks as PostFetchHooks } from '../../hooks/fetchHooks.jsx'; 
import { FetchHooks  } from '../../hooks/postHooks.jsx'; 
const CoverPhoto = lazy(() => import("../../component/imageRendering/coverPhoto.jsx"));
const Panel = lazy(() => import('../../component/post/post_panel.jsx'))
import { PostButtons } from '../../component/post/buttons.jsx'; 
import ErrorPage from '../error';

/** This component displays individual categories and its data*/
const CategoryPage = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const {
        apiURL,
        token,
        categoryList,
        setCategoryList,
        setLoading, 
        setMessage,
        decoded,
    } = useContext(AppContext);

    const { EditCategory } = NavigationHooks(navigate);
    const {
        GetPaginatedPostByCategory,
    } = FetchHooks(apiURL, setLoading, setMessage); 
    const {
        category_name, 
        category_id, 
    } = useParams(); 
    const [categoryId, setCategoryId] = useState(category_id ? category_id : location.state ? location.state.id : null)
    const [categoryName, setCategoryName] = useState(category_name ? category_name : location.state ? location.state.name : null)
    const [coverImage, setImage] = useState(location.state ? location.state.image ? location.state.image : null : null)
    const [description, setDescription] = useState(location.state ? location.state.description ? location.state.description : "" : "");
    const [postList, setPostList] = useState([])

    const [shouldLoad, setLoad] = useState(true); 

    const {
        DeleteCategory,
    } = CategoryHooks(navigate, apiURL, token, setLoading);

    const { CreateNewPostWithCategory } = PostButtons(navigate); 

    const {
        RenderError,
        AnimateErrorMessage
    } = ErrorMessageHooks();
    const [generalError, setGeneralError] = useState([]);

    const generalErrorRef = useRef();

    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const observerRef = useRef();
    const lastElement = useCallback(node => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1)
            }
        })
        if (node) observerRef.current.observe(node)
    }, [hasMore])

    useEffect(() => {
        if (generalError != null && generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
       window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (category_name && categoryList) {
            var result = categoryList.find(val => val.name == category_name)
            if (result) {
                setImage(result.image);
                setDescription(result.description);
                setCategoryId(result._id)
                setLoad(true)
            }
            else {
                setLoad(false)
            }
        }
    }, [category_name, categoryList])

    useEffect(() => {
        if(categoryId)
            GetPaginatedPostByCategory(pageNumber, 5, categoryId, setPostList, setHasMore)
    }, [pageNumber, categoryId])

    if (!shouldLoad) {
        return (
            <div className = "my-20"> 
                <ErrorPage
                    message="The category is not found"
                    />
            </div>
            )
    }
    return (
        <div
            className="w-full text-center text-lg text-black"
        >
            {coverImage != null ?
                <Suspense fallback={<SubstituteCoverPhoto title={categoryName} />}>
                    <CoverPhoto
                        image={coverImage}
                        altText={categoryName}
                        title={categoryName}
                        isPreview={false}
                    />
                </Suspense>
                :
                <h1
                    className = "text-center text-black font-bold text-2xl md:text-4xl mt-[20px] md:mt-[40px]"
                >{categoryName}</h1>
                }
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            <div>
                <div className="grid [&>*]:md:inline-block md:flex">
                    {decoded && categoryList && CheckIfAdministrator(decoded.id, categoryList) &&
                        <>
                        <button
                            className="btn-add mb-10"
                            onClick={() => EditCategory(categoryId, categoryName, description, coverImage)}
                        >Edit category
                        </button>
                        <button
                            className="btn-delete mb-10"
                            onClick={() => DeleteCategory(categoryId, categoryList, setCategoryList)}
                        >Delete Category</button>
                        </>
                    }
                    {token &&
                        <CreateNewPostWithCategory
                            buttonStyle="btn-secondary mb-10"
                            categoryID={categoryId}
                        />
                    }
                </div>
                {postList && postList.length > 0 &&
                    <div className="w-11/12 md:w-6/12 mx-auto flex-grow z-10">
                        {postList.map(post => {
                            if (post.published) {
                                return (
                                    <Suspense
                                        key={uuid()}
                                        value={<span key={uuid()}>Loading...</span>}
                                    >
                                    <Panel
                                        key={uuid()}
                                        {...post}
                                    />
                                    </Suspense>
                                    )
                            }
                        }
                        )}
                        {hasMore &&
                            <div
                                className="font-bold text-center text-2xl w-full"
                                id="LastElement"
                                ref={lastElement}
                            >Loading more...</div>}
                    </div>
                }
            </div>

        </div>)
}

export default CategoryPage; 