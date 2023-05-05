import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import AddButton from '../AddButton.jsx'; 
import { FiLogIn } from 'react-icons/fi';
import { IconContext } from 'react-icons'; 

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
                <p> Sign up or sign in to start interacting with our communities.</p>
                <div className="[&>button]:my-10 grid">
                    <IconContext.Provider value={{ size: "25px", margin: "10px"}}>
                        <button
                            type="button"
                            onClick={GoSignIn}
                            className = "btn-primary"
                        >
                            <span className="[&>*]:inline-block">Sign In <span className = "ml-5"><FiLogIn /></span></span>
                        </button>
                    </IconContext.Provider>
                <AddButton
                    title="Sign Up"
                    dispatchFuntcion={GoSignUp}
                    />
                </div>
            </div>
        </div>
    )
}

export default Panel; 