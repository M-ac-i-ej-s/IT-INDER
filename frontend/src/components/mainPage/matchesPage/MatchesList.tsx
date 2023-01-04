import React from 'react'
import '../../../styles/mainPage/matchesList.scss'

function MatchesList() {
  return (
    <div className='chat_list__div'>
        <div className='chat_match__div'>
            <span className='name__span'>Chat app</span>
        </div>
        <div className='chat_match__div'>
            <span className='name__span'>some app</span>
        </div>
        <div className='chat_match__div'>
            <span className='name__span'>some project</span>
        </div>
    </div>
  )
}

export default MatchesList
