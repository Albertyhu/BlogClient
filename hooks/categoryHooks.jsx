import { ErrorMessageHooks } from "./errorHooks.jsx"; 
import { NavigationHooks } from './navigation.jsx'
import { Base64Hooks } from '../hooks/imageHooks.jsx';
import axios from 'axios'; 

const { RenderErrorArray } = ErrorMessageHooks()
const { toBase64 } = Base64Hooks()
const CategoryHooks = (navigate, apiURL, token, setLoading) => {
    const {
        GoCategory,
    } = NavigationHooks(navigate);

    //const FetchCategories = async (dispatchFunctions) => {
    //    const { setCategoryList } = dispatchFunctions;
    //    const FetchURL = `${apiURL}/category`;
    //    setLoading(true)
    //    await fetch(FetchURL, {
    //        method: "GET",
    //        headers: {
    //            "Content-Type": "application/json",
    //        }
    //    })
    //        .then(async response => {
    //            const result = await response.json();
    //            if (response.ok) {
    //                const list = result.categories;
    //                list.forEach(item => {
    //                    item.image.data = toBase64(item.image.data.data)
    //                })
    //                setLoading(false)
    //                setCategoryList(list);
    //            }
    //            else {
    //                setLoading(false)
    //                console.log("Error: ", result.error)
    //            }
    //        })
    //        .catch(e => {
    //            setLoading(false)
    //            console.log("Error 30: ", e)
    //        })
    //}

    //axios version
    const FetchCategories = async (dispatchFunctions) => {
        const { setCategoryList } = dispatchFunctions;
        const FetchURL = `${apiURL}/category`;
        setLoading(true);
        try {
            await axios.get(FetchURL, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async response => {
                const result = await response.data;

                if (response.status === 200) {
                    const list = result.categories;
                    list.forEach((item) => {
                        item.image.data = toBase64(item.image.data.data);
                    });
                    setLoading(false);
                    setCategoryList(list);
                } else {
                    setLoading(false);
                    console.log("Error: ", result.error);
                }
            })
        } catch (e) {
            setLoading(false);
            console.log("Error 30: ", e);
        }
    };

    const FetchCategoryById = async (categoryID, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/${categoryID}`
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then( async response => {
                const result = await response.JSON(); 
                if (response.ok) {
                    dispatch(result);
                    setLoading(false);
                }
                else {
                    setLoading(false)
                    RenderErrorArray(result.error, dispatchFunctions)
                }
            })
            .catch(e => {
                setLoading(false)
                RenderErrorArray(result.error, dispatchFunctions)
            })
    }

    const FetchCategoryByName = async (categoryName, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/${categoryName}`
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then(async response => {
                const result = await response.JSON();
                if (response.ok) {
                    dispatch(result);
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    RenderErrorArray(result.error, dispatchFunctions)
                }
            })
            .catch(e => {
                RenderErrorArray(result.error, dispatchFunctions)
            })
    }

    const DeleteCategory = (ID, categoryList, setCategoryList) => {
        const FetchURL = `${apiURL}/category/${ID}/delete`; 
        setLoading(true);
        fetch(FetchURL, {
            method: "DELETE", 
            headers: {
                "Authorization" : token, 
            }
        }).then(async response => {
            const result = await response.json(); 
            if (response.ok) {
                console.log(result.message);
                var newArr = categoryList.filter(val => val._id.toString() != result.deletedCategory.toString())
                setCategoryList(newArr);
                setLoading(false)
                GoCategory(); 
            }
            else {
                setLoading(false)
                console.log("There was an error in the attempt to delete the category.", result.error); 
            }
        })
    }

    const PopulateCategoryPage = (categoryList, name) => {
        const target = categoryList.find(val => val.name == name)
    }

    return {
        FetchCategories,
        FetchCategoryById,
        DeleteCategory,
        FetchCategoryByName,
        PopulateCategoryPage
    }
}

const CategoryFormHooks = (navigate, apiURL, setLoading, token) => {
    const { GoCategory, VisitOneCategory } = NavigationHooks(navigate);
    const CreateCategory = async (Elements, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/create`;
        const {
            name, 
            description,
            imageData,
            administrator, 
        } = Elements; 
        const { setCategoryList } = dispatchFunctions; 
        const formData = new FormData; 
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", imageData); 
        formData.append("administrator", administrator)
        setLoading(true)
        await fetch(FetchURL, {
            method: "POST",
            body: formData, 
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async response => {
                const result = await response.json(); 

                if (response.ok) {
                    if (result.newCategory.image) {
                        result.newCategory.image.data = toBase64(result.newCategory.image.data.data)
                    }
                    setCategoryList(prev => [...prev, result.newCategory])
                    setLoading(false)
                    VisitOneCategory(name, result.newCategory._id)
                }
                else {
                    console.log("Error in trying to create a new category: ", result.error)
                    setLoading(false)
                    RenderErrorArray(result.error, dispatchFunctions); 
                }
            })
    }

    const EditCategory = async (categoryID, Elements, dispatchFunctions, categoryList) => {
        const FetchURL = `${apiURL}/category/${categoryID}/edit`;
        const {
            name,
            description,
            imageData,
            currentImage, 
        } = Elements;
        const { setCategoryList } = dispatchFunctions;
        const formData = new FormData;
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", imageData)
        setLoading(true)
        await fetch(FetchURL, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async response => {
                const result = await response.json();
                console.log("updated category: : ", result.updatedCategory)
                if (response.ok) {
                    if (result.updatedCategory.image) {
                        result.updatedCategory.image.data = toBase64(result.updatedCategory.image.data.data)
                    }

                    //find the index of the outdated category 
                    var index = categoryList.findIndex(val => val._id.toString() == categoryID.toString())
                    console.log("index: ", index)

                    //copy the current list of categories
                    var updatedList = categoryList; 

                    //update the current list of categories in the client side
                    updatedList.splice(index, 1, result.updatedCategory)
                    console.log("updatedList: ", updatedList)
                    setCategoryList(updatedList)
                    setLoading(false)
                    VisitOneCategory(name, result.updatedCategory._id)
                }
                else {
                    setLoading(false)

                    console.log("Error in trying to create a new category: ", result.error)
                    RenderErrorArray(result.error, dispatchFunctions);
                }
            })
    }

    return {
        CreateCategory,
        EditCategory
    };
}

export { CategoryFormHooks, CategoryHooks }; 