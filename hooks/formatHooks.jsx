import { Base64Hooks } from './imageHooks.jsx'

const {
    toBase64,
    isBase64Image,
    convertArrayToBase64,
    convertObjToBase64
} = Base64Hooks(); 

export const FormatImagesInUserData = user => {
    const formatted = user;
    if (formatted.profile_pic)
        formatted.profile_pic = convertObjToBase64(formatted.profile_pic);
    if (formatted.coverPhoto)
        formatted.coverPhoto = convertObjToBase64(formatted.coverPhoto);
    if (formatted.connection && formatted.connection.length > 0) {
        formatted.connection.forEach(person => {
            if (person.profile_pic)
                person.profile_pic = convertObjToBase64(person.profile_pic);
            return person;
        })
    }
    return formatted;
}

export const FormatImagesInListOfUsers = userList => {
    const formatted = userList.map(user => {
        if (user.profile_pic && Object.keys(user.profile_pic).length !=0)
            user.profile_pic = convertObjToBase64(user.profile_pic);
        if (user.coverPhoto)
            user.coverPhoto = convertObjToBase64(user.coverPhoto);
        if (user.connection && user.connection.length > 0) {
            user.connection.forEach(person => {
                if (person.profile_pic)
                    person.profile_pic = convertObjToBase64(person.profile_pic);
                return person;
            })
        } 

        return user; 
    });

    return formatted;
}

export const FormatImagesInArrayOfPosts = postList => {
    try {
        var formatted = postList.map(post => {
            if (post.mainImage)
                post.mainImage = convertObjToBase64(post.mainImage);
            return post; 
        })
        return formatted;
    } catch (e) {
        console.log("FormatImagesInArrayOfPosts error: ", e)
    }
}

export const FormatImagesInUserPhotoArray = userPhotoArray => {
    try {
        var formatted = userPhotoArray.map(obj => {
            obj.image = convertObjToBase64(obj.image)
            return obj;
        })
        return formatted;
    } catch (e) {
        console.log("FormatImagesInUserPhotoArray error: ", e)
    }
}