import axios from 'axios'; 

//This function strictly made to handle the search query of the search bar component
//When the server retrieves all possible documents, it creates an array called collectedString
//The array is a collection all text from titles, content, names, etc, any element that can be used to be compared with the query 
const HandleSearchQuery = (query, list) => {
    var result = list.filter(item => {
        if (item.collectedStrings) {
            return item.collectedStrings.some(text => {
                if (text) {
                    try {
                        return text.toLowerCase().search(query.toLowerCase().trim()) > -1
                    } catch (e) {
                        console.log("error: ", e)
                        console.log("text: ", text)
                    }
                }
                return false;
            })
        }
        return false;
    }
    )
    return result
}

//Sends a fetch request to retrieve data.
//The server will collect strings from title, content, author's username of each of the documents
//... and store it into a field call 'collectedStrings' 
//'collectedStrings' will be used by the Search Component to compare any words or phrases to the user's search query
const SearchRequests = (apiURL, setLoading, dispatch) => {
    const GetSearchData = async (searchType) => {
        const FetchURL = `${apiURL}/${searchType}/get_search_data`;
        setLoading(true)
        await axios.get(FetchURL)
            .then(async response => {
                const result = await response.data; 
                if (response.status === 200) {
                    dispatch(result.data)
                }
                else {
                    console.log("SearchRequests error: ", result.error)
                }
            })
            .catch(error => {
                console.log("SearchRequests error: ", error)
            })
        setLoading(false)
    }
    return { GetSearchData }
}


export {
    HandleSearchQuery,
    SearchRequests, 
}