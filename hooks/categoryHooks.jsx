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
                    RenderErrorArray(result.error, dispatchFunctions)
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

    return { FetchCategories, FetchCategoryById }
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
                if (response.ok)
                    GoCategory();
                else {
                    const result = await response.json(); 
                    console.log("Error in trying to create a new category: ", result.error)
                    RenderErrorArray(result.error, dispatchFunctions); 
                }
            })
    }
    return { CreateCategory };
}

export { CategoryFormHooks, CategoryHooks }; 