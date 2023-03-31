import { ErrorMessageHooks } from './errorHooks.jsx'; 

const { RenderErrorArray } = ErrorMessageHooks()

const FetchHooks = (navigate) => {
    const FetchPostsByCateogry = async (apiURL, categoryID, dispatch) => {
        const FetchURL = `${apiURL}/post/get_posts_by_category/${categoryID}`;
        const formData = new FormData; 
        await fetch(FetchURL, {
            method: "GET",
        })
            .then(async response => {
                const result = await response.json(); 
                if (response.ok) {
                    console.log("result.post: ", result)
                    dispatch(result.post)
                }
                else {
                    console.log(result.error)
                }
            })
    }

    return { FetchPostsByCateogry } 
}

export { FetchHooks }

