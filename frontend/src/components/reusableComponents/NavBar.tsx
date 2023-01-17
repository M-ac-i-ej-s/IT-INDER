import React from 'react';
import '../../styles/reusableComponents/navbar.scss'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import {deleteCookie} from '../../services/cookie-fun'

function NavBar(props : {page: string}) {

  const delCookie = () => {
    deleteCookie('id')
  }

  return (
   <div className='navbar__div'>
        <Link className='link__home' to={props.page === 'welcome' ? '/' : '/home/explore'}>
          <span className='name__span'>IT-INDER</span>
        </Link>
        {props.page === 'welcome' ? 
            <Link className='link__home' to='/login'>
              <Button color="primary" variant="contained" size="large">Log in</Button>
            </Link>
        : 
            <div className='buttons__group'>
              <div className='section__buttons'>
                <Link className='link__home' to='/home/explore'>
                  <span className='name__span button'>EXPLORE</span>
                </Link>  
                <Link className='link__home' to='/home/profile'>
                  <span className='name__span button'>PROFILE</span>
                </Link>
                <Link className='link__home' to='/home/matches'>
                  <span className='name__span button'>MATCHES</span>
                </Link>
              </div>
              <Link className='link__home' to='/'>
                <Button onClick={delCookie} color="error" variant="contained" size="large">Log Out</Button>
              </Link>
            </div>
        }
   </div>
  );
}

export default NavBar;
