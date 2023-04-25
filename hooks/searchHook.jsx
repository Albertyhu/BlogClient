export const SearchQuery = (query, list) => {
    var result = list.filter(item => item.toLowerCase().search(query.toLowerCase().trim()) > -1)
    return result
}