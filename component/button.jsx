import { useCallback, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'
import PlusIcon from '../assets/icons/white_plus_icon.png'; 
import "../src/index.css"; 

//Pre-requisites: react-router-dom
//ButtonStyle: Tailwind CSS properties of the button
//ButtonType: designates type of the button tag whether that is 'submit' or 'button'
//Location: Destination after clicking the button 
//Value: The text displayed on the button
//Data: Data to be passed to the next page using location.state; 
export const Button = props => {
    const { ButtonStyle, ButtonType, Location, Value, Data } = props; 
    var DefaultButtonStyle = `rounded-full p-[10px] active:translate-x-[5px] 
    active:translate-y-[5px] cursor-pointer border-black border-2 
    text-center w-fit sm:w-[150px] select-none text-black mx-auto 
    hover:bg-gray-300 bg-[#dbdbdb]`

    var navigate = useNavigate(); 
    const NavigateTo = useCallback(() => navigate(`${Location != "-1" ? Location : -1}`, {state: Data ? Data : null}), [navigate])

    return (
        <button
            type={ButtonType ? ButtonType : "button"}
            className={ButtonStyle ? ButtonStyle : DefaultButtonStyle}
            onClick={Location ? ()=>NavigateTo() : null}
        >{Value}</button>)
}

export const AddButton = props => {
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