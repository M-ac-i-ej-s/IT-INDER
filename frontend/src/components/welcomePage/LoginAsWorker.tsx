import React from 'react';
import '../../styles/welcomePage/loginAsWorker.scss'
import Button from '@mui/material/Button';

function LoginAsWorker() {

  const scrollFun = () => {
    window.scrollTo({
      top: 1500,
      behavior: 'smooth',
    });
  };

  return (
   <div className='login__div worker'>
        <div className='login__block worker'>
            <h2>Register as Programmer!</h2>
            <span>
                You need an inspiration? Or are you just happy to help?
                Register as Programmer and join amazing projects that
                you really intrested in! 
            </span>
            <Button onClick={scrollFun} sx={{width:'120px'}} color="primary" variant="contained" size="large">Register</Button>
        </div>
   </div>
  );
}

export default LoginAsWorker;
