import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationHooks } from "../../hooks/navigation.jsx";
import { CategoryFormHooks } from '../../hooks/categoryHooks.jsx';
import {
    AppContext,
    CategoryContext
} from '../../util/contextItem.jsx';
import RenderForm from './categoryForm.jsx'; 

//Next task: retrieve id and username from token 
const CategoryForm = props => {
    const navigate = useNavigate();
    const location = useLocation();

    const [ID] = useState(location.state ? location.state.id : null)

    const { GoHome } = NavigationHooks(navigate);
    const {
        apiURL,
        token,
        setCategoryList,
        categoryList
    } = useContext(AppContext);
    const { EditCategory } = CategoryFormHooks(navigate);

    const [name, setName] = useState(location.state ? location.state.name : "")
    const [image, setImage] = useState(location.state ? location.state.image : null);
    const [description, setDescription] = useState(location.state ? location.state.description : "")

    const [nameError, setNameError] = useState([])
    const [imageError, setImageError] = useState([])
    const [descriptionError, setDescriptionError] = useState([]);

    const [generalError, setGeneralError] = useState([])

    const dispatchFunctions = {
        setCategoryList,
        setNameError,
        setImageError,
        setDescriptionError,
        setGeneralError,
    }

    const imageInputRef = useRef();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    const context = {
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
    } 

    useEffect(() => {
        if (!token) {
            return () => GoHome();
        }
    }, [token])

    return (
        <CategoryContext.Provider value={context}>
            <h1 className="H1Style mt-[20px]">Edit category: {name}</h1>
            <RenderForm
                execute={() => {
                    const Elements = {
                        name: nameInputRef.current.value,
                        description: descriptionInputRef.current.value,
                        imageData: imageInputRef.current.files[0],
                        currentImage: image,
                    }
                    EditCategory(apiURL, ID, token, Elements, dispatchFunctions, categoryList)
                }}
                imageFormLabel="Update current thumbnail photo"
            />
        </CategoryContext.Provider>
    )

}

export default CategoryForm; 