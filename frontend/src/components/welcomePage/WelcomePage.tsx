import React from 'react';
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

function WelcomePage() {
  return (
   <div>
        <NavBar/>
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
