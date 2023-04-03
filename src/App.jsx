import { useState, useEffect } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';
import { CategoryHooks } from '../hooks/categoryHooks.jsx';

function App() {
    const { FetchCategories } = CategoryHooks()
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [ProfilePicture, setProfilePic] = useState(JSON.parse(localStorage.getItem('ProfilePicture')));
    const [displayMemberComponents, setDisplayMemberComponents] = useState(token ? true : false)
    const [categoryList, setCategoryList] = useState(null); 

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
        categoryList, 
        setCategoryList, 
    }

    useEffect(() => {
        if (token != null && typeof token != 'undefined') {
            setDisplayMemberComponents(true)
        }
    }, [token])

    useEffect(() => {
        if(categoryList == null)
           FetchCategories(context.apiURL, {setCategoryList})
    }, [categoryList])

    return (
        <AppContext.Provider value={context}>
            <RouteComponent token={token} />
        </AppContext.Provider>
    )
}

export default App
