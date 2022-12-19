import React from 'react';
import '../../styles/reusableComponents/navbar.scss'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
   <div className='navbar__div'>
        <Link className='link__home' to='/'>
          <span className='name__span'>IT-INDER</span>
        </Link>
        <Link className='link__home' to='/login'>
           <Button color="primary" variant="contained" size="large">Log in</Button>
        </Link>
   </div>
  );
}

export default NavBar;
