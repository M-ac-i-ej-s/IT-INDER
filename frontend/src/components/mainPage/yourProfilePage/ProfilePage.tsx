import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'
import { useAppDispatch } from '../mainPageApp/hooks'
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

  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'angularjs', label: 'Angular' },
    { value: 'vuejs', label: 'Vue' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'cplusplus', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'mysql', label: 'SQL' },
    { value: 'go', label: 'GO' }, // wordmark
    { value: 'csharp', label: 'C#' },
    { value: 'scala', label: 'Scala' },
]

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

  const labelTovalue = (language) => {
    let label = '';
    options.forEach(el => {
        if(language === el.label){
            label = el.value
        }
    })
    if(label === 'go'){
        return <i className={`devicon-${label}-original-wordmark colored`}></i>
    } else if (label === ''){
      return <QuestionMarkIcon/>
  }
    return <i className={`devicon-${label}-plain colored`}></i>
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
                    <Fab className='edit__button' aria-label="settings" sx={{color:'grey'}}>
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
                <div className='name__div'>
                { /* eslint-disable */ }
                    {/* @ts-ignore */}
                    <span className='name__span'>{user.name}</span>
                </div>
                <div className='description__div'>
                    <span className='description__span'>
                      {/* @ts-ignore */}
                    {user.description}
                    </span>
                </div>
                <div className='languages__div'>
                  {/* @ts-ignore */}
                    {user.languages && user.languages.map(el => {
                            return (
                            <div key={el}>
                                {labelTovalue(el)}
                                <span className='language__span'>{el}</span>
                            </div>
                            )
                    })}
                </div>
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
