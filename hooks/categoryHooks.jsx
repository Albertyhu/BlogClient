import { ErrorMessageHooks } from "./errorHooks.jsx"; 
import { NavigationHooks } from './navigation.jsx'
import { toBase64 } from '../util/processImage.jsx';

const { RenderErrorArray } = ErrorMessageHooks()

const CategoryHooks = (navigate) => {
    const { GoCategory } = NavigationHooks(navigate);
    const FetchCategories = async (apiURL, dispatchFunctions) => {

        const { setCategoryList } = dispatchFunctions;
        const FetchURL = `${apiURL}/category`;
        await fetch(FetchURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    const list = result.categories; 
                    list.forEach(item => {
                        item.image.data = toBase64(item.image.data.data)
                    })

                    setCategoryList(list);
                }
                else {
                    console.log("Error: ", result.error)
                }
            })
            .catch(e => {
                console.log("Error 30: ", e)
            })
    }


    const FetchCategoryById = async (apiURL, categoryID, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/${categoryID}`
        await fetch(FetchURL, {
            method: 'GET'
        })
            .then( async response => {
                const result = await response.JSON(); 
                if (response.ok)
                    dispatch(result);
                else {
                    RenderErrorArray(result.error, dispatchFunctions)
                }
            })
            .catch(e => {
                RenderErrorArray(result.error, dispatchFunctions)
            })
    }

    const DeleteCategory = (apiURL, ID, token, categoryList, setCategoryList) => {
        const FetchURL = `${apiURL}/category/${ID}/delete`; 
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
                setCategoryList(newArr)
                GoCategory(); 
            }
            else {
                console.log("There was an error in the attempt to delete the category.", result.error); 
            }
        })
    }

    return {
        FetchCategories,
        FetchCategoryById,
        DeleteCategory
    }
}

const CategoryFormHooks = (navigate) => {
    const { GoCategory } = NavigationHooks(navigate);
    const CreateCategory = async (apiURL, token, Elements, dispatchFunctions) => {
        const FetchURL = `${apiURL}/category/create`;
        const {
            name, 
            description,
            imageData
        } = Elements; 
        const { setCategoryList } = dispatchFunctions; 
        const formData = new FormData; 
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", imageData)
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
                    setCategoryList(prev => [...prev, result.newCategory])
                    GoCategory();
                }
                else {
                    console.log("Error in trying to create a new category: ", result.error)
                    RenderErrorArray(result.error, dispatchFunctions); 
                }
            })
    }
    return { CreateCategory };
}

export { CategoryFormHooks, CategoryHooks }; 