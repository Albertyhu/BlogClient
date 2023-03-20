import { useState, useEffect } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [displayAccountLink, setDisplayAccountLink] = useState(token ? true: false)
    const context = {
        apiURL: import.meta.env.VITE_API_URL.toString(),
        token,
        user, 
        displayAccountLink,
        setNewToken: (val)=>setToken(val),
        setNewUser: (val) => setUser(val),
        toggleDisplayAccountLink: (val) => setDisplayAccountLink(val), 
        ClearToken: () => {
            setToken(null)
            setUser(null)
        }
    }

    useEffect(() => {
        console.log("Token in app.js: ", token)
        if (token != null && typeof token != 'undefined') {
            setDisplayAccountLink(true)
        }
    }, [token])

    return (
        <AppContext.Provider value={context}>
            <RouteComponent token={token} />
        </AppContext.Provider>
    )
}

export default App
