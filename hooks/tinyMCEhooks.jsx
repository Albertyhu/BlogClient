export const ConvertToPlainText = content => {
    try {
        const regex = /(<([^>]+)>)/gi;
        const plainText = content.replace(regex, "");
        return plainText;
    } catch (e) {
        console.log("There is an error with ConvertToPlainText: ", e)
    }
}

export const CheckLength = content => {
    try {
        const plainText = ConvertToPlainText(content)
        return plainText.legnth; 
    }
    catch (e) {
        console.log("There is an error with Check Length: ", e)
    }

}