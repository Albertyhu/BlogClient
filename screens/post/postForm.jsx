import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { } from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    BasicTextInput,
    BasicTextAreaInput,
    PostFormElements, 
    TagInput,
    EditImageInput
} from '../../component/formElements.jsx';
import { TagHooks } from '../../hooks/tagHooks.jsx'; 
import {
    AppContext,
    PostContext
} from '../../util/contextItem.jsx';

//Next task: retrieve id and username from token 
const PostForm = props => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { GoHome } = NavigationHooks(navigate);

    const {
        categoryList,
        apiURL
    } = useContext(AppContext); 

    const { GetTagList } = TagHooks(navigate);

    //existingTags stores all the tags that are created on the site. 
    //They appear on the tag search bar. 
    const [existingTags, setExistingTags] = useState([]) 


    const {
        title,
        content,
        published,
        thumbnail,
        images,
        abstract,
        category,
        tag,

        setTitle,
        setContent,
        setPublished,
        setThumbnail,
        setImages,
        setAbstract,
        setCategory,
        setTag,

        imagesInputRef,
        titleInputRef,
        contentInputRef,
        thumbnailInputRef,
        abstractInputRef,
        categoryInputRef,
        publishedInputRef, 
    } = useContext(PostContext); 

    const UserToken = localStorage.getItem("token");
    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const { SelectCategory } = PostFormElements(navigate);

    const [titleError, setTitleError] = useState([])
    const [contentError, setContentError] = useState([])
    const [thumbnailError, setThumbnailError] = useState([])
    const [imagesError, setImagesError] = useState([])
    const [abstractError, setAbstractError] = useState([])
    const [categoryError, setCategoryError] = useState([]);
    const [tagError, setTagError] = useState([])
    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setTitleError,
        setContentError,
        setThumbnailError,
        setImagesError,
        setAbstractError,
        setCategoryError,
        setGeneralError
    }

    const generalErrorRef = useRef(); 

    useEffect(() => {
        if (generalError.length > 0) {
            for (var child of generalErrorRef.current.children) {
                AnimateErrorMessage(child)
            }
        }
    }, [generalError])

    useEffect(() => {
        GetTagList(apiURL, setExistingTags)
    }, [])

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
                className={`bg-[#f2e798] w-11/12 md:w-9/12 mx-auto lg:w-6/12 mt-[20px] py-10 rounded box_shadow`}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    const UserDetails = {
                        username,
                        id,
                        token: UserToken,
                    }
                    const Elements = {
                    }
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <SelectCategory
                        categoryList={categoryList}
                        currentOption={category ? category : null}
                        categorySelectRef={categoryInputRef}
                        setData={setCategory}
                        dataError={categoryError}
                    />
                    <BasicTextInput
                        data={title}
                        setData={setTitle}
                        dataError={titleError}
                        label="Title"
                        name="title"
                        placeholder="Write your title here."
                        inputRef={titleInputRef}
                    />
                    <BasicTextAreaInput
                        data={content}
                        setData={setContent}
                        dataError={contentError}
                        label="Main body"
                        name="content"
                        placeholder="Share your thoughts here"
                        inputRef={contentInputRef}
                    />
                    <BasicTextAreaInput
                        data={abstract}
                        setData={setAbstract}
                        dataError={abstractError}
                        label="Abstract"
                        name="abstract"
                        placeholder="[Optional] Write a short summary here."
                        inputRef={abstractInputRef}
                        characterLimt={100}
                        ROWS={2}
                    />
                    <EditImageInput
                        image={thumbnail}
                        setImage={setThumbnail}
                        pictureError={thumbnailError}
                        label="Set the thumbnail for your post."
                        name="thumbnail"
                        placeholder="Browse your device to upload a thumbnail picture for the post."
                        ImageInputRef={thumbnailInputRef}
                    />
                    <EditImageInput
                        image={images}
                        setImage={setImages}
                        pictureError={imagesError}
                        label="Set the images for your post."
                        name="images"
                        placeholder="Browse your device to upload images for the post."
                        ImageInputRef={imagesInputRef}
                    />
                    <TagInput
                        existingTags={existingTags}
                        addedTags={tag}
                        setAddedTags={setTag}
                        inputError={tagError}
                        setTagError={setTagError}
                    />
                </div>
                <FormButtons />
            </form>
        </div>
    )
}

export default PostForm; 