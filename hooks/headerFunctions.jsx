
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

	const toggleAccountMenu = () => {
		var AccountMenu = document.querySelector("#AccountMenu");
		if (AccountMenu.classList.contains("!hidden")) {
			AccountMenu.classList.remove('!hidden');
			AccountMenu.classList.add('block');
		}
		else {
			closeAccountMenu(); 
		}
	}

	const closeAccountMenu = () => {
		AccountMenu.classList.remove('block');
		AccountMenu.classList.add('!hidden');
	}

	return { ConfirmChild, CloseMobileMenu, OpenMobileMenu, toggleAccountMenu, closeAccountMenu }
}

export { HeaderFunctions };