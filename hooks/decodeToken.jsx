
const DecodeToken = token => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.log("There is an error in decoding the token: ", e)
    }
}

export { DecodeToken }