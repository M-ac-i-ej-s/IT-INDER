import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from '../reusableComponents/NavBar';
import {store} from './mainPageApp/store';
import { Provider } from 'react-redux';

function MainPage() {
  return (
   <Provider store={store}>
        <NavBar page='mainPage'/>
        <Outlet/>
   </Provider>
  );
}

export default MainPage;
