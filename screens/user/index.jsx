import {useContext, useCallback } from 'react'
import { useLocation } from 'react-router-dom'; 
import { AppContext } from '../../util/contextItem.jsx'; 

const ProfilePage = props => {
    const location = useLocation(); 
    const { } = props; 
    const { } = location.state; 
    const { user, token } = useContext(AppContext)
    return (
        <div>
            User's profile
        </div>
    )
}

export default ProfilePage; 