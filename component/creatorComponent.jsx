import {
    GithubIcon,
    PortfolioIcon, 
} from './iconComponents.jsx'; 
import { LinkedinIcon } from "react-share";

const RenderComponent = props => {
    const {
        portfolio = "https://portfolio-3b68c.web.app/", 
        github = "https://github.com/Albertyhu", 
        textColor="#ffffff"
    } = props; 

    const openLink = (link) => {
        window.open(link, "_blank")
    }

    const iconStyle = `cursor-pointer text-center [&>*]:mx-auto`

    return (
        <div
            id="CreatorContainer"
            className={`grid mt-10 md:my-10 text-[${textColor}] w-fit mx-auto lg:absolute lg:right-[5px] lg:bottom-[5px]`}
        >
            <div className ="mx-auto">Built by &nbsp;
                <span
                    className="underline cursor-pointer font-bold text-lg"
                    onClick={() => openLink(portfolio)}
                >Albert Hu</span>
            </div>
            <div
                className = "grid grid-cols-3 gap-[25px]"
            >
                <div
                    className={`${iconStyle}`}
                    onClick={() => openLink(portfolio)}
                >
                    <PortfolioIcon />
                    <span>Portfolio</span>
                </div>
                <div
                    className={`${iconStyle}`}
                    onClick={()=>openLink(github)}
                >
                    <GithubIcon />
                    <span>Github</span>
                </div>
                <div
                    className={`${iconStyle}`}
                    onClick={() => openLink("https://www.linkedin.com/in/albert-y-hu/")}
                >
                    <LinkedinIcon size={25} />
                    <span>LinkedIn</span>
                </div>
            </div>
        </div>
        )
} 

export default RenderComponent; 