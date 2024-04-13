import './style.css'


const Message=(props)=>{
    return(<div className='message' key={props.key}>
        {props.message}


    </div>)}


export default Message