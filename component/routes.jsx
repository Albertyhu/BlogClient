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
import EditPasswordForm from '../screens/user/editPassword.jsx'; 
import CategoryForm from '../screens/category/categoryForm.jsx'; 
import CategoryPage from '../screens/category'; 
import CategoryDive from '../screens/category/CategoryDive.jsx';
import EditCategory from '../screens/category/categoryForm.jsx';
import TagsPage from '../screens/tag'; 
import CreateTag from '../screens/tag/tagForm.jsx'; 
import PostDive from '../screens/post';

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
                        <Route path="/profile/:username/editpassword" element={<EditPasswordForm />} />
                        <Route path="/category" element={<CategoryPage/> } />
                        <Route path="/category/create" element={<CategoryForm />} />
                        <Route path="/category/:category" element={<CategoryDive />} />
                        <Route path="/category/:category/edit" element={<EditCategory />} />
                        <Route path="/tags" element={<TagsPage />} />
                        <Route path="/tags/create" element={<CreateTag />} />
                        <Route path="/post/:post_name" element={<PostDive />} />

                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>

        </div>
        );
}

export default Apps; 