import PropTypes from 'prop-types';
import { useNavigation } from 'react-router-dom';

//need a navigation function. User clicks on tag and it goes to a screen that shows a list of posts with the same tag. 
export const RenderTag = props => {
    const {
        name,
        navigate, 
    } = props;

    const navigate = useNavigation(); 

    return deleteTag ?
        (
            <div
                className="Tag"
            >
                <div>{name}</div>
            </div>
        )
        :
        (
            <div
                className="Tag"
            >
                <div>{name}</div>
            </div>
        )
}

RenderTag.propTypes = {
    name: PropTypes.string, 
    navigate: PropTypes.func, 
}

export default RenderTag; 