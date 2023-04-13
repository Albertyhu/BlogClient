export function toBase64(arr) {
    try {
        return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    } catch (e) {
        console.log("Error in function toBase64: ", e);
    }
}

