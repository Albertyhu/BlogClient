import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../screens/authentication/signin.jsx'; 
import Home from '../screens/home';
import Header from './header'
import Footer from './footer'; 
import RegistrationForm from '../screens/authentication/register.jsx'; 

const Apps = () => {
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
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>

        </div>
        );
}

export default Apps; 