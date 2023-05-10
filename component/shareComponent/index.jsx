import { useContext, useEffect, useRef, useState } from 'react'; 
import { } from '../../hooks/shareHooks.jsx'; 
import {
    cleanString,
    removeHTMLTags,
} from '../../hooks/textHooks.jsx'; 
import {
    AppContext,
    ShareContext, 
} from '../../util/contextItem.jsx'; 

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    FacebookIcon, 
    EmailIcon,
    TwitterIcon, 
    LinkedinIcon,
    RedditIcon,
    HatenaShareButton,
    HatenaIcon,
    InstapaperShareButton,
    InstapaperIcon,
    LineShareButton,
    LineIcon,
    LivejournalShareButton,
    LivejournalIcon,
    MailruShareButton,
    MailruIcon,
    OKShareButton,
    OKIcon,
    PinterestShareButton,
    PinterestIcon,
    PocketShareButton,
    PocketIcon,
    TelegramShareButton,
    TelegramIcon,
    TumblrShareButton,
    TumblrIcon,
    ViberShareButton,
    ViberIcon,
    VKShareButton,
    VKIcon,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
    WorkplaceIcon,
} from "react-share";

const ShareComponent = props => {
    const {
        content, 
        shareButtonRef,
        setDisplayShare, 
         
    } = props;

    const {
        URL,
        title, 
    } = useContext(ShareContext)

    const [cleanContent, setCleanContent] = useState(removeHTMLTags(content))

    const SIZE = 50; 
    const {
        ContainerRef,
        apiURL, 
        siteURL, 
        media,
    } = useContext(AppContext)

    const shareRef = useRef(); 

    const clickEvent = evt => {
        if (shareRef.current && !shareRef.current.contains(evt.target) && shareButtonRef.current != evt.target) {
            setDisplayShare(false)
        }
    } 

    const ShareContainerStyle = `fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-11/12 rounded-lg box_shadow bg-[#EEEEEE] z-[20]
            max-h-[500px] overflow-y-scroll`

    useEffect(() => {
        ContainerRef.current.addEventListener("mousedown", clickEvent)
        return () => {
            if(ContainerRef.current)
                 ContainerRef.current.addEventListener("mousedown", clickEvent)
        }
    }, [])

    return (
        <div
            id="ShareContainer"
            className={`${ShareContainerStyle}`}
            ref={shareRef}
        >
            <div className="w-11/12 mx-auto p-5 grid grid-cols-2 sm:grid-cols-3 md:block [&>*]:md:inline-block [&>*]:mx-auto [&>*]:my-5 [&>*]:md:m-5">
                <EmailShareButton
                    subject={title}
                    body={cleanContent}
                    url={URL ? URL : siteURL}
                >
                    <EmailIcon
                        size={SIZE}
                        round={true}
                    />
                </EmailShareButton>
                <FacebookShareButton
                    quote={cleanContent}
                    url={URL ? URL : siteURL}
                >
                    <FacebookIcon
                        size={SIZE}
                        round={true}
                    />
                </FacebookShareButton>
                <TwitterShareButton
                    title={cleanContent}
                    url={URL ? URL : siteURL}
                >
                    <TwitterIcon
                        size={SIZE}
                        round={true}
                    />
                </TwitterShareButton>
                <LinkedinShareButton
                    title={cleanContent}
                    summary={cleanContent}
                    source={URL ? URL : siteURL}
                    url={URL ? URL : siteURL}
                >
                    <LinkedinIcon
                        size={SIZE}
                        round={true}
                    />
                </LinkedinShareButton>
                <RedditShareButton
                    title={title ?  title : ""}
                    url={URL ? URL : siteURL}
                >
                    <RedditIcon
                        size={SIZE}
                        round={true}
                    />
                </RedditShareButton>
        
                <HatenaShareButton url={URL}>
                    <HatenaIcon size={SIZE} round={true} />
                </HatenaShareButton>
                {media &&
                    <PinterestShareButton url={URL} media={media}>
                        <PinterestIcon size={SIZE} round={true} />
                    </PinterestShareButton>
                }
                <InstapaperShareButton url={URL} title={content}>
                    <InstapaperIcon size={SIZE} round={true} />
                </InstapaperShareButton>


                <LineShareButton url={URL} title={content}>
                    <LineIcon size={SIZE} round={true} />
                </LineShareButton>

                <LivejournalShareButton url={URL} title={content}>
                    <LivejournalIcon size={SIZE} round={true} />
                </LivejournalShareButton>

                <MailruShareButton url={URL} title={content}>
                    <MailruIcon size={SIZE} round={true} />
                </MailruShareButton>


                <OKShareButton url={URL} title={content}>
                    <OKIcon size={SIZE} round={true} />
                </OKShareButton>

                <PocketShareButton url={URL} title={content}>
                    <PocketIcon size={SIZE} round={true} />
                </PocketShareButton>


                <TelegramShareButton url={URL} title={content}>
                    <TelegramIcon size={SIZE} round={true} />
                </TelegramShareButton>


                <TumblrShareButton url={URL} title={content}>
                    <TumblrIcon size={SIZE} round={true} />
                </TumblrShareButton>


                <ViberShareButton url={URL} title={content}>
                    <ViberIcon size={SIZE} round={true} />
                </ViberShareButton>

                <VKShareButton url={URL} title={content}>
                    <VKIcon size={SIZE} round={true} />
                </VKShareButton>

                <WhatsappShareButton url={URL} title={content}>
                    <WhatsappIcon size={SIZE} round={true} />
                </WhatsappShareButton>

                <WorkplaceShareButton url={URL} content={content}>
                    <WorkplaceIcon size={SIZE} round={true} />
                </WorkplaceShareButton>
            </div>
        </div>
        )
}

export default ShareComponent