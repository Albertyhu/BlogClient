import { useState, useEffect } from 'react'
import uuid from 'react-uuid'; 
import RouteComponent from '../component/routes.jsx'; 
import { AppContext } from '../util/contextItem.jsx'; 
import './index.css';

function App() {
    var [Users,setUsers] = useState([])

    const fetchUsers = async () => { 
        try {
            var response = await fetch('http://localhost:80/users')
            var data = await response.json(); 
            setUsers(data)
        } catch (err) {
            console.log("Error: ", err)
        }
    }
    const context = {
        apiURL: import.meta.env.VITE_API_URL.toString(), 
    } 

    useEffect(() => {
        //fetchUsers();
    }, [])
    return (
      <AppContext.Provider value = {context}>
            <RouteComponent />
      </AppContext.Provider>
  )
}

export default App
