import { useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

export const FormButtons = props => {

    const UniversalStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px] text-base
    active:translate-y-[5px] select-none  cursor-pointer sm:w-[150px] text-center w-fit my-5`

    const SubmitStyle = `!active:bg-[#C6C6C6] border-[#dbdbdb] border-2 
    text-black mx-auto hover:bg-gray-300 !bg-[#dbdbdb] ${UniversalStyle}`;

    const CancelStyle = `!active:bg-[#4B4B4B] border-white border-2 
    text-white mx-auto hover:bg-gray-300 !bg-[#333333] ${UniversalStyle}`; 

    const navigate = useNavigate(); 

    return (
        <div id="ButtonWrapper"
            className = "grid sm:flex"
        >
            <button
                type="submit"
                className={SubmitStyle}
                value="Submit"
            >Submit</button>
            <button
                type="button"
                className={CancelStyle}
                value="Cancel"
                onClick={useCallback(()=>navigate(-1))}
            >Cancel</button>
        </div>
        )
}