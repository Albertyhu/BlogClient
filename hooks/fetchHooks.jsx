import { Base64Hooks } from './imageHooks.jsx';
import { alertMessage } from './textHooks.jsx';
import {
    FormatImagesInListOfUsers,
    FormatImagesInArrayOfPosts,
    FormatImagesInUserPhotoArray,
} from './formatHooks.jsx'; 
const {
    convertObjToBase64,
    toBase64, 
} = Base64Hooks(); 
import axios from 'axios';

const FetchHooks = (apiURL, token, setLoading, setMessage) => {
    const GetAllUsers = async (setUsers) => {
        const FetchURL = `${apiURL}/users`;
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET',
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    setUsers(FormatImagesInUserData(result.users))
                    setLoading(false)

                }
                else {
                    console.log("GetAllUsers error: ", result.error)
                    setLoading(false)
                    alertMessage("Something went wrong with fetching users from the database", setMessage)
                }
            })
            .catch(error => {
                console.log("GetAllUsers error: ", error)
                setLoading(false)
                alertMessage("Something went wrong with fetching users from the database", setMessage)
            })
    }

    //This functions allows the loading of multiple users as the current user scrolls down a page
    const GetUsersByPage = async (pageNumber, COUNT, setItemList, setHasMore) => {
        const FetchURL = `${apiURL}/users/get_users_by_pagination/${pageNumber}/${COUNT}`;
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET',
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    const users = FormatImagesInListOfUsers(result.users)
                    setItemList(prev => [...new Set([...prev, ...users])])
                    setHasMore(users.length > 0)
                    setLoading(false)
                }
                else {
                    console.log("GetAllUsers error: ", result.error)
                    setLoading(false)
                    alertMessage("Something went wrong with fetching users from the database", setMessage)
                }
            })
            .catch(error => {
                console.log("GetAllUsers error: ", error)
                setLoading(false)
                alertMessage("Something went wrong with fetching users from the database", setMessage)
            })
    }

    const fetchUserDetails = async (userID, dispatch, dispatchError) => {
        try {
            const FetchURL = `${apiURL}/users/${userID}`
            var response = await fetch(FetchURL, { method: "GET" })
            var data = await response.json();
            if (response.ok) {
                if (data.profile_pic && Object.keys(data.profile_pic).length > 0) {
                    console.log("data.profile_pic: ", data.profile_pic)
                    data.profile_pic.data = toBase64(data.profile_pic.data.data)
                }
                else {
                    data.profile_pic = null; 

                }
                if (data.coverPhoto && Object.keys(data.coverPhoto).length > 0) {
                    console.log("data.coverPhoto: ", data.coverPhoto)
                    data.coverPhoto = convertObjToBase64(data.coverPhoto);
                }
                else {
                    data.coverPhoto = null
                }
                dispatch(data);
            }
            else {
                console.log(result.error)
                if (dispatchError) {
                    dispatchError(result.error)
                }
            }

        } catch (err) {
            console.log("Error: ", err)
        }
    }

    //This function retrieves data on a user's profile by his username
    const fetchUserByName = async (username, { setProfileDetails, setProfileId, setPosts, setUserPhotos }) => {
        const FetchURL = `${apiURL}/users/${username}/fetch_user`;
        setLoading(true)
        await fetch(FetchURL, {
            method: "GET",
        }).then(async response => {
            const result = await response.json();
            if (response.ok) {
                if (result.user.profile_pic && Object.keys(result.user.profile_pic).length > 0) {
                    result.user.profile_pic.data = toBase64(result.user.profile_pic.data.data)
                }
                if (result.user.coverPhoto && Object.keys(result.user.coverPhoto).length > 0) {
                    result.user.coverPhoto = convertObjToBase64(result.user.coverPhoto)
                }
                setProfileDetails(result.user);
                setProfileId(result.user._id);
                if (result.posts && result.posts.length > 0) {
                    result.posts = await FormatImagesInArrayOfPosts(result.posts)
                    setPosts(result.posts);
                }

                if (result.images && result.images.length > 0) {
                    result.images = await FormatImagesInUserPhotoArray(result.images)
                    setUserPhotos(result.images);
                }
                setLoading(false);
            }
            else {
                console.log("fetchUserByName: ", result.error)
                setLoading(false)
                setMessage(result.error)
            }
        }).catch(error => {
            console.log("fetchUserByName: ", error)
            setLoading(false)
            setMessage(error)
        })
    }


    const fetchUsernameAndEmails = async (dispatch) => {
            try {
                var response = await fetch('http://localhost:80/users/usernameandemail')
                var data = await response.json();
                dispatch(data); 

            } catch (err) {
                console.log("Error: ", err)
            }
    }

    const FetchProfilePic = async (FetchURL, dispatch, updateLocal) => {
        await fetch(FetchURL,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then(async response => {
                if (response.ok) {
                    await response.json()
                        .then(result => {
                            if (result) {
                                const stringEncoded = toBase64(result.profile_pic.data.data);
                                if (updateLocal) {
                                    localStorage.setItem("ProfilePicture", JSON.stringify({
                                        contentType: result.profile_pic.contentType,
                                        data: stringEncoded,
                                    }))
                                }
                                dispatch({
                                    contentType: result.profile_pic.contentType,
                                    data: stringEncoded,
                                })
                            }
                        })
                }
                else {
                    const result = await response.json();
                    console.log("Error in fetching image: ", result.error)
                }
            })
    }

    const FetchPostsByCategory = async (CategoryID, setPosts) => {
        var FetchURL = `${apiURL}/post/get_posts_by_category/${CategoryID}`; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET',
        })
        .then(async response => {

            const result = await response.json()
            if (response.ok) {
                result.post.forEach(item => {
                    if(item.mainImage)
                        item.mainImage.data = toBase64(item.mainImage.data.data); 
                })
                setPosts(result.post);
            }
            else {
                console.log("There was an error with FetchPostsByCateogy: ", result.error)
            }
        })
        setLoading(false)
    }

    //This function runs when the app starts 
    const GetUsersAndCategeries = async (dispatchFunctions) => {
        const FetchURL = `${apiURL}/users_and_categories`; 
        const {
            setCategoryList, 
            setUsersList, 
        } = dispatchFunctions; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    console.log("users: ", result.Users)
                    console.log("categories: ", result.categories)
                    const list = result.categories;
                    list.forEach(item => {
                        item.image.data = toBase64(item.image.data.data)
                    })
                    setCategoryList(list)
                    setUsersList(result.Users)
                    setLoading(false)
                }
                else {
                    console.log("There was an error with GetUsersAndCategeries: ", result.error)
                    alertMessage("There was a problem with the database", setMessage)
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log("GetUsersAndCategeries  error: ", error)
                setLoading(false)
                alertMessage("Something went wrong with fetching users from the database", setMessage)
            })
    }

    const GetCurrentUserAndCategories = async (userId, dispatchFunctions) => {
        const {
            setCategoryList, 
            setUser
        } = dispatchFunctions; 
        const FetchURL = `${apiURL}/users/${userId}/get_current_user_and_categories`; 
        setLoading(true)
        await fetch(FetchURL, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(async response => {
            const result = await response.json(); 
            if (response.ok) {
                result.user = FormatImagesInUserData(result.user); 
                setUser(result.user); 
                setCategoryList(result.categories)
                setLoading(false)
            }
            else {
                console.log("GetOneUserAndCategories error 1: ", result.error); 
                setLoading(false)
                alertMessage(result.error, setMessage)

            }
        }).catch(error => {
            setLoading(false)
            console.log("GetOneUserAndCategories error 2: ", error);
            alertMessage(error, setMessage)
        })
    }

    const GetPopularCategoriesAndPosts = async (count, dispatchFunctions) => {
        const {
            setTopCategories, 
            setTopPosts, 
        } = dispatchFunctions;
        setLoading(true)
        const FetchURL = `${apiURL}/get_popular_categories_and_posts/${count}`; 
        await axios.get(FetchURL)
            .then(async response => {
                const result = await response.data; 
                if (response.status === 200) {
                    setTopCategories(result.TopCategories)
                    setTopPosts(result.TopPosts)
                }
                else {
                    console.log("GetPopularCategoriesAndPosts error: ", result.error)
                }
            })
            .catch(error => {
                console.log("GetPopularCategoriesAndPosts error: ", error)
            })
    }

    return {
        GetAllUsers, 
        GetUsersByPage,
        fetchUserDetails,
        fetchUserByName, 
        fetchUsernameAndEmails,
        FetchProfilePic,
        FetchPostsByCategory,
        GetUsersAndCategeries, 
        GetCurrentUserAndCategories,
        GetPopularCategoriesAndPosts,
    }
}


export {FetchHooks}