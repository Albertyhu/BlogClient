import { useContext, useEffect, useRef, useState} from 'react';
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import {
    FormButtons,
} from '../../component/formElements.jsx';
import {
    BasicTextInput,
    BasicTextAreaInput,
} from '../../component/formElements/textInputs.jsx';
import {
    EditImageInput,
} from '../../component/formElements/imageInputs.jsx';
import {
    CategoryContext,
} from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const CategoryForm = props => {
    const {
        execute,
        imageFormLabel
    } = props; 

    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const {
        name,
        image,
        description,
        setName,
        setImage,
        setDescription,
        generalError,
        nameError,
        imageError,
        descriptionError,
        imageInputRef,
        nameInputRef,
        descriptionInputRef,
    } = useContext(CategoryContext) 

    const generalErrorRef = useRef(); 

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    return (
        <div>
            <div
                id="generalError"
                className="ErrorDiv"
                ref={generalErrorRef}
            >
                {generalError != null && generalError.length > 0 && RenderError(generalError)}
            </div>
            <form
                id="RegistrationForm"
                encType="multipart/form-data"
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    execute()
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <BasicTextInput
                        data={name}
                        setData={setName}
                        dataError={nameError}
                        label="name"
                        name="name"
                        placeholder="Write the name of the category here."
                        inputRef={nameInputRef}
                    />
                    <BasicTextAreaInput
                        data={description}
                        setData={setDescription}
                        dataError={descriptionError}
                        label="Description"
                        name="description"
                        placeholder="Write the description of the category here"
                        inputRef={descriptionInputRef}
                        characterLimit={125}
                    />
                    <EditImageInput
                        image={image}
                        setImage={setImage}
                        pictureError={imageError}
                        label={imageFormLabel ? imageFormLabel : "Upload photo"}
                        name="profile_pic"
                        placeholder="Browse your device to change your profile picture"
                        ImageInputRef={imageInputRef}
                    />
                </div>
                <FormButtons />
            </form>
        </div>
    )
}

export default CategoryForm; 