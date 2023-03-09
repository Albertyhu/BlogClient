import { useState, useEffect } from 'react'
import uuid from 'react-uuid'; 
import RouteComponent from '../component/routes.jsx'; 

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

    useEffect(() => {
        //fetchUsers();

    }, [])
  return (
    <RouteComponent />
  )
}

export default App
