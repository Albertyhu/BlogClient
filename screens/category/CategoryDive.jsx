import React, {  useContext, useEffect, useState, lazy, useRef, startTransition, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { CategoryHooks } from '../../hooks/categoryHooks.jsx';
import PlusIcon from '../../assets/icons/white_plus_icon.png';
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx';
import uuid from 'react-uuid';
import { SubstituteCoverPhoto } from '../../component/fallback.jsx';
import { FetchHooks as PostFetchHooks } from '../../hooks/postHooks.jsx'; 
const CoverPhoto = lazy(() => import("../../component/coverPhoto.jsx"));
//import Panel from '../../component/post/post_panel.jsx'; 
const Panel = lazy(() =>import ('../../component/post/post_panel.jsx'))

/** This component displays individual categories and its data*/
const CategoryPage = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { id } = location.state; 
    const { EditCategory } = NavigationHooks(navigate);
    const { FetchPostsByCateogry } = PostFetchHooks(navigate); 
    const [categoryName, setCategoryName] = useState(location.state ? location.state.name ? location.state.name : "category" : "category")
    const [coverImage, setImage] = useState(location.state ? location.state.image ? location.state.image : null : null)
    const [description, setDescription] = useState(location.state ? location.state.description ? location.state.description : "" : "");
    const [postList, setPostList] = useState([])
    const { FetchCategoryById } = CategoryHooks(navigate);
    const {
        apiURL,
        token
    } = useContext(AppContext);
    const {
        RenderError,
        AnimateErrorMessage
    } = ErrorMessageHooks();
    const [generalError, setGeneralError] = useState([]);

    const generalErrorRef = useRef();

    useEffect(() => {
        if (generalError != null && generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])


    useEffect(() => {
        window.scrollTo(0, 0);
    })

    useEffect(() => {
        if (id) {
            FetchPostsByCateogry(apiURL, id, setPostList)
        }
    }, [id])

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
            <div className="">
                {token && 
                <button
                    className="btn-add"
                    onClick={() => EditCategory(id, categoryName)}
                >Edit category
                    <img
                        src={PlusIcon}
                        alt="Add Icon"
                        className="buttonIcons"
                    />
                    </button>
                }
                {postList && postList.length > 0 &&
                    postList.map(post => 
                        <div className="w-11/12 md:w-6/12 mx-auto flex-grow z-10">
                            <Suspense
                                key={uuid()}
                                value={<span key={uuid()}>Loading...</span>}
                            >
                                <Panel
                                    key={uuid()}
                                    {...post}
                                />
                            </Suspense>
                        </div>
                        )
                }
            </div>

        </div>)
}

export default CategoryPage; 