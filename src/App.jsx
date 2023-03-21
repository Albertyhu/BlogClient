import { useState, useEffect } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [displayMemberComponents, setDisplayMemberComponents] = useState(token ? true: false)
    const context = {
        apiURL: import.meta.env.VITE_API_URL.toString(),
        token,
        user, 
        displayMemberComponents,
        setNewToken: (val)=>setToken(val),
        setNewUser: (val) => setUser(val),
        toggleDisplayAccountLink: (val) => setDisplayMemberComponents(val), 
        ClearToken: () => {
            setToken(null)
            setUser(null)
        }
    }

    useEffect(() => {
        console.log("Token in app.js: ", token)
        if (token != null && typeof token != 'undefined') {
            setDisplayMemberComponents(true)
        }
    }, [token])

    return (
        <AppContext.Provider value={context}>
            <RouteComponent token={token} />
        </AppContext.Provider>
    )
}

export default App
