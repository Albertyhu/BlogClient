
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
	const CloseMobileMenu = (MobileMenuDiv) => {
		MobileMenuDiv = document.getElementById('MobileMenuDiv');
		MobileMenuDiv.classList.remove("translate-x-[0px]");
		MobileMenuDiv.classList.add("translate-x-[270px]");
	}
	const OpenMobileMenu = (MobileMenuDiv) => {
		MobileMenuDiv = document.getElementById('MobileMenuDiv');
		MobileMenuDiv.classList.remove("translate-x-[270px]");
		MobileMenuDiv.classList.add("translate-x-[0px]");
	} 

	return { ConfirmChild, CloseMobileMenu, OpenMobileMenu }
}

export { HeaderFunctions };