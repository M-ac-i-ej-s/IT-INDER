import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from '../reusableComponents/NavBar';

function MainPage() {
  return (
   <div>
        <NavBar page='mainPage'/>
        <Outlet/>
   </div>
  );
}

export default MainPage;
