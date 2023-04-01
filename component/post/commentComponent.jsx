import { FaRegCommentDots } from 'react-icons/Fa';
import { IconContext } from 'react-icons';

const RenderCommentSymbol = props => {
    const {
        //number of comments
        number
    } = props; 
    return (
        <IconContext.Provider value={{ size: "25px" }}>
            <span className = "inline-flex my-10"><FaRegCommentDots /><span className = "ml-5">{number}</span></span>
        </IconContext.Provider>
        )
}

export { RenderCommentSymbol}