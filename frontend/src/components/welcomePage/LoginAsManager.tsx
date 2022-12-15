import React from 'react';
import '../../styles/welcomePage/loginAsManager.scss'
import Button from '@mui/material/Button';

function LoginAsManager() {
  return (
   <div className='login__div manager'>
        <div className='login__block manager'>
            <h2>Register as Project Master!</h2>
            <span>
                You have a project and need help? look no further!
                Register as Project Master and look for programmers 
                that fits your requirements! 
            </span>
            <Button sx={{width:'120px'}}color="secondary" variant="contained" size="large">Register</Button>
        </div>
   </div>
  );
}

export default LoginAsManager;
