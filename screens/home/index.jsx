//homepage
import React, { useCallback, useContext } from 'react'; 
import Button from '../../component/button.jsx';
import { useNavigate } from 'react-router-dom'; 
import { NavigationHooks } from '../../hooks/navigation.jsx'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { UserProfileHooks } from '../../hooks/userProfileHooks.jsx'

const Home = props => {
    const navigate = useNavigate();
    const { GoSignIn, GoSignUp } = NavigationHooks();
    const { user, token, apiURL, ClearToken, displayMemberComponents } = useContext(AppContext);
    const { DeleteUser } = UserProfileHooks(); 
    console.log("user: ", user)

    const dispatchFunctions = {
        ClearToken,
        navigate
    }

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
            {user && displayMemberComponents &&  
                <button
                        type='button'
                        className='btn-delete'
                        value="Sign Up"
                        onClick={() => { DeleteUser(apiURL, user.id, dispatchFunctions)} }
                >Delete Account</button>
            }
            </div>
    </div>)
}

export default Home; 