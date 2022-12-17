import React from 'react';
import NavBar from './NavBar';
import LoginAsManager from './LoginAsManager';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LoginAsWorker from './LoginAsWorker';
import ManagerForm from './ManagerForm';
import WorkerForm from './WorkerForm';
import ManagerDescription from './ManagerDescription';
import WorkerDescription from './WorkerDescription';
import '../../styles/welcomePage/arrows.scss'

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
   </div>
  );
}

export default WelcomePage;
