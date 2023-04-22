export function cleanString(str) {
    try {
        // Replace whitespace with hyphens
        str = str.replace(/\s+/g, '-');

        // Remove punctuation marks
        str = str.replace(/[^\w\s]|_/g, '');

        // Return the cleaned string
        return str;
    } catch (e) {
        console.log("cleanString error: ", e)
    }
}