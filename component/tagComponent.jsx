import "../src/index.css"
import DeleteIcon from '../assets/icons/cancel.png';
import uuid from 'react-uuid'; 

export const Tag = props => {
    const {
        name,
        deleteTag
    } = props;
    return deleteTag ?
        (
            <div
                className="Tag"
                onClick={() => deleteTag(name)}
            >
                <div>{name}</div>
                <img
                    className="MiniDeleteButton ml-5"
                    src={DeleteIcon}
                />
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

export const RenderTagField = props => {
    const { tag } = props; 
    return (
        <div className = "text-left">
            <h3
                className = "font-bold"
            >Tags</h3>
            <div
                id="TagField"
            >
                {tag.map(item =>
                    <Tag
                        key={uuid()}
                        {...item}
                    />)}
            </div>
        </div>
        )
}


