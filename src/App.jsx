import { useState, useEffect, useRef } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';
import { CategoryHooks } from '../hooks/categoryHooks.jsx';
import { DecodeToken } from '../hooks/decodeToken.jsx';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [decoded, setDecoded ] = useState(null) 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [ProfilePicture, setProfilePic] = useState(JSON.parse(localStorage.getItem('ProfilePicture')));
    const [displayMemberComponents, setDisplayMemberComponents] = useState(token ? true : false)
    const [categoryList, setCategoryList] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [message, setMessage] = useState([]); 

    const defaultTheme = {} 
    const ContainerRef = useRef(); 
    const context = {
        apiURL: import.meta.env.VITE_API_URL.toString(),
        token,
        decoded, 
        setDecoded, 
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
        categoryList, 
        setCategoryList, 
        loading,
        setLoading, 
        defaultTheme, 
        ContainerRef, 
        message,
        setMessage,
    }
    const { FetchCategories } = CategoryHooks(null, context.apiURL, token, setLoading)

    useEffect(() => {
        if (token) {
            setDisplayMemberComponents(true)
            setDecoded(DecodeToken(token))
        }
        console.log("token: ", token)
    }, [token])

    useEffect(() => {
        if(categoryList == null)
           FetchCategories({setCategoryList})
    }, [categoryList])

    return (
        <AppContext.Provider value={context}>
            <RouteComponent token={token} />
        </AppContext.Provider>
    )
}

export default App
