import React, { useState, useEffect, useRef } from 'react'
import MatchesList from './MatchesList'
import ChatBox from './ChatBox'
import Tile from '../explorePage/Tile'
import axios from 'axios'
import '../../../styles/mainPage/matchesPage.scss'
import authHeader from '../../../services/auth-header'
import {io} from 'socket.io-client'
import Loader from '../../reusableComponents/Loader'

function MatchesPage() {
  const [conversations, setConversations] = useState([])
  const [receiver, setReceiver] = useState({})
  const [currentChat, setCurrentChat] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [loading, setLoading] = useState(false)
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
            if(conversations.length > 0){
              setCurrentChat(conversations[0])
            }
            setLoading(true)
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
        setMessages(messages)
        if(conversations.length > 0){
            /* @ts-ignore */
          getUserById(currentChat.members.find(member => member !== user._id))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getUserById = async (id) => {
    await axios
            .get(`http://localhost:3001/users/${id}`)
            .then((response) => {
              const user = response.data.User;
              setReceiver(user[0])
            })
            .catch((error) => {
                console.log(error);
            });
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
     /* @ts-ignore */
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
        {/* @ts-ignore */}
            {(conversations.length>0 && loading && user._id) ? conversations.map(el => {
            return (
              <div key={el}>
                  {/* @ts-ignore */}
                  <MatchesList handleChatChange={handleChatChange} conversation={el} currentUserId={user._id}/>
              </div>
            )
            }) : (!loading) ? (
            <Loader/>
            ) :
            <span className='matches_error__span'>Here your matches will appear !</span>
            }
      </div>
        {currentChat ? 
            /* @ts-ignore */
            <ChatBox messages={messages} userId={user._id} handleMessage={handleMessage} messValue={newMessage} handleSubmit={handleSubmit}/>
            :
            <span>Dont have matches yet, go explore!</span>
        }
         {receiver &&
           /* @ts-ignore */
          <Tile chat={true} loading={loading} name={receiver ? receiver.name : ''} description={receiver ? receiver.description : ''} languages={receiver ? receiver.languages : ['']}/>
         }
        {/* eslint-enable */}
    </div>
    </>
  )
}

export default MatchesPage
