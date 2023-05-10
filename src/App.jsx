import { useState, useEffect, useRef } from 'react'
import RouteComponent from '../component/routes.jsx';
import { AppContext } from '../util/contextItem.jsx';
import './index.css';
import { CategoryHooks } from '../hooks/categoryHooks.jsx';
import { FetchHooks } from '../hooks/fetchHooks.jsx'; 
import {
    DecodeToken,
    GetDecodedToken, 
} from '../hooks/decodeToken.jsx';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [decoded, setDecoded ] = useState(GetDecodedToken()) 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    //usersList keeps track of all users of the site
    const [usersList, setUsersList] = useState([]);
    const [ProfilePicture, setProfilePic] = useState(JSON.parse(localStorage.getItem('ProfilePicture')));
    const [coverPhoto, setNewCoverPhoto] = useState(JSON.parse(localStorage.getItem("coverPhoto"))); 
    const [connection, setConnection] = useState(JSON.parse(localStorage.getItem('connection')))
    //This is the for the header menu
    const [displayMemberComponents, setDisplayMemberComponents] = useState(token ? true : false)
    const [categoryList, setCategoryList] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [message, setMessage] = useState([]); 

    const defaultTheme = {} 
    const ContainerRef = useRef(); 
    const context = {
        siteURL: import.meta.env.VITE_SITE_URL.toString(),
        apiURL: import.meta.env.VITE_BLABBER_SERVER_API_URL.toString(),
        siteTitle: "Blabber",
        token,
        decoded, 
        setDecoded, 
        user, 
        ProfilePicture, 
        coverPhoto, 
        setNewCoverPhoto, 
        connection,
        setConnection, 
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
    const {
        GetUsersAndCategeries,
        GetCurrentUserAndCategories, 
    } = FetchHooks(context.apiURL, token, setLoading, setMessage)
    useEffect(() => {
        if (token) {
            setDisplayMemberComponents(true)
            setDecoded(DecodeToken(token))
        }
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
