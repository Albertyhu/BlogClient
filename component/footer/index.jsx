import Logo from '../../assets/images/PlaceholderLogo.png'

const Footer = props => {
	const { BusinessName = 'BusinessName' } = props; 
	const footerStyle = `w-full min-h-[100px] absolute bottom-0 left-0 right-0 bg-black`
	const YEAR = new Date().getFullYear(); 
	const logoStyle = `mx-auto my-10 w-[200px] h-auto sm:text-right sm:ml-auto sm:mr-[40px] cursor-pointer select-none`
	const FooterLinkStyle = `[&>div]:text-3xl [&>div]:my-3 [&>div]:mx-auto [&>div]:cursor-pointer
				w-11/12 mx-auto text-center sm:text-left`
    return (
		<div
			id="footer"
			className = {footerStyle}
		>	
			<div className = "grid sm:grid-cols-2 text-white sm:mt-10">
				<img 
					src={Logo}
					alt="logo"
					className={logoStyle} />
				<div className={FooterLinkStyle}>
					<div 
						className ="hover:underline">Home</div>
					<div 
						className ="hover:underline">Contact us</div>
				</div>
			</div>
			<div className = "block whitespace-nowrap mx-auto text-center">
				<div className="text-center text-[#e48f1a] mt-5 text-2xl">{BusinessName} &copy;{YEAR}</div>
			</div>
		</div>
        )
}

export default Footer; 