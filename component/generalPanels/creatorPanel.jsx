import CreatorComponent from '../creatorComponent.jsx'; 
import {
    GithubIcon,
    PortfolioIcon,
} from '../iconComponents.jsx';
import { LinkedinIcon } from "react-share";

const RenderPanel = props => {

    const {
        portfolio = "https://portfolio-3b68c.web.app/",
        github = "https://github.com/Albertyhu",
        textColor = "#ffffff"
    } = props;

    const openLink = (link) => {
        window.open(link, "_blank")
    }

    const iconStyle = `cursor-pointer text-center [&>*]:mx-auto`

    return (
        <div
            id="CreatorPanel"
            className="w-full hidden md:block bg-[#ffffff] rounded-[15px] py-10 mx-auto box_shadow mb-5 text-center"
        >
            <div className="mx-auto mb-5">Created by &nbsp;
                <span
                    className="underline cursor-pointer font-bold text-lg"
                    onClick={() => openLink(portfolio)}
                >Albert Hu</span>
            </div>
            <div
                className="grid grid-cols-3 gap-[5px]"
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
                    onClick={() => openLink(github)}
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

export default RenderPanel; 