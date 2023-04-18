import PropTypes from 'prop-types'; 

const ImageHooks = () => {

    function isBase64Image(str) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    return {isBase64Image}
}

function HandleFileChange(evt, setImage) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImage(reader.result);
    }
}

HandleFileChange.propTypes = {
    setImages: PropTypes.func, 
}

function AttachImagesToArray(evt, setImage) {
    const files = evt.target.files;
    var images = null;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        //Create FileReader
        //This is how you can access the necessary file resources of an image 
        const reader = new FileReader();
        reader.readAsDataURL(file)

        //Everytime the reader is loaded with something, add the necessary resources into the images array
        reader.onload = () => {
            images = {
                file: file,
                base64: reader.result,
            };
            setImage(prev => [...prev, images])
        }
    }
}

AttachImagesToArray.propTypes = {
    setImages: PropTypes.func,
}

const Base64Hooks = () => {
    //converts the buffer data of an images to base64
    function toBase64(arr) {
        try {
            return btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        } catch (e) {
            console.log("Error in function toBase64: ", e);
        }
    }

    //checks if a string is base64
    function isBase64Image(str) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    //This function "convertArrayToBase64" is neccessary because the images retrieved from the server comes in the following format:
    /**
     * imageArr = [
     * {data: {
     *  data: <non-base64 data or blob>
     * },
     *  contentType: <contentType>,     
     * }] 
     * */
    function convertArrayToBase64(arr) {
        var base64arr = arr; 
        base64arr.forEach(image => {
            image.data = toBase64(image.data.data)
        })
        return base64arr
    }

    //The function "convertObjToBase64" is similar to the function "convertArrayToBase64", but it formats an image obj instead
    function convertObjToBase64(obj) {
        return {
            data: toBase64(obj.data.data),
            contentType: obj.contentType
        }
    }

    return {
        toBase64,
        isBase64Image,
        convertArrayToBase64,
        convertObjToBase64
    }
}

const formatExistingImageArray = (imgArr) => {
    var formatted = []
    imgArr.forEach(img => {
        const reader = new FileReader() 
        const imgblob = new Blob([img.data], {type: img.contentType});

        reader.readAsDataURL(imgblob);
        reader.onload = () => {
            var images = {
                file: img,
                base64: reader.result,
            };
            formatted.push(images); 
        }
    })
    return formatted 
}

export {
    ImageHooks,
    HandleFileChange,
    AttachImagesToArray,
    Base64Hooks,
    formatExistingImageArray,
}