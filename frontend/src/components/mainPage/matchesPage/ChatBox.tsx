import React from 'react'
import '../../../styles/mainPage/chatBox.scss'
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

function ChatBox() {
  return (
    <div className='chatBox__div'>
        <div className='messages__div'>
            <Message isFrom={true}/>
            <Message isFrom={false}/>
            <Message isFrom={true}/>
            <Message isFrom={false}/>
            <Message isFrom={true}/>
            <Message isFrom={false}/>
            <Message isFrom={true}/>
            <Message isFrom={false}/>
        </div>
        <div className='sending__div'>
            <input type="text" className='chatMessage__input'/>
            <Fab color='secondary' size='medium'>
                <SendIcon/>
            </Fab>
        </div>
    </div>
  )
}

export default ChatBox
