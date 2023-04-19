import { useContext, useEffect, useState, useRef } from 'react';
import { DecodeToken } from '../../hooks/decodeToken.jsx';
import {
    AppContext,
    ReplyContext,
} from '../../util/contextItem.jsx';
import { PostLikeFeatures } from '../likeComponent.jsx';
import ProfilePic from '../user/profilePicture.jsx';
import RenderImage from '../imageRendering/standardImage.jsx';
import avatar from '../../assets/images/avatar.jpg';
import { FormatTimeAndDate } from '../../hooks/timeHooks.jsx';
import { NavigationHooks } from '../../hooks/navigation.jsx';
import { useNavigate } from 'react-router-dom';
import { FetchActions as FetchCommentActions } from '../../hooks/commentHooks.jsx';
import RenderReplyActionbar from '../replyActionBar';
import uuid from 'react-uuid';
import { CommentInput } from '../formElements/commentInputs.jsx';
import { GetContent } from '../../hooks/tinyMCEhooks.jsx';
import ReplyPanel from '../replyPanel'
import CommentHeader from './header.jsx'; 

const RenderComment = props => {
    const {
        displayEditor, 
        replyContent,
        replyError,
        submitReply,
        author,
        replyRef, 
        content,
        datePublished,
        lastEdited,
        images,
        setDisplayEditor, 
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
                            {lastEdited ?
                                <p>Last Edited: {FormatTimeAndDate(lastEdited)}</p>
                                :
                                <p>Date Submitted: {FormatTimeAndDate(datePublished)}</p>
                            }
                        </div>
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
            {displayEditor &&
                <CommentInput
                    content={replyContent}
                    commentError={replyError}
                    commentEditorRef={replyRef}
                    submitEvent={submitReply}
                    cancelEvent={() => setDisplayEditor(false)}
                />
            }
        </>
    )
}

export default RenderComment; 