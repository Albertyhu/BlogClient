
const HeaderFunctions = () => {
	function ConfirmChild(target, NodeList) {
		var confirmed = false;
		NodeList.forEach(node => {
			if (node == target) {
				confirmed = true;
			}
		})
		return confirmed;
	}
	return {ConfirmChild}
}

export { HeaderFunctions };