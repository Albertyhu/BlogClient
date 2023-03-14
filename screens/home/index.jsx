//homepage
import React, { useCallback } from 'react'; 
import Button from '../../component/button.jsx';
import { useNavigate } from 'react-router-dom'; 

const Home = props => {
    const navigate = useNavigate();
    const GoSignIn = useCallback(() => navigate('/signin', {}), [navigate])

    return (
        <div
            className = "w-full text-center text-lg text-black" 
        >
            <h1 className="text-center mx-auto mt-[20px] text-2xl">Home</h1>
            <Button
                ButtonType = "button"
                Value = "Sign In"
                Location="/signin"
                ButtonStyle= "btn-primary"
            />
            <button
                type='button'
                className='btn-primary'
                value = "Sign Up"
            ></button>
    </div>)
}

export default Home; 