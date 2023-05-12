const checkIfMouseOverChildren = (target, childNodes) => {
    childNodes.forEach(child => {
        if (child == target) {
            return true; 
        }
    })
    return false; 
}

export { checkIfMouseOverChildren }