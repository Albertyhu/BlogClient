import { useNavigate } from 'react-router-dom';
import { NavigationHooks, PostNavigationHooks } from '../../hooks/navigation.jsx';
import { useContext } from 'react'
import { AppContext } from '../../util/contextItem.jsx';
import {
    CategoryHooks,
} from '../../hooks/categoryHooks.jsx';

const RenderPanel = props => {
    const {
        categoryId, 
        categoryName, 
        description, 
        coverImage, 
    } = props; 
    const navigate = useNavigate();

    const { EditCategory } = NavigationHooks(navigate);

    const {
        apiURL, 
        setLoading, 
        token,
        categoryList, 
        setCategoryList, 
    } = useContext(AppContext)

    const {
        DeleteCategory,
    } = CategoryHooks(navigate, apiURL, token, setLoading);

    return (
        <div
            id="PromptPanel"
            className="hidden md:block bg-[#ffffff] rounded-[15px] py-10 mx-auto box_shadow mb-5 w-full"
        >
            <div
                className="w-8/12 mx-auto justify-center [&>*]:mb-5"
            >
                <h3 className="">You are the adminstrator of this category</h3>
                <button
                    className="btn-add mb-10"
                    onClick={() => EditCategory(categoryId, categoryName, description, coverImage)}
                >Edit category
                </button>
                <button
                    className="btn-delete mb-10"
                    onClick={() => DeleteCategory(categoryId, categoryList, setCategoryList)}
                >Delete Category</button>
            </div>
        </div>

    )
}

export default RenderPanel; 