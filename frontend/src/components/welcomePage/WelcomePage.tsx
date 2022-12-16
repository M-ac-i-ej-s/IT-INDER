import React from 'react';
import NavBar from './NavBar';
import LoginAsManager from './LoginAsManager';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LoginAsWorker from './LoginAsWorker';
import Footer from './Footer';
import '../../styles/welcomePage/arrows.scss'

function WelcomePage() {
  return (
   <div>
        <NavBar/>
        <LoginAsManager/>
        <SyncAltIcon sx={{fontSize: 270, color: 'white'}} className='arrows__icon'/>
        <LoginAsWorker/>
        <Footer/>
   </div>
  );
}

export default WelcomePage;
