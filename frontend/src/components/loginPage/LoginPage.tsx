import React from 'react';
import '../../styles/loginPage/loginPage.scss'
import LoginForm from './LoginForm'
import {Link} from 'react-router-dom'
import PropTypes, {InferProps} from 'prop-types';

function LoginPage({admin=false}: InferProps<typeof LoginPage.propTypes>) {
  return (
   <div>
        <div className='left__background login'></div>
        <div className='right__background login'></div>

        <div className='logo__box'>
          <Link className='link__home' to='/'>
            <span className='logo__span'>{admin ? 'ADMIN' : 'IT-INDER'}</span>
          </Link>
        </div>
        <LoginForm admin={admin}/>
   </div>
  );
}

LoginPage.propTypes = {
  admin: PropTypes.bool
}

export default LoginPage;
