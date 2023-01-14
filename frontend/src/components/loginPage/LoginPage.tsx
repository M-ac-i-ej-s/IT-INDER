import React from 'react';
import '../../styles/loginPage/loginPage.scss'
import LoginForm from './LoginForm'
import {Link} from 'react-router-dom'
import {store} from './store';
import { Provider } from 'react-redux';

function LoginPage() {
  return (
   <div>
        <div className='left__background'></div>
        <div className='right__background'></div>

        <div className='logo__box'>
          <Link className='link__home' to='/'>
            <span className='logo__span'>IT-INDER</span>
          </Link>
        </div>
        <LoginForm/>
   </div>
  );
}

export default LoginPage;
