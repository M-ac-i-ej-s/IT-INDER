import React, {useEffect, useState} from 'react'
import '../../../styles/mainPage/matchesList.scss'
import PropTypes, {InferProps} from 'prop-types';
import axios from 'axios'

function MatchesList({conversation, currentUserId, handleChatChange}: InferProps<typeof MatchesList.propTypes>) {
  const [user, setUser] = useState({})

  const getUserById = async (id) => {
    await axios
            .get(`http://localhost:3001/users/${id}`)
            .then((response) => {
              const user = response.data.User;
              setUser(user[0])
            })
            .catch((error) => {
                console.log(error);
            });
  }

  useEffect(() => {
     /* eslint-disable */
     /* @ts-ignore */
    const friendId = conversation.members.find(m => m !== currentUserId)
    /* eslint-enable */
    getUserById(friendId)
  },[])

  return (
        <div onClick={() => handleChatChange(conversation)} className='chat_match__div'>
            {/* eslint-disable */}
            {/* @ts-ignore */}
            <span className='name__span'>{user.name}</span>
            {/* eslint-enable */}
        </div>
  )
}

MatchesList.propTypes = {
  conversation: PropTypes.object,
  currentUserId: PropTypes.string,
  handleChatChange: PropTypes.func
}

export default MatchesList
