import Message from "./Message"
import { useState ,useRef ,useEffect} from "react";
import './style.css'

const MainContainer=()=>{
    const textInput=useRef()
    const [messages,updateMessages]=useState([])
    const [webSocketState,setSocketState]=useState(null)

    useEffect(()=>{
    const webSocketServer = new WebSocket('ws://localhost:4000');

    setSocketState(webSocketServer)



    webSocketServer.onmessage=('message',(event)=>{

        updateMessages(previousState=>[...previousState,event.data])
        
    })
    webSocketServer.onerror=('error',(event)=>{
        console.log(event)
    })

    return () => {
        if (webSocketServer) {
            webSocketServer.close();
        }
    };


    },[])

    const addMessages=()=>{

        
        webSocketState.send(textInput.current.value)
        textInput.current.value=''
    

}


    return(<div className="mainContainer">
        {messages.map((message)=><Message message={message} key={Math.random()}></Message>)}
    <textarea ref={textInput}></textarea>
    <button onClick={addMessages}>Send</button>
    </div>)
}


export default MainContainer