import Logo from '../../assets/images/PlaceholderLogo.png'
import BlabberLogo from '../../assets/images/blabber_logo.png';
import { useCallback, useContext } from 'react'; 
import { AppContext } from '../../util/contextItem.jsx'; 
import { useNavigate } from 'react-router-dom';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import CreatorComponent from '../creatorComponent.jsx'; 

const Footer = props => {
	const { BusinessName = 'BusinessName' } = props; 
	const footerStyle = `w-full min-h-[100px] absolute bottom-0 left-0 right-0 bg-black`
	const YEAR = new Date().getFullYear(); 
	const logoStyle = `mx-auto my-10 w-[200px] h-auto sm:text-right sm:ml-auto sm:mr-[40px] cursor-pointer select-none`
	const FooterLinkFieldStyle = `[&>div]:text-3xl [&>div]:my-3 [&>div]:mx-auto [&>div]:cursor-pointer
				w-11/12 mx-auto text-center sm:text-left`

	const navigate = useNavigate(); 
	const {
		setMessage, 
	} = useContext(AppContext)
	const {
		GoHome,
		GoPrivacyPolicy,
		GoTermsAndConditions, 
	} = NavigationHooks(navigate); 

	const FooterLinkStyle = `hover:underline`

    return (
		<div
			id="footer"
			className = {footerStyle}
		>	
			<div className = "grid sm:grid-cols-2 text-white sm:mt-10">
				<img 
					src={BlabberLogo}
					alt="logo"
					className={logoStyle}
					onClick={useCallback(()=>GoHome(navigate), [navigate])}
				/>
				<div className={FooterLinkFieldStyle}>
					<div 
						className={`${FooterLinkStyle}`}
						onClick={useCallback(() => GoHome(null), [navigate])}
					>Home</div>
					<div
						className={`${FooterLinkStyle}`}
						onClick={useCallback(() => GoPrivacyPolicy(), [navigate])}
					>Privacy Policy</div>
					<div
						className={`${FooterLinkStyle}`}
						onClick={useCallback(() => GoTermsAndConditions(), [navigate])}
					>Terms and conditions</div>
				</div>

			</div>
			<CreatorComponent
				customStyle="text-[#ffffff]"
			/>
			<div className = "block whitespace-nowrap mx-auto text-center">
				<div className="text-center text-[#e48f1a] mt-5 text-2xl">{BusinessName} &copy;{YEAR}</div>
			</div>
		</div>
        )
}

export default Footer; 