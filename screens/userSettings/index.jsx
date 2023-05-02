import { useContext, useEffect } from 'react'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { useNavigate } from 'react-router-dom'; 
import { DeleteAccountButton } from '../../component/button.jsx'; 

const SettingsScreen = props => {
    const navigate = useNavigate(); 
    const {
        token, 
        decoded,
        setMessage, 
        setLoading
    } = useContext(AppContext)
    const {
        GoHome, 
        GoEditPassword, 
    } = NavigationHooks(navigate); 
    useEffect(() => {
        if (!token) {
            GoHome("You are not allowed on that page.")
        }
    }, [])
    return (
        <div
            id="Wrapper"
            className= "w-11/12 grid mx-auto rounded-md box_shadow bg-[#ffffff] my-10 py-10 [&>*]:my-5 [&>*]:md:my-10"
        >
            <h1
                className="text-center font-bold text-2xl my-1 md:my-5"
            >Settings</h1>
            <button
                className="btn-standard"
                onClick={()=>GoEditPassword(decoded.username, decoded.id)}
            >Change Password</button>
            <DeleteAccountButton />
        </div>
        )
}

export default SettingsScreen;