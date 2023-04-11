import { useState, useEffect, useRef } from 'react'; 
import uuid from 'react-uuid'; 

const MessageComponent = props => {
    const { message, dispatch } = props; 

    function AnimateMessage(DivElem) {
        setTimeout(() => {
            DivElem?.classList.remove("MessageFadeOut");
            DivElem?.classList.add("MessageFadeIn");
        }, [1])
        setTimeout(() => {
            dispatch([]); 
        }, [12000])
        setTimeout(() => {
            DivElem?.classList.remove("MessageFadeIn")
            DivElem?.classList.add("MessageFadeOut");
        }, [10000])
    }

    function RenderMessage() {
        //Dont use any hooks here.  
        return message.map((item, index) => {
            const ID = `${item.param}-${index}`;
            return <div
                key={uuid()}
                id={ID}
                className={`Message box-shadow`}>{item.msg}</div>
        })
    }

    const messageRef = useRef(); 

    useEffect(() => {
        if (message && message.length > 0) {
            for (var child of messageRef.current.children) {
                AnimateMessage(child)
            }
        }
    }, [message])
    return (
        <div
            id="message"
            className="MessageDiv"
            ref={messageRef}
        >
            {message != null && message.length > 0 && RenderMessage()}
        </div>
        )
}

export default MessageComponent; 