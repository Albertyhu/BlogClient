import { useEffect, lazy, useContext, Suspense, useRef } from 'react';
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import '../../src/index.css';
import uuid from 'react-uuid';
import {
    HandleFileChange,
    AttachImagesToArray,
} from '../../hooks/imageHooks.jsx';
import { PostContext } from '../../util/contextItem.jsx'; 
const RenderCoverPhoto = lazy(() => import("../imageRendering/coverPhoto.jsx"));
import PropTypes from 'prop-types';
const RenderPreviewImages = lazy(() => import("./previewImage2.jsx")); 
const { RenderError, AnimateErrorMessage } = ErrorMessageHooks(); 


//Can be used for editing attached images as well. 
//image is an array that will store all the uploaded images 
export const AttachMultipleImages = props => {
    const {
        label = "Attach images",
        name,
        placeholder = "Upload an image here",
        labelStyle = "text-xl",
        uploadLimit, 
        contextItem,
    } = props;

    const {
        images,
        setImages,
        imagesError,
        imagesInputRef
    } = contextItem ? useContext(contextItem) : props; 

    const ImageErrorRef = useRef();

    useEffect(() => {
        if (imagesError.length > 0) {
            for (var child of ImageErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [imagesError])

    const deleteImage = (index) => {
        var arr = images.filter((item, ind) => ind != index); 
        setImages(arr); 
    }

    useEffect(() => {
        console.log("images: ", images)
    }, [images])

    return (
        <>
            <div className="grid">
                <label
                    htmlFor={label}
                    className={labelStyle}
                >{label}</label>
                <input
                    name={name}
                    id={`${name}Input`}
                    ref={imagesInputRef}
                    type="file"
                    placeholder={placeholder}
                    className="text-lg file:rounded-lg file:bg-[#99cbae] file:text-white cursor-pointer border-black border-[1px] rounded"
                    onChange={(evt) => { AttachImagesToArray(evt, setImages) }}
                    multiple
                />
                <div
                    id="imagesError"
                    className="ErrorDiv"
                    ref={ImageErrorRef}>
                    {imagesError != null && imagesError.length > 0 && RenderError(imagesError)}
                </div>
            </div>
            {
                images && images.length > 0 &&
                <>
                    <p className="text-base md:hidden text-center">[Tap on image to remove it]</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[5px] object-fit  overflow-hidden">
                        {images.map((preview, index) =>
                            <Suspense
                                key={uuid()}
                                fallback={<h2 className="text-center text-2xl mx-auto my-10 text-black">Loading preview...</h2>}
                            >
                                <RenderPreviewImages
                                    key={uuid()}
                                    image={preview}
                                    altText="Preview Image"
                                    deleteImage={deleteImage}
                                    index={index}
                                />
                            </Suspense>)}
                    </div>
                </>
            }
        </>
    )
}

AttachMultipleImages.propTypes = {
    image: PropTypes.array,
    setImage: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    imagesError: PropTypes.array, 
}


export const EditImageInput = props => {
    const {
        image,
        setImage,
        pictureError,
        label,
        name,
        placeholder = "Upload an image here",
        ImageInputRef,
        labelStyle = "text-xl",
    } = props;

    const ImageErrorRef = useRef();

    useEffect(() => {
        if (pictureError.length > 0) {
            for (var child of ImageErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [pictureError])

    return (
        <>
            {image &&
                <Suspense fallback={<h2 className="text-center text-2xl mx-auto my-10 text-black">Loading current image...</h2>}>
                    <RenderCoverPhoto
                        image={image}
                        altText="Preview Image"
                        isPreview={true}
                    />
                </Suspense>
            }
            <label
                htmlFor={label}
                className={labelStyle}
            >{label}</label>
            <input
                name={name}
                id={`${name}Input`}
                ref={ImageInputRef}
                type="file"
                placeholder={placeholder}
                className="text-lg file:rounded-lg file:bg-[#99cbae] file:text-white cursor-pointer border-black border-[1px] rounded"
                onChange={(evt) => { HandleFileChange(evt, setImage) }}
            />
            <div
                id="pictureError"
                className="ErrorDiv"
                ref={ImageErrorRef}>
                {pictureError != null && pictureError.length > 0 && RenderError(pictureError)}
            </div>
        </>
    )
} 