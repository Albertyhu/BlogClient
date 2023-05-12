import { ErrorMessageHooks } from "./errorHooks.jsx";
import { NavigationHooks } from './navigation.jsx'
const { RenderErrorArray } = ErrorMessageHooks()


const TagHooks = navigate => {
    const {
        GoHome,
        GoCategory,
        GoTagPage } = NavigationHooks(navigate)

    const GetTagList = async (apiURL, setExistingTags) => {
        const FetchURL = `${apiURL}/tags`; 
        await fetch(FetchURL, {
            method: "Get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            const result = await response.json();
            if (response.ok) {
                setExistingTags(result.payload)
            }
        }).catch(e => {
            console.log("GetTagList error: ", e)
        })
    }

    const SaveTags = async (apiURL, token, tags, dispatchFunctions) => {
        const FetchURL = `${apiURL}/tags/create2`; 

        const formData = new FormData; 
        var StringifiedTags = JSON.stringify(tags);
        formData.append("tags", StringifiedTags);

        var options = {
            method: "POST", 
            body: formData, 
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        }
        await fetch(FetchURL, options)
            .then( async response => {
                if (response.ok) {
                    const result = await response.json(); 
                    console.log("Tags are successfully saved: ", result.tags); 
                    //GoHome(); 
                }
                else {
                    const result = await response.json(); 
                    console.log(result.error);
                    RenderErrorArray(result.error, dispatchFunctions); 
                }
            })
    }

    const DeleteTags = async (apiURL, tagNames, token, deleteArray, dispatchFunctions) => {
        const FetchURL = `${apiURL}/delete_tags`; 
        const formData = new FormData; 
        formData.append("taglist", tagNames); 
        await fetch(FetchURL, {
            method: "DELETE",
            body: formData, 
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(async response => {
            const result = await response.json(); 
            if (response.ok) {
                console.log(result.message); 
                GoTagPage(result.message);
            }
        })

    }

    return {
        GetTagList,
        DeleteTags, 
        searchTag, 
        SaveTags, 
    }
}

export const searchTag = (query, tagList) => {
    if(tagList != null)
      return tagList.filter(item => item.name.toLowerCase().search(query.toLowerCase().trim()) > -1)
} 

export { TagHooks }