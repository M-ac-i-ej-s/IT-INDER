import React from 'react'
import PropTypes, {InferProps} from 'prop-types';
import '../../../styles/mainPage/message.scss'

function Message({isFrom}: InferProps<typeof Message.propTypes>) {
  return (
    <div className={isFrom ? 'messageFrom' : 'messageTo'}>
      <span className='message_content__span'>this is a message</span>
      <span className='message_date__span'>20-04-2022 17:04</span>
    </div>
  )
}

Message.propTypes = {
    isFrom:PropTypes.bool
}

export default Message
