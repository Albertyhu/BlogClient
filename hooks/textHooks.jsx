export function cleanString(str) {
    try {

        // Remove punctuation marks
        str = str.replace(/[^\w\s]|_/g, '');

        // Return the cleaned string
        return str;
    } catch (e) {
        console.log("cleanString error: ", e)
    }
}

export function removeHTMLTags(str) {
    try {
        var formatted = str.replace(/(<([^>]+)>)/ig, ""); 
        formatted = replaceHtmlEntities(formatted)
        return replaceAsciiChars(formatted)
    } catch (e) {
        console.log("removeHTMLTags error: ", e)
    }

}

function replaceAsciiChars(str) {
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);

        if (charCode < 32 || charCode > 126) {
            newStr += "&#" + charCode + ";";
        } else {
            newStr += str.charAt(i);
        }
    }

    return newStr;
}

function replaceHtmlEntities(str) {
    let tempEl = document.createElement("div");
    tempEl.innerHTML = str;
    let decodedStr = tempEl.innerText;
    decodedStr = decodedStr.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
    decodedStr = decodedStr.replace(/&#[Xx]([0-9A-Fa-f]+);/g, function (match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
    });
    decodedStr = decodedStr.replace(/&([^;\n]+);/g, function (match, entity) {
        let specialEntities = {
            lt: "<",
            gt: ">",
            quot: '"',
            amp: "&",
            nbsp: "\u00A0"
            // add any additional special entities you need
        };
        if (specialEntities.hasOwnProperty(entity)) {
            return specialEntities[entity];
        } else {
            return match;
        }
    });
    return decodedStr;
}


//This function is a supplement to the message component.
//It converts the message into the proper array format and recreates the alert function
export function alertMessage(message, dispatch) {
    try {
        var arr = [{ param: "general", msg: message }]
        dispatch(arr)
    } catch (e) { console.log("alertMessage error: ", e) }
}