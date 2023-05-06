import { useState, useContext, useEffect } from 'react'; 
import PaginatedDisplay from '../../component/paginatedDisplay.jsx';
import {
    AppContext,
    PaginatedDisplayContext,
} from '../../util/contextItem.jsx'; 
import { FetchHooks } from '../../hooks/fetchHooks.jsx'; 
import UserPanel from '../../component/user/userPanel.jsx'; 

//This component displays all members of the site in one screen.
//It loads multiple users at a time on scroll. 
const RenderAllUsers = props => {
    const {
        token,
        decoded,
        setLoading, 
        setMessage, 
        apiURL,
    } = useContext(AppContext)

    const [users, setUsers] = useState([])

    const { GetUsersByPage } = FetchHooks(apiURL, token, setLoading, setMessage)

    const paginatedContext = {
        itemList: users,
        setItemList:(val)=>setUsers(val),
        fetchAction: GetUsersByPage,
        RenderPanel: (id, item) => <UserPanel key={id} {...item} />,
    } 

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
     
    return (
        <div
            id="UsersContainer"
            className = "w-full mt-10"
        >
            <PaginatedDisplayContext.Provider value={paginatedContext}>
                <PaginatedDisplay
                COUNT={9}
                grid={true}
                />
            </PaginatedDisplayContext.Provider>
        {users.length <= 0 && 
            <div
                className= "text-center font-bold text-2xl my-10 w-full mx-auto"
            >There are currently no users on the site right now.</div>
        }
        </div>   

        )
}

export default RenderAllUsers; 