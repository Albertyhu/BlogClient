import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../screens/authentication/signin.jsx'; 
import Home from '../screens/home';

const Apps = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
        );
}

export default Apps; 