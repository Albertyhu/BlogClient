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