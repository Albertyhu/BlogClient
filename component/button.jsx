import { useCallback } from 'react'; 
import {useNavigate} from 'react-router-dom'
 
const Button = props => {
    const { ButtonStyle, ButtonType, Location, Value, Data } = props; 
    var DefaultButtonStyle = `rounded-full p-[10px] active:translate-x-[5px] 
    active:translate-y-[5px] cursor-pointer border-black border-2 
    text-center w-fit sm:w-[150px] select-none text-black mx-auto 
    hover:bg-gray-300 bg-[#dbdbdb]`

    const navigate = useNavigate(); 

    const NavigateTo = useCallback(() => navigate(`${Location}`, {state: Data ? Data : null}), [navigate])

    return (
        <button
            type={ButtonType ? ButtonType : "button"}
            onClick={NavigateTo}
            className={ ButtonStyle ? ButtonStyle : DefaultButtonStyle}
        >{Value}</button>)
}

export default Button; 