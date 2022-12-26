import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'
import '../../../styles/mainPage/tile.scss'
import '../../../styles/mainPage/profilePage.scss'

function ProfilePage() {
  return (
    <div>
        <div className='tile__block'>
            <Link to='edit'>
                <Fab className='edit__button' color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
            </Link>
            <div>
                <div>
                    <span className='what__span'>Name: </span>
                    <span className='name__span'>Mateusz</span>
                </div>
                    <span className='what__span'>Description: </span>
                    <span className='description__span'>
                    You got a paiy but you cant sleep at night Car alarm going off outside
                    </span>
            </div>
        </div>
    </div>
  );
}

export default ProfilePage;
