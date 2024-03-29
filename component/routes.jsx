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
import CreateCategory from '../screens/category/createCategory.jsx';
import EditCategory from '../screens/category/editCategory.jsx';
import TagsPage from '../screens/tag'; 
import CreateTag from '../screens/tag/tagForm.jsx'; 
import PostDive from '../screens/post';
import CreatePost from '../screens/post/createPost.jsx';
import EditPost from '../screens/post/editPost.jsx';
import ErrorPage from '../screens/error';
import { SpinnerAnim } from '../component/loadingComponent.jsx'; 
import MessageComponent from '../component/messageComponent.jsx'; 
import UserPhotosScreen from '../screens/userPhoto'; 
import PhotoDetailScreen from '../screens/userPhoto/photoDetail.jsx'; 
import BulkUploadForm from '../screens/userPhoto/bulkUpload.jsx';
import SettingsPage from '../screens/userSettings'; 
import DisplayAllUsers from '../screens/user/renderAllUsers.jsx'; 
import SearchScreen from '../screens/search'; 
import EditUserProfileAsAdmin from '../screens/user/editProfileAsAdmin.jsx'; 
import PrivacyPolicy from '../screens/PrivacyPolicy'; 
import Terms from '../screens/terms'; 
import UserPostsScreen from '../screens/post/postListByUser.jsx'; 

const Apps = props => {
    const {
        ContainerRef, 
        loading,
        message, 
        setMessage, 
    } = useContext(AppContext); 

    const containerStyle = `w-full flex flex-col relative grow min-h-[120vh] bg-[#E5E5E5]`
    return (
        <div
            id="Container"
            className={containerStyle}
            ref={ContainerRef}
        >
            {loading &&
                <SpinnerAnim />
            }
            <MessageComponent
                message={message}
                dispatch={setMessage}
            />
            <BrowserRouter>
                <Header />
                <div
                    id= "ContentWrapper"
                    className="mt-[50px] pb-[460px]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<RegistrationForm />} />
                        <Route path="/profile/:username" element={<ProfilePage />} />
                        <Route path="/profile/:username/editProfile" element={<EditProfilePage />} />
                        <Route path="/profile/:username/editProfilePicture" element={<EditProfilePicture />} />
                        <Route path="/profile/:username/editpassword" element={<EditPasswordForm />} />
                        <Route path="/category" element={<CategoryPage/> } />
                        <Route path="/category/create" element={<CreateCategory />} />
                        <Route path="/category/:category_name" element={<CategoryDive />} />
                        <Route path="/category/:category_name/:category_id" element={<CategoryDive />} />
                        <Route path="/category/:category/edit" element={<EditCategory />} />
                        <Route path="/tags" element={<TagsPage />} />
                        <Route path="/tags/create" element={<CreateTag />} />
                        <Route path="/post/:post_title/:post_id" element={<PostDive />} />
                        <Route path="/post/new" element={<CreatePost />} />
                        <Route path="/post/:post_name/edit" element={<EditPost />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/profile/:username/:userId/posts" element={<UserPostsScreen />} />
                        <Route path="/profile/:username/user_photos" element={<UserPhotosScreen />} />
                        <Route path="/profile/:username/user_photos/:photoId" element={<PhotoDetailScreen />} />
                        <Route path="/profile/:username/user_photos/bulk_upload" element={<BulkUploadForm />} />
                        <Route path="/profile/:username/settings" element={<SettingsPage />} />
                        <Route path="/users" element={<DisplayAllUsers />} />
                        <Route path="/search" element={<SearchScreen />} />
                        <Route path="/profile/:username/editProfileAsAdmin" element={<EditUserProfileAsAdmin />} />
                        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                        <Route path="/terms&conditions" element={<Terms />} />
                    </Routes>
                </div>
                <Footer
                    BusinessName="Blabber"
                />
            </BrowserRouter>

        </div>
        );
}

export default Apps; 