import React, { useCallback, useContext, useEffect, useState, lazy, useRef, startTransition, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { AppContext } from '../../util/contextItem.jsx';
import { CategoryHooks } from '../../hooks/categoryHooks.jsx';
import PlusIcon from '../../assets/icons/white_plus_icon.png';
import { ErrorMessageHooks } from '../../hooks/errorHooks.jsx';
import uuid from 'react-uuid';
import { SubstituteCoverPhoto } from '../../component/fallback.jsx';
const CoverPhoto = lazy(() => import("../../component/coverPhoto.jsx"));


const CategoryPage = props => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { id } = location.state; 
    const { GoCreateCategory, EditCategory } = NavigationHooks(navigate);
    const [categoryName, setCategoryName] = useState(location.state.name ? location.state.name : "category")
    const [coverImage, setImage] = useState(location.state.image ? location.state.image : null)
    const [description, setDescription] = useState(location.state.description ? location.state.description : "");
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

    const dispatchFunctions = {
        setGeneralError,
    }

    useEffect(() => {
      //  FetchCategoryById(apiURL, id, dispatchFunctions);
    }, [])

    const generalErrorRef = useRef();

    useEffect(() => {
        if (generalError != null && generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
        console.log(coverImage)
    }, [coverImage])

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
            <div className="[&>*]:inline-block grid [&>*]:my-10 ">
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
            </div>

        </div>)
}

export default CategoryPage; 