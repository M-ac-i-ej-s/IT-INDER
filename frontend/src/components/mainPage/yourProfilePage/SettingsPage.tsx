import React, {useState, useEffect} from 'react';
import '../../../styles/mainPage/tile.scss'
import { Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Fab from '@mui/material/Fab';
import {Link, useNavigate} from 'react-router-dom'
import authHeader from '../../../services/auth-header';
import { deleteCookie } from '../../../services/cookie-fun';
import '../../../styles/mainPage/settingsPage.scss'
import axios from 'axios'
import Swal from 'sweetalert2'

function SettingsPage() {
   const navigate = useNavigate()

   const edit = async () => {
        await axios
              .put(
                'http://localhost:3001/users/reset', 
                {
                    test: 'test'
                },
                {
                    headers: {
                      ...authHeader(),
                      'content-type': 'application/json',
                    },              
                }
              )
              .then((response) => {
                console.log('user is updated')
              })
              .catch((error) => {
                  console.log(error);
              });
  }

  const deleteUser = async () => {
    await axios
          .delete(
            'http://localhost:3001/users/delete',
            {
              headers: authHeader(),             
            }
          )
          .then((response) => {
            deleteCookie('id')
            navigate('/')
            console.log('user is updated')
          })
          .catch((error) => {
              console.log(error);
          });     
  }

  const deleteConversations = async () => {
    await axios
          .delete(
            'http://localhost:3001/conversations/delete',
            {
              headers: authHeader(),             
            }
          )
          .then((response) => {
            console.log('deleted')
          })
          .catch((error) => {
              console.log(error);
          });     
  }

  const deleteMessages = async () => {
    await axios
          .delete(
            'http://localhost:3001/messages/delete',
            {
              headers: authHeader(),             
            }
          )
          .then((response) => {
            console.log('deleted')
          })
          .catch((error) => {
              console.log(error);
          });     
  }

  const agreeToDelete = () => {
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
            'Your profile has been deleted, bye!',
            'success'
          )
          deleteUser()
          deleteConversations()
          deleteMessages()
        }
      })
  }

  const agreeToReset = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Reset!',
            'Your profile has been reset, good luck!',
            'success'
          )
          edit()
        }
      })
  }

  const convertToString = (object) => {
    let text = ''
    const arr = Object.entries(object)
    arr.forEach(el => {
        /* eslint-disable */
        console.log(el)
        /* @ts-ignore */
        if(el[0] !== 'firstTime' && el[0] !== 'likes' && el[0] !== 'dislikes' && el[0] !== 'isActive' && el[0] !== '__v' && el[0] !== 'password'){
            text += `${el[0]} - ${el[1]}\n`
        }
         /* eslint-enable */
    })
    return text
  }

  const downloadTxtFile = async () => {
    await axios
          .get('http://localhost:3001/users/you', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.User;
            const element = document.createElement('a');
            /* eslint-disable */
            /* @ts-ignore */
            const file = new Blob([convertToString(user[0])],    
                        {type: 'text/plain;charset=utf-8'});
            /* eslint-enable */
            element.href = URL.createObjectURL(file);
            element.download = 'yourData.txt';
            document.body.appendChild(element);
            element.click();
          })
          .catch((error) => {
              console.log(error);
          });
  }

  return (
   <div>
    <div className='left__background'></div>
    <div className='right__background'></div>
    <div className='tile__block'>
        <div className='section__div'>
            <div className='text__div'>
                <span className='head__span'>
                    Reset your profile
                </span>
                <span className='description_set_span'>
                    Reseting your profile will make all your choices go away.
                    Your Profile data will stay the same, only thing that will be 
                    reset is your likes, dislikes, matches. 
                </span>
            </div>
            <div>
                <Button onClick={agreeToReset} sx={{marginTop: '3px'}} color="secondary" variant="contained">Reset</Button>
            </div>
        </div>
        <div className='section__div'>
            <div className='text__div'>
                <span className='head__span'>
                    Download a copy of your personal data
                </span>
                <span className='description_set_span'>
                      At ITinder, we are committed to protecting your data and privacy 
                      as well as providing you access to the information you have provided us.
                      If you would like to get a copy of your personal data, just click this button.
                </span>
            </div>
            <div>
                <Button onClick={downloadTxtFile} sx={{marginTop: '20px'}} color="secondary" variant="contained">Download</Button>
            </div>
        </div>
        <div className='section__div'>
            <div className='text__div'>
                <span className='head__span'>
                    Delete profile
                </span>
                <span className='description_set_span'>
                    This button will delete your profile permamently, no longer any of your 
                    data will be stored on our app.   
                </span>
            </div>
            <div>
                <Button onClick={agreeToDelete} sx={{marginTop: '3px'}} color="error" variant="contained">Delete</Button>
            </div>
        </div>
    </div>
    <Link className='goBack__button' to='/home/profile'>
        <Fab className='goBack__button' aria-label="settings" sx={{color:'grey'}}>
            <KeyboardReturnIcon/>
        </Fab>
    </Link>
   </div>
  );
}

export default SettingsPage;
