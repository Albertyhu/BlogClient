
const GetToken = () => {
    return localStorage.getItem("token");
}

const DecodeToken = token => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.log("There is an error in decoding the token: ", e)
    }
}

const GetDecodedToken = () => {
    return DecodeToken(localStorage.getItem("token"))
} 

export {
    GetToken, 
    DecodeToken,
    GetDecodedToken
}