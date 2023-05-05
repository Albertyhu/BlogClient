import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';

const RenderItem = props => {
    const {
        index,
        _id,
        name,
        numPosts,
        keyValue, 
    } = props; 

    const navigate = useNavigate();
    const {
        VisitOneCategory, 
    } = NavigationHooks(navigate); 

    return (
        <span
            id="PopularListItem"
            onClick={() => VisitOneCategory(name, _id)}
           
        ><span className ="font-bold">{index + 1}.</span> {name}</span>
        )
}

export default RenderItem; 