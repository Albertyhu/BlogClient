import { ErrorMessageHooks } from "./errorHooks.jsx"; 
import { NavigationHooks } from './navigation.jsx'
import { Base64Hooks } from '../hooks/imageHooks.jsx';
import axios from 'axios'; 

const { RenderErrorArray } = ErrorMessageHooks()
const {
    toBase64,
    convertObjToBase64, 
} = Base64Hooks()
const CategoryHooks = (navigate, apiURL, token, setLoading) => {
    const {
        GoCategory,
    } = NavigationHooks(navigate);

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

    const FetchPaginatedCategories = async (pagination, count, setItemList, setHasMore) => {
        const FetchURL = `${apiURL}/category/get_paginated_categories/${pagination}/${count}`;
        setLoading(true)
        await axios.get(FetchURL)
            .then(async response => {
                const result = await response.data;
                if (response.status === 200) {
                    result.paginatedResult = FormatCategoryImage(result.paginatedResult);
                    setItemList(prev => { return [...new Set([...prev, ...result.paginatedResult])] });
                    setHasMore(result.paginatedResult.length > 0)
                }
                else {
                    console.log("FetchPaginatedCategories error: ", result.error);
                    alertMessage(`Error: ${result.error}`, setMessage);
                }
            }).catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                console.log("FetchPaginatedCategories error: ", error);
                setLoading(false)
                alertMessage(`Error: ${error}`, setMessage);
            })
        setLoading(false)
    }

    const FetchCategoryById = async (categoryID, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/${categoryID}`
        const {
            setCategoryList
        } = dispatchFunctions; 
        setLoading(true)
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then( async response => {
                const result = await response.JSON(); 
                if (response.ok) {
                    setCategoryList(result);
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
        PopulateCategoryPage,
        FetchPaginatedCategories,
    }
}

const CategoryFormHooks = (navigate, apiURL, setLoading, token) => {
    const { VisitOneCategory } = NavigationHooks(navigate);
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
                if (response.ok) {
                    if (result.updatedCategory.image) {
                        result.updatedCategory.image.data = toBase64(result.updatedCategory.image.data.data)
                    }

                    //find the index of the outdated category 
                    var index = categoryList.findIndex(val => val._id.toString() == categoryID.toString())

                    //copy the current list of categories
                    var updatedList = categoryList; 

                    //update the current list of categories in the client side
                    updatedList.splice(index, 1, result.updatedCategory)
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

const FormatCategoryImage = categories => {
    var formatted = categories.map(item => {
        item.image = convertObjToBase64(item.image); 
        return item;
    })
    return formatted; 
}

const CheckIfAdministrator = (currentUserId, categoryList) => {
    try {
        return categoryList.some(category => category.administrator.toString() == currentUserId.toString())
    } catch (e) {
        console.log("CheckIfAdministrator error: ", error)
    }
}

export {
    CategoryFormHooks,
    CategoryHooks,
    CheckIfAdministrator
}; 