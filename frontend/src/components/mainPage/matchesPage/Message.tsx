import React from 'react'
import PropTypes, {InferProps} from 'prop-types';
import '../../../styles/mainPage/message.scss'
import {format} from 'timeago.js'

function Message({message,isFrom}: InferProps<typeof Message.propTypes>) {
   {/* eslint-disable */}
  return (
    <div className={isFrom ? 'messageTo' : 'messageFrom'}>
      {/* @ts-ignore */}
      <span className='message_content__span'>{message.text}</span>
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
