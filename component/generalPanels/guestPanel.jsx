import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import AddButton from '../addButton.jsx'; 
import {
    LogInIcon,
    SignupIcon
} from '../iconComponents.jsx'; 

const Panel = props => {
    const navigate = useNavigate(); 
    const {
        GoSignIn, 
        GoSignUp, 
    } = NavigationHooks(navigate); 
    return (
        <div
            id="GuestPanel"
            className=" hidden md:block bg-[#ffffff] rounded-[15px] py-10 mx-auto box_shadow mb-5"
        >
            <div
                className= "w-8/12 mx-auto justify-center" 
            >
                <h2 className="text-center font-bold">Welcome.</h2>
                <p> Sign in or sign up to start interacting with our communities.</p>
                <div className="[&>button]:my-5 grid">
                    <button
                        type="button"
                        onClick={GoSignIn}
                        className = "btn-primary"
                    >
                        <span className="[&>*]:inline-block">Sign In <span className="ml-5"><LogInIcon /></span></span>
                    </button>
                    <h2 className="text-center font-bold">Or</h2>
                    <button
                        type="button"
                        onClick={GoSignUp}
                        className="btn-add"
                    >
                        <span className="[&>*]:inline-block">Sign up<span className="ml-5"><SignupIcon black={false} /></span></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Panel; 