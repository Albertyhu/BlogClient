import {CommentIcon} from '../../component/iconComponents.jsx'; 

const RenderCommentSymbol = props => {
    const {
        //number of comments
        number
    } = props; 
    return (
            <span className="inline-flex my-10">
                <CommentIcon />
                <span className="ml-5">{number}</span>
            </span>
        )
}

export { RenderCommentSymbol}