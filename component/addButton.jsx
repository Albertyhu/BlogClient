import PlusIcon from '../assets/icons/white_plus_icon.png';
import "../src/index.css";

const AddButton = props => {
    const { title,
        dispatchFunction,
        altText = "Add Button"
    } = props;

    return (
        <button
            className="btn-add"
            onClick={dispatchFunction}
        >{title}
            <img
                src={PlusIcon}
                alt={altText}
                className="buttonIcons"
            />
        </button>
    )
}

export default AddButton; 