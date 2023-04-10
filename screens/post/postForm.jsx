import { useState, useRef, useContext, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { } from '../../hooks/postHooks.jsx';
import { NavigationHooks } from "../../hooks/navigation.jsx";
import {
    FormButtons,
    PostFormElements, 
} from '../../component/formElements.jsx';
import { PostFormButtons } from '../../component/post/buttons.jsx'; 
import {
    BasicTextInput,
    BasicTextAreaInput,
    TinyMCEInput,
} from '../../component/formElements/textInputs.jsx';
import {
    EditImageInput,
    AttachMultipleImages,
} from '../../component/formElements/imageInputs.jsx';
const TagInput = lazy(() => import("../../component/formElements/tagInput.jsx")); 
import { TagHooks } from '../../hooks/tagHooks.jsx'; 
import {
    AppContext,
    PostContext
} from '../../util/contextItem.jsx';
import MessageComponent from '../../component/message.jsx'; 

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

        titleError,
        contentError,
        thumbnailError,
        imagesError,
        abstractError,
        categoryError,
        tagError,
        generalError,

        setTagError,

        abstract_char_limit,
        message,
        setMessage,
    } = useContext(PostContext); 

    const { RenderError, AnimateErrorMessage } = ErrorMessageHooks();
    const { SelectCategory } = PostFormElements(navigate);

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
            <MessageComponent
                message={message}
                dispatch={setMessage}
            />
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
                    execute();   
                }}
            >
                <div className="FormStyle w-11/12 mx-auto grid">
                    <BasicTextInput
                        data={title}
                        setData={setTitle}
                        dataError={titleError}
                        label="Title"
                        name="title"
                        placeholder="Write your title here."
                        inputRef={titleInputRef}
                    />
                    <SelectCategory
                        categoryList={categoryList}
                        currentOption={category ? category : null}
                        categorySelectRef={categoryInputRef}
                        setData={setCategory}
                        dataError={categoryError}
                    />
                    <TinyMCEInput
                        data={content}
                        setData={setContent}
                        dataError={contentError}
                        label="Main body"
                        name="content"
                        placeholder="Share your thoughts here"
                        editorRef={contentInputRef}
                        HEIGHT={500}
                    />
                    <TinyMCEInput
                        data={abstract}
                        setData={setAbstract}
                        dataError={abstractError}
                        label="Abstract"
                        name="abstract"
                        placeholder="[Optional] Write a short summary here."
                        editorRef={abstractInputRef}
                        characterLimit={abstract_char_limit}
                        ROWS={2}
                        HEIGHT={200}
                    />
                    <EditImageInput
                        image={thumbnail}
                        setImage={setThumbnail}
                        pictureError={thumbnailError}
                        label="Attach a thumbnail to your post"
                        name="thumbnail"
                        placeholder="Browse your device to upload a thumbnail picture for the post."
                        ImageInputRef={thumbnailInputRef}
                    />
                    <AttachMultipleImages
                        image={images}
                        setImage={setImages}
                        pictureError={imagesError}
                        label="Attach images to your post."
                        name="images"
                        placeholder="Browse your device to upload images for the post."
                        ImageInputRef={imagesInputRef}
                    />
                    <Suspense fallback={<p className = "fallbackInput">Add Tags</p>}>
                        <TagInput
                            existingTags={existingTags}
                            addedTags={tag}
                            setAddedTags={setTag}
                            inputError={tagError}
                            setInputError={setTagError}
                            />
                    </Suspense>
                </div>
                <PostFormButtons
                />
            </form>
        </div>
    )
}

export default PostForm; 