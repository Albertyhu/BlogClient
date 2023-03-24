import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../screens/authentication/signin.jsx'; 
import { useContext, useCallback } from 'react'; 
import Home from '../screens/home';
import Header from './header'
import Footer from './footer'; 
import RegistrationForm from '../screens/authentication/register.jsx'; 
import "../src/index.css"; 
import { AppContext } from '../util/contextItem.jsx'; 
import EditProfilePage from '../screens/user/editProfile.jsx'; 
import EditProfilePicture from '../screens/user/editProfilePic.jsx'; 
import ProfilePage from '../screens/user'; 

const Apps = props => {
    //const { token } = useContext(AppContext); 

    const containerStyle = `w-full flex flex-col relative grow min-h-[120vh]`
    return (
        <div
            id="Container"
            className={containerStyle}
            >
            <BrowserRouter>
                <Header />
                <div
                    id= "ContentWrapper"
                    className="mt-[50px] mb-[400px]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<RegistrationForm />} />
                        <Route path="/profile/:username" element={<ProfilePage />} />
                        <Route path="/profile/:username/editProfile" element={<EditProfilePage />} />
                        <Route path="/profile/:username/editProfilePicture" element={<EditProfilePicture />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>

        </div>
        );
}

export default Apps; 