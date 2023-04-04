import AddButton from '../addButton.jsx'
import { PostNavigationHooks } from '../../hooks/navigation.jsx'; 

const PostButtons = (navigate) => {

    const { GoCreatePost } = PostNavigationHooks(navigate)
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
    return {CreateNewPost}
}

export { PostButtons }
