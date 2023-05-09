import {CommentIcon} from '../../component/iconComponents.jsx'; 

const RenderCommentSymbol = props => {
    const {
        //number of comments
        number
    } = props; 
    return (
            <span className="flex">
                <CommentIcon customStyle = "mx-1"/>
                <span className="text-lg ml-1">{number}</span>
            </span>
        )
}

export { RenderCommentSymbol}