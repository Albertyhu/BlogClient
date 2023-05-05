import { useNavigate } from 'react-router-dom';
import { PostNavigationHooks } from '../../hooks/navigation.jsx';
import uuid from 'react-uuid';

const RenderItem = props => {
    const {
        index, 
        _id, 
        title, 
        author, 
        comments, 
        numComments,
        numLikes, 
        keyValue, 
    } = props; 

    const navigate = useNavigate();
    const {
        GoToPost, 
    } = PostNavigationHooks(navigate); 

    return (
        <span
            key={uuid()}
            id="PopularListItem"
            onClick={() => GoToPost(title, _id)}
        ><span className ="font-bold">{index + 1}.</span> {title}</span>
        )
}

export default RenderItem; 