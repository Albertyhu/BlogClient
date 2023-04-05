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

function AttachImagesToArray(evt, setImage, setFile) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        try {
            setImage(prev => [...prev, reader.result]);
            setFile("")
        } catch (e) {
            console.log(" AttachImagesToArray error: ", e)
        }
    }
}

AttachImagesToArray.propTypes = {
    setImages: PropTypes.func,
}

export {
    ImageHooks,
    HandleFileChange,
    AttachImagesToArray,
}