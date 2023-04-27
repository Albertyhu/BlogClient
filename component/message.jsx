import { useEffect, useRef } from 'react'; 
import uuid from 'react-uuid'; 

//this is component is for displaying messages that notifies user of when their post is saved, or when their comments are submitted, etc. 
const MessageComponent = props => {
    const { message, dispatch } = props; 
    function AnimateMessage(DivElem) {

       var obj1= setTimeout(() => {
            DivElem?.classList.remove("MessageFadeOut");
            DivElem?.classList.add("MessageFadeIn");
        }, [1])
       var obj2 = setTimeout(() => {
            dispatch([]); 
        }, [6000])
        var obj3 = setTimeout(() => {
            DivElem?.classList.remove("MessageFadeIn")
            DivElem?.classList.add("MessageFadeOut"); 
        }, [5000])

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