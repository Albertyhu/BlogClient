import PlusIcon from '../assets/icons/white_plus_icon.png';
import "../src/index.css";

const AddButton = props => {
    const { title,
        dispatchFunction,
        altText = "Add Button",
        buttonStyle = "btn-add"
    } = props;

    return (
        <button
            className={`${buttonStyle}`}
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