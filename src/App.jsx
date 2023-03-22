import { useState, useEffect } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [ProfilePicture, setProfilePic] = useState(JSON.parse(localStorage.getItem('ProfilePicture')));
    const [displayMemberComponents, setDisplayMemberComponents] = useState(token ? true : false)

    const context = {
        apiURL: import.meta.env.VITE_API_URL.toString(),
        token,
        user, 
        ProfilePicture, 
        setNewProfileImage: (val)=>setProfilePic(val), 
        displayMemberComponents,
        setNewToken: (val)=>setToken(val),
        setNewUser: (val) => setUser(val),
        toggleDisplayAccountLink: (val) => setDisplayMemberComponents(val), 
        ClearUserData: () => {
            setToken(null)
            setUser(null)
            setProfilePic(null); 
        },
    }

    useEffect(() => {
        if (token != null && typeof token != 'undefined') {
            setDisplayMemberComponents(true)
        }
    }, [token])


    //useEffect(() => {
    //        console.log("ProfilePicture: ", ProfilePicture)
    //}, [ProfilePicture])

    return (
        <AppContext.Provider value={context}>
            <RouteComponent token={token} />
        </AppContext.Provider>
    )
}

export default App
