//homepage
import React, { useCallback } from 'react'; 
import Button from '../../component/button.jsx';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 

const Home = props => {
    const navigate = useNavigate();
    const { GoSignIn, GoSignUp } = NavigationHooks(); 
    return (
        <div
            className = "w-full text-center text-lg text-black" 
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Home</h1>
            <div className= "[&>*]:inline-block grid [&>*]:my-10 ">
            <button
                    type="button"
                    value="Sign In"
                    className="btn-primary"
                    onClick={useCallback(() =>GoSignIn(navigate), [navigate])}
            >Sign In</button>
            <button
                type='button'
                className='btn-secondary'
                value="Sign Up"
                onClick={useCallback(() => GoSignUp(navigate), [navigate])}
                >Sign Up</button>
            </div>
    </div>)
}

export default Home; 