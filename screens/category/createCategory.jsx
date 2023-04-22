import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorMessageHooks } from "../../hooks/errorHooks.jsx";
import { NavigationHooks } from "../../hooks/navigation.jsx";
import { CategoryFormHooks } from '../../hooks/categoryHooks.jsx';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import {
    AppContext,
    CategoryContext, 
} from '../../util/contextItem.jsx';
import RenderForm from './categoryForm.jsx'; 

//Next task: retrieve id and username from token 
const CreateCategory = props => {
    const navigate = useNavigate();
    const location = useLocation();

    const { GoHome } = NavigationHooks(navigate);
    const {
        apiURL,
        token,
        setCategoryList, 
        setLoading, 
    } = useContext(AppContext);
    const { CreateCategory } = CategoryFormHooks(navigate, apiURL, setLoading, token);

    const [name, setName] = useState("")
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("")
    const [decoded, setDecoded]=useState(null) 
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
        else {
            setDecoded(DecodeToken(token))
        }
    }, [token])

    return (
        <CategoryContext.Provider value ={context}>
            <h1 className="H1Style mt-[20px]">Create a new category</h1>
            <RenderForm
                execute={() => {
                    const Elements = {
                        name: nameInputRef.current.value,
                        description: descriptionInputRef.current.value,
                        imageData: imageInputRef.current.files[0],
                        administrator: decoded.id, 
                    }
                    CreateCategory(Elements, dispatchFunctions)
                }}
                imageFormLabel="Update current thumbnail photo"
            />
        </CategoryContext.Provider>
    )
}

export default CreateCategory; 