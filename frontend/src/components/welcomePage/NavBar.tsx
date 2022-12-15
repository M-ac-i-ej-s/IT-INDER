import React from 'react';
import '../../styles/welcomePage/navbar.scss'
import Button from '@mui/material/Button';

function NavBar() {
  return (
   <div className='navbar__div'>
        <span className='name__span'>IT-INDER</span>
        <Button color="secondary" variant="contained" size="large">Log in</Button>
   </div>
  );
}

export default NavBar;
