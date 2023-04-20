import {
    ReplyContext,
} from '../../util/contextItem.jsx';
import RenderImage from '../imageRendering/standardImage.jsx';
import {
    RenderTimePosted,
} from '../../hooks/timeHooks.jsx';
import {
   // FetchActions as FetchCommentActions,
    ScrollToElement
} from '../../hooks/commentHooks.jsx';
import RenderReplyActionbar from '../replyActionBar';
import uuid from 'react-uuid';
import { CommentInput } from '../formElements/commentInputs.jsx';
import CommentHeader from './header.jsx'; 

//This component renders the comment and also handles displaying the editor for posting a new reply 
const RenderComment = props => {
    const {
        displayReplyInput, 
        replyContent,
        replyError,
        submitReply,
        author,
        replyRef, 
        content,
        datePublished,
        lastEdited,
        images,
        setDisplayReplyInput, 
        //If the comment is a reply to another comment, the component will indicate whom the comment will be replying to 
        userRepliedTo,
        CommentRepliedTo, 
    } = props; 

    return (
        <>
            <div
                id='Content-Grid'
                className="grid md:h-full w-full">
                <div id="AuthorField">
                    <CommentHeader
                        author={author}
                    />
                    <div
                        id="MainContentField"
                        className="grid"
                    >
                        <div
                            id="DateField"
                            className="italic"
                        >
                            {lastEdited != datePublished ?
                                <p>Last Edited {RenderTimePosted(lastEdited)}</p>
                                :
                                <p>Submitted {RenderTimePosted(datePublished)}</p>
                            }
                        </div>
                        {userRepliedTo && 
                            (CommentRepliedTo ? 
                            <div
                                className="cursor-pointer hover:underline active:no-underline active:font-bold"
                                onClick={() => ScrollToElement(CommentRepliedTo)}
                            >
                                <span className="italic">@{userRepliedTo}</span>
                            </div>
                            :
                                <div className="italic">@{userRepliedTo}</div>
                            )
                        }
                        {content &&
                            <div
                                id="editor-container"
                                dangerouslySetInnerHTML={{ __html: content }}
                            ></div>
                        }
                        {images && images.length > 0 &&
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                                {images.map((img, index) =>
                                    <RenderImage
                                        image={img}
                                        key={uuid()}
                                        altText={`photo ${index}`}
                                    />
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <RenderReplyActionbar />
            {/*Editor for posting a new reply */}
            {displayReplyInput &&
                <div className = "border-2 rounded-md p-5">
                    <CommentInput
                        content={replyContent}
                        commentError={replyError}
                        commentEditorRef={replyRef}
                        submitEvent={submitReply}
                        cancelEvent={() => setDisplayReplyInput(false)}
                        contextItem={ReplyContext}
                        label={`Reply to ${author.username}`}
                     />
                </div>
            }
        </>
    )
}

export default RenderComment; 