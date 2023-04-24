export function cleanString(str) {
    try {
        // Replace whitespace with hyphens
        str = str.replace(/\s+/g, '-');

        // Remove punctuation marks
        str = str.replace(/[^\w\s]|_/g, '');

        // Return the cleaned string
        return str;
    } catch (e) {
        console.log("cleanString error: ", e)
    }
}

//This function is a supplement to the message component.
//It converts the message into the proper array format and recreates the alert function
export function alertMessage(message, dispatch) {
    try {
        var arr = [{ param: "general", msg: message }]
        dispatch(arr)
    } catch (e) { console.log("alertMessage error: ", e) }
}