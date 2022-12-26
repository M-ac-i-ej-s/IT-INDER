import React from 'react';
import '../../styles/reusableComponents/navbar.scss'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

function NavBar(props : {page: string}) {
  return (
   <div className='navbar__div'>
        <Link className='link__home' to='/'>
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
                <Link className='link__home' to='/matches'>
                  <span className='name__span button'>MATCHES</span>
                </Link>
              </div>
              <Link className='link__home' to='/'>
                <Button color="error" variant="contained" size="large">Log Out</Button>
              </Link>
            </div>
        }
   </div>
  );
}

export default NavBar;
