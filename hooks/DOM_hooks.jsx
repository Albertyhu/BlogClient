const checkIfMouseOverChildren = (target, childNodes) => {
    childNodes.forEach(child => {
        if (child == target) {
            console.log("mouse over children")
            return true; 
        }
    })
    return false; 
}

export { checkIfMouseOverChildren }