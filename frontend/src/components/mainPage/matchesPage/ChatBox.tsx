import React, {useEffect, useRef} from 'react'
import '../../../styles/mainPage/chatBox.scss'
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import PropTypes, {InferProps} from 'prop-types';

function ChatBox({messages, userId, handleMessage, messValue,handleSubmit}:InferProps<typeof ChatBox.propTypes>) {
  const scrollRef = useRef()

  useEffect(() => {
     /* eslint-disable */
     /* @ts-ignore */
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
      /* eslint-enable */
  },[messages])

  return (
    <div className='chatBox__div'>
      {messages ?
      <div className='message_center__div'>
      <div className='messages__div'>
          {messages.map((m, index) => {
            return (
              <div key={index} ref={scrollRef}>
                <Message message={m} isFrom={m.sender === userId}/>
              </div>
            )
          })}
      </div>
    </div>
      : 
      <div className='chatBox_error__div'>
          <span className='chatBox_error__span'>dont have any matches yet ?</span>
          <span className='chatBox_error__span'>go explore !</span>
          <div className="lds-heart stopped"><div></div></div>
      </div>
      }
        <div className='sending__div'>
            <input onChange={handleMessage} type="text" className='chatMessage__input' value={messValue} placeholder='Aa'/>
            <Fab color='secondary' size='medium' onClick={handleSubmit} disabled={messValue.length > 0 ? false : true}>
                <SendIcon/>
            </Fab>
        </div>
    </div>
  )
}

ChatBox.propTypes = {
  messages: PropTypes.array,
  userId: PropTypes.string,
  handleMessage: PropTypes.func,
  messValue: PropTypes.string,
  handleSubmit:PropTypes.func
}

export default ChatBox
