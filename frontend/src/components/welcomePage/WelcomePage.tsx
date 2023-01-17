import React, {useEffect} from 'react';
import NavBar from '../reusableComponents/NavBar';
import LoginAsManager from './LoginAsManager';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LoginAsWorker from './LoginAsWorker';
import ManagerForm from './ManagerForm';
import WorkerForm from './WorkerForm';
import ManagerDescription from './ManagerDescription';
import WorkerDescription from './WorkerDescription';
import Footer from './Footer';
import '../../styles/welcomePage/arrows.scss'
import Divider from '@mui/material/Divider';
import {getCookie} from '../../services/cookie-fun'
import { LOGGEDIN } from '../loginPage/loginSlice';
import { useDispatch } from 'react-redux';
import { login } from '../../services/auth.service';
import {useNavigate} from 'react-router-dom'
import authHeader from '../../services/auth-header';
import axios from 'axios'

function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserById = async (id) => {
    await axios
            .get(`http://localhost:3001/users/${id}`)
            .then((response) => {
              const user = response.data.User;
              login(user[0].email, user[0].password, '?cookie=true')
                .then((response) => {
                    dispatch(LOGGEDIN(response.User));
                    navigate('/home/explore');
                    authHeader();
                })
            })
            .catch((error) => {
                console.log(error);
            });
  }

  useEffect(() => {
    const id = getCookie('id')
    console.log(id)
    if(id !== ''){
      getUserById(id)
    }
  },[])

  return (
   <div>
        <NavBar page='welcome'/>
        <LoginAsManager/>
        <SyncAltIcon sx={{fontSize: 270, color: 'white'}} className='arrows__icon'/>
        <LoginAsWorker/>
        <img className='wave__img' src={require('../../assets/wave.png')} alt="wave" />
        <div className='manager__box'>
          <ManagerForm/>
          <ManagerDescription/>
        </div>
        <div className='manager__box worker'>
          <WorkerDescription/>
          <WorkerForm/>
        </div>
        <Divider sx={{padding:'30px', margin: '0 60px 0 60px'}}/>
        <Footer/>
   </div>
  );
}

export default WelcomePage;
