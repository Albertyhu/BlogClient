import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import uuid from 'react-uuid'; 
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
        <li
            key={uuid()}
            id="PopularListItem"
            onClick={() => VisitOneCategory(name, _id)}
            className={`cursor-pointer my-5 text-left ${index%2 == 1 ? "bg-[#ffffff]" : "bg-[#dedede]"}`}
        ><span className ="font-bold">{index + 1}.</span> {name}</li>
        )
}

export default RenderItem; 