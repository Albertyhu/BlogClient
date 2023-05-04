import axios from 'axios'; 

const HandleSearchQuery = (query, list) => {
    var result = list.filter(item => item.toLowerCase().search(query.toLowerCase().trim()) > -1)
    return result
}

const SearchRequests = (apiURL, setLoading, dispatch) => {
    const GetSearchData = async (searchType) => {
        const FetchURL = `${apiURL}/${searchType}/get_search_data`;
        console.log("url: ", FetchURL);
        setLoading(true)
        await axios.get(FetchURL)
            .then(async response => {
                const result = await response.data; 
                if (response.status === 200) {
                    console.log(result.data)
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