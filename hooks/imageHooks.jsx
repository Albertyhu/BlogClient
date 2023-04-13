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

//function AttachImagesToArray(evt, setImage, setFile) {
//    const file = evt.target.files[0];
//    const reader = new FileReader();
//    reader.readAsDataURL(file);
//    console.log("reader.result: ", reader)
//    reader.onload = () => {
//        try {
//            setImage(prev => [...prev, reader.result]);
//            setFile("")
//        } catch (e) {
//            console.log(" AttachImagesToArray error: ", e)
//        }
//    }
//}

function AttachImagesToArray(evt, setImage, setFile) {
    const files = evt.target.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
            images.push({
                file: file,
                base64: reader.result,
            });
            if (images.length === files.length) {
                setImage(images)
            }
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

    function convertArrayToBase64(arr) {
        return arr.map(image => {
            return {
                data: toBase64(image.data.data),
                contentType: image.contentType,
            }

        })
    }

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



export {
    ImageHooks,
    HandleFileChange,
    AttachImagesToArray,
    Base64Hooks
}