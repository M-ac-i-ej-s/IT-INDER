import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'
import { useAppSelector } from '../mainPageApp/hooks'
import '../../../styles/mainPage/tile.scss'
import '../../../styles/mainPage/profilePage.scss'

function ProfilePage() {
  const user = useAppSelector(state => state.profile.user);

  return (
    <div>
        <div className='tile__block'>
            <Link className='edit__button' to='edit'>
                <Fab className='edit__button' color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
            </Link>
            <div>
                <div>
                    <span className='what__span'>Name: </span>
                    <span className='name__span'>{user.name}</span>
                </div>
                    <span className='what__span'>Description: </span>
                    <span className='description__span'>
                    {user.description}
                    </span>
                    <p className='what__span'>languages: </p>
                    <span className='description__span'>
                    {user.languages.map(el => {
                            return <span key={el}>{el}</span>
                    })}
                    </span>
            </div>
        </div>
    </div>
  );
}

export default ProfilePage;
