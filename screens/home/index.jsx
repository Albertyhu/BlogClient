//homepage
import React from 'react'; 
import Button from '../../component/button.jsx';

const Home = props => {
    return (
        <div
            className = "w-full text-center text-lg text-black" 
        >
            <h1 className="text-center mx-auto">Home</h1>
            <Button
                ButtonType="button"
                Location="/signin"
                Value="Sign In"
            />
    </div>)
}

export default Home; 