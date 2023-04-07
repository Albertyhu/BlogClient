import {
    useCallback,
    useContext
} from 'react';
import AddButton from '../addButton.jsx';
import { PostNavigationHooks } from '../../hooks/navigation.jsx'; 
import { useNavigation } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { PostContext } from "../../util/contextItem.jsx"; 

const PostButtons = (navigate) => {

    const { GoCreatePost, GoCreatePostFromCategory } = PostNavigationHooks(navigate)
    const CreateNewPost = props => {
        const { buttonStyle } = props;
        return (
            <AddButton
                title="Create a new post"
                altText="Create a new post"
                dispatchFunction={GoCreatePost}
                buttonStyle={buttonStyle}
            />
        )
    }

    const CreateNewPostWithCategory = props => {
        const {
            buttonStyle,
            categoryID
        } = props;
        return (
            <AddButton
                title="Create a new post"
                altText="Create a new post"
                dispatchFunction={() => GoCreatePostFromCategory(categoryID)}
                buttonStyle={buttonStyle}
            />
        )
    }
    return { CreateNewPost, CreateNewPostWithCategory }
}

const PostFormButtons = props => {
    const {

    } = props; 
    //const navigate = useNavigation();

    const {
        primaryLabel,
        secondaryLabel,
        navigate,
        publishFunc,
        draftFunc,  
    } = useContext(PostContext)

    const UniversalStyle = `rounded-[15px] p-[10px] sm:px-[12px] active:translate-x-[5px] text-base
    active:translate-y-[5px] select-none  cursor-pointer sm:w-[150px] text-center w-fit`


    const CancelStyle = `!active:bg-[#4B4B4B] box_shadow
    text-white mx-auto hover:bg-gray-300 !bg-[#333333] ${UniversalStyle}`; 

    return (
        <div
            className = "w-full md:w-9/12 mx-auto [&>button]:block [&>button]:mx-auto md:[&>button]:inline-block md:[&>button]:mx-10 justify-between flex"
        >
            <button
                className="btn-primary"
                onClick={publishFunc}
                type="button"
            >{primaryLabel ? primaryLabel : "Publish"}</button>
            <button
                className="btn-standard bg-[#696969] text-white"
                type = "button"
                onClick={draftFunc}
            >{secondaryLabel ? secondaryLabel : "Save as draft"}</button>
            <button
                type="button"
                className="btn-standard bg-[#000000] text-white"
                value="Cancel"
                onClick={useCallback(() => navigate(-1))}
            >Cancel</button>
        </div>
        )
}

PostFormButtons.propTypes = {
    publishFunc: PropTypes.func, 
    draftFunc: PropTypes.func, 
    secondaryLabel: PropTypes.string, 
}

export {
    PostButtons,
    PostFormButtons,
}
