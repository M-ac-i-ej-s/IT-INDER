import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import authHeader from '../../../services/auth-header';
import '../../../styles/mainPage/tile.scss'
import '../../../styles/mainPage/profilePage.scss'
import {
    SETLANGUAGES,
    SETDESCRIPTION,
    SETNAME
} from './profileSlice';
import axios from 'axios'
import Loader from '../../reusableComponents/Loader';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const getUser = async () => {
    await axios
          .get('http://localhost:3001/users/you', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.User;
            dispatch(SETLANGUAGES(user[0].languages.map(el => {return {value: el, label: el}})))
            dispatch(SETDESCRIPTION(user[0].description))
            dispatch(SETNAME(user[0].name))
            setUser(user[0])
            setLoading(true)
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <div>
        <div className='tile__block'>
          {loading ? 
            <div>
              <div className='buttons_set__div'>
                <Link className='settings__button' to='settings'>
                    <Fab className='edit__button' aria-label="edit" color='info'>
                        <SettingsIcon/>
                    </Fab>
                </Link>
                <Link className='edit__button' to='edit'>
                    <Fab className='edit__button' color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Link>
              </div>
              <div>
                  <div>
                      <span className='what__span'>Name: </span>
                      { /* eslint-disable */ }
                      {/* @ts-ignore */}
                      <span className='name__span'>{user.name}</span>
                  </div>
                      <span className='what__span'>Description: </span>
                      <span className='description__span'>
                      {/* @ts-ignore */}
                      {user.description}
                      </span>
                      <p className='what__span'>languages: </p>
                      <span className='description__span'>
                      {/* @ts-ignore */}
                      {user.languages && user.languages.map(el => {
                              return <span key={el}>{el}</span>
                      })}
                      { /* eslint-enable */ }
                      </span>
                </div>
              </div>  
            : 
            <div className='loader__div'>
              <Loader/>
            </div>  
            }
        </div>
    </div>
  );
}

export default ProfilePage;
