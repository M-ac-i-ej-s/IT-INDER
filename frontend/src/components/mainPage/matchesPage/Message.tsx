import React, {useState} from 'react'
import PropTypes, {InferProps} from 'prop-types';
import '../../../styles/mainPage/message.scss'
import {format} from 'timeago.js'
import axios from 'axios'
import authHeader from '../../../services/auth-header';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';

function Message({message,isFrom}: InferProps<typeof Message.propTypes>) {
   {/* eslint-disable */}
   const [render, setRender] = useState('none')
      /* @ts-ignore */
   const [newMessage, setNewMessage] = useState(message.text)

   const deleteMessage = async () => {
      await axios
            .put(
                /* @ts-ignore */
              `https://localhost:3001/messages/${message._id}`,
              {
                body:''
              },
              {
                headers: {
                  ...authHeader(),
                  'content-type': 'application/json',
                },              
              }
            )
            .then(() => {
              setNewMessage('')
            })
            .catch((error) => {
                console.log(error);
            });
   }

   const handleDeleteMessage = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your message has been deleted!',
            'success'
          )
          deleteMessage()
        }
      })
   }

  return (
     /* @ts-ignore */
    <div className={isFrom ? `messageTo${newMessage === '' ? ' deleted' : ''}` : `messageFrom${newMessage === '' ? ' deleted' : ''}`}>
      {/* @ts-ignore */}
      {
         /* @ts-ignore */
        (newMessage !== '') ? 
          <>
             <div className='message_outside_div' onMouseEnter={() => setRender('block')} onMouseLeave={() => setRender('none')}>
              {
                isFrom &&
                <Tooltip style={{display: render}} title="Delete">
                  <IconButton onClick={handleDeleteMessage}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
              {/* @ts-ignore */}
             <span className='message_content__span'>{newMessage}</span>
              {
                !isFrom &&
                <Tooltip style={{display:render}} title="Delete">
                <IconButton onClick={handleDeleteMessage}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              }
             </div>
          </>
        :
        <div className='message_outside_div'> 
           <span className='message_content__span'>This message has been deleted</span>
        </div>
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
