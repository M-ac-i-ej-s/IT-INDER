import React, { useState, useEffect, useRef } from 'react'
import MatchesList from './MatchesList'
import ChatBox from './ChatBox'
import axios from 'axios'
import '../../../styles/mainPage/matchesPage.scss'
import authHeader from '../../../services/auth-header'
import {io} from 'socket.io-client'

function MatchesPage() {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const [user, setUser] = useState({})

  const getUser = async () => {
    await axios
          .get('http://localhost:3001/users/you', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.User;
            setUser(user[0]);
            sockerInit(user[0]._id)
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const getConversations = async () => {
    await axios
          .get('http://localhost:3001/conversations/yours', {
            headers: authHeader(),
          })
          .then(res => {
            const conversations = res.data.conversation
                            /* eslint-disable */
            setConversations(conversations)
             /* @ts-ignore */
            setCurrentChat(conversations[0])
          })
          .catch(err => {
            console.log(err)
          })
  }

  const getMessages = async (id) => {
    await axios
      .get(`http://localhost:3001/messages/${id}`, {
        headers: authHeader(),
      })
      .then(res => {
        const messages = res.data.messages
        console.log(messages)
        setMessages(messages)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const handleChatChange = (el) => {
    setCurrentChat(el)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* eslint-disable */
    const message = {
      /* @ts-ignore */
      sender: user._id,
      text: newMessage,
      /* @ts-ignore */
      conversationId: currentChat._id,
    }
     /* @ts-ignore */
    const receiverId = currentChat.members.find(member => member !== user._id)
    /* @ts-ignore */
 /* @ts-ignore */
    socket.current.emit('sendMessage', {
       /* @ts-ignore */
      senderId:user._id,
      receiverId,
      text: newMessage,
    })

    await axios.
          post('http://localhost:3001/messages/', 
            message,
          {
            headers: {
              ...authHeader(),
              'content-type': 'application/json',
            },              
          })
          .then((res) => {
            setMessages([...messages, message])
            setNewMessage('')
          })
          .catch((err) => {
            console.log(err)
          })
  }

  useEffect(() => {
    getConversations()
    getUser()
     /* eslint-disable */
     /* @ts-ignore */
     /* @ts-ignore */
  },[])

  useEffect(() => {
        /* @ts-ignore */
    getMessages(currentChat._id)
  },[currentChat])

  const sockerInit = (id) => {
    /* @ts-ignore */
    socket.current = io('ws://localhost:8900')
    /* @ts-ignore */
    socket.current.emit('addUser', id)
     /* @ts-ignore */
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }

  useEffect(() => {
      /* @ts-ignore */
        /* @ts-ignore */
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev => [...prev,arrivalMessage])
  },[arrivalMessage, currentChat])
     /* eslint-enable */
  return (
    <>
    <div className='left__background match'></div>
    <div className='right__background match'></div>
    <div className='matchPage__div'>
        {/* eslint-disable */}
      <div className='chat_list__div'>
      {conversations && conversations.map(el => {
        return (
            <div key={el}>
                {/* @ts-ignore */}
                <MatchesList handleChatChange={handleChatChange} conversation={el} currentUserId={user._id}/>
            </div>
        )
      })}
      </div>
        {currentChat ? 
            /* @ts-ignore */
            <ChatBox messages={messages} userId={user._id} handleMessage={handleMessage} messValue={newMessage} handleSubmit={handleSubmit}/>
            :
            <span>Open a conversation to start a chat</span>
        }
        {/* eslint-enable */}
    </div>
    </>
  )
}

export default MatchesPage
