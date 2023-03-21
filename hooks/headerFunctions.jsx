
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

	const toggleAccountMenu = (setAccountMenuOpened) => {
		var AccountMenuElem = document.querySelector("#AccountMenu");
		if (AccountMenuElem.classList.contains("hidden")) {
			AccountMenuElem.classList.remove('hidden');
			AccountMenuElem.classList.add('grid');
			setAccountMenuOpened(true)
		}
		else {
			closeAccountMenu(setAccountMenuOpened); 
		}
	}

	const closeAccountMenu = (setAccountMenuOpened) => {
		var AccountMenuElem = document.querySelector("#AccountMenu");
		AccountMenuElem.classList.remove('grid');
		AccountMenuElem.classList.add('hidden');
		setAccountMenuOpened(false)
	}

	return {
		ConfirmChild,
		CloseMobileMenu,
		OpenMobileMenu,
		toggleAccountMenu,
		closeAccountMenu
	}
}

export { HeaderFunctions };