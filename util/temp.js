
{editmode && decoded && decoded.id == author._id ? 
    <div className="border-2 rounded-md p-5 box_shadow">
        <CommentHeader
            author={author}
        />
        <CommentInput
            content={content}
            commentError={updateError}
            commentEditorRef={updateRef}
            submitEvent={updateComment}
            cancelEvent={() => {
                setAttachedImages(images)
                setEditMode(false);
            }}
            contextItem={CommentContext}
        />
    </div>
    : 
    <ReplyContext.Provider value={replyContext}>
        <RenderComment
            displayReplyInput={displayReplyInput}
            replyContent={replyContent}
            replyError={replyError}
            submitReply={submitReply}
            author={author}
            content={content}
            datePublished={datePublished}
            lastEdited={lastEdited}
            images={images}
            setDisplayReplyInput={setDisplayReplyInput}
            replyRef={replyRef}
            contextItem={CommentContext}
        />
    </ReplyContext.Provider>
}



{
    !editmode && decoded.id == author._id ?
    <ReplyContext.Provider value={replyContext}>
        <RenderComment
            displayReplyInput={displayReplyInput}
            replyContent={replyContent}
            replyError={replyError}
            submitReply={submitReply}
            author={author}
            content={content}
            datePublished={datePublished}
            lastEdited={lastEdited}
            images={images}
            setDisplayReplyInput={setDisplayReplyInput}
            replyRef={replyRef}
            userRepliedTo={userRepliedTo}
            CommentRepliedTo={commentRepliedTo}
            contextItem={ReplyContext}
        />
    </ReplyContext.Provider>
    :
    <div className="border-2 rounded-md p-5 box_shadow">
        <CommentHeader
            author={author}
        />
        <CommentInput
            content={content}
            commentError={updateError}
            commentEditorRef={updateRef}
            submitEvent={updateComment}
            cancelEvent={() => {
                setAttachedImages(images);
                setEditMode(false);
            }}
            contextItem={CommentContext}
        />
    </div>
}

{
    editmode && decoded.id == author._id ? 
        <div className="border-2 rounded-md p-5 box_shadow">
            <CommentHeader
                author={author}
            />
            <CommentInput
                content={content}
                commentError={updateError}
                commentEditorRef={updateRef}
                submitEvent={updateComment}
                cancelEvent={() => {
                    setAttachedImages(images);
                    setEditMode(false);
                }}
                contextItem={CommentContext}
            />
        </div>
        :
        <ReplyContext.Provider value={replyContext}>
            <RenderComment
                displayReplyInput={displayReplyInput}
                replyContent={replyContent}
                replyError={replyError}
                submitReply={submitReply}
                author={author}
                content={content}
                datePublished={datePublished}
                lastEdited={lastEdited}
                images={images}
                setDisplayReplyInput={setDisplayReplyInput}
                replyRef={replyRef}
                userRepliedTo={userRepliedTo}
                CommentRepliedTo={commentRepliedTo}
                contextItem={ReplyContext}
            />
        </ReplyContext.Provider>
  }