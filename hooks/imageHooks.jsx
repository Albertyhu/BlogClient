const ImageHooks = () => {

    function isBase64Image(str) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    return {isBase64Image}
}

export {ImageHooks}