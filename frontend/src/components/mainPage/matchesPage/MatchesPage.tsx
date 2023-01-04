import React from 'react'
import MatchesList from './MatchesList'
import ChatBox from './ChatBox'
import '../../../styles/mainPage/matchesPage.scss'

function MatchesPage() {
  return (
    <div className='matchPage__div'>
      <MatchesList/>
      <ChatBox/>
    </div>
  )
}

export default MatchesPage
