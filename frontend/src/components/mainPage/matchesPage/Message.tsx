import React, { useEffect } from 'react'
import PropTypes, {InferProps} from 'prop-types';
import '../../../styles/mainPage/message.scss'
import {format} from 'timeago.js'

function Message({message,isFrom}: InferProps<typeof Message.propTypes>) {
   {/* eslint-disable */}



  return (
     /* @ts-ignore */
    <div className={isFrom ? `messageTo${message.text === '' ? ' deleted' : ''}` : `messageFrom${message.text === '' ? ' deleted' : ''}`}>
      {/* @ts-ignore */}
      {
         /* @ts-ignore */
        (message.text !== '') ? 
          /* @ts-ignore */
        <span className='message_content__span'>{message.text}</span>
        :
        <span className='message_content__span'>This message has been deleted</span>
      }
      {/* @ts-ignore */}
      <span className='message_date__span'>{format(message.createdAt)}</span>
    </div>
  )
}

Message.propTypes = {
    isFrom:PropTypes.bool,
    message: PropTypes.object
}

export default Message
